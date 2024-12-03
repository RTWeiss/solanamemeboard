import React, { useState } from "react";
import { useMemeStore } from "../../../stores/useMemeStore";
import { AlertCircle } from "lucide-react";

const PATTERNS = [
  {
    name: "None",
    url: null,
  },
  {
    name: "Dots",
    url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMS41IiBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+",
  },
  {
    name: "Grid",
    url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTIwIDBIMFYyMEgyMFYwWk0xOSAxOUgxVjFIMTlWMTlaIiBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+",
  },
  {
    name: "Diagonal",
    url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGxpbmUgeDE9IjAiIHkxPSIyMCIgeDI9IjIwIiB5Mj0iMCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==",
  },
  {
    name: "Squares",
    url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+",
  },
  {
    name: "Crosses",
    url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTkgNVYxNU0xNSA5SDUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=",
  },
  {
    name: "Zigzag",
    url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMTBMNSA1TDEwIDEwTDE1IDVMMjAgMTAiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIGZpbGw9Im5vbmUiLz48L3N2Zz4=",
  },
  {
    name: "Waves",
    url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMTBDNSAxMCA1IDUgMTAgNVMxNSAxMCAyMCAxMCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==",
  },
];

export const BackgroundControls: React.FC = () => {
  const { background, setBackground } = useMemeStore();
  const [patternErrors, setPatternErrors] = useState<Set<string>>(new Set());

  const handlePatternLoad = (pattern: (typeof PATTERNS)[0]) => {
    setPatternErrors((prev) => {
      const next = new Set(prev);
      next.delete(pattern.name);
      return next;
    });
  };

  const handlePatternError = (pattern: (typeof PATTERNS)[0]) => {
    setPatternErrors((prev) => new Set([...prev, pattern.name]));
    console.error(`Failed to load pattern: ${pattern.name}`);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Background Color
        </label>
        <input
          type="color"
          value={background.color}
          onChange={(e) => setBackground({ color: e.target.value })}
          className="w-full h-10 rounded cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Background Pattern
        </label>
        <div className="grid grid-cols-2 gap-2">
          {PATTERNS.map((pattern) => (
            <button
              key={pattern.name}
              onClick={() => setBackground({ pattern: pattern.url })}
              className={`relative p-4 border rounded-lg text-sm transition-all ${
                background.pattern === pattern.url
                  ? "border-secondary bg-secondary/5"
                  : "border-gray-200 hover:border-secondary"
              }`}
            >
              {pattern.url && (
                <div
                  className="absolute inset-0 opacity-20 rounded-lg overflow-hidden"
                  style={{
                    backgroundColor: background.color,
                    backgroundImage: `url(${pattern.url})`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "20px 20px",
                  }}
                >
                  <img
                    src={pattern.url}
                    alt=""
                    className="hidden"
                    onLoad={() => handlePatternLoad(pattern)}
                    onError={() => handlePatternError(pattern)}
                  />
                </div>
              )}
              <span className="relative z-10 font-medium">{pattern.name}</span>
              {patternErrors.has(pattern.name) && (
                <div
                  className="absolute top-1 right-1 text-red-500"
                  title="Pattern failed to load"
                >
                  <AlertCircle className="w-4 h-4" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
