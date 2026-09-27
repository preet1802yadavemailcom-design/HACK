'use client';

import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
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

  // Dynamic DPR based on quality settings
  const dpr = useMemo(() => {
    if (quality === 'low') return 1;
    if (quality === 'med') return [1, 1.25] as [number, number];
    return [1, 1.75] as [number, number];
  }, [quality]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 2, 18], fov: 48, near: 0.1, far: 180 }}
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
        <Suspense fallback={null}>
          {/* Camera Controller */}
          <CameraRig
            currentRealmIndex={currentRealmIndex}
            mousePos={mousePos}
            scrollProgress={scrollProgress}
            isIntroActive={isIntroActive}
          />

          {/* Clean lighting layer */}
          <RealmsEnvironment currentRealmIndex={currentRealmIndex} />

          {/* Central Celestial Hack Core */}
          <CelestialHackCore
            currentRealmIndex={currentRealmIndex}
            mousePos={mousePos}
            hovered={isCoreHovered}
          />

          {/* Subtle floating luminous lanterns */}
          <FloatingDiyas
            count={quality === 'low' ? 8 : 16}
            spread={20}
            currentRealmColor={activeRealm.palette.accent}
          />

          {/* GPU Particles (Stars, Embers, Sparks) */}
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
