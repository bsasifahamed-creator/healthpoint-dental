'use client';

import { ShaderErrorBoundary } from '@/components/ui/shader-error-boundary';
import { MeshGradient, PulsingBorder } from '@paper-design/shaders-react';
import { motion } from 'framer-motion';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface ShaderBackgroundProps {
  children: React.ReactNode;
}

export function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true);
    const handleMouseLeave = () => setIsActive(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-dvh w-full overflow-hidden">
      <svg className="absolute inset-0 h-0 w-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={0.3} />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      <ShaderErrorBoundary>
        <MeshGradient
          className="absolute inset-0 h-full w-full"
          colors={['#f3fffb', '#d4f8ea', '#c9f3d9', '#ddffd2', '#eefcff']}
          speed={isActive ? 0.4 : 0.26}
        />
      </ShaderErrorBoundary>

      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_78%_26%,rgba(126,211,33,0.32),rgba(126,211,33,0.08)_45%,transparent_72%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/12 via-white/0 to-white/20" />
      {/* Soft white veil — confined to top-left and bottom-right corners
          where the green/teal shader signal is already weakest. Each
          gradient hard-fades to transparent before reaching ~55% radius
          so the saturated centre of the canvas stays untouched. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(50% 42% at 0% 0%, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.10) 35%, transparent 60%),' +
            'radial-gradient(45% 38% at 100% 100%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.08) 35%, transparent 58%)',
        }}
      />
      {children}
    </div>
  );
}

export function PulsingCircle() {
  return (
    <div className="absolute bottom-8 right-8 z-30">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <PulsingBorder
          colors={['#00a6a6', '#7ed321', '#8ddfd8', '#6bcff6', '#86efac']}
          colorBack="#00000000"
          speed={1.4}
          roundness={1}
          thickness={0.12}
          softness={0.24}
          intensity={4.5}
          pulse={0.12}
          scale={0.66}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
          }}
        />

        <motion.svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
          style={{ transform: 'scale(1.6)' }}
        >
          <defs>
            <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text className="fill-ink-mid text-sm">
            <textPath href="#circle" startOffset="0%">
              Health Point Dental • Health Point Dental • Health Point Dental •
            </textPath>
          </text>
        </motion.svg>
      </div>
    </div>
  );
}

export function HeroContent() {
  return (
    <main className="absolute bottom-8 left-8 z-20 max-w-lg">
      <div className="text-left">
        <div
          className="glass-pill relative mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1"
          style={{ filter: 'url(#glass-effect)' }}
        >
          <Sparkles className="size-3.5 text-teal" strokeWidth={1.5} aria-hidden />
          <span className="relative z-10 text-xs font-medium text-ink">New Paper Shader Experience</span>
        </div>

        <h1 className="mb-4 text-5xl font-light tracking-tight text-ink md:text-6xl md:leading-[1.05]">
          <span className="font-semibold italic">Beautiful</span> Shader
          <br />
          <span className="font-light tracking-tight text-ink">Experiences</span>
        </h1>

        <p className="mb-4 text-xs font-light leading-relaxed text-ink-mid">
          Create stunning visual experiences with advanced shader technology. Interactive lighting, smooth animations,
          and beautiful effects that respond to movement.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button className="glass-pill cursor-pointer rounded-full border border-white/40 px-8 py-3 text-xs font-medium text-ink transition-all duration-200 hover:bg-white/14 hover:border-white/60">
            Pricing
          </button>
          <button className="liquid-cta inline-flex cursor-pointer items-center gap-1 rounded-full px-8 py-3 text-xs font-medium transition-all duration-200">
            Get Started
            <ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden />
          </button>
        </div>
      </div>
    </main>
  );
}

export function Header() {
  return (
    <header className="relative z-20 flex items-center justify-between p-6">
      <div className="flex items-center">
        <div className="glass-pill flex items-center gap-2 rounded-full px-3 py-2">
          <span className="font-display text-xs font-bold tracking-[0.18em] text-ink">HEALTH POINT</span>
        </div>
      </div>

      <nav className="flex items-center space-x-2">
        <a href="#" className="glass-pill px-3 py-2 text-xs font-light text-ink-mid transition-all hover:text-ink">
          Features
        </a>
        <a href="#" className="glass-pill px-3 py-2 text-xs font-light text-ink-mid transition-all hover:text-ink">
          Pricing
        </a>
        <a href="#" className="glass-pill px-3 py-2 text-xs font-light text-ink-mid transition-all hover:text-ink">
          Docs
        </a>
      </nav>

      <div id="gooey-btn" className="relative flex items-center group" style={{ filter: 'url(#gooey-filter)' }}>
        <button className="absolute right-0 z-0 flex h-8 -translate-x-10 items-center justify-center rounded-full px-2.5 py-2 text-xs font-normal text-ink transition-all duration-300 group-hover:-translate-x-[4.75rem] glass-pill">
          <ArrowUpRight className="h-3 w-3" />
        </button>
        <button className="liquid-cta z-10 flex h-8 items-center rounded-full px-6 py-2 text-xs font-normal transition-all duration-300">
          Login
        </button>
      </div>
    </header>
  );
}
