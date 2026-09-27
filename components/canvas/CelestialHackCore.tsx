'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { REALMS } from '@/data/realmsData';

// GLSL Vertex Shader for the pulsating Celestial Hack Core
const coreVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uDistortion;

  // Classic Perlin 3D Noise function
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0 );
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;
    vPosition = position;

    // Organic breathing ripple
    float noise = snoise(position * 1.5 + vec3(uTime * 0.4)) * uDistortion;
    vec3 newPos = position + normal * noise;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

// GLSL Fragment Shader for the Celestial Hack Core
const coreFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uGlowColor;
  uniform float uIntensity;

  void main() {
    // View direction vector in eye space
    vec3 viewDir = normalize(-vPosition);
    
    // Fresnel rim effect (sacred divine halo)
    float fresnel = 1.0 - max(dot(viewDir, vNormal), 0.0);
    fresnel = pow(fresnel, 2.8);

    // Dynamic energy striations
    float bands = sin(vPosition.y * 12.0 + uTime * 3.0) * 0.5 + 0.5;
    float circularFlow = sin(length(vPosition.xz) * 10.0 - uTime * 2.0);

    // Color mixing between primary sacred tone and technology cyan/vermilion
    vec3 base = mix(uColorA, uColorB, bands * 0.6 + circularFlow * 0.2);
    vec3 finalColor = base + uGlowColor * fresnel * uIntensity;

    gl_FragColor = vec4(finalColor, 0.95);
  }
`;

interface CelestialHackCoreProps {
  currentRealmIndex: number;
  mousePos: { x: number; y: number };
  hovered?: boolean;
}

export default function CelestialHackCore({
  currentRealmIndex,
  mousePos,
  hovered = false,
}: CelestialHackCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const innerMandalaRef = useRef<THREE.Group>(null);
  const outerRingsRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const activeRealm = REALMS[currentRealmIndex] || REALMS[0];

  // Shader uniforms memo
  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uDistortion: { value: 0.15 },
      uColorA: { value: new THREE.Color(activeRealm.palette.primary) },
      uColorB: { value: new THREE.Color(activeRealm.palette.secondary) },
      uGlowColor: { value: new THREE.Color(activeRealm.palette.accent) },
      uIntensity: { value: 2.2 },
    };
  }, []);

  // Nine concentric celestial energy rings radii & rotational speed multipliers
  const nineRings = useMemo(() => {
    return Array.from({ length: 9 }).map((_, i) => ({
      radius: 2.2 + i * 0.42,
      tube: 0.018 + (i % 2 === 0 ? 0.008 : 0),
      speed: (i % 2 === 0 ? 1 : -1) * (0.2 + (9 - i) * 0.08),
      segments: 64,
      rotationOffset: (i * Math.PI) / 4.5,
    }));
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
      
      // Smoothly interpolate colors to current realm palette
      const targetColA = new THREE.Color(activeRealm.palette.primary);
      const targetColB = new THREE.Color(activeRealm.palette.secondary);
      const targetGlow = new THREE.Color(activeRealm.palette.accent);

      materialRef.current.uniforms.uColorA.value.lerp(targetColA, delta * 2.5);
      materialRef.current.uniforms.uColorB.value.lerp(targetColB, delta * 2.5);
      materialRef.current.uniforms.uGlowColor.value.lerp(targetGlow, delta * 2.5);
      materialRef.current.uniforms.uIntensity.value = hovered ? 3.4 : 2.2;
    }

    if (groupRef.current) {
      // Gentle floating breathing animation + cursor parallax
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.25;
      
      const targetRotX = mousePos.y * 0.35 + Math.sin(time * 0.3) * 0.1;
      const targetRotY = mousePos.x * 0.5 + time * 0.15;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 2);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 2);
    }

    if (innerMandalaRef.current) {
      innerMandalaRef.current.rotation.z -= delta * 0.4;
      innerMandalaRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    }

    if (outerRingsRef.current) {
      outerRingsRef.current.children.forEach((child, idx) => {
        const ringData = nineRings[idx];
        if (ringData) {
          child.rotation.z += delta * ringData.speed;
          child.rotation.x = Math.sin(time * 0.4 + idx) * 0.18;
          child.rotation.y = Math.cos(time * 0.3 + idx) * 0.18;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Pulsating Energy Core Sphere */}
      <mesh ref={coreMeshRef}>
        <sphereGeometry args={[1.35, 64, 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={coreVertexShader}
          fragmentShader={coreFragmentShader}
          uniforms={uniforms}
          transparent={true}
        />
      </mesh>

      {/* Internal Sacred Geometry Yantra (Merkaba / Icosahedron Frame) */}
      <group ref={innerMandalaRef}>
        <mesh>
          <icosahedronGeometry args={[1.75, 1]} />
          <meshBasicMaterial
            color={activeRealm.palette.accent}
            wireframe={true}
            transparent={true}
            opacity={0.35}
          />
        </mesh>
        <mesh>
          <octahedronGeometry args={[1.9, 0]} />
          <meshBasicMaterial
            color={activeRealm.palette.secondary}
            wireframe={true}
            transparent={true}
            opacity={0.4}
          />
        </mesh>
      </group>

      {/* Nine Concentric Celestial Rings (Representing The Nine Nights/Realms) */}
      <group ref={outerRingsRef}>
        {nineRings.map((ring, idx) => {
          const isHighlighted = idx === currentRealmIndex;
          return (
            <mesh key={idx} rotation={[ring.rotationOffset, idx * 0.2, 0]}>
              <torusGeometry args={[ring.radius, ring.tube, 16, ring.segments]} />
              <meshStandardMaterial
                color={isHighlighted ? activeRealm.palette.glow : activeRealm.palette.primary}
                emissive={isHighlighted ? activeRealm.palette.accent : activeRealm.palette.primary}
                emissiveIntensity={isHighlighted ? 2.5 : 0.6}
                roughness={0.2}
                metalness={0.8}
                transparent={true}
                opacity={isHighlighted ? 0.95 : 0.45}
              />
            </mesh>
          );
        })}
      </group>

      {/* 9 Git/Network Branching Nodes attached around the rings */}
      {Array.from({ length: 9 }).map((_, i) => {
        const angle = (i / 9) * Math.PI * 2;
        const rad = 3.6;
        const x = Math.cos(angle) * rad;
        const z = Math.sin(angle) * rad;
        const isCurrent = i === currentRealmIndex;

        return (
          <group key={i} position={[x, Math.sin(angle * 2) * 0.5, z]}>
            <mesh>
              <sphereGeometry args={[isCurrent ? 0.16 : 0.09, 16, 16]} />
              <meshBasicMaterial
                color={isCurrent ? '#fef08a' : activeRealm.palette.accent}
              />
            </mesh>
            <pointLight
              color={activeRealm.palette.accent}
              intensity={isCurrent ? 2.5 : 0.5}
              distance={4}
            />
          </group>
        );
      })}

      {/* Central Core Point Light */}
      <pointLight
        color={activeRealm.palette.accent}
        intensity={4}
        distance={15}
        decay={2}
      />
    </group>
  );
}
