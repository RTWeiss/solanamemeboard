import React from "react";
import { CenterLines } from "./CenterLines";
import { SnapLines } from "./SnapLines";
import { Ruler } from "./Ruler";
import { useMemeStore } from "../../../stores/useMemeStore";
import { Grid, Ruler as RulerIcon, Crosshair } from "lucide-react";

export const Guidelines: React.FC = () => {
  const { texts, stickers, selectedElement, showGuides } = useMemeStore();

  const elements = [
    ...texts.map((t) => ({ id: t.id, position: t.position })),
    ...stickers.map((s) => ({ id: s.id, position: s.position })),
  ];

  return (
    <>
      <div className="absolute inset-0">
        <CenterLines show={showGuides.centerLines} />
        <SnapLines elements={elements} activeId={selectedElement} />
        <Ruler show={showGuides.ruler} />
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
        <button
          onClick={() =>
            useMemeStore.setState((state) => ({
              showGuides: {
                ...state.showGuides,
                ruler: !state.showGuides.ruler,
              },
            }))
          }
          className={`p-2 rounded-lg transition-colors ${
            showGuides.ruler
              ? "bg-secondary text-white"
              : "bg-white/80 text-gray-600 hover:bg-white"
          }`}
          title="Toggle ruler"
        >
          <RulerIcon className="w-4 h-4" />
        </button>

        <button
          onClick={() =>
            useMemeStore.setState((state) => ({
              showGuides: {
                ...state.showGuides,
                centerLines: !state.showGuides.centerLines,
              },
            }))
          }
          className={`p-2 rounded-lg transition-colors ${
            showGuides.centerLines
              ? "bg-secondary text-white"
              : "bg-white/80 text-gray-600 hover:bg-white"
          }`}
          title="Toggle center lines"
        >
          <Crosshair className="w-4 h-4" />
        </button>

        <button
          onClick={() =>
            useMemeStore.setState((state) => ({
              showGuides: { ...state.showGuides, grid: !state.showGuides.grid },
            }))
          }
          className={`p-2 rounded-lg transition-colors ${
            showGuides.grid
              ? "bg-secondary text-white"
              : "bg-white/80 text-gray-600 hover:bg-white"
          }`}
          title="Toggle grid"
        >
          <Grid className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};
