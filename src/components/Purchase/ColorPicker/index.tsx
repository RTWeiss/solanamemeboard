import React, { useState } from "react";
import { Paintbrush, Check, Palette } from "lucide-react";

interface ColorPickerProps {
  selectedColor: string;
  onChange: (color: string) => void;
}

const COLOR_GROUPS = {
  "Popular Colors": [
    { color: "#FF3B30", name: "Red" },
    { color: "#FF9500", name: "Orange" },
    { color: "#FFCC00", name: "Yellow" },
    { color: "#34C759", name: "Green" },
    { color: "#00C7BE", name: "Teal" },
    { color: "#007AFF", name: "Blue" },
    { color: "#5856D6", name: "Indigo" },
    { color: "#AF52DE", name: "Purple" },
  ],
  "Brand Colors": [
    { color: "#1DA1F2", name: "Twitter Blue" },
    { color: "#FF4500", name: "Reddit Orange" },
    { color: "#5865F2", name: "Discord Blue" },
    { color: "#00B488", name: "Solana Green" },
  ],
  "Basic Colors": [
    { color: "#000000", name: "Black" },
    { color: "#8E8E93", name: "Gray" },
    { color: "#FFFFFF", name: "White" },
  ],
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onChange,
}) => {
  const [showCustom, setShowCustom] = useState(false);
  const [customColor, setCustomColor] = useState(selectedColor);
  const [isPredefinedSelected, setIsPredefinedSelected] = useState(true);

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value.toUpperCase();
    setCustomColor(color);
    setIsPredefinedSelected(false);
    onChange(color);
  };

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let color = e.target.value;
    if (!color.startsWith("#")) {
      color = "#" + color;
    }
    if (/^#[0-9A-Fa-f]{0,6}$/.test(color)) {
      const upperColor = color.toUpperCase();
      setCustomColor(upperColor);
      setIsPredefinedSelected(false);
      if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
        onChange(upperColor);
      }
    }
  };

  const handlePredefinedColorClick = (color: string) => {
    setIsPredefinedSelected(true);
    setCustomColor(color);
    onChange(color);
  };

  const isColorSelected = (color: string) => {
    return (
      isPredefinedSelected &&
      selectedColor.toUpperCase() === color.toUpperCase()
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {Object.entries(COLOR_GROUPS).map(([groupName, colors]) => (
          <div key={groupName}>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              {groupName}
            </h4>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {colors.map(({ color, name }) => (
                <button
                  key={color}
                  onClick={() => handlePredefinedColorClick(color)}
                  className={`group w-8 h-8 rounded-lg transition-transform relative hover:scale-110 ${
                    isColorSelected(color)
                      ? "ring-2 ring-offset-2 ring-indigo-500 scale-110"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                  title={name}
                >
                  {isColorSelected(color) && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Check
                        className={`w-4 h-4 ${
                          isLightColor(color) ? "text-gray-800" : "text-white"
                        }`}
                      />
                    </span>
                  )}
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <button
          onClick={() => setShowCustom(!showCustom)}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            showCustom
              ? "bg-indigo-50 text-indigo-600"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Paintbrush className="w-4 h-4" />
          <span className="font-medium">
            {showCustom ? "Hide Custom Color" : "Choose Custom Color"}
          </span>
        </button>

        {showCustom && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4 border border-gray-200">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Palette className="w-4 h-4" />
                Color Picker
              </label>
              <input
                type="color"
                value={customColor}
                onChange={handleCustomColorChange}
                className="block w-full h-12 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <span className="font-mono">#</span>
                Hex Color Code
              </label>
              <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 px-3">
                <span className="text-sm text-gray-500 font-medium">#</span>
                <input
                  type="text"
                  value={customColor.replace("#", "")}
                  onChange={handleHexInput}
                  className="flex-1 text-sm font-mono border-0 focus:ring-0 py-2 uppercase"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Enter a 6-digit hex code (e.g., FF0000 for red)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to determine if a color is light
function isLightColor(color: string): boolean {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}
