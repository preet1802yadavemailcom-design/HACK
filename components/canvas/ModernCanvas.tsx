'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function AmbientParticles({ mousePos }: { mousePos: { x: number; y: number } }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 350;

  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 24;
      pos[i3 + 1] = (Math.random() - 0.5) * 16;
      pos[i3 + 2] = (Math.random() - 0.5) * 16;

      ph[i3] = Math.random() * Math.PI * 2;
      ph[i3 + 1] = Math.random() * Math.PI * 2;
      ph[i3 + 2] = Math.random() * Math.PI * 2;
    }
    return [pos, ph];
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.02 + mousePos.x * 0.15;
      pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.05 + mousePos.y * 0.1;

      const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        pos[i3 + 1] += Math.sin(time * 0.8 + phases[i3]) * 0.005;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        color="#fbbf24"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ModernCanvas({ mousePos }: { mousePos: { x: number; y: number } }) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        className="w-full h-full"
      >
        <AmbientParticles mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
