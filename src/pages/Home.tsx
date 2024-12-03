import React, { useEffect } from "react";
import { PixelGrid } from "../components/Grid/PixelGrid";
import { PurchasePanel } from "../components/Purchase/PurchasePanel";
import { useGridStore } from "../stores/useGridStore";
import { useUrlParams } from "../hooks/useUrlParams";
import { initializeDatabase } from "../utils/database";

export const Home: React.FC = () => {
  const { loadPixels, isLoading, error } = useGridStore();
  useUrlParams(); // Handle URL parameters for sharing

  useEffect(() => {
    const init = async () => {
      try {
        await initializeDatabase();
        await loadPixels();
      } catch (err) {
        console.error("Initialization error:", err);
      }
    };
    init();
  }, [loadPixels]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => loadPixels()}
          className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-light"
        >
          Retry Loading
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="lg:col-span-8 xl:col-span-9 order-2 lg:order-1">
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading pixel grid...</p>
            </div>
          ) : (
            <PixelGrid />
          )}
        </div>
        <div className="lg:col-span-4 xl:col-span-3 order-1 lg:order-2">
          <PurchasePanel />
        </div>
      </div>
    </div>
  );
};
