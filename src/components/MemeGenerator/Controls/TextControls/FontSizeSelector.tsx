import React from 'react';

const FONT_SIZES = [16, 20, 24, 32, 40, 48, 64, 72, 96];

interface FontSizeSelectorProps {
  value: number;
  onChange: (size: number) => void;
}

export const FontSizeSelector: React.FC<FontSizeSelectorProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
    >
      {FONT_SIZES.map((size) => (
        <option key={size} value={size}>
          {size}px
        </option>
      ))}
    </select>
  );
};