'use client';

import { motion } from 'motion/react';
import {
  Sparkles,
  Sun,
  Gem,
  Syringe,
  Crown,
  Smile,
  Pipette,
  Scissors,
  Layers,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import { useBookingStore } from '@/lib/booking-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { StoreService } from '@/lib/data-store';

const iconMap: Record<string, LucideIcon> = {
  scaling: Sparkles,
  whitening: Sun,
  'hollywood-smile': Gem,
  'root-canal': Syringe,
  crown: Crown,
  braces: Smile,
  filling: Pipette,
  extraction: Scissors,
  denture: Layers,
};

const defaultServices: { icon: LucideIcon; name: string; price: number; unit: string; detail: string }[] = [
  { icon: Sparkles, name: 'Scaling & Polishing', price: 79, unit: 'AED', detail: '30 minutes' },
  { icon: Sun, name: 'Teeth Whitening', price: 299, unit: 'AED', detail: 'Same-day result' },
  { icon: Gem, name: 'Hollywood Smile', price: 999, unit: 'AED', detail: 'Veneer consultation' },
  { icon: Syringe, name: 'Root Canal', price: 399, unit: 'from AED', detail: 'Per canal' },
  { icon: Crown, name: 'Crown', price: 299, unit: 'AED', detail: 'Lab-fabricated' },
  { icon: Smile, name: 'Braces', price: 399, unit: 'from AED', detail: 'Monthly visits' },
  { icon: Pipette, name: 'Filling', price: 139, unit: 'from AED', detail: 'Composite' },
  { icon: Scissors, name: 'Extraction', price: 99, unit: 'from AED', detail: 'Including wisdom' },
  { icon: Layers, name: 'Denture', price: 249, unit: 'from AED', detail: 'Full or partial' },
];

export function Services({ id, services }: { id: string; services?: StoreService[] }) {
  const open = useBookingStore((s) => s.open);
  const displayServices = services
    ? services.map((s) => ({
        icon: iconMap[s.key] ?? Sparkles,
        name: s.name,
        price: s.price,
        unit: s.unit,
        detail: s.detail,
      }))
    : defaultServices;

  return (
    <section id={id} className="relative min-h-[60dvh] md:min-h-[76dvh] flex items-center px-4 sm:px-6 lg:px-12 py-14 sm:py-20 lg:py-24 z-10 bg-transparent">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal font-semibold mb-4">Our Services</p>
          <h2 className="font-display font-extrabold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-ink">
            Plain prices. <span className="text-teal">Honest</span> outcomes
            <span className="text-teal">.</span>
          </h2>
          <p className="text-ink-mid text-base mt-4 max-w-xl mx-auto leading-[1.6]">
            What we quote is what you pay. Insurance accepted from major UAE providers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayServices.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <Card className="glass-card relative rounded-2xl border-white/45 text-left transition-all hover:-translate-y-1 hover:border-teal hover:shadow-card-hover">
                <CardHeader className="pb-2">
                  <div className="mb-5 flex items-start justify-between">
                    <div className="size-10 rounded-xl bg-teal-soft flex items-center justify-center group-hover:bg-teal transition-colors">
                      <s.icon
                        className="size-5 text-teal group-hover:text-white transition-colors"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </div>
                    <ArrowUpRight
                      className="size-4 text-ink-dim group-hover:text-teal group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </div>
                  <CardTitle className="font-display text-base font-bold text-ink">{s.name}</CardTitle>
                  <div className="text-xs text-ink-mid">{s.detail}</div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="mb-4 flex items-baseline gap-1">
                    <span className="font-mono text-[10px] uppercase text-ink-dim">{s.unit}</span>
                    <span className="font-display font-extrabold text-2xl text-green-dim">{s.price}</span>
                  </div>
                  <Button
                    type="button"
                    onClick={open}
                    size="sm"
                    className="glass-pill w-full justify-center rounded-xl text-ink"
                  >
                    Book this service
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="glass-card mt-10 rounded-2xl border-white/45">
          <CardContent className="p-6">
            <div className="mb-4 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-mid font-semibold">
                Insurance Accepted
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 sm:gap-x-8 sm:gap-y-3">
              {['Daman', 'Aafiya', 'Cigna', 'AXA', 'MetLife', 'NextCare', 'Neuron', 'Nas', 'Orient'].map((p) => (
                <span key={p} className="font-display font-bold text-ink-mid text-sm">
                  {p}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
