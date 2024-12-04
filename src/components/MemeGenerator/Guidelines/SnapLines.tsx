import React from "react";
import { Position } from "../../../types/meme";

interface SnapLinesProps {
  elements: Array<{
    id: string;
    position: Position;
    width?: number;
    height?: number;
  }>;
  activeId: string | null;
}

export const SnapLines: React.FC<SnapLinesProps> = ({ elements, activeId }) => {
  if (!activeId) return null;

  const activeElement = elements.find((el) => el.id === activeId);
  if (!activeElement) return null;

  const snapThreshold = 5; // pixels
  const lines: JSX.Element[] = [];

  elements.forEach((element) => {
    if (element.id === activeId) return;

    // Vertical alignment
    if (
      Math.abs(element.position.x - activeElement.position.x) < snapThreshold
    ) {
      lines.push(
        <div
          key={`v-${element.id}`}
          className="absolute top-0 w-px h-full bg-secondary pointer-events-none z-20"
          style={{ left: `${element.position.x}%` }}
        />
      );
    }

    // Horizontal alignment
    if (
      Math.abs(element.position.y - activeElement.position.y) < snapThreshold
    ) {
      lines.push(
        <div
          key={`h-${element.id}`}
          className="absolute left-0 h-px w-full bg-secondary pointer-events-none z-20"
          style={{ top: `${element.position.y}%` }}
        />
      );
    }
  });

  return <>{lines}</>;
};
