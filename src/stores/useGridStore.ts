import { create } from "zustand";
import { Pixel, GridSelection } from "../types/grid";
import { PIXEL_PRICE } from "../config/solana";
import { fetchAllPixels } from "../services/pixelService";

interface GridStore {
  purchasedPixels: Record<string, Pixel>;
  selection: GridSelection | null;
  isLoading: boolean;
  error: string | null;
  setSelection: (selection: GridSelection | null) => void;
  updatePixels: (
    pixels: { x: number; y: number; data: Partial<Pixel> }[]
  ) => void;
  updatePixelInStore: (pixel: Pixel) => void;
  getPixelPrice: (x: number, y: number) => number;
  getPixel: (x: number, y: number) => Pixel | null;
  calculateTotalPrice: (selection: GridSelection) => {
    totalPrice: number;
    newPixels: number;
    ownedPixels: number;
    owners: Set<string>;
  };
  loadPixels: () => Promise<void>;
}

export const useGridStore = create<GridStore>((set, get) => ({
  purchasedPixels: {},
  selection: null,
  isLoading: false,
  error: null,

  setSelection: (selection) => set({ selection }),

  updatePixels: (updates) =>
    set((state) => {
      const newPurchasedPixels = { ...state.purchasedPixels };

      updates.forEach(({ x, y, data }) => {
        const key = `${x},${y}`;
        const existingPixel = state.purchasedPixels[key];

        if (data.owner) {
          newPurchasedPixels[key] = {
            ...existingPixel,
            ...data,
            x,
            y,
          } as Pixel;
        }
      });

      return { purchasedPixels: newPurchasedPixels };
    }),

  updatePixelInStore: (pixel) =>
    set((state) => {
      const key = `${pixel.x},${pixel.y}`;
      return {
        purchasedPixels: {
          ...state.purchasedPixels,
          [key]: pixel,
        },
      };
    }),

  getPixelPrice: (x: number, y: number) => {
    const pixel = get().purchasedPixels[`${x},${y}`];
    return pixel ? pixel.currentPrice : PIXEL_PRICE;
  },

  getPixel: (x: number, y: number) => {
    return get().purchasedPixels[`${x},${y}`] || null;
  },

  calculateTotalPrice: (selection) => {
    let totalPrice = 0;
    let newPixels = 0;
    let ownedPixels = 0;
    const owners = new Set<string>();

    for (let y = selection.startY; y <= selection.endY; y++) {
      for (let x = selection.startX; x <= selection.endX; x++) {
        const pixel = get().getPixel(x, y);
        if (pixel) {
          ownedPixels++;
          totalPrice += pixel.currentPrice;
          if (pixel.owner) {
            owners.add(pixel.owner);
          }
        } else {
          newPixels++;
          totalPrice += PIXEL_PRICE;
        }
      }
    }

    return {
      totalPrice,
      newPixels,
      ownedPixels,
      owners,
    };
  },

  loadPixels: async () => {
    set({ isLoading: true, error: null });
    try {
      const pixels = await fetchAllPixels();
      set({ purchasedPixels: pixels, isLoading: false });
    } catch (error) {
      set({ error: "Failed to load pixels", isLoading: false });
      console.error("Error loading pixels:", error);
    }
  },
}));
