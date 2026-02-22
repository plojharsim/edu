import { supabase } from '@/integrations/supabase/client';
import { Topic, StudyItem } from '@/data/studyData';

export const dbService = {
  // Profil
  async getProfile(userId: string) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    return data;
  },

  async updateProfile(userId: string, name: string, grade: string) {
    const { error } = await supabase.from('profiles').upsert({ id: userId, name, grade, updated_at: new Date().toISOString() });
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
        randomize_direction: topic.randomize_direction,
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
    const isNew = !topic.id.startsWith('topic_') && !topic.id.startsWith('ai_') && !topic.id.startsWith('imported_');
    
    const { data: savedTopic, error: tError } = await supabase.from('topics').upsert({
      id: isNew ? topic.id : undefined,
      user_id: userId,
      name: topic.name,
      allowed_modes: topic.allowedModes,
      randomize_direction: topic.randomizeDirection
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
      await supabase.from('study_items').insert(itemsToInsert);
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
    
    const today = new Date().toISOString().split('T')[0];
    let streak = existing?.streak || 0;
    
    if (existing?.last_date !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      streak = (existing?.last_date === yesterdayStr) ? streak + 1 : 1;
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