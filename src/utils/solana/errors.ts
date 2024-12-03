import { WalletError } from "@solana/wallet-adapter-base";
import { TransactionError, ERROR_MESSAGES } from "./config";

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

  if (error instanceof WalletError) {
    switch (error.name) {
      case "WalletConnectionError":
        return new Error("Failed to connect to wallet. Please try again.");
      case "WalletSignTransactionError":
        return new Error(ERROR_MESSAGES.USER_REJECTED);
      case "WalletNotConnectedError":
        return new Error(ERROR_MESSAGES.WALLET_NOT_CONNECTED);
      default:
        return new Error(error.message || ERROR_MESSAGES.TRANSACTION_FAILED);
    }
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    if (message.includes("invalid public key")) {
      return new SolanaTransactionError(ERROR_MESSAGES.INVALID_WALLET);
    }

    if (message.includes("insufficient")) {
      return new SolanaTransactionError(error.message);
    }

    if (message.includes("rejected") || message.includes("cancelled")) {
      return new SolanaTransactionError(ERROR_MESSAGES.USER_REJECTED);
    }

    if (message.includes("timeout") || message.includes("timed out")) {
      return new SolanaTransactionError(ERROR_MESSAGES.TRANSACTION_TIMEOUT);
    }

    return error;
  }

  return new SolanaTransactionError(ERROR_MESSAGES.TRANSACTION_FAILED);
};
