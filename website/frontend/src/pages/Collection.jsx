import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, Shield, Sword, Zap, Orbit, Layers, Hexagon, Lock, Fingerprint, Database, Copy, CheckCircle2 } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { useWallet } from '@/web3';
import { useGenesisContract } from '../web3/hooks/useGenesisContract';
import { useDynamicGallery } from '../web3/hooks/useDynamicGallery';
import { ACTIVE_NETWORK, CONTRACT_ADDRESS } from '../web3/core/config';
import PremiumImage from '../components/ui/PremiumImage';
import SEO from '../components/SEO';

const Collection = () => {
  const { isConnected, account, connectWallet } = useWallet();
  const { totalSupply, maxSupply, isDeployed, contractURI, paused, isLoading: contractLoading } = useGenesisContract();
  const { nfts, isLoading: galleryLoading, error: galleryError } = useDynamicGallery();
  
  const [copied, setCopied] = useState(false);
  const hasValidContract = isDeployed && CONTRACT_ADDRESS && CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000';

  const handleCopy = () => {
    if (CONTRACT_ADDRESS) {
      navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique filters from dynamic NFTs
  const alignments = [...new Set(nfts.map(g => g.attributes['Faction']).filter(Boolean))];
  const weapons = [...new Set(nfts.map(g => g.attributes['Weapon']).filter(Boolean))];
  const cores = [...new Set(nfts.map(g => g.attributes['Core']).filter(Boolean))];

  // My Vault
  const ownedGuardians = useMemo(() => {
    if (!isConnected || !account || galleryLoading) return [];
    return nfts.filter(g => g.ownerAddress?.toLowerCase() === account.toLowerCase());
  }, [isConnected, account, galleryLoading, nfts]);

  // Archive Filter logic
  const filteredGuardians = useMemo(() => {
    return nfts.filter(g => {
      const title = g.attributes['Role'] || '';
      const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = activeFilter === 'All' || 
                            g.attributes['Faction'] === activeFilter ||
                            g.attributes['Weapon'] === activeFilter ||
                            g.attributes['Core'] === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter, nfts]);

  const getPowerSymbol = (core) => {
    if (!core) return <Shield className="w-4 h-4 text-white" />;
    const coreLower = core.toLowerCase();
    if (coreLower.includes('void') || coreLower.includes('dark')) return <Orbit className="w-4 h-4 text-primary" />;
    if (coreLower.includes('plasma') || coreLower.includes('fusion') || coreLower.includes('alpha')) return <Zap className="w-4 h-4 text-accent" />;
    if (coreLower.includes('crystal') || coreLower.includes('light')) return <Shield className="w-4 h-4 text-white" />;
    return <Sword className="w-4 h-4 text-primary" />;
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0B0B0F] text-text selection:bg-primary/30 relative">
      <SEO 
        title="RedVerse Genesis Archive | Explore The Collection" 
        description="Browse the complete RedVerse Genesis NFT Collection. 20 Handcrafted cinematic Guardians stored immutably on the Polygon blockchain."
        url="https://redverse.xyz/collection"
      />
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-[#0B0B0F] to-transparent pointer-events-none z-0"></div>

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
                    <div className="bg-[rgba(11,11,15,0.8)] p-4 rounded-lg border border-border/50">
                       <span className="text-primary font-display text-[10px] uppercase tracking-widest block mb-1">Mint Status</span>
                       <span className="text-lg font-bold text-white uppercase">{!hasValidContract ? 'Inactive' : contractLoading ? 'Syncing...' : (totalSupply >= maxSupply ? 'Sold Out' : paused ? 'Paused' : 'Active')}</span>
                    </div>
                    <div className="bg-[rgba(11,11,15,0.8)] p-4 rounded-lg border border-border/50">
                       <span className="text-primary font-display text-[10px] uppercase tracking-widest block mb-1">Supply</span>
                       <span className="text-lg font-bold text-white uppercase">{contractLoading || !hasValidContract ? '-- / --' : `${totalSupply} / ${maxSupply}`}</span>
                    </div>
                    <div className="bg-[rgba(11,11,15,0.8)] p-4 rounded-lg border border-border/50">
                       <span className="text-primary font-display text-[10px] uppercase tracking-widest block mb-1">Network</span>
                       <span className="text-sm font-bold text-white uppercase">{ACTIVE_NETWORK.name}</span>
                    </div>
                    <div className="bg-[rgba(11,11,15,0.8)] p-4 rounded-lg border border-border/50">
                       <span className="text-primary font-display text-[10px] uppercase tracking-widest block mb-1">Metadata</span>
                       <span className="text-sm font-bold text-white uppercase flex items-center">
                         <Database className="w-3 h-3 mr-1"/> 
                         {contractURI ? 'IPFS Hosted' : 'Loading...'}
                       </span>
                    </div>
                 </div>
              </div>

              <div className="lg:w-1/3 w-full border-t lg:border-t-0 lg:border-l border-border/50 pt-8 lg:pt-0 lg:pl-10 flex flex-col justify-center relative">
                 <div className="flex justify-between items-center mb-4">
                   <h4 className="text-sm font-display tracking-widest uppercase text-text-muted flex items-center">
                      <Hexagon className="w-4 h-4 mr-2" /> Contract Status
                   </h4>
                   {hasValidContract && (
                     <span className="px-2 py-0.5 bg-primary/20 text-primary border border-primary/50 text-[10px] uppercase tracking-widest rounded-full font-bold shadow-[0_0_10px_rgba(217,4,41,0.2)]">
                       Verified
                     </span>
                   )}
                 </div>

                 {hasValidContract ? (
                   <>
                     <div className="flex items-center justify-between font-mono text-sm bg-[rgba(11,11,15,0.8)] p-3 rounded border border-border/50 text-white mb-4 group hover:border-primary/50 transition-colors">
                        <span>{`${CONTRACT_ADDRESS.slice(0, 6)}...${CONTRACT_ADDRESS.slice(-4)}`}</span>
                        <button onClick={handleCopy} className="text-text-muted hover:text-white transition-colors" title="Copy Address">
                          {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                     </div>
                     <a href={`${ACTIVE_NETWORK.blockExplorer}address/${CONTRACT_ADDRESS}`} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest font-bold text-primary hover:text-white transition-colors border border-primary/50 px-4 py-2 rounded text-center inline-block shadow-[0_0_15px_rgba(217,4,41,0.1)] hover:bg-primary hover:border-primary">
                        View on Polygonscan
                     </a>
                   </>
                 ) : (
                   <>
                     <div className="font-mono text-sm bg-[rgba(11,11,15,0.5)] p-3 rounded border border-border/50 text-text-muted mb-4 flex items-center justify-center italic">
                        Not Deployed Yet
                     </div>
                     <button disabled className="text-xs uppercase tracking-widest font-bold text-text-muted/50 border border-border/50 px-4 py-2 rounded text-center inline-block cursor-not-allowed bg-surface/50">
                        Deployment Pending
                     </button>
                   </>
                 )}
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
               
               {galleryLoading ? (
                  <div className="glass-heavy p-12 text-center rounded-2xl border border-border">
                     <Layers className="w-10 h-10 text-primary/30 mx-auto mb-4 animate-pulse" />
                     <p className="text-text-muted font-display tracking-widest uppercase text-sm animate-pulse">Syncing Cryptographic Ownership...</p>
                  </div>
               ) : ownedGuardians.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                     {ownedGuardians.map(g => (
                        <GuardianCard key={g.id} guardian={g} getPowerSymbol={getPowerSymbol} account={account} />
                     ))}
                  </div>
               ) : (
                  <div className="glass-heavy p-12 text-center rounded-2xl border border-border border-dashed">
                     <Lock className="w-10 h-10 text-text-muted mx-auto mb-4 opacity-30" />
                     <p className="text-text-muted font-display tracking-widest uppercase text-sm mb-4">No artifacts bound to this ledger.</p>
                     <p className="text-xs font-light text-text-muted max-w-md mx-auto">Explore the global archive below to locate Guardians or view the entire Genesis collection.</p>
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
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            <AnimatePresence mode="popLayout">
              {galleryLoading ? (
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="col-span-full py-32 text-center glass-heavy rounded-2xl border border-border flex flex-col items-center justify-center"
                 >
                   <Database className="w-12 h-12 text-primary/30 mx-auto mb-6 animate-pulse" />
                   <h3 className="text-2xl font-heading font-bold uppercase text-white mb-2 animate-pulse">Syncing IPFS Ledger...</h3>
                   <p className="text-text-muted font-light">Resolving decentralized metadata for all minted Guardians.</p>
                 </motion.div>
              ) : galleryError ? (
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="col-span-full py-20 text-center glass-heavy rounded-2xl border border-red-500/30 bg-red-500/5"
                 >
                   <Orbit className="w-12 h-12 text-red-500/50 mx-auto mb-4" />
                   <h3 className="text-2xl font-heading font-bold uppercase text-red-400 mb-2">Sync Failed</h3>
                   <p className="text-text-muted">{galleryError}</p>
                 </motion.div>
              ) : filteredGuardians.length > 0 ? filteredGuardians.map((guardian, index) => {
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
                       account={account}
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

// Reusable Guardian Card Component for Dynamic Data
const GuardianCard = ({ guardian, getPowerSymbol, account }) => {
  const isOwnedByMe = account && guardian.ownerAddress && guardian.ownerAddress.toLowerCase() === account.toLowerCase();
  
  // Extract attributes safely
  const faction = guardian.attributes['Faction'] || 'Unknown Faction';
  const combatClass = guardian.attributes['Class'] || 'Unknown Class';
  const role = guardian.attributes['Role'] || `Guardian #${guardian.id}`;
  const core = guardian.attributes['Core'] || '';

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
            alt={guardian.name}
            containerClassName="absolute inset-0 z-0 bg-surface group-hover:scale-110 transition-transform duration-1000"
          />

          {/* Dynamic glare/reflection effect */}
          <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-white/5 to-transparent transition-opacity duration-700 pointer-events-none transform -translate-x-full group-hover:translate-x-full" style={{ transition: 'transform 1.5s ease' }}></div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(11,11,15,0.6)] via-transparent to-[#0B0B0F] z-10"></div>
          
          {/* Top Meta Data */}
          <div className="absolute top-0 left-0 w-full p-4 z-20 flex justify-between items-start">
            <span className="px-3 py-1 bg-[rgba(11,11,15,0.8)] backdrop-blur-md rounded text-xs font-mono text-white/90 border border-border/50 shadow-lg">
              #{guardian.id.toString().padStart(3, '0')}
            </span>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-wider border shadow-lg ${isOwnedByMe ? 'bg-primary/20 text-primary border-primary/50' : 'bg-[rgba(11,11,15,0.8)] text-white border-border/50'}`}>
                {isOwnedByMe ? 'Your Vault' : 'Claimed'}
              </span>
              <div className="p-1.5 bg-[rgba(11,11,15,0.8)] rounded border border-border/50 shadow-lg" title={core}>
                 {getPowerSymbol(core)}
              </div>
            </div>
          </div>

          {/* Content Meta Data */}
          <div className="p-6 relative z-20 flex-1 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700 ease-out">
            <p className="text-primary font-display text-[10px] tracking-widest uppercase mb-1 drop-shadow-md">
              {role}
            </p>
            <h3 className="text-2xl font-heading font-bold uppercase text-white mb-2 drop-shadow-lg leading-none group-hover:text-glow transition-colors truncate">
              {guardian.name}
            </h3>
            
            <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-700 ease-out overflow-hidden flex flex-col justify-end">
               <p className="text-xs text-text-muted line-clamp-2 leading-relaxed mb-4 border-l-2 border-primary/50 pl-3 italic">
                  "{guardian.description.substring(0, 80)}..."
               </p>
               
               <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-bold tracking-wider mb-4">
                  <div className="bg-surface/80 p-2 rounded border border-border/50 truncate" title={faction}>
                     <span className="text-text-muted block text-[8px] mb-0.5">Faction</span>
                     <span className="text-white drop-shadow-md">{faction}</span>
                  </div>
                  <div className="bg-surface/80 p-2 rounded border border-border/50 truncate" title={combatClass}>
                     <span className="text-text-muted block text-[8px] mb-0.5">Class</span>
                     <span className="text-white drop-shadow-md">{combatClass}</span>
                  </div>
               </div>
               
               <div className="flex gap-2 w-full mt-2">
                 <span className="flex-1 py-2 bg-primary/20 border border-primary text-primary text-center text-xs font-bold tracking-widest uppercase rounded hover:bg-primary hover:text-white transition-colors shadow-[0_0_10px_rgba(217,4,41,0.2)]">
                    View Details
                 </span>
                 <button 
                   onClick={(e) => {
                     e.preventDefault();
                     window.open(`https://opensea.io/assets/matic/0xccFD90167f47c4F890C213Cc4a4611eE91942d0B/${guardian.id}`, '_blank');
                   }}
                   className="flex-1 py-2 bg-surface border border-border text-white text-center text-xs font-bold tracking-widest uppercase rounded hover:bg-white/10 transition-colors shadow-lg"
                 >
                   OpenSea
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
