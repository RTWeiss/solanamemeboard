import React, { useState } from "react";
import { MemeCanvas } from "../components/MemeGenerator/MemeCanvas";
import { MemeControls } from "../components/MemeGenerator/MemeControls";
import { MemePreview } from "../components/MemeGenerator/MemePreview";
import { useMemeStore } from "../stores/useMemeStore";
import { Download } from "lucide-react";

export const MemeGenerator: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Canvas */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  Meme Generator
                </h1>
                <button
                  onClick={() => setShowPreview(true)}
                  className="inline-flex items-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-light transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Preview & Download
                </button>
              </div>
              <MemeCanvas />
            </div>
          </div>

          {/* Right side - Controls */}
          <div className="w-full lg:w-80">
            <MemeControls />
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && <MemePreview onClose={() => setShowPreview(false)} />}
    </div>
  );
};
