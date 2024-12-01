import { useState, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useGridStore } from '../stores/useGridStore';
import { purchasePixels as purchasePixelsOnChain } from '../utils/solana/transaction';
import { purchasePixels as purchasePixelsDB } from '../services/pixelService';
import { GridSelection } from '../types/grid';

interface UsePixelPurchaseReturn {
  isLoading: boolean;
  error: string | null;
  purchase: (
    selection: GridSelection, 
    imageData: string | null, 
    link: string,
    color: string | null,
    totalPrice: number
  ) => Promise<void>;
}

export const usePixelPurchase = (): UsePixelPurchaseReturn => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { updatePixels, loadPixels } = useGridStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const purchase = useCallback(async (
    selection: GridSelection,
    imageData: string | null,
    link: string,
    color: string | null,
    totalPrice: number
  ) => {
    if (!wallet.connected || !wallet.publicKey) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // First process the blockchain transaction
      const result = await purchasePixelsOnChain(connection, wallet, selection, totalPrice);

      if (result.success) {
        // Then update the database
        await purchasePixelsDB(
          selection,
          wallet.publicKey.toBase58(),
          imageData,
          link || null,
          color,
          totalPrice
        );

        // Reload all pixels to get the latest state
        await loadPixels();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Transaction failed. Please try again.');
      }
      console.error('Purchase failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, [connection, wallet, updatePixels, loadPixels]);

  return { isLoading, error, purchase };
};