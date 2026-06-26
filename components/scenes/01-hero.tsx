'use client';

import { motion } from 'motion/react';
import { Star, BadgeCheck, Languages, ArrowUpRight, MessageCircle, ChevronDown } from 'lucide-react';
import { useBookingStore } from '@/lib/booking-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const SOFT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Hero() {
  const open = useBookingStore((s) => s.open);

  return (
    <section className="relative min-h-[82dvh] max-[390px]:min-h-[72dvh] flex items-center px-6 max-[390px]:px-4 lg:px-12 pt-24 max-[390px]:pt-20 pb-12 max-[390px]:pb-8 z-10 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-16 h-32 w-32 rounded-full bg-teal/15 blur-2xl animate-pulse sm:h-56 sm:w-56 sm:blur-3xl" />
        <div className="absolute right-6 top-24 h-28 w-28 rounded-full bg-green/20 blur-2xl animate-pulse [animation-delay:550ms] sm:right-10 sm:h-48 sm:w-48 sm:blur-3xl" />
        <div className="hidden sm:block absolute bottom-10 left-1/3 h-44 w-44 rounded-full bg-sky-200/25 blur-3xl animate-pulse [animation-delay:1050ms]" />
      </div>
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 max-[390px]:gap-7 items-center">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.16, ease: SOFT_EASE }}
            className="flex items-center gap-3 mb-6 flex-wrap"
          >
            <div className="glass-pill flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-trust-blue/20">
              <BadgeCheck className="size-3.5 text-trust-blue" strokeWidth={1.5} aria-hidden />
              <span className="font-mono text-[10px] font-semibold text-trust-blue tracking-wide">DHA LICENSED</span>
            </div>
            <div className="glass-pill flex items-center gap-1 px-3 py-1.5 rounded-full border border-warning-amber/20">
              <Star className="size-3.5 fill-warning-amber text-warning-amber" strokeWidth={1.5} aria-hidden />
              <span className="font-mono text-[10px] font-semibold text-ink tracking-wide">
                4.8 · 247+ Reviews
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.86, delay: 0.28, ease: SOFT_EASE }}
            className="font-display font-extrabold text-[clamp(2.5rem,6.5vw,5rem)] max-[390px]:text-[clamp(2rem,9vw,2.55rem)] leading-[1] tracking-[-0.02em] text-ink mb-6 max-[390px]:mb-4"
          >
            Trusted dental care
            <br />
            in <span className="text-teal">Al Barsha</span>
            <span className="text-teal">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.68, delay: 0.4, ease: SOFT_EASE }}
            className="font-body text-ink-mid text-lg max-[390px]:text-base leading-[1.65] mb-6 max-[390px]:mb-5 max-w-lg"
          >
            DHA-licensed dental clinic with experienced specialists, transparent pricing, and modern equipment. Walk-ins
            welcome — daily 8AM to 8PM.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.56, delay: 0.5, ease: SOFT_EASE }}
            className="mb-8 max-[390px]:mb-6"
          >
            <Card className="glass-card rounded-2xl border border-green/30 shadow-soft w-fit">
              <CardContent className="flex items-center gap-3 max-[390px]:gap-2 px-5 max-[390px]:px-4 py-3 max-[390px]:py-2.5">
                <div className="font-display font-extrabold text-2xl text-green-dim">AED 79</div>
                <div className="text-sm">
                  <div className="font-semibold text-ink">Scaling & Polishing</div>
                  <div className="text-ink-mid text-xs">Starting price · No hidden fees</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-wrap gap-3 max-[390px]:gap-2"
          >
            <Button
              onClick={open}
              variant="default"
              size="lg"
              className="glass-pill h-12 rounded-full border-white/60 px-7 text-[15px] font-semibold text-ink hover:scale-[1.03]"
            >
              Book Appointment
              <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="glass-pill h-12 rounded-full text-ink"
              onClick={() => window.open('https://wa.me/971585886915', '_blank', 'noopener,noreferrer')}
            >
              <span className="inline-flex items-center gap-2">
                <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden />
                WhatsApp
              </span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex items-center gap-2 mt-6 text-ink-mid"
          >
            <Languages className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
            <span className="font-mono text-xs uppercase tracking-wider leading-relaxed">
              Spoken: English · Arabic · Hindi · Urdu · Tagalog
            </span>
          </motion.div>
        </div>

        <div aria-hidden className="hidden lg:block" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-dim">Scroll</span>
        <ChevronDown className="size-4 text-teal animate-bounce" strokeWidth={1.5} aria-hidden />
      </motion.div>
    </section>
  );
}
