'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    __liquidApp?: { dispose?: () => void };
  }
}

export function LiquidEffectAnimation() {
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = `
import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';
const canvas = document.getElementById('liquid-canvas');
if (canvas) {
  const app = LiquidBackground(canvas);
  app.loadImage('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80');
  app.liquidPlane.material.metalness = 0.68;
  app.liquidPlane.material.roughness = 0.28;
  app.liquidPlane.uniforms.displacementScale.value = 3.8;
  app.setRain(false);
  window.__liquidApp = app;
}
`;

    document.body.appendChild(script);

    return () => {
      if (window.__liquidApp?.dispose) {
        window.__liquidApp.dispose();
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      mountedRef.current = false;
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 m-0 h-full w-full overflow-hidden pointer-events-none z-0"
      style={{ opacity: 0.44 }}
    >
      <div className="absolute inset-0 liquid-fallback" />
      <canvas id="liquid-canvas" className="fixed inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-white/48" />
    </div>
  );
}
