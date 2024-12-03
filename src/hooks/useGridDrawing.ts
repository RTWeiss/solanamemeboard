import { useCallback } from "react";
import { useGridStore } from "../stores/useGridStore";
import { useImageLoader } from "./useImageLoader";
import { drawGridLines, drawSelection } from "../utils/grid/drawing";
import { getAreaKey } from "../utils/grid/area";

interface UseGridDrawingProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  cellSize: number;
  offset: { x: number; y: number };
  viewportSize: number;
}

export const useGridDrawing = ({
  canvasRef,
  cellSize,
  offset,
  viewportSize,
}: UseGridDrawingProps) => {
  const { loadImage } = useImageLoader();
  const { purchasedPixels, selection, getPixel } = useGridStore();

  const drawGrid = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const startX = Math.max(0, Math.floor(offset.x / cellSize) - 1);
    const startY = Math.max(0, Math.floor(offset.y / cellSize) - 1);
    const endX = Math.min(
      startX + Math.ceil(viewportSize / cellSize) + 2,
      1000
    );
    const endY = Math.min(
      startY + Math.ceil(viewportSize / cellSize) + 2,
      1000
    );

    drawGridLines(
      ctx,
      startX,
      startY,
      endX,
      endY,
      cellSize,
      viewportSize,
      offset
    );

    drawGridLines(
      ctx,
      Math.floor(startX / 10) * 10,
      Math.floor(startY / 10) * 10,
      endX,
      endY,
      cellSize * 10,
      viewportSize,
      offset,
      { strokeStyle: "rgba(79, 70, 229, 0.2)" }
    );

    const drawnAreas = new Set();

    for (let y = startY; y <= endY; y++) {
      for (let x = startX; x <= endX; x++) {
        const pixel = getPixel(x, y);
        if (pixel) {
          const areaKey = getAreaKey(pixel);
          if (!drawnAreas.has(areaKey)) {
            drawnAreas.add(areaKey);

            const screenX = pixel.startX * cellSize - offset.x;
            const screenY = pixel.startY * cellSize - offset.y;
            const width = (pixel.endX - pixel.startX + 1) * cellSize;
            const height = (pixel.endY - pixel.startY + 1) * cellSize;

            if (pixel.image) {
              try {
                const img = await loadImage(pixel.image);
                ctx.drawImage(img, screenX, screenY, width, height);
              } catch (error) {
                console.error("Failed to load image:", error);
                ctx.fillStyle = pixel.color || "#e5e7eb";
                ctx.fillRect(screenX, screenY, width, height);
              }
            } else if (pixel.color) {
              ctx.fillStyle = pixel.color;
              ctx.fillRect(screenX, screenY, width, height);
            }
          }
        }
      }
    }

    if (selection) {
      const selectionX = selection.startX * cellSize - offset.x;
      const selectionY = selection.startY * cellSize - offset.y;
      const selectionWidth = (selection.endX - selection.startX + 1) * cellSize;
      const selectionHeight =
        (selection.endY - selection.startY + 1) * cellSize;

      drawSelection(
        ctx,
        selectionX,
        selectionY,
        selectionWidth,
        selectionHeight,
        { strokeStyle: "rgba(0, 0, 0, 0.5)" }
      );
    }
  }, [
    canvasRef,
    cellSize,
    offset,
    viewportSize,
    loadImage,
    getPixel,
    selection,
  ]);

  return { drawGrid };
};
