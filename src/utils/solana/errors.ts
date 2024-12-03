import { WalletError } from "@solana/wallet-adapter-base";
import { TransactionError } from "./types";
import { ERROR_MESSAGES } from "./constants";

export class SolanaTransactionError extends Error implements TransactionError {
  code?: number;
  logs?: string[];

  constructor(message: string, code?: number, logs?: string[]) {
    super(message);
    this.name = "SolanaTransactionError";
    this.code = code;
    this.logs = logs;
  }
}

export const handleTransactionError = (error: unknown): Error => {
  console.error("Transaction error details:", error);

  // Handle wallet adapter specific errors
  if (error instanceof WalletError) {
    switch (error.name) {
      case "WalletConnectionError":
        return new Error("Failed to connect to wallet. Please try again.");
      case "WalletSignTransactionError":
        return new Error(
          "Transaction was cancelled. Please try again if you want to proceed."
        );
      case "WalletNotConnectedError":
        return new Error("Please connect your wallet to continue.");
      default:
        return new Error(
          error.message || "Wallet error occurred. Please try again."
        );
    }
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    if (message.includes("invalid public key")) {
      return new SolanaTransactionError("Invalid wallet address configuration");
    }

    if (
      message.includes("insufficient lamports") ||
      message.includes("insufficient funds")
    ) {
      return new SolanaTransactionError("Insufficient SOL in your wallet");
    }

    if (
      message.includes("user rejected") ||
      message.includes("user cancelled")
    ) {
      return new SolanaTransactionError("Transaction was cancelled by user");
    }

    if (
      message.includes("blockhash not found") ||
      message.includes("block height exceeded")
    ) {
      return new SolanaTransactionError(ERROR_MESSAGES.TRANSACTION_TIMEOUT);
    }

    if (message.includes("transaction simulation failed")) {
      return new SolanaTransactionError(ERROR_MESSAGES.SIMULATION_FAILED);
    }

    if (message.includes("domain verification failed")) {
      return new SolanaTransactionError(
        "Failed to verify domain. Please try again."
      );
    }

    return error;
  }

  return new SolanaTransactionError("Transaction failed. Please try again");
};
