import React from 'react';
import { Bold, Italic, Underline } from 'lucide-react';

interface TextStyle {
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

interface TextStyleControlsProps {
  style: TextStyle;
  onChange: (style: Partial<TextStyle>) => void;
}

export const TextStyleControls: React.FC<TextStyleControlsProps> = ({ style, onChange }) => {
  const buttons = [
    { key: 'bold' as const, Icon: Bold, label: 'Bold' },
    { key: 'italic' as const, Icon: Italic, label: 'Italic' },
    { key: 'underline' as const, Icon: Underline, label: 'Underline' },
  ];

  return (
    <div className="flex gap-1">
      {buttons.map(({ key, Icon, label }) => (
        <button
          key={key}
          onClick={() => onChange({ [key]: !style[key] })}
          className={`flex-1 p-2 rounded transition-colors ${
            style[key] ? 'bg-secondary text-white' : 'hover:bg-gray-100'
          }`}
          title={label}
        >
          <Icon className="w-4 h-4 mx-auto" />
        </button>
      ))}
    </div>
  );
};