import { useState, useCallback } from 'react';
import { contractService } from '../services/contractService';
import { transactionService } from '../services/transactionService';

export const useMint = () => {
  const [isTransacting, setIsTransacting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [error, setError] = useState(null);

  const mint = useCallback(async (quantity) => {
    setIsTransacting(true);
    setIsConfirming(false);
    setError(null);
    setTxHash(null);
    
    try {
      const pricePerItem = await contractService.getMintPrice();
      if (!pricePerItem) throw new Error('Failed to fetch mint price');
      
      const tx = await contractService.mintNFT(quantity, pricePerItem);
      setTxHash(tx.hash);
      setIsConfirming(true);
      
      const { success, error: txError } = await transactionService.waitForTransaction(tx);
      
      if (!success) {
        setError(txError);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Minting error:', err);
      setError(err.message || 'An unexpected error occurred.');
      return false;
    } finally {
      setIsTransacting(false);
    }
  }, []);

  return {
    mint,
    isTransacting,
    isConfirming,
    txHash,
    error,
    clearError: () => setError(null)
  };
};
