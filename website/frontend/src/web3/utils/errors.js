export const parseWeb3Error = (err) => {
  if (!err) return 'An unknown error occurred.';
  
  if (typeof err === 'string') return err;

  // Ethers/MetaMask specific errors
  if (err.code === 4001 || err.code === 'ACTION_REJECTED') {
    return 'Transaction was rejected by the user.';
  }
  if (err.code === -32603 || err.code === 'UNPREDICTABLE_GAS_LIMIT') {
    return 'Transaction failed. This may be due to insufficient funds or a contract error.';
  }
  if (err.code === 4902) {
    return 'Please add the Polygon network to your wallet.';
  }

  // Contract specific revert messages
  if (err.reason) return err.reason;
  if (err.message) {
    if (err.message.includes('insufficient funds')) return 'Insufficient funds for gas or minting cost.';
    if (err.message.includes('user rejected')) return 'Transaction was rejected by the user.';
    return err.message;
  }
  
  return 'An unexpected blockchain error occurred.';
};
