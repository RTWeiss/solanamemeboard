import { TransactionError } from './types';
import { ERROR_MESSAGES } from './constants';

export class SolanaTransactionError extends Error implements TransactionError {
  code?: number;
  logs?: string[];

  constructor(message: string, code?: number, logs?: string[]) {
    super(message);
    this.name = 'SolanaTransactionError';
    this.code = code;
    this.logs = logs;
  }
}

export const handleTransactionError = (error: unknown): Error => {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    if (message.includes('invalid public key')) {
      return new SolanaTransactionError('Invalid wallet address configuration');
    }
    
    if (message.includes('insufficient lamports') || message.includes('insufficient funds')) {
      return new SolanaTransactionError('Insufficient SOL in your wallet');
    }
    
    if (message.includes('user rejected')) {
      return new SolanaTransactionError('Transaction was cancelled by user');
    }
    
    if (message.includes('blockhash not found') || message.includes('block height exceeded')) {
      return new SolanaTransactionError(ERROR_MESSAGES.TRANSACTION_TIMEOUT);
    }

    if (message.includes('transaction simulation failed')) {
      return new SolanaTransactionError(ERROR_MESSAGES.SIMULATION_FAILED);
    }

    return error;
  }
  
  return new SolanaTransactionError('Transaction failed. Please try again');
};