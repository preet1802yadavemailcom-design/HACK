'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { REALMS } from '@/data/realmsData';

interface CameraRigProps {
  currentRealmIndex: number;
  mousePos: { x: number; y: number };
  scrollProgress: number; // 0 to 1
  isIntroActive: boolean;
}

export default function CameraRig({
  currentRealmIndex,
  mousePos,
  scrollProgress,
  isIntroActive,
}: CameraRigProps) {
  const { camera } = useThree();
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    if (isIntroActive) {
      // Intro camera: gently zooms in from distant dark void
      camera.position.lerp(new THREE.Vector3(0, 3, 22), delta * 0.8);
      currentTarget.current.lerp(new THREE.Vector3(0, 0, 0), delta * 0.8);
      camera.lookAt(currentTarget.current);
      return;
    }

    const activeRealm = REALMS[currentRealmIndex] || REALMS[0];
    const basePos = activeRealm.cameraPos;
    const baseTarget = activeRealm.targetPos;

    // Combine Realm Base Position + Scroll Offset + Mouse Parallax
    const targetCamX = basePos[0] + mousePos.x * 2.2;
    const targetCamY = basePos[1] + mousePos.y * 1.6 - (scrollProgress * 2.5);
    const targetCamZ = basePos[2] - (scrollProgress * 4.0);

    const targetLookX = baseTarget[0] + mousePos.x * 0.8;
    const targetLookY = baseTarget[1] + mousePos.y * 0.5;
    const targetLookZ = baseTarget[2];

    const targetPosVec = new THREE.Vector3(targetCamX, targetCamY, targetCamZ);
    const targetLookVec = new THREE.Vector3(targetLookX, targetLookY, targetLookZ);

    // Smooth cinematic easing
    camera.position.lerp(targetPosVec, delta * 2.2);
    currentTarget.current.lerp(targetLookVec, delta * 2.5);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
