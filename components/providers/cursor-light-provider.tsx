'use client';

import { useEffect } from 'react';

export function CursorLightProvider() {
  useEffect(() => {
    const root = document.documentElement;

    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      root.style.setProperty('--cursor-x', `${x}%`);
      root.style.setProperty('--cursor-y', `${y}%`);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return null;
}
