import { Connection, PublicKey } from '@solana/web3.js';

export const SOLANA_NETWORK = 'mainnet-beta';
export const SOLANA_ENDPOINT = 'https://rough-holy-frog.solana-mainnet.quiknode.pro/3f7d8dd199cea4d55fc900418d9095fc16cda8b7';

// Production receiving wallet
export const GRID_AUTHORITY = new PublicKey('BmNdmW8h3v9rQszzXoEU5SUqDo72pctrkHS32DembdZF');

// Base price for new pixels (0.001 SOL)
export const PIXEL_PRICE = 0.001;

// RPC Configuration
export const RPC_CONFIG = {
  commitment: 'confirmed' as const,
  wsEndpoint: SOLANA_ENDPOINT.replace('https', 'wss'),
  confirmTransactionInitialTimeout: 60000,
  disableRetryOnRateLimit: false,
  httpHeaders: {}
};

// Create a configured connection
export const getConnection = () => new Connection(SOLANA_ENDPOINT, RPC_CONFIG);