import { useCallback } from 'react';
import { contractService } from '../services/contractService';

export const useContract = () => {
  const fetchTotalSupply = useCallback(async () => {
    return await contractService.getTotalSupply();
  }, []);

  const fetchMintPrice = useCallback(async () => {
    return await contractService.getMintPrice();
  }, []);

  const fetchUserNFTs = useCallback(async (address) => {
    if (!address) return [];
    return await contractService.getUserNFTs(address);
  }, []);

  return {
    fetchTotalSupply,
    fetchMintPrice,
    fetchUserNFTs
  };
};
