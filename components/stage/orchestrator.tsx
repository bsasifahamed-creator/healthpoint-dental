'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { useScrollState } from '@/lib/scroll-store';
import * as THREE from 'three';

const VEC = new THREE.Vector3();
const EULER = new THREE.Euler(0, 0, 0, 'YXZ');

export function Orchestrator() {
  // We read `scene` from the useFrame state on every tick rather than via
  // `useThree()` at render time. This keeps the component immune to any
  // brief context-timing edge case across HMR or Suspense resumes — by the
  // time useFrame fires, R3F's reconciler is guaranteed to be live.
  const initial = useScrollState.getState();
  const target = useRef({
    px: initial.px,
    py: initial.py,
    pz: initial.pz,
    rx: initial.rx,
    ry: initial.ry,
    rz: initial.rz,
    scale: initial.scale,
  });
  const rotation = useRef({ x: 0, y: 0, z: 0 });
  const rotationInitialized = useRef(false);
  const basePosition = useRef({ x: initial.px, y: initial.py, z: initial.pz });
  const cursor = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return useScrollState.subscribe((s) => {
      target.current = {
        px: s.px,
        py: s.py,
        pz: s.pz,
        rx: s.rx,
        ry: s.ry,
        rz: s.rz,
        scale: s.scale,
      };
    });
  }, []);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      cursor.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      cursor.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointerMove);
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  useFrame((state, delta) => {
    const tooth = state.scene.getObjectByName('tooth-root');
    if (!tooth) return;
    const positionK = Math.min(1, delta * 9.2);
    const rotationK = Math.min(1, delta * 8.8);
    const yawK = Math.min(1, delta * 16.0);
    const scaleK = Math.min(1, delta * 8.8);
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const scrollMax =
      typeof document !== 'undefined'
        ? Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
        : 1;
    const scrollProgress = THREE.MathUtils.clamp(scrollY / scrollMax, 0, 1);
    const heroSpan = typeof window !== 'undefined' ? Math.max(1, window.innerHeight * 0.95) : 1;
    const heroProgress = THREE.MathUtils.clamp(scrollY / heroSpan, 0, 1);

    if (!rotationInitialized.current) {
      rotation.current.x = 0;
      rotation.current.y = 0;
      rotation.current.z = 0;
      basePosition.current.x = target.current.px;
      basePosition.current.y = target.current.py;
      basePosition.current.z = target.current.pz;
      tooth.position.set(basePosition.current.x, basePosition.current.y, basePosition.current.z);
      tooth.scale.setScalar(target.current.scale);
      rotationInitialized.current = true;
    }

    // Keep object fixed in one place.
    tooth.position.x += (basePosition.current.x - tooth.position.x) * positionK;
    tooth.position.y += (basePosition.current.y - tooth.position.y) * positionK;
    tooth.position.z += (basePosition.current.z - tooth.position.z) * positionK;

    // Subtle vertical tilt only.
    const wrappedRx = THREE.MathUtils.euclideanModulo(target.current.rx + Math.PI, Math.PI * 2) - Math.PI;
    const desiredX = THREE.MathUtils.clamp(wrappedRx * 0.05, -Math.PI * 0.14, Math.PI * 0.14);
    // Faster cinematic spin in hero, then smoother progression after hero.
    const heroYaw = THREE.MathUtils.smoothstep(heroProgress, 0, 1) * Math.PI * 1.1;
    const restProgress = THREE.MathUtils.clamp((scrollProgress - 0.2) / 0.8, 0, 1);
    const restYaw = THREE.MathUtils.smoothstep(restProgress, 0, 1) * Math.PI * 0.9;
    const scrollYaw = heroYaw + restYaw;
    const cursorYaw = cursor.current.x * Math.PI * 0.03;
    const desiredY = scrollYaw + cursorYaw;
    // Keep roll neutral to prevent right-leaning appearance.
    const desiredZ = 0;

    rotation.current.x = THREE.MathUtils.lerp(rotation.current.x, desiredX, rotationK);
    rotation.current.y = THREE.MathUtils.lerp(rotation.current.y, desiredY, yawK);
    rotation.current.z = THREE.MathUtils.lerp(rotation.current.z, desiredZ, rotationK);
    tooth.rotation.set(rotation.current.x, rotation.current.y, rotation.current.z, 'YXZ');
    tooth.scale.lerp(VEC.set(target.current.scale, target.current.scale, target.current.scale), scaleK);
  });

  return null;
}
