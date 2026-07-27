import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export const FAQSection = () => {
  return (
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
  );
};
