import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, Shield, Sword, Zap, Orbit, Layers, Hexagon, Lock, Fingerprint, Database } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { useDynamicGallery } from '../web3/hooks/useDynamicGallery';
import { useWallet } from '@/web3';
import { useGenesisContract } from '../web3/hooks/useGenesisContract';
import { ACTIVE_NETWORK, CONTRACT_ADDRESS } from '../web3/core/config';
import PremiumImage from '../components/ui/PremiumImage';

const Collection = () => {
  const { isConnected, account, connectWallet } = useWallet();
  const { totalSupply, maxSupply, ownershipMap, isLoading: contractLoading } = useGenesisContract();
  const { dynamicGuardians, isLoadingGallery } = useDynamicGallery();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique filters
  const alignments = [...new Set(dynamicGuardians.map(g => g.moralAlignment))];
  const weapons = [...new Set(dynamicGuardians.map(g => g.weapon.split(' ')[0]))];
  const cores = [...new Set(dynamicGuardians.map(g => g.core.split(' ')[0]))];

  // My Vault
  const ownedGuardians = useMemo(() => {
    if (!isConnected || !account || contractLoading) return [];
    return dynamicGuardians.filter(g => ownershipMap[g.id] === account.toLowerCase());
  }, [isConnected, account, contractLoading, ownershipMap, dynamicGuardians]);

  // Archive Filter logic
  const filteredGuardians = useMemo(() => {
    return dynamicGuardians.filter(g => {
      const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            g.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = activeFilter === 'All' || 
                            g.moralAlignment === activeFilter ||
                            g.combatStyle.includes(activeFilter) ||
                            g.core.includes(activeFilter);

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter, dynamicGuardians]);

  const getPowerSymbol = (core) => {
    if (core.toLowerCase().includes('void') || core.toLowerCase().includes('dark')) return <Orbit className="w-4 h-4 text-primary" />;
    if (core.toLowerCase().includes('plasma') || core.toLowerCase().includes('fusion')) return <Zap className="w-4 h-4 text-accent" />;
    if (core.toLowerCase().includes('crystal') || core.toLowerCase().includes('light')) return <Shield className="w-4 h-4 text-white" />;
    return <Sword className="w-4 h-4 text-primary" />;
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background text-text selection:bg-primary/30 relative">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-transparent pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-display tracking-[0.2em] uppercase text-sm mb-4"
          >
            Smart Contract Dashboard
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-bold uppercase tracking-tighter"
          >
            Genesis <span className="text-primary text-glow">Collection</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-xl text-text-muted max-w-2xl mx-auto font-light"
          >
            Immutable ledgers tracking the final 20 entities of the RedVerse.
          </motion.p>
        </div>

        {/* Section A: The Genesis Ledger (Contract Stats) */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="mb-20 glass-heavy rounded-2xl border border-border p-1"
        >
           <div className="bg-surface/50 rounded-xl p-6 md:p-10 flex flex-col lg:flex-row gap-10 items-center justify-between">
              
              <div className="flex-1 w-full lg:w-auto">
                 <h3 className="text-2xl font-heading font-bold uppercase text-white mb-2">Ledger Status</h3>
                 <p className="text-text-muted text-sm font-light mb-6">Real-time synchronization with {ACTIVE_NETWORK.name}</p>
                 
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-background/80 p-4 rounded-lg border border-border/50">
                       <span className="text-primary font-display text-[10px] uppercase tracking-widest block mb-1">Mint Status</span>
                       <span className="text-lg font-bold text-white uppercase">{contractLoading ? 'Syncing...' : (totalSupply >= maxSupply ? 'Sealed' : 'Active')}</span>
                    </div>
                    <div className="bg-background/80 p-4 rounded-lg border border-border/50">
                       <span className="text-primary font-display text-[10px] uppercase tracking-widest block mb-1">Supply</span>
                       <span className="text-lg font-bold text-white uppercase">{contractLoading ? '--' : `${totalSupply} / ${maxSupply}`}</span>
                    </div>
                    <div className="bg-background/80 p-4 rounded-lg border border-border/50">
                       <span className="text-primary font-display text-[10px] uppercase tracking-widest block mb-1">Network</span>
                       <span className="text-sm font-bold text-white uppercase">{ACTIVE_NETWORK.name.split(' ')[1]}</span>
                    </div>
                    <div className="bg-background/80 p-4 rounded-lg border border-border/50">
                       <span className="text-primary font-display text-[10px] uppercase tracking-widest block mb-1">Metadata</span>
                       <span className="text-sm font-bold text-white uppercase flex items-center"><Database className="w-3 h-3 mr-1"/> IPFS Hosted</span>
                    </div>
                 </div>
              </div>

              <div className="lg:w-1/3 w-full border-t lg:border-t-0 lg:border-l border-border/50 pt-8 lg:pt-0 lg:pl-10 flex flex-col justify-center">
                 <h4 className="text-sm font-display tracking-widest uppercase text-text-muted mb-4 flex items-center">
                    <Hexagon className="w-4 h-4 mr-2" /> Contract Verification
                 </h4>
                 <div className="font-mono text-xs bg-background/50 p-3 rounded border border-border/50 text-white break-all mb-4">
                    {CONTRACT_ADDRESS}
                 </div>
                 <a href={`${ACTIVE_NETWORK.blockExplorer}address/${CONTRACT_ADDRESS}`} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest font-bold text-primary hover:text-white transition-colors border border-primary/50 px-4 py-2 rounded text-center inline-block">
                    View on Polygonscan
                 </a>
              </div>
           </div>
        </motion.div>

        {/* Section B: Personal Vault */}
        <AnimatePresence>
          {isConnected && (
            <motion.div 
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               exit={{ opacity: 0, height: 0 }}
               className="mb-20 overflow-hidden"
            >
               <h2 className="text-3xl font-heading font-bold uppercase mb-8 flex items-center">
                  <Fingerprint className="w-8 h-8 text-primary mr-3" /> Your Vault
               </h2>
               
               {contractLoading ? (
                  <div className="glass-heavy p-12 text-center rounded-2xl border border-border">
                     <Layers className="w-10 h-10 text-primary/30 mx-auto mb-4 animate-pulse" />
                     <p className="text-text-muted font-display tracking-widest uppercase text-sm animate-pulse">Syncing Cryptographic Ownership...</p>
                  </div>
               ) : ownedGuardians.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 relative z-10">
                     {ownedGuardians.map(g => (
                        <GuardianCard key={g.id} guardian={g} getPowerSymbol={getPowerSymbol} isOwnedByMe={true} />
                     ))}
                  </div>
               ) : (
                  <div className="glass-heavy p-12 text-center rounded-2xl border border-border border-dashed">
                     <Lock className="w-10 h-10 text-text-muted mx-auto mb-4 opacity-30" />
                     <p className="text-text-muted font-display tracking-widest uppercase text-sm mb-4">No artifacts bound to this ledger.</p>
                     <p className="text-xs font-light text-text-muted max-w-md mx-auto">Explore the global archive below to locate unclaimed Guardians or view the entire Genesis collection.</p>
                  </div>
               )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section C: The Global Archive */}
        <div className="mb-12">
          <h2 className="text-3xl font-heading font-bold uppercase mb-8 flex items-center justify-between">
            <span className="flex items-center"><Layers className="w-8 h-8 text-white mr-3 opacity-50" /> Global Archive</span>
            {!isConnected && (
               <button onClick={connectWallet} className="px-4 py-2 bg-primary/10 text-primary border border-primary/50 rounded uppercase text-[10px] font-bold tracking-widest hover:bg-primary hover:text-white transition-colors">
                  Connect Wallet
               </button>
            )}
          </h2>

          {/* Interactive Filter Bar */}
          <div className="glass-heavy p-4 rounded-xl border border-border flex flex-col md:flex-row gap-4 items-center justify-between z-20 relative mb-8">
             <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input 
                  type="text" 
                  placeholder="Search by name or title..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-sans text-sm"
                />
             </div>

             <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                <button 
                   onClick={() => setActiveFilter('All')}
                   className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold tracking-wider uppercase transition-colors ${activeFilter === 'All' ? 'bg-primary text-white box-glow' : 'bg-surface text-text-muted hover:text-white border border-border'}`}
                >
                   All
                </button>
                
                <div className="h-6 w-px bg-border mx-2"></div>
                
                {/* Quick Faction Filters */}
                {alignments.slice(0,3).map(alignment => (
                   <button 
                     key={alignment}
                     onClick={() => setActiveFilter(alignment)}
                     className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold tracking-wider uppercase transition-colors ${activeFilter === alignment ? 'bg-primary/20 text-primary border border-primary' : 'bg-surface text-text-muted hover:text-white border border-border'}`}
                   >
                     {alignment}
                   </button>
                ))}

                <button 
                   onClick={() => setShowFilters(!showFilters)}
                   className="flex items-center gap-2 whitespace-nowrap px-4 py-2 bg-surface text-white border border-border rounded-lg hover:border-primary transition-colors text-sm uppercase tracking-wider font-bold"
                >
                   <Filter className="w-4 h-4" /> Filters
                </button>
             </div>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-12"
              >
                <div className="glass p-6 rounded-xl border border-border grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                      <h4 className="text-primary font-display text-xs uppercase tracking-widest mb-3">By Weapon Core</h4>
                      <div className="flex flex-wrap gap-2">
                         {weapons.slice(0, 5).map(w => (
                            <span key={w} onClick={() => setActiveFilter(w)} className="text-xs bg-surface border border-border px-3 py-1 rounded cursor-pointer hover:border-primary transition-colors text-text-muted hover:text-white">{w}</span>
                         ))}
                      </div>
                   </div>
                   <div>
                      <h4 className="text-primary font-display text-xs uppercase tracking-widest mb-3">By Energy Core</h4>
                      <div className="flex flex-wrap gap-2">
                         {cores.slice(0, 5).map(c => (
                            <span key={c} onClick={() => setActiveFilter(c)} className="text-xs bg-surface border border-border px-3 py-1 rounded cursor-pointer hover:border-primary transition-colors text-text-muted hover:text-white">{c}</span>
                         ))}
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Archive Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 gap-x-8">
            <AnimatePresence mode="popLayout">
              {filteredGuardians.length > 0 ? filteredGuardians.map((guardian, index) => {
                 const isOwnedByMe = isConnected && account && ownershipMap[guardian.id] === account.toLowerCase();
                 return (
                   <motion.div
                     layout
                     key={guardian.id}
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     transition={{ duration: 0.4, delay: (index % 8) * 0.05 }}
                     className="h-full"
                   >
                     <GuardianCard 
                       guardian={guardian} 
                       getPowerSymbol={getPowerSymbol} 
                       isOwnedByMe={isOwnedByMe} 
                       ownerAddress={ownershipMap[guardian.id]}
                     />
                   </motion.div>
                 );
              }) : (
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="col-span-full py-20 text-center glass-heavy rounded-2xl border border-border"
                 >
                   <Orbit className="w-12 h-12 text-primary/30 mx-auto mb-4 animate-spin-slow" />
                   <h3 className="text-2xl font-heading font-bold uppercase text-white mb-2">No Guardians Found</h3>
                   <p className="text-text-muted">The archive holds no records matching your query.</p>
                   <button onClick={() => {setSearchQuery(''); setActiveFilter('All');}} className="mt-6 px-6 py-2 border border-primary text-primary hover:bg-primary/10 rounded uppercase text-sm font-bold tracking-widest transition-colors">
                      Reset Archive
                   </button>
                 </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

// Reusable Guardian Card Component
const GuardianCard = ({ guardian, getPowerSymbol, isOwnedByMe, ownerAddress }) => {
  return (
    <Tilt 
      tiltMaxAngleX={8} 
      tiltMaxAngleY={8} 
      perspective={1000} 
      scale={1.02} 
      transitionSpeed={1000}
      className="h-full block group"
    >
      <Link to={`/guardian/${guardian.id}`} className="block h-full relative z-10">
        <div className={`glass-heavy rounded-xl overflow-hidden h-[450px] flex flex-col relative transition-all duration-300 ${isOwnedByMe ? 'border-primary/50 shadow-[0_0_20px_rgba(217,4,41,0.2)]' : 'border-border/50 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(217,4,41,0.15)]'}`}>
          
          {/* Artwork container */}
          <PremiumImage 
            src={guardian.image}
            alt={`${guardian.name} - ${guardian.title}`}
            containerClassName="absolute inset-0 z-0 bg-surface group-hover:scale-110 transition-transform duration-1000"
          />

          {/* Dynamic glare/reflection effect */}
          <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-white/5 to-transparent transition-opacity duration-700 pointer-events-none transform -translate-x-full group-hover:translate-x-full" style={{ transition: 'transform 1.5s ease' }}></div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background z-10"></div>
          
          {/* Top Meta Data */}
          <div className="absolute top-0 left-0 w-full p-4 z-20 flex justify-between items-start">
            <span className="px-3 py-1 bg-background/80 backdrop-blur-md rounded text-xs font-mono text-white/90 border border-border/50 shadow-lg">
              #{guardian.id.toString().padStart(3, '0')}
            </span>
            <div className="flex items-center gap-2">
              {ownerAddress ? (
                 <span className={`px-2 py-1 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-wider border shadow-lg ${isOwnedByMe ? 'bg-primary/20 text-primary border-primary/50' : 'bg-background/80 text-white/50 border-border/50'}`}>
                   {isOwnedByMe ? 'Your Vault' : 'Secured'}
                 </span>
              ) : (
                 <span className="px-2 py-1 bg-white/5 backdrop-blur-md rounded text-[10px] font-bold text-white uppercase tracking-wider border border-border/50 shadow-lg">
                   Unclaimed
                 </span>
              )}
              <div className="p-1.5 bg-background/80 rounded border border-border/50 shadow-lg" title={guardian.core}>
                 {getPowerSymbol(guardian.core)}
              </div>
            </div>
          </div>

          {/* Content Meta Data */}
          <div className="p-5 relative z-20 flex-1 flex flex-col justify-end transition-transform duration-700 ease-out">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-primary font-display text-[10px] tracking-widest uppercase drop-shadow-md">
                {guardian.title}
              </p>
              {guardian.rank && (
                <span className="px-1.5 py-0.5 bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 rounded text-[8px] uppercase tracking-widest font-bold">
                  {guardian.rank}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-heading font-bold uppercase text-white mb-3 drop-shadow-lg leading-none group-hover:text-glow transition-colors">
              {guardian.name}
            </h3>
            
            <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-700 ease-out overflow-hidden flex flex-col justify-end">
               <p className="text-xs text-text-muted line-clamp-2 leading-relaxed mb-4 border-l-2 border-primary/50 pl-3 italic">
                  "{guardian.biography.substring(0, 80)}..."
               </p>
               
               <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-bold tracking-wider mb-4">
                  <div className="bg-surface/80 p-2 rounded border border-border/50 truncate" title="Creator">
                     <span className="text-text-muted block text-[8px] mb-0.5">Creator</span>
                     <span className="text-white drop-shadow-md">RedVerse</span>
                  </div>
                  <div className="bg-surface/80 p-2 rounded border border-border/50 truncate" title="Blockchain">
                     <span className="text-text-muted block text-[8px] mb-0.5">Blockchain</span>
                     <span className="text-white drop-shadow-md">Polygon</span>
                  </div>
                  <div className="bg-surface/80 p-2 rounded border border-border/50 truncate" title={guardian.moralAlignment}>
                     <span className="text-text-muted block text-[8px] mb-0.5">Faction</span>
                     <span className="text-white drop-shadow-md">{guardian.moralAlignment}</span>
                  </div>
                  <div className="bg-surface/80 p-2 rounded border border-border/50 truncate" title={guardian.combatStyle}>
                     <span className="text-text-muted block text-[8px] mb-0.5">Class</span>
                     <span className="text-white drop-shadow-md">{guardian.combatStyle.split(' ')[0]}</span>
                  </div>
               </div>
               
               <div className="flex gap-2">
                 <div className="flex-1 py-2 border border-primary/50 text-primary text-center text-[10px] font-bold tracking-widest uppercase rounded hover:bg-primary hover:text-white transition-colors">
                    Details
                 </div>
                 <button 
                   onClick={(e) => {
                     e.preventDefault();
                     e.stopPropagation();
                     window.open(`https://opensea.io/assets/matic/0xccFD90167f47c4F890C213Cc4a4611eE91942d0B/${guardian.id}`, '_blank');
                   }}
                   className="flex-1 py-2 bg-primary border border-primary text-white text-center text-[10px] font-bold tracking-widest uppercase rounded hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(217,4,41,0.4)]"
                 >
                    Buy on OpenSea
                 </button>
               </div>
            </div>
          </div>

        </div>
      </Link>
    </Tilt>
  );
};

export default Collection;
