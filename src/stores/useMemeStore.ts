import { create } from "zustand";
import {
  Position,
  TextElement,
  StickerElement,
  Background,
  GuideSettings,
} from "../types/meme";

interface MemeState {
  image: string | null;
  texts: TextElement[];
  stickers: StickerElement[];
  background: Background;
  showGuides: GuideSettings;
  selectedElement: string | null;
  setImage: (url: string | null) => void;
  addText: (text: Partial<TextElement>) => void;
  updateText: (id: string, updates: Partial<TextElement>) => void;
  removeText: (id: string) => void;
  addSticker: (sticker: Partial<StickerElement>) => void;
  updateSticker: (id: string, updates: Partial<StickerElement>) => void;
  removeSticker: (id: string) => void;
  setBackground: (updates: Partial<Background>) => void;
  updateElementPosition: (
    id: string,
    type: "text" | "sticker",
    position: Position
  ) => void;
  setSelectedElement: (id: string | null) => void;
  resetMeme: () => void;
}

const defaultTextStyle = {
  bold: false,
  italic: false,
  underline: false,
};

const initialState = {
  image: null,
  texts: [],
  stickers: [],
  background: {
    color: "#ffffff",
    pattern: null,
  },
  showGuides: {
    ruler: false,
    centerLines: true,
    grid: false,
  },
  selectedElement: null,
};

export const useMemeStore = create<MemeState>((set) => ({
  ...initialState,

  setImage: (url) => set({ image: url }),

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
          style: { ...defaultTextStyle },
          ...text,
        },
      ],
    })),

  updateText: (id, updates) =>
    set((state) => ({
      texts: state.texts.map((text) =>
        text.id === id ? { ...text, ...updates } : text
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

  setBackground: (updates) =>
    set((state) => ({
      background: { ...state.background, ...updates },
    })),

  updateElementPosition: (id, type, position) =>
    set((state) => {
      if (type === "text") {
        return {
          texts: state.texts.map((text) =>
            text.id === id ? { ...text, position } : text
          ),
        };
      } else {
        return {
          stickers: state.stickers.map((sticker) =>
            sticker.id === id ? { ...sticker, position } : sticker
          ),
        };
      }
    }),

  setSelectedElement: (id) => set({ selectedElement: id }),

  resetMeme: () => set(initialState),
}));
