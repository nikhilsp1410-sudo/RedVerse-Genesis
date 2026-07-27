export const web3Config = {
  network: {
    chainIdHex: import.meta.env.VITE_CHAIN_ID_HEX || '0x89', // Polygon Mainnet default
    name: import.meta.env.VITE_NETWORK_NAME || 'Polygon Mainnet',
    rpcUrl: import.meta.env.VITE_RPC_URL || 'https://polygon-rpc.com',
    currency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    blockExplorer: import.meta.env.VITE_BLOCK_EXPLORER || 'https://polygonscan.com/',
  },
  contracts: {
    genesis: import.meta.env.VITE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
  }
};
