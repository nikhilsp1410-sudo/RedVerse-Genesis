export const NETWORKS = {
  AMOY: {
    chainId: 80002,
    chainIdHex: '0x13882',
    name: 'Polygon Amoy Testnet',
    rpcUrl: import.meta.env.VITE_AMOY_RPC_URL || 'https://rpc-amoy.polygon.technology/',
    currency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    blockExplorer: 'https://amoy.polygonscan.com/',
  },
  MAINNET: {
    chainId: 137,
    chainIdHex: '0x89',
    name: 'Polygon Mainnet',
    rpcUrl: import.meta.env.VITE_MAINNET_RPC_URL || 'https://polygon-rpc.com/',
    currency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    blockExplorer: 'https://polygonscan.com/',
  }
};

// SWITCHING ENVIRONMENTS: Change ACTIVE_NETWORK and CONTRACT_ADDRESS here
export const ACTIVE_NETWORK = NETWORKS.AMOY; 

// Replace with deployed address on the active network
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";
