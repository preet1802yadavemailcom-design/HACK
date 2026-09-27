'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { REALMS } from '@/data/realmsData';

interface RealmsEnvironmentProps {
  currentRealmIndex: number;
}

export default function RealmsEnvironment({ currentRealmIndex }: RealmsEnvironmentProps) {
  const activeRealm = REALMS[currentRealmIndex] || REALMS[0];
  const groupRef = useRef<THREE.Group>(null);
  const bellGroupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Group>(null);
  const lightningRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Gentle swaying of acoustic chime bells in Realm 3 (Resonance)
    if (bellGroupRef.current) {
      bellGroupRef.current.children.forEach((child, i) => {
        child.rotation.z = Math.sin(time * 2.5 + i) * 0.15;
      });
    }

    // Orbiting planetary objects in Realm 4 (Nebula)
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.4;
      planetRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }

    // Dynamic lightning flickers in Realm 7 (Quantum Breakthrough)
    if (lightningRef.current) {
      const strike = Math.sin(time * 18) > 0.82;
      lightningRef.current.visible = strike;
      lightningRef.current.position.x = Math.sin(time * 5) * 8;
    }
  });

  return (
    <group ref={groupRef}>
      {/* ----------------- DIMENSION 01: GENESIS (Mountain Summits) ----------------- */}
      {currentRealmIndex === 0 && (
        <group position={[0, -5, 0]}>
          {/* Mountain Summits */}
          {[-12, -6, 0, 7, 13].map((x, i) => (
            <mesh key={i} position={[x, 0, -10 - (i % 3) * 4]}>
              <coneGeometry args={[4 + (i % 3) * 1.5, 9 + (i % 2) * 3, 6]} />
              <meshStandardMaterial
                color="#0f172a"
                roughness={0.6}
                metalness={0.2}
                flatShading
              />
              {/* Snow/Light Caps */}
              <mesh position={[0, 3.2, 0]}>
                <coneGeometry args={[2.2, 3.2, 6]} />
                <meshStandardMaterial
                  color="#f8fafc"
                  roughness={0.3}
                  emissive="#e0f2fe"
                  emissiveIntensity={0.2}
                  flatShading
                />
              </mesh>
            </mesh>
          ))}
          {/* Glowing Digital Stream Path */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2, 0]}>
            <ringGeometry args={[6, 8, 32]} />
            <meshBasicMaterial
              color="#38bdf8"
              wireframe
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>
      )}

      {/* ----------------- DIMENSION 02: ARCHITECTURE (Code Grove) ----------------- */}
      {currentRealmIndex === 1 && (
        <group position={[0, -4, 0]}>
          {/* Ancient Monoliths / Pillars */}
          {[-8, -4, 4, 8].map((x, i) => (
            <group key={i} position={[x, 0, -6 - (i % 2) * 3]}>
              <mesh position={[0, 2.5, 0]}>
                <cylinderGeometry args={[0.5, 0.7, 5, 8]} />
                <meshStandardMaterial color="#064e3b" roughness={0.8} />
              </mesh>
              <mesh position={[0, 5.2, 0]}>
                <octahedronGeometry args={[0.6, 0]} />
                <meshStandardMaterial
                  color="#6ee7b7"
                  emissive="#34d399"
                  emissiveIntensity={1.5}
                />
              </mesh>
            </group>
          ))}
          {/* Water Reflection Plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
            <planeGeometry args={[40, 40]} />
            <meshStandardMaterial
              color="#022c22"
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
        </group>
      )}

      {/* ----------------- DIMENSION 03: RESONANCE (Golden Crescent & Bells) ----------------- */}
      {currentRealmIndex === 2 && (
        <group>
          {/* Giant Celestial Crescent */}
          <group position={[12, 10, -18]}>
            <mesh>
              <sphereGeometry args={[7, 32, 32]} />
              <meshStandardMaterial
                color="#fde047"
                emissive="#eab308"
                emissiveIntensity={0.8}
                roughness={0.3}
              />
            </mesh>
            <mesh position={[-2.5, 0, 1.8]}>
              <sphereGeometry args={[6.8, 32, 32]} />
              <meshBasicMaterial color="#0b0f19" />
            </mesh>
          </group>

          {/* Hanging Golden Acoustic Chimes */}
          <group ref={bellGroupRef} position={[0, 5, -4]}>
            {[-5, -2, 2, 5].map((x, idx) => (
              <group key={idx} position={[x, 0, 0]}>
                <mesh position={[0, -0.6, 0]}>
                  <cylinderGeometry args={[0.1, 0.6, 1.2, 16]} />
                  <meshStandardMaterial
                    color="#fbbf24"
                    metalness={0.9}
                    roughness={0.2}
                    emissive="#d97706"
                    emissiveIntensity={0.4}
                  />
                </mesh>
                <mesh position={[0, -1.3, 0]}>
                  <sphereGeometry args={[0.16, 12, 12]} />
                  <meshBasicMaterial color="#fef08a" />
                </mesh>
              </group>
            ))}
          </group>
        </group>
      )}

      {/* ----------------- DIMENSION 04: NEBULA (Cosmic Generation) ----------------- */}
      {currentRealmIndex === 3 && (
        <group>
          {/* Giant Solar Core */}
          <mesh position={[0, 0, -22]}>
            <sphereGeometry args={[8, 32, 32]} />
            <meshBasicMaterial color="#fb923c" />
          </mesh>
          <mesh position={[0, 0, -22]}>
            <torusGeometry args={[11, 0.8, 16, 64]} />
            <meshBasicMaterial color="#f97316" transparent opacity={0.6} />
          </mesh>

          {/* Orbiting Planetary Nodes */}
          <group ref={planetRef} position={[0, 0, 0]}>
            {[
              { dist: 7, size: 0.6, color: '#ec4899' },
              { dist: 11, size: 0.9, color: '#a855f7' },
              { dist: 15, size: 0.5, color: '#38bdf8' },
            ].map((p, i) => (
              <mesh key={i} position={[p.dist, Math.sin(i) * 2, 0]}>
                <sphereGeometry args={[p.size, 16, 16]} />
                <meshStandardMaterial
                  color={p.color}
                  emissive={p.color}
                  emissiveIntensity={0.8}
                />
              </mesh>
            ))}
          </group>
        </group>
      )}

      {/* ----------------- DIMENSION 05: NEXUS (Collaborative Oasis) ----------------- */}
      {currentRealmIndex === 4 && (
        <group position={[0, -3.5, 0]}>
          {/* Floating Tiered Platform */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const r = 6;
            return (
              <mesh
                key={i}
                position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}
                rotation={[0.3, -angle, 0]}
              >
                <coneGeometry args={[1.6, 3.8, 4]} />
                <meshStandardMaterial
                  color="#f43f5e"
                  emissive="#fb7185"
                  emissiveIntensity={0.6}
                  roughness={0.4}
                />
              </mesh>
            );
          })}
          {/* Waterfall Data Beams */}
          {[-6, 6].map((x, idx) => (
            <mesh key={idx} position={[x, -2, -3]}>
              <cylinderGeometry args={[0.1, 0.4, 8, 16]} />
              <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} />
            </mesh>
          ))}
        </group>
      )}

      {/* ----------------- DIMENSION 06: THE FORGE (Execution Citadel) ----------------- */}
      {currentRealmIndex === 5 && (
        <group position={[0, -4, 0]}>
          {/* Volcanic Basalt Pillars */}
          {[-9, -5, 0, 5, 9].map((x, i) => (
            <mesh key={i} position={[x, (i % 2) * 1.5, -8 - (i % 3) * 2]}>
              <cylinderGeometry args={[0.8, 1.4, 7 + (i % 3) * 2, 6]} />
              <meshStandardMaterial
                color="#18181b"
                roughness={0.9}
                flatShading
              />
            </mesh>
          ))}
          {/* Magma Fissure Floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[35, 35]} />
            <meshStandardMaterial
              color="#450a0a"
              emissive="#dc2626"
              emissiveIntensity={0.4}
              roughness={0.7}
            />
          </mesh>
        </group>
      )}

      {/* ----------------- DIMENSION 07: BREAKTHROUGH (Quantum Void) ----------------- */}
      {currentRealmIndex === 6 && (
        <group>
          {/* Lightning Arcs */}
          <group ref={lightningRef} position={[0, 4, -8]}>
            <mesh>
              <cylinderGeometry args={[0.08, 0.15, 14, 4]} />
              <meshBasicMaterial color="#00f0ff" />
            </mesh>
            <pointLight color="#a855f7" intensity={8} distance={20} />
          </group>

          {/* Monolith Matrix */}
          {[-6, 0, 6].map((x, i) => (
            <mesh key={i} position={[x, -2, -6]}>
              <boxGeometry args={[0.8, 6, 0.8]} />
              <meshBasicMaterial color="#7c3aed" wireframe />
            </mesh>
          ))}
        </group>
      )}

      {/* ----------------- DIMENSION 08: SANCTUARY (Crystal Architecture) ----------------- */}
      {currentRealmIndex === 7 && (
        <group position={[0, -4, 0]}>
          {/* Luminescent Crystal Spires */}
          {[-7, -3, 3, 7].map((x, i) => (
            <mesh key={i} position={[x, 2, -6 - (i % 2) * 3]} rotation={[0, i * 0.4, 0.1 * (i % 2 ? 1 : -1)]}>
              <octahedronGeometry args={[1.5, 0]} />
              <meshStandardMaterial
                color="#e0f2fe"
                emissive="#bae6fd"
                emissiveIntensity={0.9}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>
          ))}
          {/* Water Platform */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <circleGeometry args={[14, 32]} />
            <meshStandardMaterial
              color="#0c4a6e"
              roughness={0.05}
              metalness={0.95}
            />
          </mesh>
        </group>
      )}

      {/* ----------------- DIMENSION 09: APEX (Metropolis of Mastery) ----------------- */}
      {currentRealmIndex === 8 && (
        <group position={[0, -3, 0]}>
          {/* Floating Spire */}
          <group position={[0, 2, -12]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[10, 2, 10]} />
              <meshStandardMaterial
                color="#78350f"
                metalness={0.8}
                roughness={0.3}
              />
            </mesh>
            <mesh position={[0, 2.5, 0]}>
              <boxGeometry args={[7, 3, 7]} />
              <meshStandardMaterial
                color="#fbbf24"
                emissive="#d97706"
                emissiveIntensity={0.5}
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0, 6.5, 0]}>
              <coneGeometry args={[3.2, 5, 8]} />
              <meshStandardMaterial
                color="#fef08a"
                emissive="#f59e0b"
                emissiveIntensity={0.8}
                metalness={0.95}
                roughness={0.1}
              />
            </mesh>
            <mesh position={[0, 9.4, 0]}>
              <sphereGeometry args={[0.55, 16, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>

          {/* Central Ground Grid */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <ringGeometry args={[5, 16, 48]} />
            <meshBasicMaterial
              color="#fbbf24"
              wireframe
              transparent
              opacity={0.5}
            />
          </mesh>

          {/* Converging Energy Beams */}
          {Array.from({ length: 9 }).map((_, i) => {
            const angle = (i / 9) * Math.PI * 2;
            const r = 14;
            return (
              <mesh
                key={i}
                position={[Math.cos(angle) * r, 3, Math.sin(angle) * r]}
                rotation={[0, -angle, Math.PI / 4]}
              >
                <cylinderGeometry args={[0.06, 0.06, 12, 8]} />
                <meshBasicMaterial
                  color="#fbbf24"
                  transparent
                  opacity={0.7}
                />
              </mesh>
            );
          })}
        </group>
      )}

      {/* Atmospheric Lighting Matching the Dimension */}
      <ambientLight color={activeRealm.palette.ambient} intensity={1.2} />
      <directionalLight
        position={[10, 15, 10]}
        color={activeRealm.palette.primary}
        intensity={2.0}
      />
      <directionalLight
        position={[-10, -5, -10]}
        color={activeRealm.palette.secondary}
        intensity={1.2}
      />
    </group>
  );
}
