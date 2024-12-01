import { Connection, TransactionSignature } from '@solana/web3.js';
import { TRANSACTION_DEFAULTS } from './constants';

export async function confirmTransaction(
  connection: Connection,
  signature: TransactionSignature,
  blockhash: string,
  lastValidBlockHeight: number
): Promise<boolean> {
  try {
    const confirmation = await Promise.race([
      connection.confirmTransaction(
        {
          signature,
          blockhash,
          lastValidBlockHeight,
        },
        TRANSACTION_DEFAULTS.PREFLIGHT_COMMITMENT
      ),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Confirmation timeout')), 
        TRANSACTION_DEFAULTS.CONFIRMATION_TIMEOUT)
      ),
    ]);

    return !confirmation.value.err;
  } catch (error) {
    console.error('Transaction confirmation failed:', error);
    return false;
  }
}