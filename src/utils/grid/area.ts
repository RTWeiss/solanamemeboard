import { Pixel, PixelCoordinates } from "../../types/grid";
import { GridPosition } from "./types";

export function getAreaKey({
  startX,
  startY,
  endX,
  endY,
}: PixelCoordinates): string {
  return `${startX},${startY},${endX},${endY}`;
}

export function isPixelInArea(
  position: GridPosition,
  pixel: PixelCoordinates
): boolean {
  return (
    position.x >= pixel.startX &&
    position.x <= pixel.endX &&
    position.y >= pixel.startY &&
    position.y <= pixel.endY
  );
}

export function calculateArea({
  startX,
  startY,
  endX,
  endY,
}: PixelCoordinates): number {
  return (endX - startX + 1) * (endY - startY + 1);
}

export function getVisibleRange(
  cellSize: number,
  viewportSize: number,
  offset: { x: number; y: number }
) {
  return {
    startX: Math.max(0, Math.floor(offset.x / cellSize) - 1),
    startY: Math.max(0, Math.floor(offset.y / cellSize) - 1),
    endX: Math.min(
      Math.floor(offset.x / cellSize) + Math.ceil(viewportSize / cellSize) + 2,
      1000
    ),
    endY: Math.min(
      Math.floor(offset.y / cellSize) + Math.ceil(viewportSize / cellSize) + 2,
      1000
    ),
  };
}
