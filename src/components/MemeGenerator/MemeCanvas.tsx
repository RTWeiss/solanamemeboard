import React, { useRef, useEffect } from 'react';
import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { MemeText } from './MemeText';
import { MemeSticker } from './MemeSticker';
import { useMemeStore } from '../../stores/useMemeStore';

export const MemeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { background, image, texts, stickers, updateElementPosition } = useMemeStore();
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    
    if (active && canvasRef.current) {
      const id = active.id as string;
      const type = id.startsWith('text-') ? 'text' : 'sticker';
      const containerRect = canvasRef.current.getBoundingClientRect();
      
      updateElementPosition(id, type, {
        x: (delta.x / containerRect.width) * 100,
        y: (delta.y / containerRect.height) * 100,
      });
    }
  };

  return (
    <DndContext 
      sensors={sensors} 
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <div 
        ref={canvasRef}
        className="relative w-full aspect-square rounded-lg overflow-hidden"
        style={{
          backgroundColor: background.color,
          backgroundImage: background.pattern ? `url(${background.pattern})` : 'none',
        }}
      >
        {image && (
          <img
            src={image}
            alt="Meme base"
            className="absolute inset-0 w-full h-full object-contain"
          />
        )}

        {texts.map((text) => (
          <MemeText
            key={text.id}
            id={text.id}
            {...text}
          />
        ))}

        {stickers.map((sticker) => (
          <MemeSticker
            key={sticker.id}
            id={sticker.id}
            {...sticker}
          />
        ))}
      </div>
    </DndContext>
  );
};