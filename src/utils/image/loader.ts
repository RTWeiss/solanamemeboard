import { ImageLoadError } from "./types";

export async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new ImageLoadError(`Failed to load image: ${url}`));

    img.src = url;
  });
}

export async function preloadImages(
  urls: string[],
  onProgress?: (loaded: number, total: number) => void
): Promise<void> {
  const total = urls.length;
  let loaded = 0;

  try {
    await Promise.all(
      urls.map(async (url) => {
        await loadImage(url);
        loaded++;
        onProgress?.(loaded, total);
      })
    );
  } catch (error) {
    console.error("Image preload error:", error);
    throw new ImageLoadError("Failed to preload all images");
  }
}
