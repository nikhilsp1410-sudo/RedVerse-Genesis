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
    rpcUrl: import.meta.env.VITE_RPC_URL || 'https://polygon-mainnet.g.alchemy.com/v2/alch_Ced0K_dCEI4cUy16w4xLT',
    currency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    blockExplorer: 'https://polygonscan.com/',
  }
};

// SWITCHING ENVIRONMENTS: Change ACTIVE_NETWORK and CONTRACT_ADDRESS here
export const ACTIVE_NETWORK = NETWORKS.MAINNET; 

// Replace with deployed address on the active network
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || "0xccFD90167f47c4F890C213Cc4a4611eE91942d0B";
