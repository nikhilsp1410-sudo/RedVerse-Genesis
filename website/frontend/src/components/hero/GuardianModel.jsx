import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Procedural Holographic Guardian Model.
 * Built entirely with Three.js primitives to represent the AI Guardian.
 */
export const GuardianModel = ({ mousePosition }) => {
  const groupRef = useRef(null);
  const coreRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.2;
      
      // Mouse interaction parallax
      if (mousePosition && mousePosition.current) {
         groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mousePosition.current.x * 0.5, 0.05);
         groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mousePosition.current.y * 0.5, 0.05);
      }
    }

    // Core pulsing
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(t * 4) * 0.05);
    }

    // Rings rotating
    if (ring1Ref.current && ring2Ref.current) {
      ring1Ref.current.rotation.x = t;
      ring1Ref.current.rotation.y = t * 0.5;
      
      ring2Ref.current.rotation.x = -t * 0.8;
      ring2Ref.current.rotation.y = -t;
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, 0]} scale={1.2}>
      {/* Energy Core */}
      <Sphere ref={coreRef} args={[0.5, 32, 32]}>
        <meshStandardMaterial 
          color="#D90429" 
          emissive="#D90429" 
          emissiveIntensity={2} 
          wireframe={true}
        />
      </Sphere>

      {/* Orbiting Ring 1 */}
      <Torus ref={ring1Ref} args={[1.2, 0.02, 16, 100]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
      </Torus>

      {/* Orbiting Ring 2 */}
      <Torus ref={ring2Ref} args={[1.8, 0.02, 16, 100]} rotation={[Math.PI/2, 0, 0]}>
        <meshStandardMaterial color="#D90429" emissive="#D90429" emissiveIntensity={0.5} transparent opacity={0.5} />
      </Torus>

      {/* Vertical Light Beams */}
      <Cylinder args={[0.1, 0.1, 10, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#D90429" 
          transparent 
          opacity={0.15} 
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Cylinder>
    </group>
  );
};
