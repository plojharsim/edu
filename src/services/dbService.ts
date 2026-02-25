import { supabase } from '@/integrations/supabase/client';
import { Topic, StudyItem } from '@/data/studyData';

export const dbService = {
  // Verze aplikace
  async getRequiredVersion() {
    const { data, error } = await supabase
      .from('app_config')
      .select('value')
      .eq('key', 'min_version')
      .single();
    
    if (error) return null;
    return data.value;
  },

  // Profil
  async getProfile(userId: string) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    return data;
  },

  async updateProfile(userId: string, name: string, grade: string, school: string) {
    const { error } = await supabase.from('profiles').upsert({ 
      id: userId, 
      name, 
      grade, 
      school,
      updated_at: new Date().toISOString() 
    });
    return { error };
  },

  async updateAIKey(userId: string, key: string) {
    const { error } = await supabase.from('profiles').update({ ai_key: key }).eq('id', userId);
    return { error };
  },

  // Témata a položky
  async getUserTopics(userId: string) {
    const { data: topics, error: tError } = await supabase.from('topics').select('*').eq('user_id', userId);
    if (tError) return [];

    const topicsWithItems = await Promise.all(topics.map(async (topic) => {
      const { data: items } = await supabase.from('study_items').select('*').eq('topic_id', topic.id);
      return {
        id: topic.id,
        name: topic.name,
        allowedModes: topic.allowed_modes,
        randomizeDirection: topic.randomize_direction,
        isPublic: topic.is_public,
        items: items?.map(item => ({
          term: item.term,
          definition: item.definition,
          options: item.options,
          category: item.category,
          imageUrl: item.image_url
        })) || []
      };
    }));

    return topicsWithItems;
  },

  async getPublicTopics() {
    const { data: topics, error: tError } = await supabase
      .from('topics')
      .select('*, profiles(name, school)')
      .eq('is_public', true)
      .order('created_at', { ascending: false });
    
    if (tError) {
      console.error("Public topics fetch error:", tError);
      return [];
    }

    const topicsWithItems = await Promise.all(topics.map(async (topic) => {
      const { data: items } = await supabase.from('study_items').select('*').eq('topic_id', topic.id);
      return {
        id: topic.id,
        name: topic.name,
        allowedModes: topic.allowed_modes,
        randomizeDirection: topic.randomize_direction,
        authorName: (topic as any).profiles?.name || 'Anonym',
        authorSchool: (topic as any).profiles?.school || 'Neznámá škola',
        items: items?.map(item => ({
          term: item.term,
          definition: item.definition,
          options: item.options,
          category: item.category,
          imageUrl: item.image_url
        })) || []
      };
    }));

    return topicsWithItems;
  },

  async saveTopic(userId: string, topic: Topic) {
    // Pokud ID začíná speciálním prefixem, považujeme ho za nové (necháme Supabase vygenerovat UUID)
    const isExisting = !topic.id.startsWith('topic_') && !topic.id.startsWith('ai_') && !topic.id.startsWith('imported_');
    
    const { data: savedTopic, error: tError } = await supabase.from('topics').upsert({
      id: isExisting ? topic.id : undefined,
      user_id: userId,
      name: topic.name,
      allowed_modes: topic.allowedModes,
      randomize_direction: topic.randomizeDirection,
      is_public: topic.isPublic || false
    }).select().single();

    if (tError) throw tError;

    // Smažeme staré položky a vložíme nové
    await supabase.from('study_items').delete().eq('topic_id', savedTopic.id);

    const itemsToInsert = topic.items.map(item => ({
      topic_id: savedTopic.id,
      term: item.term,
      definition: item.definition,
      options: item.options,
      category: item.category,
      image_url: item.imageUrl
    }));

    if (itemsToInsert.length > 0) {
      const { error: iError } = await supabase.from('study_items').insert(itemsToInsert);
      if (iError) throw iError;
    }

    return savedTopic;
  },

  async deleteTopic(topicId: string) {
    await supabase.from('topics').delete().eq('id', topicId);
  },

  // Statistiky
  async getStats(userId: string) {
    const { data } = await supabase.from('study_stats').select('*').eq('user_id', userId).single();
    return data;
  },

  async getLeaderboard() {
    const { data, error } = await supabase
      .from('study_stats')
      .select(`
        average,
        sessions,
        streak,
        profiles!inner (
          name,
          grade
        )
      `)
      .gt('sessions', 0)
      .order('average', { ascending: false })
      .limit(10);
    
    if (error) {
      console.error("Leaderboard fetch error:", error);
      return [];
    }
    return data;
  },

  async updateStats(userId: string, score: number, performanceUpdate?: any) {
    const { data: existing } = await supabase.from('study_stats').select('*').eq('user_id', userId).maybeSingle();
    
    const now = new Date();
    const today = now.getFullYear() + '-' + 
                  String(now.getMonth() + 1).padStart(2, '0') + '-' + 
                  String(now.getDate()).padStart(2, '0');

    let streak = existing?.streak || 0;
    const lastDate = existing?.last_date;

    if (!lastDate) {
      streak = 1;
    } else if (lastDate === today) {
      streak = existing.streak;
    } else {
      const lastDateObj = new Date(lastDate);
      const todayObj = new Date(today);
      lastDateObj.setHours(0, 0, 0, 0);
      todayObj.setHours(0, 0, 0, 0);
      const diffTime = todayObj.getTime() - lastDateObj.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        streak += 1;
      } else {
        streak = 1;
      }
    }

    const sessions = (existing?.sessions || 0) + 1;
    const average = (((existing?.average || 0) * (existing?.sessions || 0)) + score) / sessions;
    const perfect_sessions = (existing?.perfect_sessions || 0) + (score === 100 ? 1 : 0);

    const updateData: any = {
      user_id: userId,
      streak,
      average,
      sessions,
      perfect_sessions,
      last_date: today
    };

    if (performanceUpdate) {
      updateData.performance_data = performanceUpdate;
    }

    const { error } = await supabase.from('study_stats').upsert(updateData, { onConflict: 'user_id' });
    if (error) console.error("Update stats error:", error);
    return { error };
  },

  async deleteAccount() {
    const { data, error } = await supabase.functions.invoke('delete-user', {
      method: 'POST'
    });
    
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    
    return data;
  }
};