import { useContext } from 'react';
import { Web3Context } from '../providers/Web3Provider';

export const useWallet = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWallet must be used within a Web3Provider');
  }
  
  const { account, isConnecting, error, connectWallet, disconnectWallet } = context;
  
  const shortAddress = account 
    ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
    : '';

  return {
    account,
    shortAddress,
    isConnected: !!account,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet
  };
};
