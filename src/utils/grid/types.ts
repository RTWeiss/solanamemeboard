export interface GridPosition {
  x: number;
  y: number;
}

export interface GridOffset {
  x: number;
  y: number;
}

export interface GridDimensions {
  width: number;
  height: number;
}

export interface GridDrawOptions {
  strokeStyle?: string;
  fillStyle?: string;
  lineWidth?: number;
}

export interface GridRenderContext {
  ctx: CanvasRenderingContext2D;
  cellSize: number;
  offset: GridOffset;
  viewportSize: number;
}
