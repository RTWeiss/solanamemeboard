import React from "react";

interface RulerProps {
  show: boolean;
}

export const Ruler: React.FC<RulerProps> = ({ show }) => {
  if (!show) return null;

  return (
    <>
      {/* Horizontal ruler */}
      <div className="absolute top-0 left-0 w-full h-6 bg-gray-50 border-b border-gray-200 pointer-events-none z-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute top-0 h-full border-l border-gray-200"
            style={{ left: `${i * 10}%` }}
          >
            <span className="absolute top-1 left-1 text-xs text-gray-400">
              {i * 10}%
            </span>
          </div>
        ))}
      </div>

      {/* Vertical ruler */}
      <div className="absolute top-0 left-0 w-6 h-full bg-gray-50 border-r border-gray-200 pointer-events-none z-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute left-0 w-full border-t border-gray-200"
            style={{ top: `${i * 10}%` }}
          >
            <span className="absolute top-1 left-1 text-xs text-gray-400">
              {i * 10}%
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
