import React from 'react';
import { useDraggable } from '@dnd-kit/core';

interface TextStyle {
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

interface MemeTextProps {
  id: string;
  content: string;
  position: { x: number; y: number };
  fontSize: number;
  color: string;
  fontFamily: string;
  textAlign: 'left' | 'center' | 'right';
  style: TextStyle;
}

export const MemeText: React.FC<MemeTextProps> = ({
  id,
  content,
  position,
  fontSize,
  color,
  fontFamily,
  textAlign,
  style,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const textStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${position.x}%`,
    top: `${position.y}%`,
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : 'none',
    fontSize: `${fontSize}px`,
    color,
    fontFamily,
    textAlign,
    cursor: 'move',
    textShadow: '2px 2px 2px rgba(0,0,0,0.3)',
    userSelect: 'none',
    padding: '4px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    maxWidth: '80%',
    width: textAlign === 'center' ? '80%' : 'auto',
    marginLeft: textAlign === 'center' ? '-40%' : '0',
    fontWeight: style.bold ? 'bold' : 'normal',
    fontStyle: style.italic ? 'italic' : 'normal',
    textDecoration: style.underline ? 'underline' : 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={textStyle}
      {...attributes}
      {...listeners}
    >
      {content}
    </div>
  );
};