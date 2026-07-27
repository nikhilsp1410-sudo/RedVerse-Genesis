import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  "The Architects built perfection. The Core shattered it.",
  "Spacetime is splintered. Only the ruins remain.",
  "Twenty anomalies wandering the Fracture.",
  "A civilization erased in a picosecond."
];

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Quote rotation
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 2500);

    // Progress simulation
    const duration = 4000; // 4 seconds total loading
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.floor((currentStep / steps) * 100), 100);
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(progressInterval);
        clearInterval(quoteInterval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 1000); // Wait for exit animation
        }, 500);
      }
    }, interval);

    return () => {
      clearInterval(progressInterval);
      clearInterval(quoteInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#0B0B0F] flex flex-col items-center justify-center text-white overflow-hidden"
        >
          {/* Background Ambient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-[#0B0B0F] to-[#0B0B0F]" />

          {/* Rotating Core Animation */}
          <div className="relative w-40 h-40 mb-12">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-primary/30 border-t-primary"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border border-primary/20 border-b-primary"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_30px_rgba(217,4,41,1)] animate-pulse" />
            </div>
          </div>

          {/* Loading Percentage */}
          <div className="mb-8 relative w-64 h-px bg-border/50">
             <motion.div 
               className="absolute top-0 left-0 h-full bg-primary box-glow"
               style={{ width: `${progress}%` }}
             />
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl font-heading font-bold uppercase tracking-[0.2em] mb-6 text-glow">
              RedVerse
            </h1>
            <div className="h-6">
               <AnimatePresence mode="wait">
                 <motion.p 
                   key={quoteIndex}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   className="text-xs font-display tracking-widest uppercase text-text-muted/80"
                 >
                   {quotes[quoteIndex]}
                 </motion.p>
               </AnimatePresence>
            </div>
          </div>
          
          <div className="absolute bottom-8 right-8 text-primary font-mono text-sm opacity-50">
             {progress.toString().padStart(3, '0')}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
