import { useState, useEffect } from 'react';
import { getReadOnlyContract } from '../core/contract';

export interface DynamicGuardian {
  id: number;
  name: string;
  title: string;
  biography: string;
  moralAlignment: string;
  weapon: string;
  core: string;
  combatStyle: string;
  image: string; // IPFS image URL
  armor?: string;
  aura?: string;
  companion?: string;
  rank?: string;
  threatLevel?: string;
  realm?: string;
  motivation?: string;
  signatureAbility?: string;
  weakness?: string;
}

// List of public IPFS gateways for redundancy
const IPFS_GATEWAYS = [
  'https://gateway.pinata.cloud/ipfs/',
  'https://ipfs.io/ipfs/',
  'https://dweb.link/ipfs/',
  'https://cloudflare-ipfs.com/ipfs/',
  'https://w3s.link/ipfs/'
];

const fetchWithFallback = async (ipfsUrl: string) => {
  const hash = ipfsUrl.replace('ipfs://', '');
  
  for (const gateway of IPFS_GATEWAYS) {
    try {
      const res = await fetch(`${gateway}${hash}`, { signal: AbortSignal.timeout(8000) });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn(`Gateway ${gateway} failed for ${hash}`);
      // Ignore and try next gateway
    }
  }
  console.error(`All IPFS gateways failed for ${ipfsUrl}`);
  throw new Error('All gateways failed');
};

export const useDynamicGallery = () => {
  const [dynamicGuardians, setDynamicGuardians] = useState<DynamicGuardian[]>([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchAllNFTs = async () => {
      try {
        const contract = getReadOnlyContract();
        const tokenIds = Array.from({ length: 20 }, (_, i) => i + 1);
        
        // Fetch all URIs in parallel
        const uriPromises = tokenIds.map(id => contract.tokenURI(id).catch(() => null));
        const uris = await Promise.all(uriPromises);
        
        const metaPromises = uris.map(async (uri, index) => {
          if (!uri) return null;
          try {
            const metadata = await fetchWithFallback(uri);
            const getAttr = (traitType: string) => 
              metadata.attributes?.find((a: any) => a.trait_type === traitType)?.value || 'Unknown';
              
            const nameParts = metadata.name ? metadata.name.split(' - ') : ['Unknown', 'Unknown'];
            const imageUri = metadata.image || `ipfs://bafybeih6mrx7cuzcqqx2y77ed4ncrpcy3m5krt23z6i32j5c5imfqdrc74/${String(index + 1).padStart(3, '0')}.png`;
            const imageUrl = imageUri.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
            
            return {
              id: index + 1,
              name: nameParts[0],
              title: nameParts.length > 1 ? nameParts[1] : '',
              biography: metadata.description || '',
              moralAlignment: getAttr('Faction'),
              weapon: getAttr('Weapon'),
              core: getAttr('Core'),
              combatStyle: getAttr('Class'),
              image: imageUrl,
              armor: getAttr('Armor'),
              aura: getAttr('Aura'),
              companion: getAttr('Companion'),
              rank: getAttr('Rank'),
              threatLevel: getAttr('Threat Level'),
              realm: getAttr('Realm'),
              motivation: 'Bound by the Fracture. Driven by the Core.', 
              signatureAbility: 'Dimensional Strike', 
              weakness: 'Temporal Instability' 
            };
          } catch (e) {
            console.error(`Failed to fetch metadata for token ${index + 1}`, e);
            return null;
          }
        });
        
        const results = await Promise.all(metaPromises);
        
        if (isMounted) {
          const validGuardians = results.filter(g => g !== null) as DynamicGuardian[];
          
          // Sort by ID to ensure correct order
          validGuardians.sort((a, b) => a.id - b.id);
          
          setDynamicGuardians(validGuardians);
          setIsLoadingGallery(false);
        }
      } catch (err) {
        console.error("Failed to fetch gallery", err);
        if (isMounted) {
          setIsLoadingGallery(false);
        }
      }
    };

    fetchAllNFTs();

    return () => {
      isMounted = false;
    };
  }, []);

  return { dynamicGuardians, isLoadingGallery };
};
