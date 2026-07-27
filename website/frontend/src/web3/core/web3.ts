import { BrowserProvider, JsonRpcProvider } from 'ethers';
import { ACTIVE_NETWORK } from './config';

class Web3Manager {
  private rpcProvider: JsonRpcProvider | null = null;
  private browserProvider: BrowserProvider | null = null;

  // Always available (Read-only via RPC)
  getRpcProvider(): JsonRpcProvider {
    if (!this.rpcProvider) {
      this.rpcProvider = new JsonRpcProvider(ACTIVE_NETWORK.rpcUrl);
    }
    return this.rpcProvider;
  }

  // Only available if wallet is connected (Read/Write)
  async getBrowserProvider(): Promise<BrowserProvider> {
    if (!window.ethereum) {
      throw new Error('No injected Web3 wallet found.');
    }
    if (!this.browserProvider) {
      this.browserProvider = new BrowserProvider(window.ethereum);
    }
    return this.browserProvider;
  }
}

export const web3Manager = new Web3Manager();
