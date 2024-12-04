export interface Position {
  x: number;
  y: number;
}

export interface TextStyle {
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

export interface TextElement {
  id: string;
  content: string;
  position: Position;
  fontSize: number;
  color: string;
  fontFamily: string;
  textAlign: "left" | "center" | "right";
  style: TextStyle;
}

export interface StickerElement {
  id: string;
  url: string;
  position: Position;
  scale: number;
  rotation: number;
}

export interface Background {
  color: string;
  pattern: string | null;
}

export interface GuideSettings {
  ruler: boolean;
  centerLines: boolean;
  grid: boolean;
}

export interface ElementSize {
  width: number;
  height: number;
  scale?: number;
}

export interface TextDimensions extends ElementSize {
  fontSize: number;
  contentLength: number;
}

export interface ContainerRect {
  width: number;
  height: number;
}
