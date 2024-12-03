import React from 'react';

const FONTS = [
  { name: 'Arial', value: 'Arial' },
  { name: 'Impact', value: 'Impact' },
  { name: 'Comic Sans', value: 'Comic Sans MS' },
  { name: 'Helvetica', value: 'Helvetica' },
  { name: 'Times New Roman', value: 'Times New Roman' },
];

interface FontSelectorProps {
  value: string;
  onChange: (font: string) => void;
}

export const FontSelector: React.FC<FontSelectorProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
    >
      {FONTS.map((font) => (
        <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
          {font.name}
        </option>
      ))}
    </select>
  );
};