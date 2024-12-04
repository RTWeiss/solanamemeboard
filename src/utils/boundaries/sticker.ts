import { ElementSize } from "../../types/meme";

export function constrainStickerScale(
  scale: number,
  elementSize: ElementSize
): number {
  const minScale = 0.1;
  const maxScale = 5.0;

  // Calculate maximum allowed scale to prevent overflow
  const maxWidthScale = 100 / elementSize.width;
  const maxHeightScale = 100 / elementSize.height;
  const maxAllowedScale = Math.min(maxWidthScale, maxHeightScale, maxScale);

  return Math.max(minScale, Math.min(maxAllowedScale, scale));
}

export function calculateStickerSize(
  element: HTMLElement,
  container: HTMLElement
): ElementSize {
  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  // Get base dimensions without scale
  const transform = element.style.transform || "";
  const scaleMatch = transform.match(/scale\(([\d.]+)\)/);
  const currentScale = scaleMatch ? parseFloat(scaleMatch[1]) : 1;

  // Calculate unscaled dimensions as percentage of container
  const width = (elementRect.width / currentScale / containerRect.width) * 100;
  const height =
    (elementRect.height / currentScale / containerRect.height) * 100;

  return {
    width,
    height,
    scale: currentScale,
  };
}
