'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function Lighting() {
  // We avoid the top-level `useThree()` so the component cannot blow up on
  // an HMR-flicker where the R3F context is briefly absent. `useFrame`
  // already gives us a live state (size, clock, gl, …) on every tick.
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const rimRef = useRef<THREE.DirectionalLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mobileMul = state.size.width < 900 ? 0.82 : 1;
    if (keyRef.current) {
      keyRef.current.position.x = -2.5 + Math.sin(t * 0.18) * 0.35;
      keyRef.current.position.y = 4.2 + Math.cos(t * 0.14) * 0.12;
      keyRef.current.intensity = (1.55 + Math.sin(t * 0.22) * 0.06) * mobileMul;
    }
    if (rimRef.current) {
      rimRef.current.position.z = -3.6 + Math.sin(t * 0.2) * 0.4;
      rimRef.current.intensity = (0.95 + Math.cos(t * 0.2) * 0.05) * mobileMul;
    }
  });

  return (
    <>
      <directionalLight
        ref={keyRef}
        position={[-2.5, 4.2, 5.2]}
        intensity={1.55}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[3.6, 1.8, 3.2]} intensity={1.0} color="#EAF6FF" />
      <directionalLight ref={rimRef} position={[2.8, 0.8, -3.6]} intensity={0.95} color="#7ED321" />
      <directionalLight position={[-2.4, 0.6, -3.8]} intensity={0.85} color="#00A6A6" />
      <pointLight position={[0, 2.2, 4.6]} intensity={0.5} color="#FFFFFF" />
      <hemisphereLight color="#FFFFFF" groundColor="#E7EDF2" intensity={0.72} />
    </>
  );
}
