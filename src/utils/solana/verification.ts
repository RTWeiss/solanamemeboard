import { PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

export interface DomainVerificationPayload {
  domain: string;
  timestamp: number;
  signature: string;
}

export async function createVerificationPayload(
  domain: string
): Promise<DomainVerificationPayload> {
  const timestamp = Date.now();
  const message = new TextEncoder().encode(`${domain}:${timestamp}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", message);
  const signature = bs58.encode(new Uint8Array(hashBuffer));

  return {
    domain,
    timestamp,
    signature,
  };
}

export async function verifyDomainSignature(
  payload: DomainVerificationPayload
): Promise<boolean> {
  try {
    // Verify the domain matches
    const currentDomain = window.location.hostname;
    if (payload.domain !== currentDomain) {
      console.error("Domain mismatch:", payload.domain, currentDomain);
      return false;
    }

    // Check timestamp is within 5 minutes
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    if (Math.abs(now - payload.timestamp) > fiveMinutes) {
      console.error("Timestamp expired");
      return false;
    }

    // Verify signature
    const message = new TextEncoder().encode(
      `${payload.domain}:${payload.timestamp}`
    );
    const hashBuffer = await crypto.subtle.digest("SHA-256", message);
    const expectedSignature = bs58.encode(new Uint8Array(hashBuffer));

    return payload.signature === expectedSignature;
  } catch (error) {
    console.error("Domain verification failed:", error);
    return false;
  }
}
