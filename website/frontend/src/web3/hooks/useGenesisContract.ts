import { useState, useEffect } from 'react';
import { getReadOnlyContract } from '../core/contract';

export interface GenesisData {
  totalSupply: number;
  maxSupply: number;
  ownershipMap: Record<number, string>; // tokenId -> ownerAddress
  isDeployed: boolean;
  contractURI: string | null;
  paused: boolean;
  owner: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useGenesisContract = (): GenesisData => {
  const [data, setData] = useState<GenesisData>({
    totalSupply: 0,
    maxSupply: 20, // Hardcoded for this specific collection
    ownershipMap: {},
    isDeployed: false,
    contractURI: null,
    paused: false,
    owner: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchCollectionData = async () => {
      try {
        const contract = getReadOnlyContract();
        
        // Check if contract is deployed by checking code
        const code = await contract.runner?.provider?.getCode(contract.target) || await contract.provider?.getCode(contract.target);
        
        if (!code || code === '0x') {
           if (isMounted) {
             setData(prev => ({ ...prev, isDeployed: false, isLoading: false }));
           }
           return;
        }
        
        // Since max supply is exactly 20, we can fetch all owners in parallel
        // If ownerOf reverts, the token is not minted yet.
        const tokenIds = Array.from({ length: 20 }, (_, i) => i + 1);
        
        const ownerPromises = tokenIds.map(id => contract.ownerOf(id).catch(() => null));
        
        const [owners, contractURI, paused, contractOwner, totalMinted] = await Promise.all([
           Promise.all(ownerPromises),
           contract.contractURI().catch(() => null),
           contract.paused().catch(() => false),
           contract.owner().catch(() => null),
           contract.totalMinted().catch(() => 0)
        ]);
        
        if (isMounted) {
          const map: Record<number, string> = {};
          
          owners.forEach((owner, idx) => {
            if (owner) {
              map[tokenIds[idx]] = owner.toLowerCase();
            }
          });

          setData({
            totalSupply: Number(totalMinted) || Object.keys(map).length,
            maxSupply: 20,
            ownershipMap: map,
            isDeployed: true,
            contractURI: contractURI,
            paused: paused,
            owner: contractOwner,
            isLoading: false,
            error: null
          });
        }
      } catch (err: any) {
        if (isMounted) {
          setData(prev => ({ ...prev, isLoading: false, error: err.message || 'Failed to sync with ledger' }));
        }
      }
    };

    fetchCollectionData();

    return () => {
      isMounted = false;
    };
  }, []);

  return data;
};
