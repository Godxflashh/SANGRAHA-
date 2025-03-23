import { supabase } from '../supabase';

interface UserPreferences {
  genres: string[];
  categories: string[];
  recentInteractions: string[];
}

export async function getRecommendations(userId: string) {
  // Get user preferences
  const { data: preferences } = await supabase
    .from('user_preferences')
    .select('preferred_genres, preferred_categories')
    .eq('user_id', userId)
    .single();

  // Get recent interactions
  const { data: interactions } = await supabase
    .from('user_book_interactions')
    .select('book_id')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(10);

  // Get recommended books based on preferences and interactions
  const { data: recommendations } = await supabase
    .from('books')
    .select('*')
    .in('genre', preferences?.preferred_genres || [])
    .in('category', preferences?.preferred_categories || [])
    .order('rating', { ascending: false })
    .limit(10);

  return recommendations;
}

export async function updateUserPreferences(
  userId: string,
  preferences: UserPreferences
) {
  const { data, error } = await supabase
    .from('user_preferences')
    .upsert({
      user_id: userId,
      preferred_genres: preferences.genres,
      preferred_categories: preferences.categories,
    })
    .select();

  if (error) throw error;
  return data;
}