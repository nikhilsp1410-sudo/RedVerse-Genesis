import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Environment } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { CONTRACT_ADDRESS } from '../../web3/core/config';
import { Hexagon } from 'lucide-react';

function CrimsonParticles(props) {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(2000), { radius: 2 }));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 30;
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
    state.camera.position.y = Math.cos(state.clock.elapsedTime * 0.1) * 0.5;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={true} {...props}>
        <PointMaterial transparent color="#D90429" size={0.003} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
      </Points>
    </group>
  );
}

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[#0B0B0F]">
        <Canvas camera={{ position: [0, 0, 1] }} gl={{ alpha: false }}>
          <color attach="background" args={['#0B0B0F']} />
          <ambientLight intensity={0.5} />
          <CrimsonParticles />
          <Environment preset="night" />
        </Canvas>
        <div className="absolute inset-0 pointer-events-none bg-black/40" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0B0B0F] to-transparent" />
      </div>

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-12">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-primary font-display uppercase text-sm md:text-base mb-4"
        >
          "The First Guardians of the Digital Realm"
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold uppercase tracking-tighter text-glow leading-none mb-4"
        >
          RedVerse
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white uppercase tracking-widest mb-8"
        >
          Genesis
        </motion.h2>

        {/* Web3 Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <span className="px-3 py-1 bg-surface/50 border border-border backdrop-blur-md rounded text-[10px] uppercase font-display tracking-widest text-white flex items-center shadow-lg">
            <img src="https://cryptologos.cc/logos/polygon-matic-logo.svg?v=025" alt="Polygon" className="w-3 h-3 mr-2" />
            Minted on Polygon
          </span>
          <span className="px-3 py-1 bg-surface/50 border border-border backdrop-blur-md rounded text-[10px] uppercase font-display tracking-widest text-white flex items-center shadow-lg">
            <Hexagon className="w-3 h-3 mr-2 text-primary" />
            Genesis Collection
          </span>
          {CONTRACT_ADDRESS && (
            <span className="px-3 py-1 bg-primary/10 border border-primary/30 backdrop-blur-md rounded text-[10px] font-mono tracking-widest text-primary flex items-center shadow-lg">
              {`${CONTRACT_ADDRESS.slice(0, 6)}...${CONTRACT_ADDRESS.slice(-4)}`}
            </span>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link to="/collection" className="w-full sm:w-auto glass-heavy px-8 py-4 text-white font-bold tracking-wider uppercase text-sm rounded border border-primary/50 hover:border-primary hover:bg-primary/20 transition-all box-glow group text-center">
            Explore Collection <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <a href="https://opensea.io/collection/redverse-genesis" target="_blank" rel="noreferrer" className="w-full sm:w-auto glass px-8 py-4 text-primary font-bold tracking-wider uppercase text-sm rounded border border-primary/30 hover:border-primary hover:text-white transition-all text-center flex items-center justify-center">
            View on OpenSea
          </a>
        </motion.div>
      </div>
    </section>
  );
};
