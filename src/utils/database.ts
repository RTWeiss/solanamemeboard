import { supabase } from '../config/supabase';

export async function initializeDatabase() {
  try {
    // Verify database connection by checking if we can access the pixels table
    const { data, error } = await supabase
      .from('pixels')
      .select('id')
      .limit(1);

    if (error) {
      // If the error is not about table existence, throw it
      if (!error.message.includes('relation "public.pixels" does not exist')) {
        throw error;
      }
      
      console.warn('Tables not found. Please create them through the Supabase dashboard using the schema.sql file.');
      return false;
    }

    console.log('Database connection verified successfully');
    return true;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}