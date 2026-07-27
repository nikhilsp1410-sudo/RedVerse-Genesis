import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '@/web3';
import { useGenesisContract } from '../web3/hooks/useGenesisContract';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';
import PremiumImage from '../components/ui/PremiumImage';

const Mint = () => {
  const { isConnected, connectWallet } = useWallet();
  const { totalSupply, maxSupply, isLoading, isMinting, mintError, isSuccess, mintGuardian } = useGenesisContract();
  const [quantity] = useState(1);

  const remaining = maxSupply - totalSupply;

  const handleMint = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    await mintGuardian(quantity);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#0B0B0F] text-text selection:bg-primary/30 relative flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-[#0B0B0F] to-[#0B0B0F]" />

      <div className="max-w-4xl w-full mx-auto px-4 relative z-10">
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
                 alt="Mint Preview"
                 containerClassName="w-full h-full transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,15,0.9)] to-transparent flex flex-col justify-end p-6">
                <span className="text-primary font-display text-[10px] tracking-widest uppercase mb-1">Genesis Collection</span>
                <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-wider">The 20 Legends</h3>
              </div>
            </div>

            {/* Right side: Mint Interface */}
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl font-heading font-bold uppercase mb-2">Acquire <span className="text-primary text-glow">Artifact</span></h2>
              <p className="text-text-muted font-light mb-8">Secure your place in the RedVerse. Only 20 Genesis Guardians will ever exist.</p>

              {/* Status Board */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-surface/50 p-4 rounded border border-border">
                  <span className="text-text-muted text-[10px] uppercase font-display tracking-widest block mb-1">Minted</span>
                  <span className="text-2xl font-bold text-white">{isLoading ? '-' : totalSupply}</span>
                </div>
                <div className="bg-surface/50 p-4 rounded border border-border">
                  <span className="text-text-muted text-[10px] uppercase font-display tracking-widest block mb-1">Remaining</span>
                  <span className="text-2xl font-bold text-white">{isLoading ? '-' : remaining}</span>
                </div>
              </div>

              {/* Transaction Progress & Success */}
              <AnimatePresence mode="wait">
                {isMinting ? (
                  <motion.div 
                    key="minting"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8 p-4 bg-primary/10 border border-primary/30 rounded flex items-center space-x-4"
                  >
                    <Loader className="w-5 h-5 text-primary animate-spin" />
                    <div>
                      <p className="text-sm font-bold text-white uppercase tracking-widest">Forging Artifact...</p>
                      <p className="text-xs text-text-muted">Awaiting blockchain confirmation.</p>
                    </div>
                  </motion.div>
                ) : isSuccess ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8 p-4 bg-green-500/10 border border-green-500/30 rounded flex items-center space-x-4"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="text-sm font-bold text-white uppercase tracking-widest">Artifact Secured!</p>
                      <p className="text-xs text-text-muted">Welcome to the Genesis rank.</p>
                    </div>
                  </motion.div>
                ) : mintError ? (
                  <motion.div 
                    key="error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8 p-4 bg-primary/10 border border-primary/30 rounded flex items-center space-x-4 text-primary"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-xs">{mintError}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {/* Mint Button */}
              <button 
                onClick={handleMint}
                disabled={isLoading || isMinting || (totalSupply >= maxSupply)}
                className={`w-full py-5 rounded uppercase font-display tracking-[0.2em] font-bold text-sm transition-all relative overflow-hidden ${
                  isLoading || isMinting || (totalSupply >= maxSupply)
                    ? 'bg-surface border border-border text-text-muted cursor-not-allowed'
                    : 'bg-primary border border-primary text-white hover:bg-primary/90 box-glow hover:shadow-[0_0_30px_rgba(217,4,41,0.5)]'
                }`}
              >
                {!isConnected ? 'Connect Wallet' : isMinting ? 'Minting...' : totalSupply >= maxSupply ? 'Sold Out' : 'Mint Artifact'}
                
                {/* Glint effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[sweep_1.5s_ease-in-out]" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Mint;
