import React from "react";
import { MinusCircle, PlusCircle, RotateCcw, RotateCw } from "lucide-react";

interface ResizeControlsProps {
  scale: number;
  rotation: number;
  onScaleChange: (scale: number) => void;
  onRotationChange: (rotation: number) => void;
}

export const ResizeControls: React.FC<ResizeControlsProps> = ({
  scale,
  rotation,
  onScaleChange,
  onRotationChange,
}) => {
  const handleScaleChange = (delta: number) => {
    const newScale = Math.max(0.2, Math.min(3, scale + delta));
    onScaleChange(newScale);
  };

  const handleRotationChange = (delta: number) => {
    const newRotation = (rotation + delta) % 360;
    onRotationChange(newRotation);
  };

  return (
    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 flex items-center gap-1 bg-white rounded-lg shadow-lg p-1">
      <button
        onClick={() => handleScaleChange(-0.1)}
        className="p-1 hover:text-secondary transition-colors"
        title="Decrease size"
      >
        <MinusCircle className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleScaleChange(0.1)}
        className="p-1 hover:text-secondary transition-colors"
        title="Increase size"
      >
        <PlusCircle className="w-4 h-4" />
      </button>
      <div className="w-px h-4 bg-gray-200 mx-1" />
      <button
        onClick={() => handleRotationChange(-45)}
        className="p-1 hover:text-secondary transition-colors"
        title="Rotate left"
      >
        <RotateCcw className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleRotationChange(45)}
        className="p-1 hover:text-secondary transition-colors"
        title="Rotate right"
      >
        <RotateCw className="w-4 h-4" />
      </button>
    </div>
  );
};
