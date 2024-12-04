export class ImageLoadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImageLoadError";
  }
}

export interface DownloadOptions {
  quality?: number;
  pixelRatio?: number;
  cacheBust?: boolean;
  filename?: string;
}
