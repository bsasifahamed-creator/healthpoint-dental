'use client';

import { MeshGradient } from '@paper-design/shaders-react';

/**
 * Fixed-position MeshGradient stack used as the global backdrop for every
 * admin route. Mirrors the hero shader so /admin feels visually part of
 * the same product surface as the marketing site.
 */
export function AdminBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <MeshGradient
        className="absolute inset-0 h-full w-full"
        colors={['#f3fffb', '#d4f8ea', '#c9f3d9', '#ddffd2', '#eefcff']}
        speed={0.22}
      />
      <MeshGradient
        className="absolute inset-0 h-full w-full opacity-45"
        colors={['#84e1bc', '#9be37f', '#7ed321', '#6dd3af']}
        speed={0.18}
      />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_78%_26%,rgba(126,211,33,0.28),rgba(126,211,33,0.06)_45%,transparent_72%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/14 via-white/0 to-white/24" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 42% at 0% 0%, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.10) 35%, transparent 60%),' +
            'radial-gradient(45% 38% at 100% 100%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 35%, transparent 58%)',
        }}
      />
    </div>
  );
}
