'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingDiyasProps {
  count?: number;
  spread?: number;
  currentRealmColor?: string;
}

export default function FloatingDiyas({
  count = 24,
  spread = 22,
  currentRealmColor = '#fbbf24',
}: FloatingDiyasProps) {
  const nodesGroupRef = useRef<THREE.Group>(null);

  // Procedural placements for the floating celestial lanterns / glowing contribution nodes
  const nodesData = useMemo(() => {
    return Array.from({ length: count }).map((_, idx) => {
      const angle = (idx / count) * Math.PI * 2 + (Math.random() * 0.4);
      const rad = 5 + Math.random() * spread;
      const y = -2.5 + Math.random() * 5;
      const x = Math.cos(angle) * rad;
      const z = Math.sin(angle) * rad;
      const speed = 0.5 + Math.random() * 0.8;
      const phase = Math.random() * Math.PI * 2;
      const scale = 0.5 + Math.random() * 0.4;

      return {
        initialPos: [x, y, z] as [number, number, number],
        speed,
        phase,
        scale,
      };
    });
  }, [count, spread]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (nodesGroupRef.current) {
      nodesGroupRef.current.children.forEach((node, i) => {
        const data = nodesData[i];
        if (data) {
          // Organic floating bobbing motion over water
          node.position.y = data.initialPos[1] + Math.sin(time * data.speed + data.phase) * 0.35;
          node.rotation.y += delta * 0.25;
          
          // Core pulsation
          const core = node.children.find((c) => c.name === 'core');
          if (core) {
            const pulse = 1 + Math.sin(time * 4 + data.phase) * 0.12;
            core.scale.set(data.scale * pulse, data.scale * pulse, data.scale * pulse);
          }
        }
      });
    }
  });

  return (
    <group ref={nodesGroupRef}>
      {nodesData.map((data, idx) => (
        <group
          key={idx}
          position={data.initialPos}
          scale={[data.scale, data.scale, data.scale]}
        >
          {/* Geometric Outer Lantern Cage */}
          <mesh position={[0, 0, 0]}>
            <octahedronGeometry args={[0.38, 0]} />
            <meshStandardMaterial
              color="#d97706"
              wireframe={true}
              roughness={0.3}
              metalness={0.9}
            />
          </mesh>

          {/* Luminous Inner Core Flame */}
          <mesh name="core" position={[0, 0, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial
              color="#fef08a"
            />
          </mesh>

          {/* Local Warm Sunset Glow */}
          <pointLight
            color="#fbbf24"
            intensity={1.2}
            distance={2.8}
            decay={2}
          />
        </group>
      ))}
    </group>
  );
}
