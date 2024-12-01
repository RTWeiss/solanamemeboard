import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://yafrbwzjcgicjsbjypxn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZnJid3pqY2dpY2pzYmp5cHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwNjczMzQsImV4cCI6MjA0ODY0MzMzNH0.khq_5oswN8MiBHv6B66_yarwbZ0IwYKV9W_Ui0HTz_M';

export const supabase = createClient<Database>(
  supabaseUrl, 
  supabaseKey,
  {
    db: {
      schema: 'public'
    },
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  }
);