import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import TraitBadge from './TraitBadge';
import { Shield, Link as LinkIcon, Database, Layers } from 'lucide-react';

const NFTDetailsModal = ({ nft, onClose }) => {
  const isRevealed = nft.attributes.some(a => a.trait_type !== 'Status');
  
  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
      {/* Left Column: High-Res Image */}
      <div className="w-full lg:w-1/2 flex flex-col">
         <div className="aspect-square bg-surface-light rounded-xl overflow-hidden border border-white/10 relative group shadow-[0_0_50px_rgba(217,4,41,0.1)]">
           <div className={`absolute inset-0 bg-gradient-to-br ${isRevealed ? 'from-dark via-primary/20 to-secondary/20' : 'from-surface via-surface-light to-dark'}`} />
           {/* Placeholder for actual image loading */}
           <motion.div 
              className="absolute inset-0 flex items-center justify-center font-heading font-bold text-3xl tracking-widest text-white/50 mix-blend-overlay pointer-events-none"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
           >
             {isRevealed ? 'REDVERSE_ASSET' : 'ENCRYPTED'}
           </motion.div>
         </div>
      </div>
      
      {/* Right Column: Metadata & Traits */}
      <div className="w-full lg:w-1/2 flex flex-col max-h-[80vh] overflow-y-auto pr-4 custom-scrollbar">
         <div className="flex items-center justify-between mb-4">
           <Badge variant="primary" className="shadow-[0_0_15px_rgba(217,4,41,0.4)]">RedVerse Genesis</Badge>
           <div className="flex gap-2">
             <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/30">Polygon</Badge>
             <Badge className="bg-teal-500/20 text-teal-400 border border-teal-500/30">IPFS</Badge>
           </div>
         </div>
         
         <h2 className="text-4xl font-heading font-black mb-2 text-glow">{nft.name}</h2>
         <p className="text-text-muted text-lg mb-8 leading-relaxed">{nft.description}</p>
         
         {/* Traits */}
         <div className="mb-8">
           <h4 className="text-sm font-bold text-white/70 uppercase tracking-widest mb-4 flex items-center gap-2">
             <Layers size={16} className="text-primary" /> Attributes
           </h4>
           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
             {nft.attributes.map((attr, idx) => (
               <motion.div 
                 key={idx}
                 whileHover={{ y: -2, scale: 1.02 }}
                 className="shadow-lg shadow-black/20"
               >
                 <TraitBadge trait={attr} />
               </motion.div>
             ))}
           </div>
         </div>

         {/* Deep Metadata */}
         <div className="mb-10 bg-surface-light/50 border border-white/5 rounded-xl p-5 space-y-4">
            <h4 className="text-sm font-bold text-white/70 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Database size={16} className="text-primary" /> Blockchain Data
            </h4>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted">Owner</span>
              <span className="font-mono text-primary flex items-center gap-1">0x71C...976F <LinkIcon size={12}/></span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted">Contract</span>
              <span className="font-mono text-white flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">0xABC...DEF1 <LinkIcon size={12}/></span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted">Token ID</span>
              <span className="font-bold text-white">{nft.tokenId}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted">Token Standard</span>
              <span className="text-white">ERC-721</span>
            </div>
         </div>

         <div className="mt-auto pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="primary" className="flex-1 w-full flex items-center justify-center gap-2" onClick={() => window.open(`https://opensea.io`, '_blank')}>
              <Shield size={18} /> View on OpenSea
            </Button>
            <Button size="lg" variant="outline" className="flex-1 w-full" onClick={onClose}>
              Close
            </Button>
         </div>
      </div>
    </div>
  );
};

export default NFTDetailsModal;
