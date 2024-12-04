import { Position, TextDimensions } from "../../types/meme";
import { CANVAS_CONFIG } from "./core";

export function calculateTextDimensions(
  element: HTMLElement,
  container: HTMLElement,
  fontSize: number,
  content: string
): TextDimensions {
  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  // Calculate dimensions as percentages of container
  const width = 100 - 2 * CANVAS_CONFIG.padding; // Use full width minus padding
  const height = (elementRect.height / containerRect.height) * 100;

  return {
    width,
    height,
    fontSize,
    contentLength: content.length,
    scale: 1,
  };
}

export function clampTextPosition(
  position: Position,
  dimensions: TextDimensions
): Position {
  const padding = CANVAS_CONFIG.padding;
  const halfHeight = dimensions.height / 2;

  return {
    x: Math.max(padding, Math.min(100 - padding, position.x)),
    y: Math.max(
      padding + halfHeight,
      Math.min(100 - padding - halfHeight, position.y)
    ),
  };
}
