'use client';

import React from 'react';
import { REALMS } from '@/data/realmsData';

interface RealmsEnvironmentProps {
  currentRealmIndex: number;
}

export default function RealmsEnvironment({ currentRealmIndex }: RealmsEnvironmentProps) {
  const activeRealm = REALMS[currentRealmIndex] || REALMS[0];

  return (
    <group>
      {/* Subtle atmospheric lighting complementing the sunset lake image without obscuring it */}
      <ambientLight color="#fed7aa" intensity={0.8} />
      <directionalLight
        position={[10, 15, 10]}
        color={activeRealm.palette.primary}
        intensity={1.2}
      />
      <directionalLight
        position={[-10, 5, -5]}
        color="#fb923c"
        intensity={0.8}
      />

      {/* Lightweight subtle data orbit in the distance */}
      <mesh rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, -5]}>
        <ringGeometry args={[6, 6.05, 64]} />
        <meshBasicMaterial
          color={activeRealm.palette.accent}
          transparent
          opacity={0.25}
        />
      </mesh>
    </group>
  );
}
