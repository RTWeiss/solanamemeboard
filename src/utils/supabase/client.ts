import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../types/supabase";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const supabaseUrl = "https://yafrbwzjcgicjsbjypxn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZnJid3pqY2dpY2pzYmp5cHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwNjczMzQsImV4cCI6MjA0ODY0MzMzNH0.khq_5oswN8MiBHv6B66_yarwbZ0IwYKV9W_Ui0HTz_M";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      "Content-Type": "application/json",
    },
  },
});

export async function retryOperation<T>(
  operation: () => Promise<T>,
  retries = MAX_RETRIES,
  delay = RETRY_DELAY
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryOperation(operation, retries - 1, delay * 2);
    }
    throw error;
  }
}
