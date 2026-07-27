import { motion } from 'framer-motion';
import PremiumImage from '../../components/ui/PremiumImage';

export const FractureSection = () => {
  return (
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
               containerClassName="w-full h-full"
             />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
