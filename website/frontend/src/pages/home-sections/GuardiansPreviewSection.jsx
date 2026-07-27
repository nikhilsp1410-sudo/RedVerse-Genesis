import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { guardians } from '../../data/guardians';
import PremiumImage from '../../components/ui/PremiumImage';

export const GuardiansPreviewSection = () => {
  return (
    <section id="guardians" className="py-32 relative bg-[#0B0B0F]">
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
          {guardians.slice(0, 8).map((g, idx) => (
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
                     src={`/images/guardians/${String(idx + 1).padStart(3, '0')}.png`}
                     alt={g.name}
                     containerClassName="absolute inset-0 w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[rgba(11,11,15,0.4)] to-transparent z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
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
  );
};
