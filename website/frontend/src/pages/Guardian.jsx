import { useRef, useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Environment } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { ArrowLeft, Shield, Sword, Cpu, Zap, Activity, Fingerprint, Lock, Unlock, ShieldAlert } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { guardians } from '../data/guardians';
import { useWallet } from '@/web3';
import { useLiveNFT } from '../web3/hooks/useLiveNFT';
import PremiumImage from '../components/ui/PremiumImage';

// 3D Background Component
function InteractiveAura({ color }) {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(1500), { radius: 2.5 }));
  
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y += delta / 20;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={true}>
        <PointMaterial transparent color={color || "#D90429"} size={0.008} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

const Guardian = () => {
  const { id } = useParams();
  const { isConnected, account, connectWallet } = useWallet();
  const guardian = guardians.find(g => g.id === parseInt(id));
  const liveData = useLiveNFT(id);

  // Scroll to top on load/change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const relatedGuardians = useMemo(() => {
    if (!guardian) return [];
    return guardians
      .filter(g => g.id !== guardian.id && (g.moralAlignment === guardian.moralAlignment || g.combatStyle.split(' ')[0] === guardian.combatStyle.split(' ')[0]))
      .slice(0, 4);
  }, [guardian]);

  if (!guardian) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 text-center bg-background">
        <div>
           <h1 className="text-4xl text-primary font-heading uppercase">Artifact Lost</h1>
           <Link to="/collection" className="mt-6 inline-flex items-center text-white hover:text-primary transition-colors border border-border px-6 py-2 rounded">
             Return to Archive
           </Link>
        </div>
      </div>
    );
  }

  // Derive theme colors
  const isVoid = guardian.core.toLowerCase().includes('void') || guardian.moralAlignment === 'Chaotic Evil';
  const themeColor = isVoid ? "#8B5CF6" : "#D90429"; // Purple for void/evil, Crimson for rest

  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary/30 relative">
      
      {/* Immersive 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
         <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={0.5} />
            <InteractiveAura color={themeColor} />
            <Environment preset="night" />
         </Canvas>
         <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background" />
      </div>

      <div className="relative z-10 pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-8">
            <Link to="/collection" className="inline-flex items-center text-text-muted hover:text-white transition-colors group bg-surface/50 px-4 py-2 rounded-full border border-border backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-bold tracking-widest uppercase">Archive Database</span>
            </Link>

            <div className="flex gap-4">
              {guardian.id > 1 && (
                <Link to={`/guardian/${guardian.id - 1}`} className="text-text-muted hover:text-white uppercase font-display tracking-widest text-xs border border-border px-4 py-2 rounded bg-surface/50 transition-colors">
                  &larr; Prev
                </Link>
              )}
              {guardian.id < 20 && (
                <Link to={`/guardian/${guardian.id + 1}`} className="text-text-muted hover:text-white uppercase font-display tracking-widest text-xs border border-border px-4 py-2 rounded bg-surface/50 transition-colors">
                  Next &rarr;
                </Link>
              )}
            </div>
          </div>
          
          {/* Header Section: Art & Identity */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            {/* Massive Artwork */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden glass-heavy group sticky top-28 border border-border/50 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10 pointer-events-none"></div>
                <PremiumImage 
                  src={`/images/guardians/${guardian.id.toString().padStart(3, '0')}.png`}
                  alt={`${guardian.name} - ${guardian.title}`}
                  containerClassName="w-full h-full"
                  priority={true}
                />
                
                {/* Overlay Metadata */}
                <div className="absolute top-4 left-4 z-20">
                   <span className="px-3 py-1 bg-background/80 backdrop-blur-md rounded text-xs font-mono text-white/90 border border-border">
                      ID: #{guardian.id.toString().padStart(3, '0')}
                   </span>
                </div>
              </div>
            </motion.div>

            {/* Core Identity & Lore */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 font-display"
              >
                {guardian.title}
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold uppercase tracking-tighter text-white mb-8 leading-none" 
                style={{ textShadow: `0 0 30px ${themeColor}40` }}
              >
                {guardian.name}
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="glass p-6 md:p-8 rounded-xl border-l-4 border-l-primary mb-8 bg-surface/40 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              >
                <p className="text-xl text-white/90 leading-relaxed font-light italic mb-4">
                  "{guardian.motivation || 'Bound by the Fracture. Driven by the Core.'}"
                </p>
                <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent my-4"></div>
                <p className="text-text-muted leading-relaxed">
                  {guardian.biography}
                </p>
              </motion.div>

              {/* Ownership Status Panel */}
              <div className="glass p-6 rounded-xl border border-border flex flex-col md:flex-row items-start md:items-center justify-between bg-surface/40 backdrop-blur-md gap-6">
                 <div className="flex-1">
                    <h4 className="text-sm font-display tracking-widest uppercase text-text-muted mb-1 flex items-center">
                       <Fingerprint className="w-4 h-4 mr-2" /> Ownership Registry
                    </h4>
                    {liveData.isLoading ? (
                       <p className="text-white font-bold tracking-wider animate-pulse text-xs mt-2">Syncing with Core...</p>
                    ) : liveData.owner ? (
                       <div className="mt-2">
                         <p className="text-white font-bold tracking-wider flex items-center mb-2 text-sm">
                           <Lock className="w-4 h-4 mr-2 text-primary" /> Immutable Artifact
                         </p>
                         <p className="text-xs font-mono bg-background/50 px-2 py-1 rounded inline-block border border-border/50">
                           <span className="text-text-muted">Owner: </span>
                           {liveData.owner.toLowerCase() === account?.toLowerCase() ? <span className="text-primary font-bold">You</span> : <span className="text-white">{liveData.owner.substring(0,6)}...{liveData.owner.substring(38)}</span>}
                         </p>
                       </div>
                    ) : (
                       <div className="mt-2">
                         <p className="text-white font-bold tracking-wider flex items-center text-sm mb-1">
                            <Unlock className="w-4 h-4 mr-2 text-primary" /> Unclaimed Artifact
                         </p>
                         <p className="text-[10px] text-text-muted">This entity has not materialized on the ledger.</p>
                       </div>
                    )}
                 </div>
                 
                 {/* Live Blockchain Data Badge */}
                 {!liveData.isLoading && liveData.name && (
                   <div className="border-l-2 border-primary/20 pl-6 w-full md:w-auto">
                     <h4 className="text-[10px] font-display tracking-widest uppercase text-primary mb-2">Live Ledger Data</h4>
                     <div className="flex flex-col gap-1 text-[10px] font-mono text-text-muted">
                       <p>Contract: <span className="text-white">{liveData.name} ({liveData.symbol})</span></p>
                       {liveData.royaltyAmount && <p>Royalty: <span className="text-white">{parseFloat(liveData.royaltyAmount)} MATIC / ETH</span></p>}
                     </div>
                   </div>
                 )}

                 {!isConnected && (
                    <button onClick={connectWallet} className="px-6 py-3 bg-primary/20 hover:bg-primary text-white border border-primary transition-colors rounded uppercase text-[10px] font-bold tracking-widest whitespace-nowrap mt-4 md:mt-0 shadow-[0_0_15px_rgba(217,4,41,0.3)]">
                       Connect to Verify
                    </button>
                 )}
              </div>
            </motion.div>
          </div>

          {/* Deep Lore: History & Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="glass-heavy p-8 rounded-2xl border border-border"
             >
                <h3 className="text-2xl font-heading font-bold uppercase text-white mb-4 flex items-center">
                   History <span className="w-12 h-px bg-primary ml-4"></span>
                </h3>
                <p className="text-text-muted leading-relaxed font-light">
                   Forged long before the collapse, {guardian.name} was an integral part of the Architects' civilization. 
                   As a {guardian.combatStyle.split(' ')[0]}, they were deeply tied to the infrastructure of the old world. 
                   When the Core shattered, they were one of the few who managed to survive the gravitational inversion, 
                   retaining fragments of their former memories while being fundamentally altered by dimensional radiation.
                </p>
             </motion.div>
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="glass-heavy p-8 rounded-2xl border border-border"
             >
                <h3 className="text-2xl font-heading font-bold uppercase text-white mb-4 flex items-center">
                   Role in the Fracture <span className="w-12 h-px bg-primary ml-4"></span>
                </h3>
                <p className="text-text-muted leading-relaxed font-light">
                   Within the ruined RedVerse, their alignment is strictly <strong>{guardian.moralAlignment}</strong>. 
                   They act as a stabilizing—or destructive—force among the remaining twenty. 
                   Their primary objective is directly tied to the shards of the broken core they possess, 
                   using their unique abilities to either restore order to the shattered dimensions or plunge them further into the Void.
                </p>
             </motion.div>
          </div>

          {/* Equipment & Abilities Matrix */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-32"
          >
             <h2 className="text-3xl font-heading font-bold uppercase text-center mb-12">Artifact <span className="text-primary text-glow">Matrix</span></h2>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <EquipmentCard icon={Sword} title="Weaponry" desc={guardian.weapon} />
                <EquipmentCard icon={Shield} title="Armor Class" desc={guardian.armor} />
                <EquipmentCard icon={Zap} title="Crimson Core" desc={guardian.core} />
                <EquipmentCard icon={Activity} title="Aura Projection" desc={guardian.aura} />
                <EquipmentCard icon={Cpu} title="Companion Entity" desc={guardian.companion} />
                <div className="glass p-6 rounded-xl border border-primary/30 bg-primary/5 flex flex-col justify-center">
                   <h4 className="text-xs font-display tracking-widest text-primary uppercase mb-2">Signature Ability</h4>
                   <p className="text-white font-bold uppercase mb-4">{guardian.signatureAbility}</p>
                   <h4 className="text-xs font-display tracking-widest text-primary uppercase mb-2 flex items-center">
                      <ShieldAlert className="w-3 h-3 mr-1" /> Known Weakness
                   </h4>
                   <p className="text-text-muted text-sm">{guardian.weakness}</p>
                </div>
             </div>
          </motion.div>

          {/* Related Guardians Carousel */}
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="pt-16 border-t border-border/50"
          >
             <div className="flex justify-between items-end mb-8">
                <div>
                   <h2 className="text-3xl font-heading font-bold uppercase text-white">Related <span className="text-primary">Entities</span></h2>
                   <p className="text-text-muted text-sm mt-2">Guardians sharing the {guardian.moralAlignment} alignment.</p>
                </div>
                <Link to="/collection" className="text-xs font-display uppercase tracking-widest text-primary hover:text-white transition-colors hidden sm:block">
                   View Full Archive →
                </Link>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedGuardians.map((related, idx) => (
                   <motion.div
                     key={related.id}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.1 }}
                   >
                     <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} transitionSpeed={1000}>
                       <Link to={`/guardian/${related.id}`} className="block group">
                          <div className="aspect-[3/4] rounded-xl overflow-hidden glass relative border border-border group-hover:border-primary/50 transition-colors shadow-lg group-hover:shadow-[0_0_30px_rgba(217,4,41,0.2)]">
                             <div className="absolute inset-0 bg-surface z-0">
                                <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface-light to-background opacity-80 group-hover:scale-110 transition-transform duration-1000" />
                             </div>
                             <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10 opacity-90 group-hover:opacity-60 transition-opacity"></div>
                             <div className="absolute inset-x-0 bottom-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                <p className="text-primary font-display text-[10px] tracking-widest uppercase mb-1 truncate">{related.title}</p>
                                <h3 className="text-lg font-heading font-bold uppercase text-white group-hover:text-glow truncate transition-all">{related.name}</h3>
                             </div>
                          </div>
                       </Link>
                     </Tilt>
                   </motion.div>
                ))}
                {relatedGuardians.length === 0 && (
                   <div className="col-span-full py-12 text-center border border-border rounded-xl border-dashed">
                      <p className="text-text-muted uppercase tracking-widest text-sm">No related entities found.</p>
                   </div>
                )}
             </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

const EquipmentCard = ({ icon: Icon, title, desc }) => (
  <div className="glass p-6 rounded-xl flex items-start space-x-4 glass-hover border border-border group">
    <div className="p-3 bg-surface rounded-lg border border-border group-hover:border-primary/50 transition-colors shadow-inner">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <div>
      <h4 className="text-xs font-display tracking-widest text-text-muted uppercase mb-1">{title}</h4>
      <p className="text-sm font-bold text-white leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default Guardian;
