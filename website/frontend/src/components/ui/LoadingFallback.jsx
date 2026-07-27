import { motion } from 'framer-motion';

const LoadingFallback = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-background absolute inset-0 z-50">
      <motion.div 
        className="w-16 h-16 border border-primary/30 rounded-full flex items-center justify-center relative mb-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-12 h-12 border-2 border-primary/20 rounded-full border-t-primary border-l-primary" />
        <motion.div 
          className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(217,4,41,0.5)]"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      <motion.p 
        className="text-white font-heading text-lg font-bold tracking-[0.2em] uppercase"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        RedVerse
      </motion.p>
      <p className="mt-2 text-text-muted text-xs font-medium tracking-widest uppercase">
        Initializing Engine...
      </p>
    </div>
  );
};

export default LoadingFallback;
