import React from "react";
import { useMemeStore } from "../../../stores/useMemeStore";
import { Sticker } from "lucide-react";

const STICKER_CATEGORIES = {
  Expressions: [
    {
      name: "Joy",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f602.svg",
    },
    {
      name: "Think",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f914.svg",
    },
    {
      name: "Rolling Eyes",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f644.svg",
    },
    {
      name: "Smirk",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f60f.svg",
    },
    {
      name: "Mind Blown",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f92f.svg",
    },
    {
      name: "Star Eyes",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f929.svg",
    },
  ],
  "Cool & Attitude": [
    {
      name: "Sunglasses",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f60e.svg",
    },
    {
      name: "Cowboy",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f920.svg",
    },
    {
      name: "Nerd",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f913.svg",
    },
    {
      name: "Crown",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f451.svg",
    },
    {
      name: "Monocle",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f9d0.svg",
    },
    {
      name: "Shush",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f92b.svg",
    },
  ],
  Reactions: [
    {
      name: "Heart Eyes",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f60d.svg",
    },
    {
      name: "Exploding",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f92f.svg",
    },
    {
      name: "Shocked",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f632.svg",
    },
    {
      name: "Rage",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f621.svg",
    },
    {
      name: "Pleading",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f97a.svg",
    },
    {
      name: "Clown",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f921.svg",
    },
  ],
  "Meme Classics": [
    {
      name: "Skull",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f480.svg",
    },
    {
      name: "Fire",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f525.svg",
    },
    {
      name: "100",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f4af.svg",
    },
    {
      name: "Eyes",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f440.svg",
    },
    {
      name: "Alien",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f47d.svg",
    },
    {
      name: "Poop",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f4a9.svg",
    },
  ],
  "Money & Success": [
    {
      name: "Money Bag",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f4b0.svg",
    },
    {
      name: "Money Face",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f911.svg",
    },
    {
      name: "Rich",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f4b8.svg",
    },
    {
      name: "Chart Up",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f4c8.svg",
    },
    {
      name: "Trophy",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f3c6.svg",
    },
    {
      name: "Rocket",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f680.svg",
    },
  ],
  Effects: [
    {
      name: "Sparkles",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/2728.svg",
    },
    {
      name: "Star",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/2b50.svg",
    },
    {
      name: "Boom",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f4a5.svg",
    },
    {
      name: "Lightning",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/26a1.svg",
    },
    {
      name: "Wave",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f44b.svg",
    },
    {
      name: "Party",
      url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f389.svg",
    },
  ],
} as const;

type StickerCategory = keyof typeof STICKER_CATEGORIES;

export const StickerPicker: React.FC = () => {
  const { addSticker } = useMemeStore();
  const [loadedStickers, setLoadedStickers] = React.useState<Set<string>>(
    new Set()
  );
  const [selectedCategory, setSelectedCategory] =
    React.useState<StickerCategory>(
      "Expressions" // Default category
    );

  const handleAddSticker = (url: string) => {
    addSticker({
      url,
      position: { x: 50, y: 50 },
      scale: 1,
      rotation: 0,
    });
  };

  const handleImageLoad = (url: string) => {
    setLoadedStickers((prev) => new Set([...prev, url]));
  };

  return (
    <div className="space-y-4">
      {/* Category Selector */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(STICKER_CATEGORIES).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category as StickerCategory)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-secondary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Sticker Grid */}
      <div className="grid grid-cols-3 gap-3 p-2 bg-gray-50 rounded-lg">
        {STICKER_CATEGORIES[selectedCategory].map((sticker) => (
          <button
            key={sticker.name}
            onClick={() => handleAddSticker(sticker.url)}
            className={`aspect-square p-3 border rounded-lg transition-all bg-white group hover:shadow-md flex items-center justify-center ${
              loadedStickers.has(sticker.url)
                ? "hover:border-secondary hover:scale-105"
                : "opacity-50"
            }`}
            title={sticker.name}
          >
            <img
              src={sticker.url}
              alt={sticker.name}
              className="w-12 h-12 object-contain transition-transform group-hover:scale-110"
              loading="lazy"
              onLoad={() => handleImageLoad(sticker.url)}
              onError={(e) => {
                console.error(`Failed to load sticker: ${sticker.name}`);
                const img = e.target as HTMLImageElement;
                img.style.display = "none";
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
