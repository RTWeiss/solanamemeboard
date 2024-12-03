import React from 'react';
import { Type, Trash2, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { useMemeStore } from '../../../stores/useMemeStore';

export const TextControls: React.FC = () => {
  const { texts, addText, updateText, removeText } = useMemeStore();

  const handleAddText = () => {
    addText({
      content: 'Enter text here',
      position: { x: 50, y: 50 },
      fontSize: 32,
      textAlign: 'center' as const,
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

      <div className="space-y-4">
        {texts.map((text) => (
          <div key={text.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={text.content}
                onChange={(e) => updateText(text.id, { content: e.target.value })}
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
              />
              <button
                onClick={() => removeText(text.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="color"
                value={text.color}
                onChange={(e) => updateText(text.id, { color: e.target.value })}
                className="w-full h-8 rounded cursor-pointer"
              />
              <select
                value={text.fontSize}
                onChange={(e) => updateText(text.id, { fontSize: Number(e.target.value) })}
                className="px-3 py-1 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
              >
                {[16, 20, 24, 32, 40, 48, 64].map((size) => (
                  <option key={size} value={size}>
                    {size}px
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-1">
              <button
                onClick={() => updateText(text.id, { textAlign: 'left' })}
                className={`flex-1 p-2 rounded ${
                  text.textAlign === 'left' ? 'bg-secondary text-white' : 'hover:bg-gray-100'
                }`}
              >
                <AlignLeft className="w-4 h-4 mx-auto" />
              </button>
              <button
                onClick={() => updateText(text.id, { textAlign: 'center' })}
                className={`flex-1 p-2 rounded ${
                  text.textAlign === 'center' ? 'bg-secondary text-white' : 'hover:bg-gray-100'
                }`}
              >
                <AlignCenter className="w-4 h-4 mx-auto" />
              </button>
              <button
                onClick={() => updateText(text.id, { textAlign: 'right' })}
                className={`flex-1 p-2 rounded ${
                  text.textAlign === 'right' ? 'bg-secondary text-white' : 'hover:bg-gray-100'
                }`}
              >
                <AlignRight className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};