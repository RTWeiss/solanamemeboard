import { Connection, TransactionSignature } from "@solana/web3.js";
import { TRANSACTION_DEFAULTS, ConfirmationResult } from "./config";

export async function confirmTransaction(
  connection: Connection,
  signature: TransactionSignature,
  blockhash: string,
  lastValidBlockHeight: number
): Promise<ConfirmationResult> {
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
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Transaction confirmation timeout")),
          TRANSACTION_DEFAULTS.CONFIRMATION_TIMEOUT
        )
      ),
    ]);

    return {
      value: confirmation.value,
      success: !confirmation.value.err,
    };
  } catch (error) {
    return {
      value: null,
      success: false,
      error:
        error instanceof Error
          ? error
          : new Error("Unknown confirmation error"),
    };
  }
}
