import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Environment } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useDynamicGallery } from '../web3/hooks/useDynamicGallery';
import PremiumImage from '../components/ui/PremiumImage';


function CrimsonParticles(props) {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(2000), { radius: 2 }));
  
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 30;
    // Slow camera panning effect
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
    state.camera.position.y = Math.cos(state.clock.elapsedTime * 0.1) * 0.5;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={true} {...props}>
        <PointMaterial transparent color="#D90429" size={0.003} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
      </Points>
    </group>
  );
}

function WebGLCore() {
  const coreRef = useRef();
  useFrame((state, delta) => {
    coreRef.current.rotation.x += delta * 0.2;
    coreRef.current.rotation.y += delta * 0.3;
  });
  return (
    <mesh ref={coreRef}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#D90429" emissive="#D90429" emissiveIntensity={2} wireframe={true} />
    </mesh>
  );
}

const FaqAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-primary/20">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full text-left py-6 flex justify-between items-center focus:outline-none group"
      >
        <span className="text-xl font-heading font-bold text-white group-hover:text-primary transition-colors">{question}</span>
        <span className="text-primary text-2xl transform transition-transform duration-300" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}>
          +
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-text-muted leading-relaxed font-light">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Home = () => {
  const { dynamicGuardians } = useDynamicGallery();
  
  return (
    <div className="min-h-screen bg-background text-text overflow-x-hidden selection:bg-primary/30">
      
      {/* 1. Fullscreen Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-background">
          <Canvas camera={{ position: [0, 0, 1] }}>
            <ambientLight intensity={0.5} />
            <CrimsonParticles />
            <Environment preset="night" />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background/80 to-background pointer-events-none" />
        </div>

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <motion.p 
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-primary font-display uppercase text-sm md:text-base mb-6"
          >
            "The Crimson Fracture"
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="text-7xl md:text-9xl font-heading font-bold uppercase tracking-tighter text-glow leading-none mb-4"
          >
            RedVerse
          </motion.h1>
          
          <motion.h2
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
             className="text-5xl md:text-7xl font-heading font-bold text-white uppercase tracking-widest mb-12"
          >
             Genesis
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap"
          >
            <Link to="/collection" className="glass-heavy px-8 py-4 text-white font-bold tracking-wider uppercase text-sm rounded border border-primary/50 hover:border-primary hover:bg-primary/20 transition-all box-glow group">
              Enter Genesis <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <a href="#guardians" className="px-8 py-4 text-text-muted font-bold tracking-wider uppercase text-sm hover:text-white transition-colors">
              Explore Collection
            </a>
            <a href="https://opensea.io/collection/redverse-genesis" target="_blank" rel="noopener noreferrer" className="glass px-8 py-4 text-primary font-bold tracking-wider uppercase text-sm rounded border border-primary/30 hover:border-primary transition-all">
              View on OpenSea
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. The Crimson Fracture */}
      <section className="py-32 relative bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-8 leading-tight">
                The Collapse of <br/><span className="text-primary text-glow">Spacetime</span>
              </h2>
              <p className="text-lg text-text-muted leading-relaxed mb-6 font-light">
                Before the collapse, The Architects built a civilization of unparalleled dark luxury, forging monolithic black obsidian spires that pierced the clouds and technologies that blurred the line between science and divinity.
              </p>
              <p className="text-lg text-text-muted leading-relaxed font-light">
                But their hubris shattered the Core, causing The Crimson Fracture—a cataclysmic event that ripped apart spacetime itself. Reality splintered into jagged shards, birthing the ruined RedVerse.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative aspect-square rounded-2xl overflow-hidden glass-heavy"
            >
               <PremiumImage 
                 src="/images/crimson_fracture.png"
                 alt="The Crimson Fracture"
                 containerClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
               />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Meet the Twenty Guardians */}
      <section id="guardians" className="py-32 relative bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-heading font-bold uppercase mb-4"
            >
              The <span className="text-primary text-glow">Twenty</span> Legends
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-muted max-w-2xl mx-auto text-lg font-light"
            >
              Handcrafted cinematic characters. Forged in the Fracture.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dynamicGuardians.slice(0, 8).map((g, idx) => (
              <motion.div 
                key={g.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Link to={`/guardian/${g.id}`} className="block group h-full">
                  <div className="aspect-[3/4] h-full rounded-xl overflow-hidden glass relative border border-border group-hover:border-primary/50 transition-colors">
                     <PremiumImage 
                        src={g.image}
                        alt={g.name}
                        containerClassName="absolute inset-0 z-0 bg-surface group-hover:scale-110 transition-transform duration-1000"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
                     <div className="absolute inset-x-0 bottom-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-primary font-display text-xs tracking-widest uppercase mb-1 truncate">{g.title}</p>
                        <h3 className="text-xl font-heading font-bold uppercase text-white group-hover:text-glow truncate transition-all duration-300">{g.name}</h3>
                     </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link to="/collection" className="inline-block glass-heavy px-8 py-4 text-white font-bold tracking-wider uppercase text-sm rounded border border-border hover:border-primary transition-colors box-glow">
              View All 20 Guardians
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 4. Timeline */}
      <section className="py-32 relative bg-surface border-y border-border overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold uppercase text-center mb-24"
          >
            Timeline of the <span className="text-primary text-glow">Fall</span>
          </motion.h2>
          
          <div className="space-y-16">
            {[
              { year: "Era 01", title: "The Age of Architects", desc: "A golden age of dark luxury and unmatched technological superiority. The Architects construct the monolithic black obsidian spires." },
              { year: "Era 02", title: "Binding the Core", desc: "The Architects harness the infinite dimensional energy of the Crimson Core, chaining it to power their civilization." },
              { year: "Era 03", title: "The Dimensional Wars", desc: "The Architects weaponize the chained Core to subjugate parallel dimensions, expanding their empire across spacetime." },
              { year: "Era 04", title: "The Crimson Fracture", desc: "Hubris shatters the Core. Spacetime collapses instantly, tearing the fabric of reality apart in a blinding flash." },
              { year: "Era 05", title: "Genesis", desc: "The final twenty Guardians awaken in the ruins, bound to shards of the broken core." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col md:flex-row gap-8 items-start group"
              >
                <div className="w-32 flex-shrink-0 pt-1">
                    <span className="text-primary font-display tracking-widest text-sm uppercase">{item.year}</span>
                </div>
                <div className="flex-1 pb-16 border-l-2 border-border group-hover:border-primary/50 transition-colors pl-8 relative">
                    <div className="absolute w-4 h-4 bg-background border-2 border-primary rounded-full -left-[9px] top-1 shadow-[0_0_15px_rgba(217,4,41,0.5)] group-hover:bg-primary transition-colors"></div>
                    <h3 className="text-2xl font-heading font-bold uppercase mb-4 text-white group-hover:text-glow transition-all">{item.title}</h3>
                    <p className="text-text-muted leading-relaxed font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. The Crimson Core */}
      <section className="py-32 relative bg-background overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0 opacity-50">
           <Canvas camera={{ position: [0, 0, 4] }}>
             <ambientLight intensity={0.1} />
             <WebGLCore />
           </Canvas>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pointer-events-none">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
             className="relative max-w-3xl mx-auto glass-heavy p-12 rounded-2xl border border-primary/20 backdrop-blur-md shadow-[0_0_50px_rgba(217,4,41,0.1)]"
          >
             <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-8">The <span className="text-primary text-glow">Crimson</span> Core</h2>
             <p className="text-xl text-text-muted leading-relaxed font-light">
               It was not a machine. It was not magic. It was the absolute center of dimensional gravity, an infinitesimal point of blinding red light that the Architects enslaved to power their vanity. When it shattered, the universe broke with it.
             </p>
          </motion.div>
        </div>
      </section>

      {/* 6. Universe Preview */}
      <section className="py-24 relative bg-background overflow-hidden">
        <div className="w-full flex space-x-6 px-4 animate-sweep" style={{ animationDuration: '40s', animationIterationCount: 'infinite', animationTimingFunction: 'linear' }}>
           {[1, 2, 3, 4].map((i) => (
             <div key={i} className="flex-shrink-0 w-80 h-48 md:w-[600px] md:h-[350px] glass-heavy rounded-2xl border border-border/50 relative overflow-hidden group">
               <PremiumImage 
                 src={`/images/guardians/${String(i).padStart(3, '0')}.png`}
                 alt={`Preview ${i}`}
                 containerClassName="w-full h-full absolute inset-0"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 pointer-events-none"></div>
               <div className="absolute bottom-6 left-6 z-20">
                 <p className="text-white font-heading font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Sector {String.fromCharCode(64 + i)}</p>
               </div>
             </div>
           ))}
        </div>
      </section>

      {/* 7. Genesis Collection */}
      <section className="py-32 relative bg-surface border-y border-border">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
          >
             <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-6">A Premium <span className="text-primary text-glow">Digital Archive</span></h2>
             <p className="text-lg text-text-muted mb-10 max-w-2xl mx-auto font-light">
               The Genesis Collection is not a procedural generation project. It is exactly 20 flawless, 8k-resolution cinematic portraits of the final Guardians.
             </p>
             <Link to="/collection" className="inline-block glass-heavy px-12 py-5 text-white font-bold tracking-widest uppercase text-sm rounded border border-primary box-glow hover:bg-primary/20 transition-all">
               View The 20 Legends
             </Link>
          </motion.div>
        </div>
      </section>

      {/* 8. Future Saga */}
      <section className="py-32 relative bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-heading font-bold uppercase text-center mb-16"
          >
            The <span className="text-primary text-glow">Saga</span> Continues
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { book: "Book I", title: "The Crimson Fracture", status: "Archive Sealed" },
               { book: "Book II", title: "Genesis", status: "Active" },
               { book: "Book III", title: "Awakening", status: "Impending" },
               { book: "Book IV", title: "The Architects", status: "Unknown" },
               { book: "Book V", title: "The Fallen", status: "Unknown" },
               { book: "Book VI", title: "Voidborn", status: "Classified" }
             ].map((phase, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 className="glass p-8 rounded-xl border border-border flex flex-col items-center text-center hover:border-primary/50 hover:-translate-y-2 transition-all duration-300"
               >
                 <span className="text-primary font-display tracking-widest text-xs uppercase mb-4">{phase.book}</span>
                 <h3 className="text-xl font-heading font-bold text-white uppercase mb-4">{phase.title}</h3>
                 <span className="text-[10px] text-text-muted font-mono bg-surface px-3 py-1 rounded border border-border/50">{phase.status}</span>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-32 relative bg-surface border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-heading font-bold uppercase text-center mb-16">Lore <span className="text-primary text-glow">&</span> Questions</h2>
            
            <div className="glass-heavy rounded-2xl p-6 md:p-10 border border-border">
              <FaqAccordion 
                question="Why exactly 20 Guardians?" 
                answer="We chose quality over quantity. Rather than generating random permutations, we focused our entire creative pipeline on designing 20 distinct, breathtaking, and story-rich masterpieces." 
              />
              <FaqAccordion 
                question="What is the Crimson Core?" 
                answer="In the lore, it is a singular source of infinite dimensional energy that powered The Architects' civilization. Its shattering caused the cataclysm known as The Crimson Fracture." 
              />
              <FaqAccordion 
                question="Will the RedVerse expand?" 
                answer="Yes. Genesis is the foundation. The roadmap outlines future cinematic expansions including Awakening, The Fallen, and Voidborn, which will continue the narrative." 
              />
              <FaqAccordion 
                question="What technology was used to create this?" 
                answer="The visual aesthetic was achieved through extreme prompt engineering targeted at an AAA Unreal Engine 5 aesthetic, volumetric lighting, and highly detailed digital rendering techniques." 
              />
            </div>
          </motion.div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
