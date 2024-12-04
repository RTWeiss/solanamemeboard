import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { StickerElement } from "../../types/meme";
import { ResizeControls } from "./Controls/ResizeControls";
import { useMemeStore } from "../../stores/useMemeStore";
import {
  calculateStickerSize,
  constrainStickerScale,
} from "../../utils/boundaries/sticker";

export const MemeSticker: React.FC<StickerElement> = ({
  id,
  url,
  position,
  scale,
  rotation,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const { updateSticker, selectedElement, setSelectedElement } = useMemeStore();
  const isSelected = selectedElement === id;

  const handleScaleChange = (newScale: number) => {
    const element = document.querySelector(`[data-id="${id}"]`) as HTMLElement;
    if (!element) return;

    const container = element.parentElement;
    if (!container) return;

    const elementSize = calculateStickerSize(element, container);
    const constrainedScale = constrainStickerScale(newScale, elementSize);
    updateSticker(id, { scale: constrainedScale });
  };

  const style: React.CSSProperties = {
    position: "absolute",
    left: `${position.x}%`,
    top: `${position.y}%`,
    transform: transform
      ? `translate(-50%, -50%) translate(${transform.x}px, ${transform.y}px) scale(${scale}) rotate(${rotation}deg)`
      : `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
    width: "120px",
    height: "120px",
    cursor: "move",
    touchAction: "none",
    zIndex: isSelected ? 20 : 10,
    WebkitUserSelect: "none",
    userSelect: "none",
    transformOrigin: "center center",
    willChange: "transform",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`sticker-wrapper ${
        isSelected ? "ring-2 ring-secondary ring-offset-2" : ""
      }`}
      data-id={id}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(id);
      }}
    >
      {isSelected && (
        <ResizeControls
          scale={scale}
          rotation={rotation}
          onScaleChange={handleScaleChange}
          onRotationChange={(newRotation) =>
            updateSticker(id, { rotation: newRotation })
          }
        />
      )}
      <img
        src={url}
        alt="Sticker"
        className="w-full h-full object-contain pointer-events-none select-none"
        draggable={false}
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          img.style.opacity = "0.2";
          console.error(`Failed to load sticker: ${url}`);
        }}
      />
    </div>
  );
};
