import { supabase, retryOperation } from "./supabase/client";

export async function initializeDatabase() {
  try {
    const { error } = await retryOperation(async () =>
      supabase.from("pixels").select("id").limit(1)
    );

    if (error) {
      if (!error.message.includes('relation "public.pixels" does not exist')) {
        throw error;
      }

      console.warn(
        "Tables not found. Please create them through the Supabase dashboard using the schema.sql file."
      );
      return false;
    }

    console.log("Database connection verified successfully");
    return true;
  } catch (error) {
    console.error("Database initialization error:", error);
    throw new Error(
      "Failed to initialize database connection. Please try again."
    );
  }
}
