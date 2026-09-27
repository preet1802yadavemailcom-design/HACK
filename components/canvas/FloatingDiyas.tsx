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
  const diyasGroupRef = useRef<THREE.Group>(null);

  // Procedural placements for the floating sacred diyas
  const diyasData = useMemo(() => {
    return Array.from({ length: count }).map((_, idx) => {
      const angle = (idx / count) * Math.PI * 2 + (Math.random() * 0.4);
      const rad = 5 + Math.random() * spread;
      const y = -2.5 + Math.random() * 5;
      const x = Math.cos(angle) * rad;
      const z = Math.sin(angle) * rad;
      const speed = 0.5 + Math.random() * 0.8;
      const phase = Math.random() * Math.PI * 2;
      const scale = 0.6 + Math.random() * 0.5;

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

    if (diyasGroupRef.current) {
      diyasGroupRef.current.children.forEach((diya, i) => {
        const data = diyasData[i];
        if (data) {
          // Organic floating bobbing motion
          diya.position.y = data.initialPos[1] + Math.sin(time * data.speed + data.phase) * 0.35;
          diya.rotation.y += delta * 0.2;
          
          // Flame flicker
          const flame = diya.children.find((c) => c.name === 'flame');
          if (flame) {
            const flicker = 1 + Math.sin(time * 12 + data.phase) * 0.15 + (Math.random() - 0.5) * 0.08;
            flame.scale.set(data.scale * 1, data.scale * flicker * 1.3, data.scale * 1);
          }
        }
      });
    }
  });

  return (
    <group ref={diyasGroupRef}>
      {diyasData.map((data, idx) => (
        <group
          key={idx}
          position={data.initialPos}
          scale={[data.scale, data.scale, data.scale]}
        >
          {/* Terracotta Diya Clay Bowl */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.35, 0.18, 0.15, 16]} />
            <meshStandardMaterial
              color="#78350f"
              roughness={0.7}
              metalness={0.1}
            />
          </mesh>

          {/* Golden Sacred Ghee / Oil reservoir */}
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.3, 0.28, 0.04, 16]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#d97706"
              emissiveIntensity={0.6}
              roughness={0.2}
            />
          </mesh>

          {/* Diya Sacred Teardrop Flame */}
          <mesh name="flame" position={[0, 0.22, 0]}>
            <coneGeometry args={[0.12, 0.32, 16]} />
            <meshBasicMaterial
              color="#fef08a"
            />
          </mesh>

          {/* Local Warm Flame Glow */}
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
