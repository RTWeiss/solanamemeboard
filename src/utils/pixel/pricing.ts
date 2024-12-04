import { PIXEL_PRICE } from "../../config/solana";

export function calculatePixelPrice(history: any[]): number {
  const purchaseCount = history.length;
  return purchaseCount > 0
    ? history[purchaseCount - 1].price * 2 // Double the last purchase price
    : PIXEL_PRICE;
}

export function preparePixelRecords(
  selection: any,
  owner: string,
  imageUrl: string | null,
  linkUrl: string | null,
  color: string | null,
  existingPixelMap: Map<string, { id: string; price: number }>
) {
  const updateRecords = [];
  const insertRecords = [];

  for (let y = selection.startY; y <= selection.endY; y++) {
    for (let x = selection.startX; x <= selection.endX; x++) {
      const key = `${x},${y}`;
      const existing = existingPixelMap.get(key);
      const price = existing ? existing.price * 2 : PIXEL_PRICE;

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
        price,
      };

      if (existing) {
        updateRecords.push({
          id: existing.id,
          ...pixelData,
        });
      } else {
        insertRecords.push(pixelData);
      }
    }
  }

  return { updateRecords, insertRecords };
}
