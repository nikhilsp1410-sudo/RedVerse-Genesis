import { useState, useEffect } from 'react';
import { getReadOnlyContract } from '../core/contract';
import { resolveIPFS } from '../../utils/ipfs';
import { DynamicNFT } from './useDynamicGallery';

export const useDynamicNFT = (idStr: string | undefined) => {
  const [nft, setNft] = useState<DynamicNFT | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    if (!idStr) {
       setIsLoading(false);
       return;
    }

    const fetchNFT = async () => {
      try {
        const id = parseInt(idStr);
        if (isNaN(id)) throw new Error("Invalid ID");

        const contract = getReadOnlyContract();
        
        // Fetch URI and Owner
        const uri = await contract.tokenURI(id).catch(() => null);
        const owner = await contract.ownerOf(id).catch(() => null);

        if (!uri) {
           throw new Error("Artifact not found on ledger");
        }

        const httpUrl = resolveIPFS(uri);
        const response = await fetch(httpUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        if (isMounted) {
          const attrMap: Record<string, string> = {};
          if (Array.isArray(data.attributes)) {
            data.attributes.forEach((attr: any) => {
              if (attr.trait_type && attr.value) {
                attrMap[attr.trait_type] = attr.value;
              }
            });
          }

          setNft({
            id,
            ownerAddress: owner,
            name: data.name || `Guardian #${id}`,
            description: data.description || '',
            image: resolveIPFS(data.image),
            attributes: attrMap,
            rawAttributes: data.attributes || []
          });
          setIsLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Failed to load NFT data');
          setIsLoading(false);
        }
      }
    };

    fetchNFT();

    return () => {
      isMounted = false;
    };
  }, [idStr]);

  return { nft, isLoading, error };
};
