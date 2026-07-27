import { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { motion } from 'framer-motion';

import { SpaceBackground } from './SpaceBackground';
import { GuardianModel } from './GuardianModel';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

// Sequence animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', damping: 20, stiffness: 100 }
  }
};

export const CinematicHero = () => {
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates to -1 to +1
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0B0B0F]">
      
      {/* 3D Canvas Background & Model */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 45 }} 
          dpr={[1, 2]} // Optimize for high DPI without killing perf
          gl={{ antialias: true, alpha: false }}
        >
          <Suspense fallback={null}>
            <Environment preset="city" />
            <SpaceBackground mousePosition={mousePosition} />
            <GuardianModel mousePosition={mousePosition} />
          </Suspense>
        </Canvas>
      </div>

      {/* HTML Overlay (Left Side) */}
      <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-col items-start text-left pointer-events-auto mt-20 lg:mt-0">
              
              <motion.div variants={itemVariants}>
                <Badge variant="primary" className="mb-6 relative overflow-hidden group">
                  <span className="relative z-10 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2" />
                    Genesis Phase 1
                  </span>
                  <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Badge>
              </motion.div>
              
              <motion.h1 
                variants={itemVariants} 
                className="text-5xl sm:text-6xl md:text-8xl font-black font-heading tracking-tighter mb-4 text-glow drop-shadow-[0_0_15px_rgba(217,4,41,0.5)]"
              >
                REDVERSE
              </motion.h1>
              
              <motion.p 
                variants={itemVariants} 
                className="text-xl md:text-2xl text-text-muted mb-8 max-w-lg"
              >
                Forging the Future of Digital Creation.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <div className="relative group w-full sm:w-auto">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-md blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
                  <Button size="lg" variant="primary" className="relative w-full shadow-2xl overflow-hidden">
                    <span className="relative z-10">Explore Genesis</span>
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-sweep"></div>
                  </Button>
                </div>
                
                <Button size="lg" variant="outline" className="w-full sm:w-auto hover:bg-white/5 hover:border-white/40 transition-all duration-300">
                  Connect Wallet
                </Button>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-xs tracking-widest uppercase mb-2 font-medium">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
      
    </section>
  );
};
