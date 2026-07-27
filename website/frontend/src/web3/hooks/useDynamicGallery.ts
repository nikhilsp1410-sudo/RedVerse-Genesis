import { useState, useEffect } from 'react';
import { getReadOnlyContract } from '../core/contract';
import { resolveIPFS } from '../../utils/ipfs';

export interface DynamicNFT {
  id: number;
  ownerAddress: string | null;
  name: string;
  description: string;
  image: string;
  attributes: Record<string, string>;
  rawAttributes: any[];
}

export const useDynamicGallery = () => {
  const [nfts, setNfts] = useState<DynamicNFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchGallery = async () => {
      try {
        const contract = getReadOnlyContract();
        
        // Check if contract is deployed
        const code = await contract.runner?.provider?.getCode(contract.target) || await contract.provider?.getCode(contract.target);
        if (!code || code === '0x') {
           if (isMounted) {
             setIsLoading(false);
             setError('Contract not deployed on this network.');
           }
           return;
        }

        const totalMintedBN = await contract.totalMinted().catch(() => 0n);
        const totalMinted = Number(totalMintedBN);

        if (totalMinted === 0) {
          if (isMounted) {
            setNfts([]);
            setIsLoading(false);
          }
          return;
        }

        const tokenIds = Array.from({ length: totalMinted }, (_, i) => i + 1);
        
        // Fetch all URIs and Owners in parallel
        const uriPromises = tokenIds.map(id => contract.tokenURI(id).catch(() => null));
        const ownerPromises = tokenIds.map(id => contract.ownerOf(id).catch(() => null));

        const uris = await Promise.all(uriPromises);
        const owners = await Promise.all(ownerPromises);

        // Fetch all JSON metadata in parallel
        const metadataPromises = uris.map(async (uri, index) => {
          if (!uri) return null;
          try {
            const httpUrl = resolveIPFS(uri);
            const response = await fetch(httpUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return {
              id: tokenIds[index],
              owner: owners[index],
              metadata: data
            };
          } catch (err) {
            console.error(`Failed to fetch metadata for token ${tokenIds[index]}:`, err);
            return null;
          }
        });

        const metadataResults = await Promise.all(metadataPromises);

        if (isMounted) {
          const formattedNfts: DynamicNFT[] = metadataResults
            .filter((res) => res !== null)
            .map((res: any) => {
              // Convert attributes array to a key-value map for easier rendering
              const attrMap: Record<string, string> = {};
              if (Array.isArray(res.metadata.attributes)) {
                res.metadata.attributes.forEach((attr: any) => {
                  if (attr.trait_type && attr.value) {
                    attrMap[attr.trait_type] = attr.value;
                  }
                });
              }

              return {
                id: res.id,
                ownerAddress: res.owner,
                name: res.metadata.name || `Guardian #${res.id}`,
                description: res.metadata.description || '',
                image: resolveIPFS(res.metadata.image),
                attributes: attrMap,
                rawAttributes: res.metadata.attributes || []
              };
            });

          setNfts(formattedNfts);
          setIsLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Failed to load gallery');
          setIsLoading(false);
        }
      }
    };

    fetchGallery();

    return () => {
      isMounted = false;
    };
  }, []);

  return { nfts, isLoading, error };
};
