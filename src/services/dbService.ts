import { supabase } from '@/integrations/supabase/client';
import { Topic, StudyItem } from '@/data/studyData';

// Simple in-memory cache to prevent excessive DB calls
const cache = {
  publicTopics: { data: null as Topic[] | null, timestamp: 0 },
  leaderboard: { data: null as any[] | null, timestamp: 0 },
  CACHE_DURATION: 30000, // 30 seconds
};

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
    // This query is safe because the RLS policy "profiles_select_own" allows users to see their own record.
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (!profile) return null;

    const { data: secret } = await supabase
      .from('user_secrets')
      .select('gemini_key')
      .eq('user_id', userId)
      .maybeSingle();

    return { 
      ...profile, 
      ai_key: secret?.gemini_key 
    };
  },

  async updateProfile(userId: string, name: string, grade: string) {
    const { error } = await supabase.from('profiles').upsert({ 
      id: userId, 
      name, 
      grade, 
      updated_at: new Date().toISOString() 
    });
    return { error };
  },

  async updateAIKey(userId: string, key: string) {
    const { error } = await supabase.from('user_secrets').upsert({ 
      user_id: userId, 
      gemini_key: key 
    }, { onConflict: 'user_id' });
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

  async getTopicById(topicId: string) {
    // Use the secure RPC to fetch topic and author metadata (hides sensitive profile fields)
    const { data: topic, error: tError } = await supabase
      .rpc('get_topic_with_author_v2', { topic_id_param: topicId })
      .maybeSingle();
    
    if (tError || !topic) return null;

    const { data: items } = await supabase.from('study_items').select('*').eq('topic_id', topic.id);

    return {
      id: topic.id,
      name: topic.name,
      allowedModes: topic.allowed_modes,
      randomizeDirection: topic.randomize_direction,
      isPublic: topic.is_public,
      authorName: (topic as any).author_name || 'Anonymní student',
      authorGrade: (topic as any).author_grade || 'Neznámý ročník',
      items: items?.map(item => ({
        term: item.term,
        definition: item.definition,
        options: item.options,
        category: item.category,
        imageUrl: item.image_url
      })) || []
    } as Topic;
  },

  async getPublicTopics() {
    // Return cached data if valid
    const now = Date.now();
    if (cache.publicTopics.data && (now - cache.publicTopics.timestamp < cache.CACHE_DURATION)) {
      return cache.publicTopics.data;
    }

    // Use the secure RPC to fetch public topics (hides sensitive profile fields like school)
    const { data: topics, error: tError } = await supabase.rpc('get_public_topics_with_authors');
    
    if (tError) {
      console.error("Public topics fetch error:", tError);
      return [];
    }

    if (!topics) return [];

    const topicsWithItems = await Promise.all(topics.map(async (topic: any) => {
      const { data: items } = await supabase.from('study_items').select('*').eq('topic_id', topic.id);
      
      return {
        id: topic.id,
        name: topic.name,
        allowedModes: topic.allowed_modes,
        randomizeDirection: topic.randomize_direction,
        isPublic: topic.is_public,
        authorName: topic.author_name || 'Anonymní student',
        authorGrade: topic.author_grade || 'Neznámý ročník',
        items: items?.map(item => ({
          term: item.term,
          definition: item.definition,
          options: item.options,
          category: item.category,
          imageUrl: item.image_url
        })) || []
      };
    }));

    // Update cache
    cache.publicTopics.data = topicsWithItems;
    cache.publicTopics.timestamp = now;

    return topicsWithItems;
  },

  async saveTopic(userId: string, topic: Topic) {
    const isExisting = !topic.id.startsWith('topic_') && !topic.id.startsWith('ai_') && !topic.id.startsWith('imported_');
    
    const { data: savedTopic, error: tError } = await supabase.from('topics').upsert({
      id: isExisting ? topic.id : undefined,
      user_id: userId,
      name: topic.name,
      allowed_modes: topic.allowed_modes,
      randomize_direction: topic.randomize_direction,
      is_public: topic.isPublic,
    }).select().single();

    if (tError) throw tError;

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

    // Invalidate cache
    cache.publicTopics.data = null;

    return savedTopic;
  },

  async deleteTopic(topicId: string) {
    await supabase.from('topics').delete().eq('id', topicId);
    cache.publicTopics.data = null;
  },

  // Statistiky
  async getStats(userId: string) {
    const { data } = await supabase.from('study_stats').select('*').eq('user_id', userId).single();
    return data;
  },

  async getLeaderboard() {
    const now = Date.now();
    if (cache.leaderboard.data && (now - cache.leaderboard.timestamp < cache.CACHE_DURATION)) {
      return cache.leaderboard.data;
    }

    const { data, error } = await supabase.rpc('get_leaderboard');
    
    if (error) {
      console.error("Leaderboard fetch error:", error);
      return [];
    }

    cache.leaderboard.data = data;
    cache.leaderboard.timestamp = now;

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
    
    cache.leaderboard.data = null; // Invalidate leaderboard cache
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