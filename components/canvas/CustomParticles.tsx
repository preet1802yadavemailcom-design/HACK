'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { REALMS } from '@/data/realmsData';

interface CustomParticlesProps {
  currentRealmIndex: number;
  mousePos: { x: number; y: number };
  quality?: 'low' | 'med' | 'high';
}

export default function CustomParticles({
  currentRealmIndex,
  mousePos,
  quality = 'high',
}: CustomParticlesProps) {
  const starsRef = useRef<THREE.Points>(null);
  const petalsRef = useRef<THREE.Points>(null);
  const firefliesRef = useRef<THREE.Points>(null);

  const activeRealm = REALMS[currentRealmIndex] || REALMS[0];

  // Particle count scaling based on quality mode
  const counts = useMemo(() => {
    switch (quality) {
      case 'low':
        return { stars: 800, petals: 200, fireflies: 100 };
      case 'med':
        return { stars: 1500, petals: 350, fireflies: 180 };
      default:
        return { stars: 2500, petals: 600, fireflies: 260 };
    }
  }, [quality]);

  // 1. Cosmic Stars Background
  const [starsPositions, starsScales] = useMemo(() => {
    const pos = new Float32Array(counts.stars * 3);
    const scales = new Float32Array(counts.stars);

    for (let i = 0; i < counts.stars; i++) {
      const i3 = i * 3;
      // Spherical distribution around universe
      const radius = 35 + Math.random() * 55;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);

      scales[i] = 0.5 + Math.random() * 1.5;
    }
    return [pos, scales];
  }, [counts.stars]);

  // 2. Swirling Sacred Lotus & Marigold Petals / Embers
  const [petalsPositions, petalsVelocities, petalsOffsets] = useMemo(() => {
    const pos = new Float32Array(counts.petals * 3);
    const vel = new Float32Array(counts.petals * 3);
    const offsets = new Float32Array(counts.petals);

    for (let i = 0; i < counts.petals; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 28;
      pos[i3 + 1] = (Math.random() - 0.5) * 20;
      pos[i3 + 2] = (Math.random() - 0.5) * 28;

      vel[i3] = (Math.random() - 0.5) * 0.02;
      vel[i3 + 1] = 0.015 + Math.random() * 0.03;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.02;

      offsets[i] = Math.random() * Math.PI * 2;
    }
    return [pos, vel, offsets];
  }, [counts.petals]);

  // 3. Bioluminescent Fireflies / Code Sparks
  const [firefliesPositions, firefliesPhases] = useMemo(() => {
    const pos = new Float32Array(counts.fireflies * 3);
    const phases = new Float32Array(counts.fireflies * 3);

    for (let i = 0; i < counts.fireflies; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 18;
      pos[i3 + 1] = (Math.random() - 0.5) * 12;
      pos[i3 + 2] = (Math.random() - 0.5) * 18;

      phases[i3] = Math.random() * Math.PI * 2;
      phases[i3 + 1] = Math.random() * Math.PI * 2;
      phases[i3 + 2] = Math.random() * Math.PI * 2;
    }
    return [pos, phases];
  }, [counts.fireflies]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Rotate starfield slowly
    if (starsRef.current) {
      starsRef.current.rotation.y = time * 0.012;
      starsRef.current.rotation.x = Math.sin(time * 0.008) * 0.05;
    }

    // Animate Petals & Embers with vortex turbulence & cursor repulsion
    if (petalsRef.current) {
      const positions = petalsRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < counts.petals; i++) {
        const i3 = i * 3;

        // Upward floating vortex
        positions[i3 + 1] += petalsVelocities[i3 + 1];
        positions[i3] += Math.sin(time * 0.6 + petalsOffsets[i]) * 0.02;
        positions[i3 + 2] += Math.cos(time * 0.6 + petalsOffsets[i]) * 0.02;

        // Reset if drifted beyond bounds
        if (positions[i3 + 1] > 12) {
          positions[i3 + 1] = -12;
          positions[i3] = (Math.random() - 0.5) * 28;
          positions[i3 + 2] = (Math.random() - 0.5) * 28;
        }

        // Slight cursor interaction
        const dx = positions[i3] - mousePos.x * 6;
        const dy = positions[i3 + 1] - mousePos.y * 6;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 4.0 && dist > 0.01) {
          positions[i3] += (dx / dist) * 0.03;
          positions[i3 + 1] += (dy / dist) * 0.03;
        }
      }
      petalsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Animate Fireflies / Bioluminescent code nodes
    if (firefliesRef.current) {
      const positions = firefliesRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < counts.fireflies; i++) {
        const i3 = i * 3;
        positions[i3] += Math.sin(time * 1.5 + firefliesPhases[i3]) * 0.025;
        positions[i3 + 1] += Math.cos(time * 1.2 + firefliesPhases[i3 + 1]) * 0.025;
        positions[i3 + 2] += Math.sin(time * 1.1 + firefliesPhases[i3 + 2]) * 0.025;
      }
      firefliesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Cosmic Stars Points */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starsPositions.length / 3}
            array={starsPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#ffffff"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Floating Petals / Embers */}
      <points ref={petalsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={petalsPositions.length / 3}
            array={petalsPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.28}
          color={activeRealm.palette.secondary}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Fireflies / Code Sparks */}
      <points ref={firefliesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={firefliesPositions.length / 3}
            array={firefliesPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.18}
          color={activeRealm.palette.accent}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
