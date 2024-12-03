import React from 'react';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface TextAlignmentButtonsProps {
  value: 'left' | 'center' | 'right';
  onChange: (alignment: 'left' | 'center' | 'right') => void;
}

export const TextAlignmentButtons: React.FC<TextAlignmentButtonsProps> = ({ value, onChange }) => {
  const buttons = [
    { align: 'left' as const, Icon: AlignLeft },
    { align: 'center' as const, Icon: AlignCenter },
    { align: 'right' as const, Icon: AlignRight },
  ];

  return (
    <div className="flex gap-1">
      {buttons.map(({ align, Icon }) => (
        <button
          key={align}
          onClick={() => onChange(align)}
          className={`flex-1 p-2 rounded transition-colors ${
            value === align ? 'bg-secondary text-white' : 'hover:bg-gray-100'
          }`}
          title={`Align ${align}`}
        >
          <Icon className="w-4 h-4 mx-auto" />
        </button>
      ))}
    </div>
  );
};