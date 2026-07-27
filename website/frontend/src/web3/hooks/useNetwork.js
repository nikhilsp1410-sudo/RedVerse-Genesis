import { useContext } from 'react';
import { Web3Context } from '../providers/Web3Provider';

export const useNetwork = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useNetwork must be used within a Web3Provider');
  }
  
  const { isCorrectNetwork, switchNetwork } = context;

  return {
    isCorrectNetwork,
    switchNetwork
  };
};
