import { supabase, retryOperation } from "./client";
import { Database } from "../../types/supabase";
import { DatabaseError } from "./errors";

export async function verifyTableExists(
  tableName: keyof Database["public"]["Tables"]
) {
  try {
    const { error } = await retryOperation(async () =>
      supabase.from(tableName).select("id").limit(1)
    );

    if (error) {
      if (error.message.includes("relation")) {
        return false;
      }
      throw new DatabaseError(`Failed to verify table ${tableName}`, error);
    }

    return true;
  } catch (error) {
    throw new DatabaseError("Database verification failed", error);
  }
}
