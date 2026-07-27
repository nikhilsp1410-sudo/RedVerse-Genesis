import { createContext, useState, useEffect, useCallback } from 'react';
import { providerService } from '../services/providerService';
import Toast from '@/components/ui/Toast';

// eslint-disable-next-line react-refresh/only-export-components
export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(true);

  const checkNetwork = async () => {
    try {
      const correct = await providerService.checkNetwork();
      setIsCorrectNetwork(correct);
      return correct;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to connect.');
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      
      const correctNetwork = await checkNetwork();
      if (!correctNetwork) {
        await providerService.switchNetwork();
        setIsCorrectNetwork(true);
      }
    } catch (err) {
      let msg = 'Failed to connect wallet';
      if (err.code === 4001) msg = 'Connection rejected by user.';
      else if (err.code === -32002) msg = 'Connection request already pending. Please open MetaMask.';
      else if (err.message) msg = err.message;
      
      setError(msg);
      console.error(err);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setAccount(null);
  }, []);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            await checkNetwork();
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    checkConnection();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      });
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  return (
    <Web3Context.Provider
      value={{
        account,
        isConnecting,
        error,
        isCorrectNetwork,
        connectWallet,
        disconnectWallet,
        switchNetwork: async () => {
          await providerService.switchNetwork();
          setIsCorrectNetwork(true);
        }
      }}
    >
      {children}
      <Toast 
        isVisible={!!error} 
        onClose={() => setError(null)} 
        type="error" 
        message={error} 
      />
    </Web3Context.Provider>
  );
};
