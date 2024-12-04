import React, { useRef, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Download, X, Loader2, AlertCircle } from "lucide-react";
import { useMemeStore } from "../../stores/useMemeStore";
import { purchasePixels } from "../../utils/solana/transaction";
import { useConnection } from "@solana/wallet-adapter-react";
import { preloadImages } from "../../utils/image/loader";
import { downloadImage } from "../../utils/image/download";
import { ImageLoadError } from "../../utils/image/types";

interface MemePreviewProps {
  onClose: () => void;
}

export const MemePreview: React.FC<MemePreviewProps> = ({ onClose }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { connection } = useConnection();
  const wallet = useWallet();
  const { image, texts, stickers, background } = useMemeStore();

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getTextStyle = (text: (typeof texts)[0]): React.CSSProperties => ({
    position: "absolute",
    left: `${text.position.x}%`,
    top: `${text.position.y}%`,
    transform: "translate(-50%, -50%)",
    fontSize: `${text.fontSize}px`,
    color: text.color,
    fontFamily: text.fontFamily,
    textAlign: text.textAlign,
    textShadow: "2px 2px 2px rgba(0,0,0,0.3)",
    padding: "4px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    maxWidth: "80%",
    width: text.textAlign === "center" ? "80%" : "auto",
    fontWeight: text.style.bold ? "bold" : "normal",
    fontStyle: text.style.italic ? "italic" : "normal",
    textDecoration: text.style.underline ? "underline" : "none",
  });

  const getStickerStyle = (
    sticker: (typeof stickers)[0]
  ): React.CSSProperties => ({
    position: "absolute",
    left: `${sticker.position.x}%`,
    top: `${sticker.position.y}%`,
    transform: `translate(-50%, -50%) scale(${sticker.scale}) rotate(${sticker.rotation}deg)`,
    width: "120px",
    height: "120px",
  });

  const collectImages = () => {
    const images: string[] = [];

    if (image) images.push(image);
    stickers.forEach((sticker) => images.push(sticker.url));
    if (background.pattern) images.push(background.pattern);

    return images;
  };

  const downloadMeme = async (includeBranding: boolean) => {
    if (!previewRef.current) return;

    try {
      setIsDownloading(true);
      setError(null);
      setLoadingStatus("Loading assets...");

      // Preload all images
      const images = collectImages();
      await preloadImages(images, (loaded, total) => {
        setLoadingStatus(`Loading assets (${loaded}/${total})...`);
      });

      setLoadingStatus("Processing payment...");
      if (!includeBranding && wallet.connected) {
        const result = await purchasePixels(
          connection,
          wallet,
          { startX: 0, startY: 0, endX: 0, endY: 0 },
          0.001
        );

        if (!result.success) {
          throw new Error("Payment failed");
        }
      }

      setLoadingStatus("Generating meme...");
      if (includeBranding && previewRef.current) {
        const brandingDiv = document.createElement("div");
        brandingDiv.className =
          "absolute bottom-4 right-4 text-white text-sm font-bold";
        brandingDiv.textContent = "MemeGrid.co";
        previewRef.current.appendChild(brandingDiv);
      }

      await downloadImage(previewRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        cacheBust: true,
        filename: "meme.png",
      });

      if (includeBranding && previewRef.current.lastChild) {
        previewRef.current.removeChild(previewRef.current.lastChild);
      }
    } catch (error) {
      console.error("Error generating meme:", error);
      setError(
        error instanceof ImageLoadError
          ? "Failed to load images. Please try again."
          : "Failed to generate meme. Please try again."
      );
    } finally {
      setIsDownloading(false);
      setLoadingStatus("");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      onClick={handleModalClick}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Preview Your Meme</h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          <div
            ref={previewRef}
            className="relative w-full aspect-square rounded-lg overflow-hidden"
            style={{
              backgroundColor: background.color,
              backgroundImage: background.pattern
                ? `url(${background.pattern})`
                : "none",
            }}
          >
            {image && (
              <img
                src={image}
                alt="Meme preview"
                className="absolute inset-0 w-full h-full object-contain"
                crossOrigin="anonymous"
              />
            )}
            {texts.map((text) => (
              <div key={text.id} style={getTextStyle(text)}>
                {text.content}
              </div>
            ))}
            {stickers.map((sticker) => (
              <div key={sticker.id} style={getStickerStyle(sticker)}>
                <img
                  src={sticker.url}
                  alt="Sticker"
                  className="w-full h-full object-contain"
                  crossOrigin="anonymous"
                />
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {isDownloading ? (
              <div className="flex items-center justify-center gap-2 p-4 text-gray-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{loadingStatus}</span>
              </div>
            ) : (
              <>
                <button
                  onClick={() => downloadMeme(true)}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-light disabled:opacity-50"
                >
                  <Download className="w-5 h-5" />
                  Download Free (with watermark)
                </button>

                {wallet.connected ? (
                  <button
                    onClick={() => downloadMeme(false)}
                    disabled={isDownloading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-light disabled:opacity-50"
                  >
                    <Download className="w-5 h-5" />
                    Download Premium (0.001 SOL)
                  </button>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      Connect your wallet to download without watermark
                    </p>
                    <WalletMultiButton />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
