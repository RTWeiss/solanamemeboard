import { GridSelection } from "../../types/grid";
import { PIXEL_PRICE } from "../../config/solana";

interface PixelRecord {
  x: number;
  y: number;
  owner: string;
  image_url: string | null;
  link_url: string | null;
  color: string | null;
  start_x: number;
  start_y: number;
  end_x: number;
  end_y: number;
  price: number;
}

interface ExistingPixel {
  id: string;
  price: number;
}

interface PreparePixelRecordsResult {
  updateRecords: (PixelRecord & { id: string })[];
  insertRecords: PixelRecord[];
}

export function preparePixelRecords(
  selection: GridSelection,
  owner: string,
  imageUrl: string | null,
  linkUrl: string | null,
  color: string | null,
  existingPixelMap: Map<string, ExistingPixel>
): PreparePixelRecordsResult {
  const updateRecords: (PixelRecord & { id: string })[] = [];
  const insertRecords: PixelRecord[] = [];

  for (let y = selection.startY; y <= selection.endY; y++) {
    for (let x = selection.startX; x <= selection.endX; x++) {
      const key = `${x},${y}`;
      const existing = existingPixelMap.get(key);
      const price = existing ? existing.price * 2 : PIXEL_PRICE;

      const pixelData: PixelRecord = {
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
