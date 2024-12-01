import { 
  Connection, 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { GRID_AUTHORITY } from '../../config/solana';
import { GridSelection } from '../../types/grid';
import { handleTransactionError } from './errors';
import { TransactionResult } from './types';
import { confirmTransaction } from './confirmation';
import { TRANSACTION_DEFAULTS, ERROR_MESSAGES } from './constants';

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function purchasePixels(
  connection: Connection,
  wallet: WalletContextState,
  selection: GridSelection,
  totalPrice: number
): Promise<TransactionResult> {
  if (!wallet.publicKey || !wallet.signTransaction) {
    throw new Error(ERROR_MESSAGES.WALLET_NOT_CONNECTED);
  }

  let retries = 0;
  
  while (retries < TRANSACTION_DEFAULTS.MAX_RETRIES) {
    try {
      // Check wallet balance
      const balance = await connection.getBalance(wallet.publicKey);
      const requiredBalance = totalPrice * LAMPORTS_PER_SOL;
      
      if (balance < requiredBalance) {
        throw new Error(ERROR_MESSAGES.INSUFFICIENT_BALANCE(totalPrice));
      }

      // Create transfer instruction
      const transferInstruction = SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: GRID_AUTHORITY,
        lamports: Math.floor(requiredBalance),
      });

      // Create and configure transaction
      const transaction = new Transaction().add(transferInstruction);
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet.publicKey;

      // Sign and send transaction
      const signed = await wallet.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signed.serialize(), {
        skipPreflight: false,
        maxRetries: 3,
        preflightCommitment: TRANSACTION_DEFAULTS.PREFLIGHT_COMMITMENT,
      });

      // Confirm transaction
      const confirmed = await confirmTransaction(
        connection,
        signature,
        blockhash,
        lastValidBlockHeight
      );

      if (confirmed) {
        return { signature, success: true };
      }

      if (retries >= TRANSACTION_DEFAULTS.MAX_RETRIES - 1) {
        throw new Error(ERROR_MESSAGES.MAX_RETRIES_EXCEEDED);
      }

      retries++;
      await sleep(TRANSACTION_DEFAULTS.RETRY_DELAY * retries);
    } catch (error) {
      if (retries >= TRANSACTION_DEFAULTS.MAX_RETRIES - 1) {
        throw handleTransactionError(error);
      }
      
      retries++;
      await sleep(TRANSACTION_DEFAULTS.RETRY_DELAY * retries);
    }
  }

  throw new Error(ERROR_MESSAGES.MAX_RETRIES_EXCEEDED);
}