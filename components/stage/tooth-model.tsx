'use client';

import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

const TOOTH_GLB_PATH = '/images/a1345f2b-fd84-4048-ac70-65fd9f3c5742.glb';

export function ToothModel() {
  const { scene } = useGLTF(TOOTH_GLB_PATH);

  const clone = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#FFF8E8'),
          metalness: 0.0,
          roughness: 0.14,
          clearcoat: 1.0,
          clearcoatRoughness: 0.03,
          sheen: 0.8,
          sheenColor: new THREE.Color('#FFF1DA'),
          sheenRoughness: 0.25,
          ior: 1.45,
          envMapIntensity: 1.35,
          specularIntensity: 1.0,
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const box = new THREE.Box3().setFromObject(c);
    const center = box.getCenter(new THREE.Vector3());
    c.position.sub(center);

    const size = box.getSize(new THREE.Vector3());
    c.scale.setScalar(1.1 / Math.max(size.x, size.y, size.z));
    return c;
  }, [scene]);

  return (
    <group name="tooth-root">
      <primitive object={clone} />
    </group>
  );
}
