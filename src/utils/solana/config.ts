import { TransactionSignature } from "@solana/web3.js";

export const TRANSACTION_DEFAULTS = {
  CONFIRMATION_TIMEOUT: 30000, // 30 seconds
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
  PREFLIGHT_COMMITMENT: "confirmed" as const,
};

export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: "Please connect your wallet to continue",
  INSUFFICIENT_BALANCE: (required: number) =>
    `Insufficient SOL. Required: ${required} SOL`,
  TRANSACTION_TIMEOUT: "Transaction timed out. Please try again",
  MAX_RETRIES_EXCEEDED: "Transaction failed after multiple attempts",
  TRANSACTION_FAILED: "Transaction failed. Please try again",
  CONFIRMATION_FAILED: "Transaction confirmation failed",
  INVALID_WALLET: "Invalid wallet configuration",
  USER_REJECTED: "Transaction was rejected by user",
};

export interface TransactionResult {
  signature: TransactionSignature;
  success: boolean;
}

export interface TransactionError extends Error {
  code?: number;
  logs?: string[];
}

export interface ConfirmationResult {
  value: { err: any } | null;
  success: boolean;
  error?: Error;
}
