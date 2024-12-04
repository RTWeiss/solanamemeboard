import React from "react";
import { Type, Trash2, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { useMemeStore } from "../../../stores/useMemeStore";

const FONT_SIZES = [16, 24, 32, 48, 64, 72, 96, 128, 144, 192];

export const TextControls: React.FC = () => {
  const { texts, addText, updateText, removeText } = useMemeStore();

  const handleAddText = () => {
    addText({
      content: "Enter text here",
      position: { x: 50, y: 50 },
      fontSize: 32,
      textAlign: "center" as const,
    });
  };

  const handleTextChange = (id: string, content: string) => {
    // Preserve newlines from textarea
    updateText(id, { content });
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
            <div className="flex items-start gap-2">
              <textarea
                value={text.content}
                onChange={(e) => handleTextChange(text.id, e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary min-h-[80px] resize-y"
                placeholder="Enter text here..."
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
                onChange={(e) =>
                  updateText(text.id, { fontSize: Number(e.target.value) })
                }
                className="px-3 py-1 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
              >
                {FONT_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}px
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-1">
              <button
                onClick={() => updateText(text.id, { textAlign: "left" })}
                className={`flex-1 p-2 rounded ${
                  text.textAlign === "left"
                    ? "bg-secondary text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <AlignLeft className="w-4 h-4 mx-auto" />
              </button>
              <button
                onClick={() => updateText(text.id, { textAlign: "center" })}
                className={`flex-1 p-2 rounded ${
                  text.textAlign === "center"
                    ? "bg-secondary text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <AlignCenter className="w-4 h-4 mx-auto" />
              </button>
              <button
                onClick={() => updateText(text.id, { textAlign: "right" })}
                className={`flex-1 p-2 rounded ${
                  text.textAlign === "right"
                    ? "bg-secondary text-white"
                    : "hover:bg-gray-100"
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
