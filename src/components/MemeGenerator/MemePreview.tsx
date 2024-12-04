import React, { useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Download, X, Loader2, AlertCircle } from "lucide-react";
import { useMemeStore } from "../../stores/useMemeStore";
import { downloadImage } from "../../utils/image/download";
import { getCanvasConfig } from "../../utils/boundaries/core";
import { CANVAS_CONFIG } from "../../utils/boundaries/core";

interface MemePreviewProps {
  onClose: () => void;
}

export const MemePreview: React.FC<MemePreviewProps> = ({ onClose }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [loadingStatus, setLoadingStatus] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
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

  const getTextStyle = (text: (typeof texts)[0]): React.CSSProperties => {
    const alignmentTransform =
      text.textAlign === "left"
        ? "translate(0%, -50%)"
        : text.textAlign === "right"
        ? "translate(-100%, -50%)"
        : "translate(-50%, -50%)";

    return {
      position: "absolute",
      left: `${text.position.x}%`,
      top: `${text.position.y}%`,
      transform: alignmentTransform,
      fontSize: `${text.fontSize}px`,
      color: text.color,
      fontFamily: text.fontFamily,
      textAlign: text.textAlign,
      textShadow: "2px 2px 2px rgba(0,0,0,0.3)",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      width: `${100 - 2 * CANVAS_CONFIG.padding}%`,
      fontWeight: text.style.bold ? "bold" : "normal",
      fontStyle: text.style.italic ? "italic" : "normal",
      textDecoration: text.style.underline ? "underline" : "none",
      margin: 0,
      padding: "4px",
      lineHeight: "1.2",
    };
  };

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

  const handleDownload = async (includeBranding: boolean) => {
    if (!previewRef.current) return;

    try {
      setIsDownloading(true);
      setError(null);

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
      setError("Failed to generate meme. Please try again.");
    } finally {
      setIsDownloading(false);
      setLoadingStatus("");
    }
  };

  const canvasConfig = getCanvasConfig();

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
            className="relative rounded-lg overflow-hidden mx-auto"
            style={{
              ...canvasConfig.style,
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
                <span>{loadingStatus || "Generating meme..."}</span>
              </div>
            ) : (
              <>
                <button
                  onClick={() => handleDownload(true)}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-light disabled:opacity-50"
                >
                  <Download className="w-5 h-5" />
                  Download Free (with watermark)
                </button>

                {wallet.connected ? (
                  <button
                    onClick={() => handleDownload(false)}
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
