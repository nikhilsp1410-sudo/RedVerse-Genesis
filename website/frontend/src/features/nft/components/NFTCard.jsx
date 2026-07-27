import { useState } from 'react';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const NFTCard = ({ nft, onClick }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const isRevealed = nft.attributes.some(a => a.trait_type !== 'Status');
  const civTrait = nft.attributes.find(a => a.trait_type === 'Civilization');
  
  // Determine rarity glow color
  const rarityColors = {
    'Neon Syndicate': 'rgba(217,4,41,0.5)',
    'Aether Monks': 'rgba(0,196,159,0.5)',
    'Cyber Knights': 'rgba(255,187,40,0.5)',
    'Void Walkers': 'rgba(255,128,66,0.5)',
    'Unknown': 'rgba(160,160,160,0.5)'
  };
  const glowColor = isRevealed && civTrait ? rarityColors[civTrait.value] || 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)';

  return (
    <Card 
      interactive 
      className="group h-full cursor-pointer flex flex-col relative" 
      onClick={() => onClick(nft)}
      style={{ '--card-glow': glowColor }}
    >
      {/* Animated Rarity Border Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" style={{ boxShadow: `inset 0 0 0 1px ${glowColor}, 0 0 30px ${glowColor}` }} />

      <div className="aspect-square bg-surface-light border-b border-white/5 flex items-center justify-center relative overflow-hidden">
        
        {/* Placeholder Gradient representing image load state */}
        <div className={`absolute inset-0 bg-gradient-to-br ${isRevealed ? 'from-dark via-primary/20 to-secondary/20' : 'from-surface via-surface-light to-dark'} transition-opacity duration-700 ${imgLoaded ? 'opacity-0' : 'opacity-100'}`} />
        
        {/* Real Image Tag */}
        {isRevealed && (
           <img 
             src={nft.image ? nft.image.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/') : `https://gateway.pinata.cloud/ipfs/QmFinalProductionMetadataCID22222222222/revealed_${nft.tokenId}.png`} 
             alt={`RedVerse Genesis #${nft.tokenId}`}
             loading="lazy"
             onLoad={() => setImgLoaded(true)}
             className={`absolute inset-0 w-full h-full object-cover mix-blend-overlay pointer-events-none transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
           />
        )}

        {!isRevealed && (
          <span className="text-text-muted/50 font-heading text-sm tracking-widest z-10 animate-pulse">AWAITING REVEAL</span>
        )}
      </div>
      
      <div className="p-5 flex-1 flex flex-col z-10 relative">
        <h3 className="text-lg font-bold font-heading mb-1">{nft.name}</h3>
        <p className="text-sm text-text-muted mb-4 line-clamp-2 flex-1">{nft.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          {isRevealed ? (
            <Badge variant="secondary" className="truncate max-w-[120px] shadow-sm shadow-black/50">{civTrait?.value}</Badge>
          ) : (
            <Badge variant="default">Unrevealed</Badge>
          )}
          <span className="text-xs font-bold text-white/50 bg-white/5 px-2 py-1 rounded-md">#{nft.tokenId}</span>
        </div>
      </div>
    </Card>
  );
};

export default NFTCard;
