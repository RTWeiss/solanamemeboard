import { Connection, Commitment } from '@solana/web3.js';
import { SOLANA_ENDPOINT } from '../../config/solana';

let connection: Connection | null = null;

export function getConnection(commitment: Commitment = 'confirmed'): Connection {
  if (!connection) {
    connection = new Connection(SOLANA_ENDPOINT, {
      commitment,
      confirmTransactionInitialTimeout: 60000,
      wsEndpoint: SOLANA_ENDPOINT.replace('https', 'wss'),
    });
  }
  return connection;
}

export function resetConnection(): void {
  connection = null;
}