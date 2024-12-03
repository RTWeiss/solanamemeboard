import React from 'react';
import { Type, Trash2 } from 'lucide-react';
import { useMemeStore } from '../../../../stores/useMemeStore';
import { FontSelector } from './FontSelector';
import { FontSizeSelector } from './FontSizeSelector';
import { TextAlignmentButtons } from './TextAlignmentButtons';
import { TextStyleControls } from './TextStyleControls';

export const TextControls: React.FC = () => {
  const { texts, addText, updateText, removeText } = useMemeStore();

  const handleAddText = () => {
    addText({
      content: 'Enter text here',
      position: { x: 50, y: 50 },
      fontSize: 32,
      textAlign: 'center',
      style: {
        bold: false,
        italic: false,
        underline: false,
      },
    });
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleAddText}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-light transition-colors"
      >
        <Type className="w-4 h-4" />
        Add Text
      </button>

      <div className="space-y-6">
        {texts.map((text) => (
          <div key={text.id} className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={text.content}
                onChange={(e) => updateText(text.id, { content: e.target.value })}
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
                placeholder="Enter text..."
              />
              <button
                onClick={() => removeText(text.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove text"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Font</label>
                <FontSelector
                  value={text.fontFamily}
                  onChange={(font) => updateText(text.id, { fontFamily: font })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Size</label>
                <FontSizeSelector
                  value={text.fontSize}
                  onChange={(size) => updateText(text.id, { fontSize: size })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Color</label>
              <input
                type="color"
                value={text.color}
                onChange={(e) => updateText(text.id, { color: e.target.value })}
                className="w-full h-8 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Style</label>
              <TextStyleControls
                style={text.style}
                onChange={(style) => updateText(text.id, { style: { ...text.style, ...style } })}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Alignment</label>
              <TextAlignmentButtons
                value={text.textAlign}
                onChange={(align) => updateText(text.id, { textAlign: align })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};