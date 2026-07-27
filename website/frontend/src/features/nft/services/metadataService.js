import { contractService } from '@/web3';

// Placeholder for IPFS integration. 
// Generates mock metadata mimicking an IPFS ERC721 JSON response.

const civilizations = ['Neon Syndicate', 'Aether Monks', 'Cyber Knights', 'Void Walkers', 'Chrono Weavers', 'Solari', 'Unknown'];

const seededRandom = (seed) => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

const fetchMockMetadata = async (tokenId) => {
  // Simulate network delay and occasional random failure (to test retry)
  await new Promise(resolve => setTimeout(resolve, 100));
  if (Math.random() < 0.05) throw new Error("Simulated network failure");

  const isRevealed = seededRandom(tokenId) > 0.3; // 70% revealed
  const civilization = civilizations[Math.floor(seededRandom(tokenId * 2) * civilizations.length)];
  
  return {
    tokenId,
    name: `RedVerse Genesis #${tokenId}`,
    description: isRevealed 
      ? `A unique entity belonging to the ${civilization}. Forged in the anomaly.`
      : 'An encrypted entity. Its true form remains hidden in the void.',
    image: isRevealed 
      ? `ipfs://QmFinalProductionMetadataCID22222222222/revealed_${tokenId}.png`
      : `ipfs://QmFinalProductionMetadataCID22222222222/unrevealed.gif`,
    attributes: isRevealed ? [
      { trait_type: 'Civilization', value: civilization },
      { trait_type: 'Power Level', value: Math.floor(seededRandom(tokenId * 3) * 100) + 1 },
      { trait_type: 'Class', value: 'Genesis' },
      { trait_type: 'Weapon', value: ['Plasma Blade', 'Void Staff', 'Cyber Gauntlet', 'None'][Math.floor(seededRandom(tokenId * 4) * 4)] }
    ] : [
      { trait_type: 'Status', value: 'Unrevealed' }
    ]
  };
};

// Retry wrapper with exponential backoff
const withRetry = async (fn, retries = 3, delay = 500) => {
  try {
    return await fn();
  } catch (err) {
    if (retries <= 0) throw err;
    await new Promise(res => setTimeout(res, delay));
    return withRetry(fn, retries - 1, delay * 2);
  }
};

export const metadataService = {
  // Fetches a paginated chunk of metadata based on the live smart contract supply
  async fetchMetadataPage(page, limit) {
    const totalSupply = await contractService.getTotalSupply();
    if (totalSupply === 0) return { data: [], totalCount: 0 };

    const startIndex = (page - 1) * limit + 1; // Token IDs start at 1
    const endIndex = Math.min(startIndex + limit - 1, totalSupply);
    
    if (startIndex > totalSupply) return { data: [], totalCount: totalSupply };

    const tokenIds = Array.from({ length: endIndex - startIndex + 1 }, (_, i) => startIndex + i);
    const data = await Promise.all(
      tokenIds.map(id => withRetry(() => fetchMockMetadata(id)))
    );

    return { data, totalCount: totalSupply };
  },

  // Simulates resolving a specific IPFS URI
  async resolveTokenURI(tokenURI) {
    const id = Number(tokenURI.split('/').pop());
    return withRetry(() => fetchMockMetadata(id));
  }
};
