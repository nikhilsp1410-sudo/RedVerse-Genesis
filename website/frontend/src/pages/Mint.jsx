import { motion } from 'framer-motion';
import { ExternalLink, Shield, Zap, Key } from 'lucide-react';
import PremiumImage from '../components/ui/PremiumImage';

const Mint = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-background text-text selection:bg-primary/30 relative flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

      <div className="max-w-5xl w-full mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-heavy p-8 md:p-12 rounded-2xl border border-border/50 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left side: Premium Artwork */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-border group shadow-[0_0_30px_rgba(217,4,41,0.1)]">
              <PremiumImage 
                 src="/images/guardians/001.png"
                 alt="OpenSea Preview"
                 containerClassName="w-full h-full transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex flex-col justify-end p-6">
                <span className="text-primary font-display text-[10px] tracking-widest uppercase mb-1">Genesis Collection</span>
                <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-wider">The 20 Legends</h3>
              </div>
            </div>

            {/* Right side: Acquisition Details */}
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl font-heading font-bold uppercase mb-2">Acquire <span className="text-primary text-glow">Artifact</span></h2>
              <p className="text-text-muted font-light mb-8 leading-relaxed">
                The initial minting phase for the RedVerse Genesis Collection has concluded. The entire supply of 20 unique Guardians is now circulating on the Polygon secondary market.
              </p>

              {/* Collection Stats */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="bg-surface/50 p-4 rounded border border-border text-center">
                  <span className="text-text-muted text-[10px] uppercase font-display tracking-widest block mb-1">Supply</span>
                  <span className="text-xl font-bold text-white">20</span>
                </div>
                <div className="bg-surface/50 p-4 rounded border border-border text-center">
                  <span className="text-text-muted text-[10px] uppercase font-display tracking-widest block mb-1">Network</span>
                  <span className="text-xl font-bold text-white">Polygon</span>
                </div>
                <div className="bg-surface/50 p-4 rounded border border-border text-center">
                  <span className="text-text-muted text-[10px] uppercase font-display tracking-widest block mb-1">Royalty</span>
                  <span className="text-xl font-bold text-white">5%</span>
                </div>
              </div>

              {/* Utilities & Perks */}
              <div className="mb-10 space-y-4">
                <h4 className="text-xs font-display tracking-widest text-primary uppercase mb-4 border-b border-border/50 pb-2">Artifact Utility & Benefits</h4>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded border border-primary/20 shrink-0">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-bold uppercase tracking-wider mb-1">Immutable Ownership</h5>
                    <p className="text-xs text-text-muted">Own a verified, cryptographic piece of the RedVerse lore. Each Guardian is a 1/1 masterpiece.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded border border-primary/20 shrink-0">
                    <Key className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-bold uppercase tracking-wider mb-1">Exclusive Access</h5>
                    <p className="text-xs text-text-muted">Holders gain VIP entry into the RedVerse discord, governance voting, and early access to future expansions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded border border-primary/20 shrink-0">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-bold uppercase tracking-wider mb-1">Future Airdrops</h5>
                    <p className="text-xs text-text-muted">Genesis holders receive prioritized airdrops for upcoming weapons, cores, and dimension shards.</p>
                  </div>
                </div>
              </div>

              {/* OpenSea Button */}
              <a 
                href="https://opensea.io/collection/redverse-genesis" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-5 rounded uppercase font-display tracking-[0.2em] font-bold text-sm transition-all relative overflow-hidden bg-primary border border-primary text-white hover:bg-primary/90 box-glow hover:shadow-[0_0_30px_rgba(217,4,41,0.5)] group"
              >
                <span>View on OpenSea</span>
                <ExternalLink className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                
                {/* Glint effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[sweep_1.5s_ease-in-out]" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Mint;
