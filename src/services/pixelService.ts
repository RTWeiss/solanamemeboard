import { supabase, retryOperation } from "../utils/supabase/client";
import { Pixel, GridSelection } from "../types/grid";
import { formatPixelData } from "../utils/pixel/formatter";
import { preparePixelRecords } from "../utils/pixel/records";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

export async function fetchAllPixels(): Promise<Record<string, Pixel>> {
  try {
    const [pixelsResult, historyResult] = await Promise.all([
      retryOperation(async () => {
        const { data, error } = await supabase.from("pixels").select("*");
        if (error) throw error;
        return data;
      }),
      retryOperation(async () => {
        const { data, error } = await supabase
          .from("pixel_history")
          .select("*")
          .order("created_at", { ascending: true });
        if (error) throw error;
        return data;
      }),
    ]);

    return formatPixelData(pixelsResult, historyResult);
  } catch (error) {
    console.error("Error fetching pixels:", error);
    throw new Error("Failed to load pixel data. Please try again.");
  }
}

export async function purchasePixels(
  selection: GridSelection,
  owner: string,
  imageUrl: string | null,
  linkUrl: string | null,
  color: string | null
): Promise<void> {
  const client = supabase;

  try {
    const { data: existingPixels, error: fetchError } = await retryOperation(
      async () =>
        client
          .from("pixels")
          .select("id, x, y, price")
          .or(
            `and(x.gte.${selection.startX},x.lte.${selection.endX},y.gte.${selection.startY},y.lte.${selection.endY})`
          )
    );

    if (fetchError) throw fetchError;

    const existingPixelMap = new Map(
      existingPixels?.map((p) => [
        `${p.x},${p.y}`,
        { id: p.id, price: p.price },
      ]) || []
    );

    const { updateRecords, insertRecords } = preparePixelRecords(
      selection,
      owner,
      imageUrl,
      linkUrl,
      color,
      existingPixelMap
    );

    await Promise.all([
      updateExistingPixels(client, updateRecords),
      insertNewPixels(client, insertRecords),
    ]);

    await createHistoryRecords(client, selection, owner);
  } catch (error) {
    console.error("Error in purchasePixels:", error);
    throw new Error("Failed to purchase pixels. Please try again.");
  }
}

async function updateExistingPixels(
  client: SupabaseClient<Database>,
  updateRecords: any[]
) {
  if (updateRecords.length > 0) {
    const { error } = await retryOperation(async () =>
      client.from("pixels").upsert(updateRecords)
    );

    if (error) throw error;
  }
}

async function insertNewPixels(
  client: SupabaseClient<Database>,
  insertRecords: any[]
) {
  if (insertRecords.length > 0) {
    const { error } = await retryOperation(async () =>
      client.from("pixels").insert(insertRecords)
    );

    if (error) throw error;
  }
}

async function createHistoryRecords(
  client: SupabaseClient<Database>,
  selection: GridSelection,
  owner: string
) {
  const { data: affectedPixels, error: affectedError } = await retryOperation(
    async () =>
      client
        .from("pixels")
        .select("id, price")
        .or(
          `and(x.gte.${selection.startX},x.lte.${selection.endX},y.gte.${selection.startY},y.lte.${selection.endY})`
        )
  );

  if (affectedError) throw affectedError;

  const historyRecords = affectedPixels.map((pixel) => ({
    pixel_id: pixel.id,
    owner,
    price: pixel.price,
  }));

  if (historyRecords.length > 0) {
    const { error: historyError } = await retryOperation(async () =>
      client.from("pixel_history").insert(historyRecords)
    );

    if (historyError) throw historyError;
  }
}
