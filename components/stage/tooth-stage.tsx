'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei';
import React, { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';
import { ToothModel } from './tooth-model';
import { Lighting } from './lighting';
import { Orchestrator } from './orchestrator';

const TOOTH_GLB_PATH = '/images/a1345f2b-fd84-4048-ac70-65fd9f3c5742.glb';

class StageErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('Tooth model failed to load. Showing fallback mesh.', error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function FallbackTooth({ simple = false }: { simple?: boolean }) {
  const segs = simple ? 16 : 48;
  return (
    <group name="tooth-root" scale={simple ? 0.9 : 1.1}>
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.75, segs, segs]} />
        <meshPhysicalMaterial color="#FFF8E8" roughness={0.22} clearcoat={simple ? 0 : 0.9} clearcoatRoughness={0.1} />
      </mesh>
      <mesh position={[-0.28, -0.7, 0.05]} rotation={[0.1, 0, -0.18]} castShadow receiveShadow>
        <capsuleGeometry args={[0.22, 0.8, 8, simple ? 8 : 16]} />
        <meshPhysicalMaterial color="#FFF8E8" roughness={0.22} clearcoat={simple ? 0 : 0.9} clearcoatRoughness={0.1} />
      </mesh>
      <mesh position={[0.28, -0.7, 0.05]} rotation={[0.1, 0, 0.18]} castShadow receiveShadow>
        <capsuleGeometry args={[0.22, 0.8, 8, simple ? 8 : 16]} />
        <meshPhysicalMaterial color="#FFF8E8" roughness={0.22} clearcoat={simple ? 0 : 0.9} clearcoatRoughness={0.1} />
      </mesh>
    </group>
  );
}

export function ToothStage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none lg:inset-y-0 lg:right-0 lg:left-[55%]" style={{ zIndex: 5 }} aria-hidden>
      <div className="absolute inset-0 tooth-backdrop" />

      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{ position: [0, 0, 5], fov: 25 }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <Environment preset="apartment" background={false} resolution={256} />
          <StageErrorBoundary fallback={<FallbackTooth />}>
            <ToothModel />
          </StageErrorBoundary>
          <Orchestrator />
        </Suspense>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Preload all />
      </Canvas>
    </div>
  );
}
