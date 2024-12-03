import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { X, Minus, Plus, RotateCw, RotateCcw } from 'lucide-react';
import { useMemeStore } from '../../stores/useMemeStore';

interface MemeStickerProps {
  id: string;
  url: string;
  position: { x: number; y: number };
  scale: number;
  rotation: number;
}

export const MemeSticker: React.FC<MemeStickerProps> = ({
  id,
  url,
  position,
  scale,
  rotation,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const { removeSticker, updateSticker } = useMemeStore();
  const [showControls, setShowControls] = useState(false);

  const handleScale = (delta: number) => {
    const newScale = Math.max(0.5, Math.min(3, scale + delta));
    updateSticker(id, { scale: newScale });
  };

  const handleRotation = (delta: number) => {
    const newRotation = (rotation + delta) % 360;
    updateSticker(id, { rotation: newRotation });
  };

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${position.x}%`,
    top: `${position.y}%`,
    transform: transform 
      ? `translate(-50%, -50%) translate(${transform.x}px, ${transform.y}px) scale(${scale}) rotate(${rotation}deg)`
      : `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
    width: '120px',
    height: '120px',
    cursor: 'move',
    touchAction: 'none',
    zIndex: showControls ? 20 : 10,
    WebkitUserSelect: 'none',
    userSelect: 'none',
    transformOrigin: 'center center',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="sticker-wrapper group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Controls Overlay */}
      <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 flex items-center gap-1 transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={() => handleScale(-0.1)}
          className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 text-gray-700"
          title="Decrease size"
        >
          <Minus className="w-3 h-3" />
        </button>
        <button
          onClick={() => handleScale(0.1)}
          className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 text-gray-700"
          title="Increase size"
        >
          <Plus className="w-3 h-3" />
        </button>
        <button
          onClick={() => handleRotation(-45)}
          className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 text-gray-700"
          title="Rotate left"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
        <button
          onClick={() => handleRotation(45)}
          className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 text-gray-700"
          title="Rotate right"
        >
          <RotateCw className="w-3 h-3" />
        </button>
        <button
          onClick={() => removeSticker(id)}
          className="p-1 bg-red-500 rounded-full shadow-md text-white hover:bg-red-600"
          title="Remove sticker"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      <img
        src={url}
        alt="Sticker"
        className="w-full h-full object-contain pointer-events-none select-none"
        draggable={false}
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          img.style.opacity = '0.2';
          img.parentElement?.classList.add('bg-gray-100');
          console.error(`Failed to load sticker image: ${url}`);
        }}
      />
    </div>
  );
};