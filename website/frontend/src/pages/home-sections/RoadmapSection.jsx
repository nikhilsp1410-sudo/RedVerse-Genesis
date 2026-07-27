import { motion } from 'framer-motion';

export const RoadmapSection = () => {
  const roadmapItems = [
    { phase: "Phase 1", title: "Genesis Collection", status: "Completed", desc: "The foundation of the RedVerse. 20 Handcrafted cinematic Guardians deployed on Polygon." },
    { phase: "Phase 2", title: "Website Launch", status: "Active", desc: "A AAA-quality interactive web experience blending lore, blockchain verification, and community." },
    { phase: "Phase 3", title: "Community Growth", status: "Upcoming", desc: "Expanding the RedVerse network. Exclusive holder access, lore expansions, and digital integrations." },
    { phase: "Phase 4", title: "Future Collections & Utility", status: "Upcoming", desc: "The Saga continues with 'Awakening' and 'The Fallen'. Extended utility for Genesis holders." }
  ];

  return (
    <section className="py-32 relative bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-4">
            The <span className="text-primary text-glow">Roadmap</span>
          </h2>
          <p className="text-text-muted text-lg font-light">
            The strategic expansion of the RedVerse ecosystem.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {roadmapItems.map((phase, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.15 }}
               className={`glass p-8 rounded-xl border flex flex-col items-center text-center transition-all duration-300 relative group overflow-hidden ${phase.status === 'Active' ? 'border-primary shadow-[0_0_20px_rgba(217,4,41,0.2)]' : 'border-border hover:border-primary/50 hover:-translate-y-2'}`}
             >
               {phase.status === 'Active' && (
                 <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
               )}
               <span className="text-primary font-display tracking-widest text-xs uppercase mb-4 bg-primary/10 px-3 py-1 rounded">{phase.phase}</span>
               <h3 className="text-xl font-heading font-bold text-white uppercase mb-4">{phase.title}</h3>
               <p className="text-sm text-text-muted font-light leading-relaxed mb-6 flex-grow">{phase.desc}</p>
               <span className={`text-[10px] font-mono px-3 py-1 rounded border ${phase.status === 'Completed' ? 'bg-white/5 border-white/20 text-text-muted' : phase.status === 'Active' ? 'bg-primary/20 border-primary text-primary font-bold animate-pulse' : 'bg-surface border-border/50 text-text-muted/50'}`}>
                 {phase.status}
               </span>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};
