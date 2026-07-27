import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0B0B0F] text-text selection:bg-primary/30">
      <SEO 
        title="About RedVerse | The Vision & Roadmap"
        description="Learn about the RedVerse Genesis project. A premium, museum-quality digital collectible series focusing on immaculate, handcrafted cinematic art."
        url="https://redverse.xyz/about"
      />
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
        
        {/* The Vision Section */}
        <section>
          <div className="glass-heavy p-8 md:p-12 rounded-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4"></div>
             <h2 className="text-3xl font-heading font-bold uppercase mb-6 relative z-10 text-primary">The Vision</h2>
             <div className="prose prose-invert max-w-none relative z-10">
               <p className="text-lg text-text-muted leading-relaxed">
                 RedVerse Genesis is a premium, museum-quality digital collectible series. We have moved entirely away from the massive, procedural NFT collections of the past. Instead, this project focuses on <strong>immaculate, handcrafted cinematic art</strong>.
               </p>
               <p className="text-lg text-text-muted leading-relaxed mt-4">
                 Our vision is to build a high-end Web3 IP that stands alongside the greatest sci-fi fantasy universes, starting with an immutable foundation on the Polygon blockchain.
               </p>
             </div>
          </div>
        </section>

        {/* The Mission Section */}
        <section>
          <div className="glass p-8 md:p-12 rounded-2xl relative overflow-hidden border border-border">
             <h2 className="text-3xl font-heading font-bold uppercase mb-6 relative z-10 text-white">The Mission</h2>
             <div className="prose prose-invert max-w-none relative z-10">
               <p className="text-lg text-text-muted leading-relaxed">
                 To pioneer the next generation of digital storytelling. We aim to merge AAA-quality visual design with robust smart contract mechanics, providing our collectors not just with a PFP, but with a piece of a meticulously crafted universe.
               </p>
             </div>
          </div>
        </section>

        {/* Why 20 NFTs Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-heavy p-8 md:p-10 rounded-2xl border border-primary/20">
             <h3 className="text-2xl font-heading font-bold uppercase mb-4 text-glow">Why Exactly 20 NFTs?</h3>
             <p className="text-text-muted leading-relaxed font-light">
               We chose absolute quality over procedural quantity. Rather than generating 10,000 random permutations, we focused our entire creative pipeline on designing 20 distinct, breathtaking, and story-rich masterpieces. Scarcity here is a byproduct of extreme artistic dedication.
             </p>
          </div>
          <div className="glass-heavy p-8 md:p-10 rounded-2xl border border-border">
             <h3 className="text-2xl font-heading font-bold uppercase mb-4">Why RedVerse Exists?</h3>
             <p className="text-text-muted leading-relaxed font-light">
               The Web3 space is cluttered with low-effort derivatives. RedVerse exists to set a new standard. It was born from the desire to create a dark luxury aesthetic that feels immersive, mature, and technologically superior.
             </p>
          </div>
        </section>

        {/* Future Direction */}
        <section className="pb-12">
          <div className="text-center">
            <h2 className="text-4xl font-heading font-bold uppercase mb-6 text-primary text-glow">Future Direction</h2>
            <p className="text-xl text-text-muted leading-relaxed max-w-2xl mx-auto font-light mb-8">
              Genesis is the foundation. As we expand the IP, these original 20 Guardians will serve as the absolute apex of the ecosystem. The roadmap includes expansive lore chapters, physical integrations, and interactive digital experiences.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
