import { BrowserProvider, JsonRpcProvider } from 'ethers';
import { web3Config } from '../config';

class ProviderService {
  constructor() {
    this.provider = null;
    this.signer = null;
  }

  async getProvider() {
    if (window.ethereum) {
      this.provider = new BrowserProvider(window.ethereum);
    } else {
      this.provider = new JsonRpcProvider(web3Config.network.rpcUrl);
    }
    return this.provider;
  }

  async getSigner() {
    if (!this.provider) {
      await this.getProvider();
    }
    if (window.ethereum) {
      this.signer = await this.provider.getSigner();
      return this.signer;
    }
    throw new Error('MetaMask is not installed.');
  }

  async checkNetwork() {
    if (!window.ethereum) return false;
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    return chainId.toLowerCase() === web3Config.network.chainIdHex.toLowerCase();
  }

  async switchNetwork() {
    if (!window.ethereum) throw new Error('MetaMask is not installed.');
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3Config.network.chainIdHex }],
      });
      return true;
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: web3Config.network.chainIdHex,
                chainName: web3Config.network.name,
                rpcUrls: [web3Config.network.rpcUrl],
                nativeCurrency: web3Config.network.currency,
                blockExplorerUrls: [web3Config.network.blockExplorer],
              },
            ],
          });
          return true;
        } catch (addError) {
          throw new Error('Failed to add the Polygon network to your wallet.', { cause: addError });
        }
      }
      throw new Error('Failed to switch to the Polygon network.', { cause: switchError });
    }
  }
}

export const providerService = new ProviderService();
