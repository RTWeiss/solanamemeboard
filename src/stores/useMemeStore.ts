import { create } from "zustand";

interface Position {
  x: number;
  y: number;
}

interface TextStyle {
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

interface TextElement {
  id: string;
  content: string;
  position: Position;
  fontSize: number;
  color: string;
  fontFamily: string;
  textAlign: "left" | "center" | "right";
  style: TextStyle;
}

interface StickerElement {
  id: string;
  url: string;
  position: Position;
  scale: number;
  rotation: number;
}

interface Background {
  color: string;
  pattern: string | null;
}

interface MemeState {
  image: string | null;
  texts: TextElement[];
  stickers: StickerElement[];
  background: Background;
  selectedElement: string | null;
  addText: (text: Partial<TextElement>) => void;
  updateText: (id: string, updates: Partial<TextElement>) => void;
  removeText: (id: string) => void;
  addSticker: (sticker: Partial<StickerElement>) => void;
  updateSticker: (id: string, updates: Partial<StickerElement>) => void;
  removeSticker: (id: string) => void;
  setImage: (url: string | null) => void;
  setBackground: (updates: Partial<Background>) => void;
  updateElementPosition: (
    id: string,
    type: "text" | "sticker",
    delta: Position
  ) => void;
  setSelectedElement: (id: string | null) => void;
  resetMeme: () => void;
}

const initialState: Omit<
  MemeState,
  | "addText"
  | "updateText"
  | "removeText"
  | "addSticker"
  | "updateSticker"
  | "removeSticker"
  | "setImage"
  | "setBackground"
  | "updateElementPosition"
  | "setSelectedElement"
  | "resetMeme"
> = {
  image: null,
  texts: [],
  stickers: [],
  background: {
    color: "#ffffff",
    pattern: null,
  },
  selectedElement: null,
};

const defaultTextStyle: TextStyle = {
  bold: false,
  italic: false,
  underline: false,
};

const clampPosition = (position: Position): Position => ({
  x: Math.max(0, Math.min(100, position.x)),
  y: Math.max(0, Math.min(100, position.y)),
});

export const useMemeStore = create<MemeState>((set) => ({
  ...initialState,

  addText: (text) =>
    set((state) => ({
      texts: [
        ...state.texts,
        {
          id: `text-${Date.now()}`,
          content: "",
          position: { x: 50, y: 50 },
          fontSize: 24,
          color: "#000000",
          fontFamily: "Arial",
          textAlign: "center",
          style: { ...defaultTextStyle, ...(text.style || {}) },
          ...text,
        },
      ],
    })),

  updateText: (id, updates) =>
    set((state) => ({
      texts: state.texts.map((text) =>
        text.id === id
          ? {
              ...text,
              ...updates,
              style: updates.style
                ? { ...text.style, ...updates.style }
                : text.style,
            }
          : text
      ),
    })),

  removeText: (id) =>
    set((state) => ({
      texts: state.texts.filter((text) => text.id !== id),
    })),

  addSticker: (sticker) =>
    set((state) => ({
      stickers: [
        ...state.stickers,
        {
          id: `sticker-${Date.now()}`,
          url: "",
          position: { x: 50, y: 50 },
          scale: 1,
          rotation: 0,
          ...sticker,
        },
      ],
    })),

  updateSticker: (id, updates) =>
    set((state) => ({
      stickers: state.stickers.map((sticker) =>
        sticker.id === id ? { ...sticker, ...updates } : sticker
      ),
    })),

  removeSticker: (id) =>
    set((state) => ({
      stickers: state.stickers.filter((sticker) => sticker.id !== id),
    })),

  setImage: (url) => set({ image: url }),

  setBackground: (updates) =>
    set((state) => ({
      background: { ...state.background, ...updates },
    })),

  updateElementPosition: (id, type, delta) =>
    set((state) => {
      const updatePosition = (elements: any[]) =>
        elements.map((element) =>
          element.id === id
            ? {
                ...element,
                position: clampPosition({
                  x: element.position.x + delta.x,
                  y: element.position.y + delta.y,
                }),
              }
            : element
        );

      return type === "text"
        ? { texts: updatePosition(state.texts) }
        : { stickers: updatePosition(state.stickers) };
    }),

  setSelectedElement: (id) => set({ selectedElement: id }),

  resetMeme: () => set(() => ({ ...initialState })),
}));
