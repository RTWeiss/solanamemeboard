import React, { useRef } from "react";
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { MemeText } from "./MemeText";
import { MemeSticker } from "./MemeSticker";
import { Guidelines } from "./Guidelines";
import { useMemeStore } from "../../stores/useMemeStore";
import { getCanvasConfig } from "../../utils/boundaries/core";

export const MemeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const {
    background,
    image,
    texts,
    stickers,
    showGuides,
    updateElementPosition,
    setSelectedElement,
  } = useMemeStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    if (!active || !canvasRef.current) return;

    const id = active.id as string;
    const type = id.startsWith("text-") ? "text" : "sticker";

    const element = document.querySelector(`[data-id="${id}"]`) as HTMLElement;
    if (!element) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const deltaX = (delta.x / canvasRect.width) * 100;
    const deltaY = (delta.y / canvasRect.height) * 100;

    const currentPosition =
      type === "text"
        ? texts.find((t) => t.id === id)?.position
        : stickers.find((s) => s.id === id)?.position;

    if (!currentPosition) return;

    const newPosition = {
      x: currentPosition.x + deltaX,
      y: currentPosition.y + deltaY,
    };

    updateElementPosition(id, type, newPosition);
  };

  const canvasConfig = getCanvasConfig();

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div
        ref={canvasRef}
        className="relative rounded-lg overflow-hidden bg-white shadow-lg mx-auto"
        style={{
          ...canvasConfig.style,
          backgroundColor: background.color,
          backgroundImage: background.pattern
            ? `url(${background.pattern})`
            : "none",
          touchAction: "none",
        }}
        onClick={() => setSelectedElement(null)}
      >
        {showGuides?.grid && (
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(79, 70, 229, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(79, 70, 229, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "5% 5%",
            }}
          />
        )}

        {image && (
          <img
            src={image}
            alt="Meme base"
            className="absolute inset-0 w-full h-full object-contain"
          />
        )}

        <Guidelines />

        {texts.map((text) => (
          <MemeText key={text.id} {...text} />
        ))}

        {stickers.map((sticker) => (
          <MemeSticker key={sticker.id} {...sticker} />
        ))}
      </div>
    </DndContext>
  );
};
