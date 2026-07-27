import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CONTRACT_ADDRESS } from '../web3/core/config';

const Footer = () => {
  return (
    <footer className="bg-[#0B0B0F] border-t border-border py-16 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-32 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-[#0B0B0F] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-4 h-4 bg-primary rotate-45 border border-primary box-glow"
              />
              <span className="text-2xl font-bold text-white font-heading uppercase tracking-widest">RedVerse</span>
            </div>
            <p className="text-sm text-text-muted font-light leading-relaxed">
              The official digital archive of a shattered dimension. Only twenty Guardians remain.
            </p>
          </div>

          <div>
            <h4 className="text-primary font-display text-[10px] uppercase tracking-widest mb-4">Universe</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-text-muted hover:text-white transition-colors text-sm font-light">The Crimson Fracture</Link></li>
              <li><Link to="/lore" className="text-text-muted hover:text-white transition-colors text-sm font-light">Lore Archives</Link></li>
              <li><Link to="/about" className="text-text-muted hover:text-white transition-colors text-sm font-light">The Architects</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-primary font-display text-[10px] uppercase tracking-widest mb-4">Collection</h4>
            <ul className="space-y-2">
              <li><Link to="/collection" className="text-text-muted hover:text-white transition-colors text-sm font-light">Genesis Archive</Link></li>
              <li><a href={`https://polygonscan.com/address/${CONTRACT_ADDRESS}`} target="_blank" rel="noreferrer" className="text-text-muted hover:text-white transition-colors text-sm font-light">Smart Contract</a></li>
              <li><a href="https://opensea.io/" target="_blank" rel="noreferrer" className="text-text-muted hover:text-white transition-colors text-sm font-light">OpenSea</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-primary font-display text-[10px] uppercase tracking-widest mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="https://x.com/RedVerse_studio" target="_blank" rel="noreferrer" className="text-text-muted hover:text-white transition-colors text-sm font-light">X (Twitter)</a></li>
              <li><a href="https://www.instagram.com/redverse_studio?igsh=MTdqOGY5MTNzeXA5ZA==" target="_blank" rel="noreferrer" className="text-text-muted hover:text-white transition-colors text-sm font-light">Instagram</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted/50 font-display uppercase tracking-widest">
            © {new Date().getFullYear()} RedVerse. All rights reserved.
          </p>
          <div className="flex gap-4 items-center">
             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xs text-primary hover:text-white transition-colors font-display uppercase tracking-widest flex items-center">
                Back to Top ↑
             </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
