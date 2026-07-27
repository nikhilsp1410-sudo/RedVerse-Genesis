import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getReadOnlyContract } from '../core/contract';

export interface LiveNFTData {
  owner: string | null;
  tokenURI: string | null;
  name: string | null;
  symbol: string | null;
  royaltyReceiver: string | null;
  royaltyAmount: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useLiveNFT = (tokenId: number | string): LiveNFTData => {
  const [data, setData] = useState<LiveNFTData>({
    owner: null,
    tokenURI: null,
    name: null,
    symbol: null,
    royaltyReceiver: null,
    royaltyAmount: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchLiveNFTData = async () => {
      try {
        const contract = getReadOnlyContract();
        
        // Parallel fetching for performance
        const [
          nameRes, 
          symbolRes, 
          ownerRes, 
          tokenURIRes, 
          royaltyRes
        ] = await Promise.allSettled([
          contract.name(),
          contract.symbol(),
          contract.ownerOf(tokenId),
          contract.tokenURI(tokenId),
          // Simulating a 1 ETH sale to get royalty amounts
          contract.royaltyInfo(tokenId, ethers.parseEther("1"))
        ]);

        if (isMounted) {
          setData({
            name: nameRes.status === 'fulfilled' ? nameRes.value : null,
            symbol: symbolRes.status === 'fulfilled' ? symbolRes.value : null,
            owner: ownerRes.status === 'fulfilled' ? ownerRes.value : null,
            tokenURI: tokenURIRes.status === 'fulfilled' ? tokenURIRes.value : null,
            royaltyReceiver: royaltyRes.status === 'fulfilled' ? royaltyRes.value[0] : null,
            royaltyAmount: royaltyRes.status === 'fulfilled' ? ethers.formatEther(royaltyRes.value[1]) : null,
            isLoading: false,
            error: null
          });
        }
      } catch (err: any) {
        if (isMounted) {
          setData(prev => ({ ...prev, isLoading: false, error: err.message || 'Failed to fetch NFT data' }));
        }
      }
    };

    if (tokenId !== undefined && tokenId !== null) {
      setData(prev => ({ ...prev, isLoading: true, error: null }));
      fetchLiveNFTData();
    }

    return () => {
      isMounted = false;
    };
  }, [tokenId]);

  return data;
};
