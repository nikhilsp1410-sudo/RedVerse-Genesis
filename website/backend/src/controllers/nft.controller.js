// Stateless ERC721 Metadata Generator

const civilizations = ['Neon Syndicate', 'Aether Monks', 'Cyber Knights', 'Void Walkers', 'Chrono Weavers', 'Solari', 'Unknown'];

const seededRandom = (seed) => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

const generateMetadata = (tokenId) => {
  const isRevealed = seededRandom(tokenId) > 0.3; // 70% revealed
  const civilization = civilizations[Math.floor(seededRandom(tokenId * 2) * civilizations.length)];
  
  return {
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

const getGenesisCollection = async (req, res, next) => {
  try {
    // In a fully stateless world where the backend doesn't connect to the chain (for speed),
    // we would either require a pagination limit or redirect this to a subgraph/RPC directly.
    // For now, we return a 400 since /collection isn't standard ERC721 behavior, 
    // and frontend handles pagination via its own contract queries.
    res.status(400).json({
      success: false,
      message: 'Use the /nfts/:id endpoint for ERC721 metadata. Bulk fetching should be done via contract/indexer.',
    });
  } catch (error) {
    next(error);
  }
};

const getNftById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tokenId = parseInt(id);

    if (isNaN(tokenId) || tokenId <= 0 || tokenId > 8888) {
      return res.status(404).json({ success: false, message: 'NFT not found' });
    }

    const metadata = generateMetadata(tokenId);
    
    // ERC721 standard expects just the JSON object natively (no success wrapper).
    res.status(200).json(metadata);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGenesisCollection,
  getNftById,
};
