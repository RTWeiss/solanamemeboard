import { Pixel } from "../../types/grid";
import { GridDrawOptions, GridOffset } from "./types";

export function drawGridLines(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  cellSize: number,
  viewportSize: number,
  offset: GridOffset,
  options: GridDrawOptions = {}
) {
  const { strokeStyle = "rgba(79, 70, 229, 0.1)", lineWidth = 1 } = options;

  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;

  // Draw vertical lines
  for (let x = startX; x <= endX; x++) {
    const screenX = x * cellSize - offset.x;
    ctx.beginPath();
    ctx.moveTo(screenX, 0);
    ctx.lineTo(screenX, viewportSize);
    ctx.stroke();
  }

  // Draw horizontal lines
  for (let y = startY; y <= endY; y++) {
    const screenY = y * cellSize - offset.y;
    ctx.beginPath();
    ctx.moveTo(0, screenY);
    ctx.lineTo(viewportSize, screenY);
    ctx.stroke();
  }
}

export function drawSelection(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  options: GridDrawOptions = {}
) {
  const {
    fillStyle = "rgba(79, 70, 229, 0.1)",
    strokeStyle = "#4f46e5",
    lineWidth = 2,
  } = options;

  // Draw selection background
  ctx.fillStyle = fillStyle;
  ctx.fillRect(x, y, width, height);

  // Draw selection border
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.strokeRect(x, y, width, height);

  // Add selection corners
  const cornerSize = 4;
  ctx.fillStyle = strokeStyle;

  // Top-left corner
  ctx.fillRect(x - cornerSize / 2, y - cornerSize / 2, cornerSize, cornerSize);
  // Top-right corner
  ctx.fillRect(
    x + width - cornerSize / 2,
    y - cornerSize / 2,
    cornerSize,
    cornerSize
  );
  // Bottom-left corner
  ctx.fillRect(
    x - cornerSize / 2,
    y + height - cornerSize / 2,
    cornerSize,
    cornerSize
  );
  // Bottom-right corner
  ctx.fillRect(
    x + width - cornerSize / 2,
    y + height - cornerSize / 2,
    cornerSize,
    cornerSize
  );
}

export function drawPixel(
  pixel: Pixel,
  ctx: CanvasRenderingContext2D,
  cellSize: number,
  offset: GridOffset
) {
  const screenX = pixel.startX * cellSize - offset.x;
  const screenY = pixel.startY * cellSize - offset.y;
  const width = (pixel.endX - pixel.startX + 1) * cellSize;
  const height = (pixel.endY - pixel.startY + 1) * cellSize;

  if (pixel.color) {
    ctx.fillStyle = pixel.color;
    ctx.fillRect(screenX, screenY, width, height);
  }

  // Add subtle border
  ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
  ctx.strokeRect(screenX, screenY, width, height);
}
