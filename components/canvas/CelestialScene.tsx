'use client';

import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { REALMS } from '@/data/realmsData';
import CelestialHackCore from './CelestialHackCore';
import RealmsEnvironment from './RealmsEnvironment';
import FloatingDiyas from './FloatingDiyas';
import CustomParticles from './CustomParticles';
import CameraRig from './CameraRig';

interface CelestialSceneProps {
  currentRealmIndex: number;
  mousePos: { x: number; y: number };
  scrollProgress: number;
  isIntroActive: boolean;
  quality?: 'low' | 'med' | 'high';
  isCoreHovered?: boolean;
}

export default function CelestialScene({
  currentRealmIndex,
  mousePos,
  scrollProgress,
  isIntroActive,
  quality = 'high',
  isCoreHovered = false,
}: CelestialSceneProps) {
  const activeRealm = REALMS[currentRealmIndex] || REALMS[0];

  // Dynamic DPR based on quality settings to guarantee smooth 60fps
  const dpr = useMemo(() => {
    if (quality === 'low') return 1;
    if (quality === 'med') return [1, 1.25] as [number, number];
    return [1, 1.75] as [number, number];
  }, [quality]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 4, 20], fov: 48, near: 0.1, far: 180 }}
        dpr={dpr}
        gl={{
          antialias: quality !== 'low',
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        className="w-full h-full"
      >
        {/* Soft atmospheric depth that lets the sunset background image shine through */}
        <fog attach="fog" args={[activeRealm.palette.fog, 22, 85]} />

        <Suspense fallback={null}>
          {/* Camera Motion & Parallax Controller */}
          <CameraRig
            currentRealmIndex={currentRealmIndex}
            mousePos={mousePos}
            scrollProgress={scrollProgress}
            isIntroActive={isIntroActive}
          />

          {/* Procedural 3D Environment landmarks for the active realm */}
          <RealmsEnvironment currentRealmIndex={currentRealmIndex} />

          {/* Central Celestial Hack Core */}
          <CelestialHackCore
            currentRealmIndex={currentRealmIndex}
            mousePos={mousePos}
            hovered={isCoreHovered}
          />

          {/* Floating Luminous Lanterns / Nodes */}
          <FloatingDiyas
            count={quality === 'low' ? 12 : 26}
            spread={24}
            currentRealmColor={activeRealm.palette.accent}
          />

          {/* GPU Multi-Layer Particle Universe */}
          <CustomParticles
            currentRealmIndex={currentRealmIndex}
            mousePos={mousePos}
            quality={quality}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
