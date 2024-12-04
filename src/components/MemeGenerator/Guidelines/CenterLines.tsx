import React from "react";

interface CenterLinesProps {
  show: boolean;
}

export const CenterLines: React.FC<CenterLinesProps> = ({ show }) => {
  if (!show) return null;

  return (
    <>
      {/* Vertical center line */}
      <div className="absolute top-0 left-1/2 w-px h-full bg-indigo-500/20 pointer-events-none z-10" />

      {/* Horizontal center line */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-indigo-500/20 pointer-events-none z-10" />

      {/* Center point */}
      <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/30 pointer-events-none z-10" />
    </>
  );
};
