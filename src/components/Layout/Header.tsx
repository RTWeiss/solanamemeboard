import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Sticker } from 'lucide-react';

export const Header: React.FC = () => {
  const { connected } = useWallet();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sticker className="w-6 h-6 text-secondary shrink-0" />
          <span className="text-lg sm:text-xl font-bold text-secondary whitespace-nowrap">
            MEMEGRID
          </span>
        </div>
        <WalletMultiButton className="!py-2 !px-3 sm:!px-4 text-sm sm:text-base" />
      </div>
    </header>
  );
};
