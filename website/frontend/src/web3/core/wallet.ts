import { ACTIVE_NETWORK } from './config';

export const checkNetwork = async (): Promise<boolean> => {
  if (!window.ethereum) return false;
  try {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    return chainId.toLowerCase() === ACTIVE_NETWORK.chainIdHex.toLowerCase();
  } catch (err) {
    console.error('Error checking network:', err);
    return false;
  }
};

export const switchNetwork = async (): Promise<boolean> => {
  if (!window.ethereum) throw new Error('No web3 wallet detected.');
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: ACTIVE_NETWORK.chainIdHex }],
    });
    return true;
  } catch (error: any) {
    // Error code 4902 indicates that the chain has not been added to MetaMask.
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: ACTIVE_NETWORK.chainIdHex,
              chainName: ACTIVE_NETWORK.name,
              rpcUrls: [ACTIVE_NETWORK.rpcUrl],
              nativeCurrency: ACTIVE_NETWORK.currency,
              blockExplorerUrls: [ACTIVE_NETWORK.blockExplorer],
            },
          ],
        });
        return true;
      } catch (addError) {
        throw new Error('Failed to add the network to your wallet.');
      }
    }
    throw new Error('Failed to switch networks.');
  }
};
