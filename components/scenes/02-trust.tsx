'use client';

import { motion } from 'motion/react';
import { ShieldCheck, GraduationCap, Banknote, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SOFT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const pillars = [
  {
    icon: ShieldCheck,
    title: 'DHA Licensed',
    body: 'Fully licensed by Dubai Health Authority. Operating under all UAE healthcare standards.',
  },
  {
    icon: GraduationCap,
    title: 'Experienced Specialists',
    body: 'Three specialists covering endodontics, orthodontics, and cosmetic dentistry. Complex cases stay in-house.',
  },
  {
    icon: Banknote,
    title: 'Transparent Pricing',
    body: 'Itemized quote before treatment begins. No surprise charges. Insurance coverage discussed upfront.',
  },
  {
    icon: Wrench,
    title: 'Modern Equipment',
    body: 'Digital X-ray, autoclave sterilization, single-use instruments where required.',
  },
];

export function Trust({ id }: { id: string }) {
  return (
    <section id={id} className="relative min-h-[60dvh] md:min-h-[76dvh] flex items-center px-4 sm:px-6 lg:px-12 py-14 sm:py-20 lg:py-24 z-10 bg-transparent">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal font-semibold mb-4">
            Why Patients Choose Us
          </p>
          <h2 className="font-display font-extrabold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-ink">
            Care you can <span className="text-teal">verify</span>
            <span className="text-green">.</span>
          </h2>
          <p className="text-ink-mid text-base mt-4 max-w-xl mx-auto leading-[1.6]">
            Four standards we hold ourselves to. No marketing — these are checkable facts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.54, delay: i * 0.08, ease: SOFT_EASE }}
              className="group"
            >
              <Card className="glass-card rounded-2xl border-white/45 transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <CardHeader className="pb-2">
                  <div className="size-12 rounded-xl bg-teal-soft flex items-center justify-center mb-4 group-hover:bg-teal transition-colors">
                    <p.icon
                      className="size-6 text-teal group-hover:text-white transition-colors"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </div>
                  <CardTitle className="font-display text-lg font-bold text-ink">{p.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-ink-mid text-sm leading-[1.6]">{p.body}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
