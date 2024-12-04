import { Position } from "../../types/meme";

interface TextDimensions {
  width: number;
  height: number;
  fontSize: number;
  contentLength: number;
}

export function calculateTextDimensions(
  element: HTMLElement,
  container: HTMLElement,
  fontSize: number,
  content: string
): TextDimensions {
  const rect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  // Calculate dimensions as percentages of container
  const width = (rect.width / containerRect.width) * 100;
  const height = (rect.height / containerRect.height) * 100;

  return {
    width,
    height,
    fontSize,
    contentLength: content.length,
  };
}

export function clampTextPosition(
  position: Position,
  dimensions: TextDimensions
): Position {
  // Calculate boundaries with minimal padding
  const padding = 1; // 1% padding from edges
  const halfWidth = dimensions.width / 2;
  const halfHeight = dimensions.height / 2;

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
