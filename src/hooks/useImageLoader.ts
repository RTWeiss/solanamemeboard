import { useCallback, useRef } from "react";

export class ImageLoadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImageLoadError";
  }
}

export const useImageLoader = () => {
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());

  const loadImage = useCallback((url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const cachedImage = imageCache.current.get(url);
      if (cachedImage?.complete && cachedImage.naturalWidth !== 0) {
        resolve(cachedImage);
        return;
      }

      const img = new Image();

      img.onload = () => {
        imageCache.current.set(url, img);
        resolve(img);
      };

      img.onerror = () => {
        imageCache.current.delete(url);
        reject(new ImageLoadError(`Failed to load image: ${url}`));
      };

      if (!url.startsWith("data:")) {
        img.crossOrigin = "anonymous";
      }

      img.src = url;
    });
  }, []);

  return { loadImage };
};
