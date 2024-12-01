import React, { useEffect } from 'react';
import { WalletProvider } from './components/Wallet/WalletProvider';
import { Header } from './components/Layout/Header';
import { PixelGrid } from './components/Grid/PixelGrid';
import { PurchasePanel } from './components/Purchase/PurchasePanel';
import { useGridStore } from './stores/useGridStore';
import { initializeDatabase } from './utils/database';

function App() {
  const { loadPixels, isLoading, error } = useGridStore();

  useEffect(() => {
    const init = async () => {
      try {
        await initializeDatabase();
        await loadPixels();
      } catch (err) {
        console.error('Initialization error:', err);
      }
    };
    init();
  }, [loadPixels]);

  return (
    <WalletProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-4 sm:py-8 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading pixel grid...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => loadPixels()}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
              <div className="lg:col-span-8 xl:col-span-9 order-2 lg:order-1">
                <PixelGrid />
              </div>
              <div className="lg:col-span-4 xl:col-span-3 order-1 lg:order-2">
                <PurchasePanel />
              </div>
            </div>
          )}
        </main>
      </div>
    </WalletProvider>
  );
}

export default App;