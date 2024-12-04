import { Position, ElementSize } from "../../types/meme";

export const CANVAS_CONFIG = {
  width: 800,
  height: 800,
  padding: 1,
  maxScale: 5.0,
  minScale: 0.1,
  gridSize: 5,
  centerThreshold: 2,
};

export function getCanvasConfig() {
  return {
    width: CANVAS_CONFIG.width,
    height: CANVAS_CONFIG.height,
    maxWidth: CANVAS_CONFIG.width,
    aspectRatio: CANVAS_CONFIG.height / CANVAS_CONFIG.width,
    style: {
      width: "100%",
      maxWidth: `${CANVAS_CONFIG.width}px`,
      aspectRatio: "1/1",
    },
  };
}

export function calculateElementPosition(
  clientX: number,
  clientY: number,
  container: HTMLElement
): Position {
  const rect = container.getBoundingClientRect();
  return {
    x: ((clientX - rect.left) / rect.width) * 100,
    y: ((clientY - rect.top) / rect.height) * 100,
  };
}

export function calculateElementSize(
  element: HTMLElement,
  container: HTMLElement
): ElementSize {
  const elementRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const transform = window.getComputedStyle(element).transform;
  const matrix = new DOMMatrix(transform);
  const scale = Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b);

  return {
    width: ((elementRect.width / containerRect.width) * 100) / scale,
    height: ((elementRect.height / containerRect.height) * 100) / scale,
    scale,
  };
}

export function constrainPosition(
  position: Position,
  size: ElementSize
): Position {
  const padding = CANVAS_CONFIG.padding;
  const scale = size.scale || 1;
  const halfWidth = (size.width * scale) / 2;
  const halfHeight = (size.height * scale) / 2;

  return {
    x: Math.max(
      padding + halfWidth,
      Math.min(100 - padding - halfWidth, position.x)
    ),
    y: Math.max(
      padding + halfHeight,
      Math.min(100 - padding - halfHeight, position.y)
    ),
  };
}
