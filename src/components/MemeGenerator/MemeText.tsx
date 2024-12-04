import React, { useRef, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { TextElement } from "../../types/meme";
import { useMemeStore } from "../../stores/useMemeStore";
import {
  calculateTextDimensions,
  clampTextPosition,
} from "../../utils/boundaries/text";
import { CANVAS_CONFIG } from "../../utils/boundaries/core";

export const MemeText: React.FC<TextElement> = ({
  id,
  content,
  position,
  fontSize,
  color,
  fontFamily,
  textAlign,
  style,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const { selectedElement, setSelectedElement, updateText } = useMemeStore();
  const isSelected = selectedElement === id;
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current && containerRef.current?.parentElement) {
      const dimensions = calculateTextDimensions(
        textRef.current,
        containerRef.current.parentElement,
        fontSize,
        content
      );
      const clampedPosition = clampTextPosition(position, dimensions);

      if (
        clampedPosition.x !== position.x ||
        clampedPosition.y !== position.y
      ) {
        updateText(id, { position: clampedPosition });
      }
    }
  }, [id, content, fontSize, position, updateText]);

  const getAlignmentOffset = () => {
    switch (textAlign) {
      case "left":
        return "translate(0, -50%)";
      case "right":
        return "translate(-100%, -50%)";
      default:
        return "translate(-50%, -50%)";
    }
  };

  const containerStyle: React.CSSProperties = {
    position: "absolute",
    left: `${position.x}%`,
    top: `${position.y}%`,
    transform: transform
      ? `${getAlignmentOffset()} translate(${transform.x}px, ${transform.y}px)`
      : getAlignmentOffset(),
    cursor: "move",
    zIndex: isSelected ? 20 : 10,
    backgroundColor: isSelected ? "rgba(79, 70, 229, 0.1)" : "transparent",
    borderRadius: "4px",
    border: isSelected ? "2px solid rgba(79, 70, 229, 0.3)" : "none",
    padding: "4px",
    width: `${100 - 2 * CANVAS_CONFIG.padding}%`,
    willChange: "transform",
    touchAction: "none",
  };

  const textStyle: React.CSSProperties = {
    fontSize: `${fontSize}px`,
    color,
    fontFamily,
    textAlign,
    fontWeight: style.bold ? "bold" : "normal",
    fontStyle: style.italic ? "italic" : "normal",
    textDecoration: style.underline ? "underline" : "none",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    userSelect: "none",
    pointerEvents: "none",
    textShadow: "2px 2px 2px rgba(0,0,0,0.3)",
    margin: 0,
    lineHeight: "1.2",
    width: "100%",
  };

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      {...attributes}
      {...listeners}
      data-id={id}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(id);
      }}
    >
      <div ref={textRef} style={textStyle}>
        {content}
      </div>
    </div>
  );
};
