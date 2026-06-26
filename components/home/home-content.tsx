'use client';

import dynamic from 'next/dynamic';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollState } from '@/lib/scroll-store';
import { useIsDesktop } from '@/lib/hooks/use-is-desktop';
import { Nav } from '@/components/chrome/nav';
import { Hero } from '@/components/scenes/01-hero';
import { Trust } from '@/components/scenes/02-trust';
import { Services } from '@/components/scenes/03-services';
import { WhyUs } from '@/components/scenes/04-why-us';
import { Team } from '@/components/scenes/05-team';
import { Reviews } from '@/components/scenes/06-reviews';
import { Contact } from '@/components/scenes/contact';
import { CTASummons } from '@/components/scenes/07-cta';
import { Footer } from '@/components/footer/footer';
import { ShaderBackground } from '@/components/ui/shaders-hero-section';
import type { StoreDoctor, StoreService, StoreBlogPost } from '@/lib/data-store';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ToothStage = dynamic(
  () => import('@/components/stage/tooth-stage').then((m) => m.ToothStage),
  { ssr: false },
);

export function HomeContent({
  doctors,
  services,
}: {
  doctors: StoreDoctor[];
  services: StoreService[];
}) {
  const isDesktop = useIsDesktop();

  useGSAP(() => {
    const set = useScrollState.getState().set;

    if (isDesktop) {
      const BASE_X = 0.5;
      const BASE_SCALE = 0.85;

      ScrollTrigger.create({
        trigger: '#scene-trust',
        start: 'top bottom',
        end: 'top top',
        scrub: 1.4,
        onUpdate: ({ progress: p }) =>
          set({
            px: BASE_X + (-0.95 - BASE_X) * p,
            py: -0.45 + 0.45 * p,
            rx: Math.PI * 0.08 + p * Math.PI * 0.4,
            ry: Math.PI * 0.08 + p * Math.PI * 0.18,
            rz: 0,
            scale: BASE_SCALE - p * 0.14,
          }),
      });

      ScrollTrigger.create({
        trigger: '#scene-services',
        start: 'top bottom',
        end: 'top top',
        scrub: 1.4,
        onUpdate: ({ progress: p }) =>
          set({
            px: -0.95 + (1.35 - -0.95) * p,
            py: 0,
            rx: Math.PI * 0.48 + p * Math.PI * 0.45,
            ry: Math.PI * 0.26 + p * Math.PI * 0.22,
            rz: 0,
            scale: BASE_SCALE - 0.14 + p * 0.1,
          }),
      });

      ScrollTrigger.create({
        trigger: '#scene-why',
        start: 'top bottom',
        end: 'top top',
        scrub: 1.4,
        onUpdate: ({ progress: p }) =>
          set({
            px: 1.35 + (-0.45 - 1.35) * p,
            rx: Math.PI * 0.93 + p * Math.PI * 0.5,
            ry: Math.PI * 0.48 + p * Math.PI * 0.18,
            rz: 0,
            scale: BASE_SCALE - 0.04 - p * 0.11,
          }),
      });

      ScrollTrigger.create({
        trigger: '#scene-team',
        start: 'top bottom',
        end: 'top top',
        scrub: 1.4,
        onUpdate: ({ progress: p }) =>
          set({
            px: -0.45 + (1.1 - -0.45) * p,
            py: p * 0.3,
            rx: Math.PI * 1.43 + p * Math.PI * 0.5,
            rz: 0,
            scale: BASE_SCALE - 0.15 - p * 0.08,
          }),
      });

      ScrollTrigger.create({
        trigger: '#scene-reviews',
        start: 'top bottom',
        end: 'top top',
        scrub: 1.4,
        onUpdate: ({ progress: p }) =>
          set({
            py: 0.3 - p * 0.3,
            rx: Math.PI * 1.93 + p * Math.PI * 0.42,
            rz: 0,
            scale: BASE_SCALE - 0.23,
          }),
      });

      ScrollTrigger.create({
        trigger: '#scene-cta',
        start: 'top bottom',
        end: 'top top',
        scrub: 1.4,
        onUpdate: ({ progress: p }) =>
          set({
            px: 1.1 + (-0.25 - 1.1) * p,
            py: 0,
            pz: p * 0.3,
            rx: Math.PI * 2.35 + p * Math.PI * 0.55,
            ry: Math.PI * 0.5 + p * Math.PI * 0.15,
            rz: 0,
            scale: BASE_SCALE - 0.13 + p * 0.24,
          }),
      });
    } else {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: ({ progress: p }) =>
          set({
            rx: Math.sin(p * Math.PI * 2) * 0.5,
            scale: 0.85 - p * 0.1,
          }),
      });
    }
  }, [isDesktop]);

  return (
    <ShaderBackground>
      <main className="relative bg-transparent">
        <Nav />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-4vw] top-[8vh] z-[3] select-none opacity-30 md:left-[50vw] md:right-auto md:top-[18vh] md:opacity-100"
        >
          <div className="font-display flex flex-col text-[clamp(3rem,14vw,11rem)] leading-[0.84] font-extrabold tracking-[-0.05em] [text-shadow:0_10px_28px_rgba(255,255,255,0.28)] md:text-[clamp(5rem,11.5vw,11rem)]">
            <span className="text-green/85">HEALTH</span>
            <span className="text-teal/85">POINT</span>
          </div>
        </div>
        <ToothStage />
        <Hero />
        <Trust id="scene-trust" />
        <Services id="scene-services" services={services} />
        <WhyUs id="scene-why" />
        <Team id="scene-team" doctors={doctors} />
        <Reviews id="scene-reviews" />
        <Contact id="contact" />
        <CTASummons id="scene-cta" />
        <Footer />
      </main>
    </ShaderBackground>
  );
}
