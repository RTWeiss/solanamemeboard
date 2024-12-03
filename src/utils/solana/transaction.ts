import {
  Connection,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { GRID_AUTHORITY } from "../../config/solana";
import { GridSelection } from "../../types/grid";
import {
  ERROR_MESSAGES,
  TRANSACTION_DEFAULTS,
  TransactionResult,
} from "./config";
import { confirmTransaction } from "./confirmation";
import { checkBalance } from "./balance";

export async function purchasePixels(
  connection: Connection,
  wallet: WalletContextState,
  selection: GridSelection,
  totalPrice: number
): Promise<TransactionResult> {
  if (!wallet.publicKey || !wallet.signTransaction) {
    throw new Error(ERROR_MESSAGES.WALLET_NOT_CONNECTED);
  }

  try {
    // Check wallet balance
    await checkBalance(connection, wallet.publicKey, totalPrice);

    // Create transfer instruction
    const transferInstruction = SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: GRID_AUTHORITY,
      lamports: Math.floor(totalPrice * LAMPORTS_PER_SOL),
    });

    // Create transaction
    const transaction = new Transaction().add(transferInstruction);

    // Get latest blockhash
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash(
        TRANSACTION_DEFAULTS.PREFLIGHT_COMMITMENT
      );

    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet.publicKey;

    // Sign and send transaction
    const signed = await wallet.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signed.serialize());

    // Confirm transaction
    const confirmation = await confirmTransaction(
      connection,
      signature,
      blockhash,
      lastValidBlockHeight
    );

    if (!confirmation.success) {
      throw confirmation.error || new Error(ERROR_MESSAGES.TRANSACTION_FAILED);
    }

    return {
      signature,
      success: true,
    };
  } catch (error) {
    console.error("Transaction error:", error);
    throw error instanceof Error
      ? error
      : new Error(ERROR_MESSAGES.TRANSACTION_FAILED);
  }
}
