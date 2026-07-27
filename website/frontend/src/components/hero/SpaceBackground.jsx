/* eslint-disable react-hooks/purity */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * Procedural Space Background featuring a particle field (stars)
 * and a glowing nebula effect, gently reacting to mouse movement.
 */
export const SpaceBackground = ({ mousePosition }) => {
  const pointsRef = useRef(null);

  // Generate random particles for the starfield
  const particlesCount = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Slow ambient rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    
    // Mouse parallax effect
    if (mousePosition && mousePosition.current) {
      const targetX = mousePosition.current.x * 0.5;
      const targetY = mousePosition.current.y * 0.5;
      
      pointsRef.current.rotation.x += 0.02 * (targetY - pointsRef.current.rotation.x);
      pointsRef.current.rotation.y += 0.02 * (targetX - pointsRef.current.rotation.y);
    }
  });

  return (
    <group>
      {/* Background Starfield */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#ffffff"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Nebula Base - Large soft red point light */}
      <pointLight position={[0, 0, -5]} distance={30} intensity={2} color="#D90429" />
      <ambientLight intensity={0.2} />
    </group>
  );
};
