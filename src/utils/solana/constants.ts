export const TRANSACTION_DEFAULTS = {
  CONFIRMATION_TIMEOUT: 30000, // 30 seconds
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
  PREFLIGHT_COMMITMENT: 'confirmed' as const,
};

export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet to continue',
  INSUFFICIENT_BALANCE: (required: number) => `Insufficient SOL. Required: ${required} SOL`,
  TRANSACTION_TIMEOUT: 'Transaction timed out. Please try again',
  MAX_RETRIES_EXCEEDED: 'Transaction failed after multiple attempts',
  SIMULATION_FAILED: 'Transaction simulation failed. Please try again',
};