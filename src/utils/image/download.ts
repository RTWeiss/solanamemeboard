import { toPng } from "html-to-image";
import { DownloadOptions } from "./types";

export async function downloadImage(
  element: HTMLElement,
  options: DownloadOptions = {}
): Promise<void> {
  const {
    quality = 0.95,
    pixelRatio = 2,
    cacheBust = true,
    filename = "image.png",
  } = options;

  try {
    const dataUrl = await toPng(element, {
      quality,
      pixelRatio,
      cacheBust,
      style: {
        // Ensure proper rendering on mobile
        transform: "none",
        "transform-origin": "0 0",
      },
    });

    // For mobile Safari compatibility
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      const blob = await fetch(dataUrl).then((res) => res.blob());
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = dataUrl;
      a.download = filename;

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
    }
  } catch (error) {
    console.error("Download error:", error);
    throw new Error("Failed to download image");
  }
}
