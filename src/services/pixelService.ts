import { supabase } from '../config/supabase';
import { Pixel, GridSelection } from '../types/grid';
import { PIXEL_PRICE } from '../config/solana';

export async function fetchAllPixels(): Promise<Record<string, Pixel>> {
  try {
    // First fetch all pixels
    const { data: pixels, error: pixelsError } = await supabase
      .from('pixels')
      .select('*');

    if (pixelsError) throw pixelsError;

    // Then fetch all history records
    const { data: history, error: historyError } = await supabase
      .from('pixel_history')
      .select('*')
      .order('created_at', { ascending: true });

    if (historyError) throw historyError;

    const pixelMap: Record<string, Pixel> = {};

    pixels?.forEach((pixel: any) => {
      const key = `${pixel.x},${pixel.y}`;
      const pixelHistory = history?.filter(h => h.pixel_id === pixel.id) || [];
      
      // Calculate current price based on purchase history
      const purchaseCount = pixelHistory.length;
      const currentPrice = purchaseCount > 0 
        ? pixelHistory[purchaseCount - 1].price * 2 // Double the last purchase price
        : PIXEL_PRICE;

      pixelMap[key] = {
        x: pixel.x,
        y: pixel.y,
        owner: pixel.owner,
        image: pixel.image_url,
        link: pixel.link_url,
        color: pixel.color,
        startX: pixel.start_x,
        startY: pixel.start_y,
        endX: pixel.end_x,
        endY: pixel.end_y,
        currentPrice: currentPrice,
        history: pixelHistory.map(h => ({
          owner: h.owner,
          price: h.price,
          timestamp: new Date(h.created_at).getTime(),
        })),
      };
    });

    return pixelMap;
  } catch (error) {
    console.error('Error fetching pixels:', error);
    throw error;
  }
}

export async function purchasePixels(
  selection: GridSelection,
  owner: string,
  imageUrl: string | null,
  linkUrl: string | null,
  color: string | null,
  totalPrice: number
): Promise<void> {
  const client = supabase;
  
  try {
    // Start a transaction
    const { data: existingPixels, error: fetchError } = await client
      .from('pixels')
      .select('id, x, y, price')
      .or(`and(x.gte.${selection.startX},x.lte.${selection.endX},y.gte.${selection.startY},y.lte.${selection.endY})`);

    if (fetchError) throw fetchError;

    // Create a map of existing pixels
    const existingPixelMap = new Map(
      existingPixels?.map(p => [`${p.x},${p.y}`, { id: p.id, price: p.price }]) || []
    );

    // Prepare update and insert records
    const updateRecords = [];
    const insertRecords = [];

    for (let y = selection.startY; y <= selection.endY; y++) {
      for (let x = selection.startX; x <= selection.endX; x++) {
        const key = `${x},${y}`;
        const existing = existingPixelMap.get(key);
        
        // Calculate price for this pixel
        const price = existing 
          ? existing.price * 2 // Double the previous price for existing pixels
          : PIXEL_PRICE; // Base price for new pixels

        const pixelData = {
          x,
          y,
          owner,
          image_url: imageUrl,
          link_url: linkUrl,
          color,
          start_x: selection.startX,
          start_y: selection.startY,
          end_x: selection.endX,
          end_y: selection.endY,
          price: price
        };

        if (existing) {
          updateRecords.push({
            id: existing.id,
            ...pixelData
          });
        } else {
          insertRecords.push(pixelData);
        }
      }
    }

    // Perform updates first
    if (updateRecords.length > 0) {
      const { error: updateError } = await client
        .from('pixels')
        .upsert(updateRecords);

      if (updateError) throw updateError;
    }

    // Then perform inserts
    if (insertRecords.length > 0) {
      const { error: insertError } = await client
        .from('pixels')
        .insert(insertRecords);

      if (insertError) throw insertError;
    }

    // Get all affected pixels for history records
    const { data: allAffectedPixels, error: affectedError } = await client
      .from('pixels')
      .select('id, price')
      .or(`and(x.gte.${selection.startX},x.lte.${selection.endX},y.gte.${selection.startY},y.lte.${selection.endY})`);

    if (affectedError) throw affectedError;

    // Create history records
    const historyRecords = allAffectedPixels.map(pixel => ({
      pixel_id: pixel.id,
      owner,
      price: pixel.price // Use the actual price paid for each pixel
    }));

    if (historyRecords.length > 0) {
      const { error: historyError } = await client
        .from('pixel_history')
        .insert(historyRecords);

      if (historyError) throw historyError;
    }
  } catch (error) {
    console.error('Error in purchasePixels:', error);
    throw error;
  }
}