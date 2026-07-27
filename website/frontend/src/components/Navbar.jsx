import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useWallet, NetworkBadge, WalletButton } from '@/web3';
import { useAudio } from '../context/AudioContext';

/**
 * Enhanced Navbar with scroll-based transparency and blur.
 */
const Navbar = () => {
  const { error } = useWallet();
  const { isMuted, toggleMute } = useAudio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = `fixed w-full z-50 transition-all duration-500 ${
    scrolled 
      ? 'bg-[rgba(11,11,15,0.8)] backdrop-blur-xl border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-2' 
      : 'bg-transparent border-b border-transparent py-4'
  }`;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary font-heading tracking-tighter">
              RedVerse
            </Link>
          </div>
          <div className="hidden md:block flex-1">
            <div className="ml-10 flex items-center space-x-8">
              {['Collection', 'Lore', 'About', 'Mint'].map((item) => {
                const isActive = location.pathname.includes(item.toLowerCase());
                return (
                  <Link key={item} to={`/${item.toLowerCase()}`} className="relative group px-3 py-2 text-sm font-display tracking-widest uppercase interactive">
                    <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-text-muted group-hover:text-white'}`}>{item}</span>
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(217,4,41,0.8)] ${isActive ? 'w-full bg-primary' : 'w-0 bg-primary/50 group-hover:w-3/4'}`} />
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
             <button 
                onClick={toggleMute} 
                className="p-2 text-text-muted hover:text-white transition-colors focus:outline-none"
                aria-label="Toggle Audio"
             >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-primary drop-shadow-[0_0_5px_rgba(217,4,41,0.8)]" />}
             </button>
             {error && <span className="text-primary text-xs hidden lg:inline-block max-w-[200px] truncate" title={error}>{error}</span>}
             <NetworkBadge />
             <WalletButton />
             
             {/* Mobile Menu Toggle */}
             <button 
               className="md:hidden p-2 text-text-muted hover:text-white transition-colors focus:outline-none"
               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
             >
               {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-[rgba(11,11,15,0.95)] backdrop-blur-xl border-b border-border shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
              {['Collection', 'Lore', 'About', 'Mint'].map((item) => {
                const isActive = location.pathname.includes(item.toLowerCase());
                return (
                  <Link 
                    key={item} 
                    to={`/${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 text-sm font-display tracking-widest uppercase rounded border ${isActive ? 'bg-primary/20 text-white border-primary' : 'bg-surface/50 text-text-muted border-transparent hover:border-border hover:text-white'} transition-colors`}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
