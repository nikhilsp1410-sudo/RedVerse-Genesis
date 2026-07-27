import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Footer from '../components/Footer';
import PremiumImage from '../components/ui/PremiumImage';

const Lore = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax mappings
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-text selection:bg-primary/30 relative">
      
      {/* Global Parallax Background */}
      <motion.div 
        style={{ y: bgY }}
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      </motion.div>

      <div className="relative z-10">
        
        {/* 1. Universe (Cinematic Hero) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
          <motion.div style={{ opacity: opacityFade }} className="text-center max-w-4xl mx-auto">
            <h3 className="text-primary font-display tracking-[0.4em] uppercase text-xs md:text-sm mb-6">Historical Archives</h3>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold uppercase tracking-tighter text-glow leading-none mb-8">
              The <span className="text-primary">Red</span>Verse
            </h1>
            <p className="text-xl md:text-2xl text-text-muted font-light leading-relaxed max-w-2xl mx-auto">
              A ruined civilization. A shattered core. Exactly twenty survivors wandering the fracture of spacetime.
            </p>
          </motion.div>
          
          <motion.div 
            style={{ opacity: opacityFade }}
            className="absolute bottom-12 flex flex-col items-center text-primary/50 animate-bounce"
          >
            <span className="text-[10px] font-display uppercase tracking-widest mb-2">Descend</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </section>

        {/* 2. Architects */}
        <section className="py-32 px-4 md:px-8 border-y border-border bg-surface/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-8">The <span className="text-primary text-glow">Architects</span></h2>
              <p className="text-lg text-text-muted leading-relaxed font-light mb-6">
                Before the collapse, The Architects built a civilization of unparalleled dark luxury. They were monolithic beings, forging black obsidian spires that pierced the upper stratosphere and harnessing technologies that entirely erased the boundary between science and divinity.
              </p>
              <p className="text-lg text-text-muted leading-relaxed font-light">
                Their society was perfect, rigid, and utterly uncompromising. They conquered adjacent dimensions not through war, but through overwhelming gravitational and temporal superiority. They believed they were the final iteration of conscious life.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="aspect-square glass-heavy rounded-2xl relative overflow-hidden flex items-center justify-center border border-border group"
            >
               <PremiumImage 
                 src="/images/obsidian_spire.png"
                 alt="Obsidian Spire"
                 containerClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10 pointer-events-none"></div>
            </motion.div>
          </div>
        </section>

        {/* 3. Crimson Core */}
        <section className="py-40 px-4 text-center relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse"
            style={{ animationDuration: '4s' }}
          ></motion.div>
          
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-heading font-bold uppercase mb-8 text-glow text-primary"
            >
              The Crimson Core
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-xl md:text-2xl text-white/90 leading-relaxed font-light"
            >
              At the exact center of the capital lay The Crimson Core—a singular source of infinite dimensional energy. It was not a machine. It was a chained god. The Architects enslaved it to power their vanity, extracting volatile energy to bend the laws of physics to their will.
            </motion.p>
          </div>
        </section>

        {/* 4. The Fracture */}
        <section className="py-32 px-4 border-y border-border bg-background relative">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, rotate: -2 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass p-8 md:p-16 border border-primary/50 shadow-[0_0_50px_rgba(217,4,41,0.2)] rounded-sm relative overflow-hidden"
            >
              {/* Jagged background elements */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rotate-45 transform origin-center border border-primary/20"></div>
              <div className="absolute -bottom-32 -left-10 w-96 h-96 bg-surface rotate-12 transform origin-center border border-border"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-8 text-white">The <span className="text-primary">Fracture</span></h2>
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-text-muted font-light leading-relaxed">
                    Hubris was their downfall. The Core was pushed beyond its absolute limits and shattered. 
                    The explosion didn't just destroy the city; it ripped apart spacetime itself. 
                  </p>
                  <p className="text-white font-light leading-relaxed text-xl border-l-4 border-primary pl-6 my-8">
                    Dimensions crashed into one another, gravity inverted, and reality splintered into jagged shards. 
                    The RedVerse was born in an instant of blinding light and terror.
                  </p>
                  <p className="text-text-muted font-light leading-relaxed">
                    All monolithic structures fell. The Architects' perfect society was annihilated in less than a picosecond, 
                    leaving only the ruins of an ancient futurism trapped in a perpetual state of dimensional decay.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 5. Timeline */}
        <section className="py-32 px-4 bg-surface/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase text-center mb-24">
              Chronicle of <span className="text-primary text-glow">Events</span>
            </h2>
            
            <div className="relative">
              {/* Central Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 border-l border-border md:-translate-x-px"></div>

              {[
                { era: "Era 01", title: "The Age of Architects", desc: "A golden age of dark luxury and unmatched technological superiority. The Architects construct the monolithic black obsidian spires." },
                { era: "Era 02", title: "Binding the Core", desc: "The Architects harness the infinite dimensional energy of the Crimson Core, chaining it to power their civilization." },
                { era: "Era 03", title: "The Dimensional Wars", desc: "The Architects weaponize the chained Core to subjugate parallel dimensions, expanding their empire across spacetime." },
                { era: "Era 04", title: "The Crimson Fracture", desc: "Hubris shatters the Core. Spacetime collapses instantly, tearing the fabric of reality apart in a blinding flash." },
                { era: "Era 05", title: "Genesis", desc: "The final twenty Guardians awaken in the ruins, bound to shards of the broken core." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`mb-16 relative flex items-center md:justify-between ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-background border-2 border-primary rounded-full -translate-x-[6px] shadow-[0_0_10px_rgba(217,4,41,0.8)] z-10"></div>
                  
                  {/* Empty Spacer */}
                  <div className="hidden md:block md:w-1/2"></div>

                  {/* Content */}
                  <div className={`w-full pl-12 md:pl-0 md:w-1/2 md:px-12 flex flex-col justify-center ${i % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                    <span className="text-primary font-display text-[10px] tracking-widest uppercase mb-2">{item.era}</span>
                    <h4 className="text-2xl font-heading font-bold uppercase text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-text-muted font-light leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Twenty Guardians */}
        <section className="py-32 px-4 border-y border-border bg-background text-center">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading font-bold uppercase mb-8"
            >
              The <span className="text-primary text-glow">Twenty</span> Legends
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-text-muted leading-relaxed font-light mb-12"
            >
              From the ashes of the Fracture emerged the Guardians. Some were Architects who survived by binding themselves to shards of the broken Core. Others were anomalies forged in the aftermath. Only twenty of these legendary beings remain.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/collection" className="inline-block glass-heavy px-10 py-5 text-white font-bold tracking-widest uppercase text-sm rounded border border-primary hover:bg-primary/20 transition-all shadow-[0_0_20px_rgba(217,4,41,0.3)]">
                Enter The Archive
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 7. Future Collections (Expandable Accordion) */}
        <section className="py-32 px-4 bg-surface/30">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold uppercase">The Saga <span className="text-primary text-glow">Continues</span></h2>
              <p className="text-text-muted mt-4 font-light">Genesis is merely the beginning of the RedVerse.</p>
            </div>
            
            <div className="glass-heavy rounded-2xl border border-border p-4 md:p-8 space-y-4">
               <ExpandableChapter 
                 title="Phase III: Awakening" 
                 content="As the dimensional dust settles, the remaining shards of the Crimson Core begin to resonate. New factions emerge from the deep void, challenging the twenty Guardians for control over the fragmented spacetime."
               />
               <ExpandableChapter 
                 title="Phase IV: The Architects" 
                 content="Rumors spread across the ruined sectors that the Architects were not entirely destroyed. Massive, monolithic silhouettes have been spotted in the outer rims, threatening to rebuild their rigid society."
               />
               <ExpandableChapter 
                 title="Phase V: The Fallen & Voidborn" 
                 content="Those completely corrupted by the raw, unfettered dimensional radiation mutate into the Voidborn. A massive conflict looms as the universe inches closer to absolute entropy."
               />
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
};

const ExpandableChapter = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl bg-background overflow-hidden transition-colors hover:border-primary/50">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
      >
        <span className="text-lg md:text-xl font-heading font-bold uppercase text-white tracking-wide">{title}</span>
        <ChevronDown className={`w-5 h-5 text-primary transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t border-border/50">
              <p className="text-text-muted leading-relaxed font-light text-sm md:text-base">{content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Lore;
