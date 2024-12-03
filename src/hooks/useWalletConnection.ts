import { useCallback, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletError,
  WalletNotConnectedError,
} from "@solana/wallet-adapter-base";
import {
  verifyDomainSignature,
  createVerificationPayload,
} from "../utils/solana/verification";

export const useWalletConnection = () => {
  const { connected, connecting, connect, disconnect, wallet, publicKey } =
    useWallet();
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [lastError, setLastError] = useState<Error | null>(null);

  const clearError = useCallback(() => {
    setLastError(null);
  }, []);

  const handleConnect = useCallback(async () => {
    try {
      clearError();
      if (!connected && !connecting) {
        if (!wallet) {
          throw new Error("Please install and select a Solana wallet");
        }

        // Verify domain before connecting
        const verificationPayload = await createVerificationPayload(
          window.location.hostname
        );
        const isVerified = await verifyDomainSignature(verificationPayload);

        if (!isVerified) {
          throw new Error("Domain verification failed. Please try again.");
        }

        await connect();
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);

      let errorMessage = "Failed to connect wallet. Please try again.";

      if (error instanceof WalletError) {
        switch (error.name) {
          case "WalletNotFoundError":
            errorMessage = "Please install a Solana wallet extension";
            break;
          case "WalletConnectionError":
            errorMessage = "Failed to connect to wallet. Please try again";
            break;
          case "WalletNotSelectedError":
            errorMessage = "Please select a wallet to continue";
            break;
          case "WalletLoadError":
            errorMessage = "Failed to load wallet. Please refresh the page";
            break;
          case "WalletTimeoutError":
            errorMessage = "Wallet connection timed out. Please try again";
            break;
          case "WalletWindowClosedError":
            errorMessage = "Wallet window was closed. Please try again";
            break;
          case "WalletDisconnectedError":
            errorMessage = "Wallet was disconnected. Please reconnect";
            break;
          default:
            errorMessage = error.message || "Failed to connect wallet";
        }
      } else if (error instanceof WalletNotConnectedError) {
        errorMessage = "Wallet is not connected. Please connect first";
      }

      const enhancedError = new Error(errorMessage);
      setLastError(enhancedError);
      throw enhancedError;
    }
  }, [connect, connected, connecting, wallet, clearError]);

  const handleDisconnect = useCallback(async () => {
    try {
      clearError();
      if (connected) {
        await disconnect();
      }
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to disconnect wallet";
      const enhancedError = new Error(errorMessage);
      setLastError(enhancedError);
      throw enhancedError;
    }
  }, [disconnect, connected, clearError]);

  // Auto-reconnect on page load if previously connected
  useEffect(() => {
    let reconnectTimeout: NodeJS.Timeout;
    let retryCount = 0;
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 2000;

    const attemptReconnect = async () => {
      if (wallet && !connected && !connecting && !isReconnecting) {
        setIsReconnecting(true);
        try {
          // Verify domain before reconnecting
          const verificationPayload = await createVerificationPayload(
            window.location.hostname
          );
          const isVerified = await verifyDomainSignature(verificationPayload);

          if (!isVerified) {
            throw new Error("Domain verification failed during reconnection");
          }

          await connect();
          retryCount = 0; // Reset retry count on successful connection
        } catch (error) {
          console.error("Auto-reconnect failed:", error);
          if (retryCount < MAX_RETRIES) {
            retryCount++;
            reconnectTimeout = setTimeout(
              attemptReconnect,
              RETRY_DELAY * retryCount
            );
          }
        } finally {
          setIsReconnecting(false);
        }
      }
    };

    attemptReconnect();

    return () => {
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, [wallet, connected, connecting, connect, isReconnecting]);

  return {
    connected,
    connecting: connecting || isReconnecting,
    connect: handleConnect,
    disconnect: handleDisconnect,
    wallet,
    publicKey,
    error: lastError,
    clearError,
  };
};
