import React from "react";
import { X } from "lucide-react";

interface ShareButtonProps {
  pixelCoords?: { x: number; y: number };
  customText?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  pixelCoords,
  customText,
}) => {
  const baseUrl = window.location.origin;
  const defaultText = "Check out my pixel art on Solana Memegrid! 🎨";

  const shareText = customText || defaultText;
  const shareUrl = pixelCoords
    ? `${baseUrl}?x=${pixelCoords.x}&y=${pixelCoords.y}`
    : baseUrl;

  const handleShare = () => {
    const tweetText = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
    window.open(
      `https://twitter.com/intent/tweet?text=${tweetText}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
      aria-label="Share on X"
    >
      <X className="h-4 w-4" />
      <span>Share on X</span>
    </button>
  );
};
