import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background text-text selection:bg-primary/30">
      
      {/* Header */}
      <div className="text-center mb-20 px-4">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-primary font-display tracking-[0.2em] uppercase text-sm mb-4"
        >
          Project Overview
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tighter text-glow"
        >
          What is RedVerse Genesis?
        </motion.h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Vision Section */}
        <section>
          <div className="glass-heavy p-8 md:p-12 rounded-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4"></div>
             <h2 className="text-3xl font-heading font-bold uppercase mb-6 relative z-10">The Vision</h2>
             <div className="prose prose-invert max-w-none relative z-10">
               <p className="text-lg text-text-muted leading-relaxed">
                 RedVerse Genesis is a premium, museum-quality digital collectible series. We have moved entirely away from the massive, procedural NFT collections of the past. Instead, this project focuses on <strong>immaculate, handcrafted cinematic art</strong>.
               </p>
               <p className="text-lg text-text-muted leading-relaxed mt-4">
                 There are exactly 20 Guardians in the Genesis collection. Each was meticulously designed, lore-crafted, and rendered using cutting-edge AAA Unreal Engine 5 aesthetic prompts. They are not just images; they are individual characters in an unfolding science-fantasy epic called <em>The Crimson Fracture</em>.
               </p>
             </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold uppercase text-glow">The Roadmap</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { phase: "Phase I", title: "The Crimson Fracture", status: "Completed", current: false },
              { phase: "Phase II", title: "Genesis (20 Guardians)", status: "Active", current: true },
              { phase: "Phase III", title: "Awakening", status: "Upcoming", current: false },
              { phase: "Phase IV", title: "The Architects", status: "Upcoming", current: false },
              { phase: "Phase V", title: "The Fallen", status: "Upcoming", current: false },
              { phase: "Phase VI", title: "Voidborn", status: "Upcoming", current: false }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`glass p-6 rounded-xl flex items-center justify-between border ${item.current ? 'border-primary shadow-[0_0_15px_rgba(217,4,41,0.2)]' : 'border-border'}`}
              >
                <div className="flex items-center space-x-6">
                  <span className={`font-display tracking-widest text-sm ${item.current ? 'text-primary' : 'text-text-muted'}`}>
                    {item.phase}
                  </span>
                  <h3 className="text-xl font-heading font-bold uppercase text-white">{item.title}</h3>
                </div>
                <div className="hidden sm:block">
                  <span className={`px-3 py-1 rounded text-xs font-mono border ${item.current ? 'bg-primary/20 border-primary text-primary' : 'bg-surface border-border text-text-muted'}`}>
                    {item.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold uppercase">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "Why only 20 Guardians?", a: "We chose quality over quantity. Rather than generating 10,000 random permutations, we focused our entire creative pipeline on designing 20 distinct, breathtaking, and story-rich masterpieces." },
              { q: "What is the Crimson Core?", a: "In the lore, it is a singular source of infinite dimensional energy that powered The Architects' civilization. Its shattering caused the cataclysm known as The Crimson Fracture." },
              { q: "Who were the Architects?", a: "An ancient, highly advanced civilization that pushed the boundaries of spacetime physics. Their hubris ultimately destroyed them, leaving only the Guardians behind." },
              { q: "Will future collections exist?", a: "Yes. Genesis is exactly that—the beginning. The roadmap outlines future expansions like Awakening, The Fallen, and Voidborn." },
              { q: "Why Polygon?", a: "Polygon allows for extremely fast, low-cost transactions while maintaining the security of Ethereum, making it the perfect layer for premium digital collectibles." },
              { q: "How are royalties handled?", a: "Secondary sales enforce a strict creator royalty embedded directly into the ERC-721 smart contract to fund the continuous development of the RedVerse universe." }
            ].map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-xl border border-border hover:border-primary/50 transition-colors"
              >
                <h4 className="text-lg font-heading font-bold text-white mb-2">{faq.q}</h4>
                <p className="text-text-muted font-light">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
