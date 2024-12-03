import { Pixel } from "../types/grid";

export function sortPixelsByLatestActivity(
  pixels: Record<string, Pixel>
): Pixel[] {
  return Object.values(pixels)
    .filter((pixel) => pixel.history.length > 0)
    .sort((a, b) => {
      const aTimestamp = a.history[a.history.length - 1].timestamp;
      const bTimestamp = b.history[b.history.length - 1].timestamp;
      return bTimestamp - aTimestamp;
    })
    .slice(0, 50); // Show only the 50 most recent activities
}
