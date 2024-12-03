import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { ERROR_MESSAGES } from "./config";

export async function checkBalance(
  connection: Connection,
  publicKey: PublicKey,
  requiredAmount: number
): Promise<void> {
  const balance = await connection.getBalance(publicKey);
  const requiredLamports = requiredAmount * LAMPORTS_PER_SOL;

  if (balance < requiredLamports) {
    throw new Error(ERROR_MESSAGES.INSUFFICIENT_BALANCE(requiredAmount));
  }
}
