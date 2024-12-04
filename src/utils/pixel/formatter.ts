import { Pixel } from "../../types/grid";
import { calculatePixelPrice } from "./pricing";

export function formatPixelData(
  pixels: any[],
  history: any[]
): Record<string, Pixel> {
  const pixelMap: Record<string, Pixel> = {};

  pixels?.forEach((pixel: any) => {
    const key = `${pixel.x},${pixel.y}`;
    const pixelHistory = history?.filter((h) => h.pixel_id === pixel.id) || [];
    const currentPrice = calculatePixelPrice(pixelHistory);

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
      currentPrice,
      history: pixelHistory.map((h) => ({
        owner: h.owner,
        price: h.price,
        timestamp: new Date(h.created_at).getTime(),
      })),
    };
  });

  return pixelMap;
}
