'use client';

import { motion } from 'motion/react';
import { CalendarCheck, Stethoscope, ClipboardList, Smile } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const steps = [
  {
    icon: CalendarCheck,
    num: '01',
    title: 'Book in 60 seconds',
    body: 'Online booking, WhatsApp, or walk-in. Same-day appointments available.',
  },
  {
    icon: Stethoscope,
    num: '02',
    title: 'Full assessment',
    body: 'Digital X-ray and exam included. We explain everything before we touch anything.',
  },
  {
    icon: ClipboardList,
    num: '03',
    title: 'Itemized quote',
    body: 'See every line item before treatment. Insurance pre-approval where applicable.',
  },
  {
    icon: Smile,
    num: '04',
    title: 'Treatment starts',
    body: 'Most procedures completed same-day. Multi-visit treatments scheduled clearly.',
  },
];

const stats = [
  { value: '247+', label: 'Patients served' },
  { value: '4.8', label: 'Google rating' },
  { value: '13+', label: 'Years experience' },
  { value: '5', label: 'Languages spoken' },
];

export function WhyUs({ id }: { id: string }) {
  return (
    <section id={id} className="relative min-h-[60dvh] md:min-h-[76dvh] flex items-center px-4 sm:px-6 lg:px-12 py-14 sm:py-20 lg:py-24 z-10 bg-transparent">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-start mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal font-semibold mb-4">How It Works</p>
            <h2 className="font-display font-extrabold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-ink mb-5">
              From walk-in to <span className="text-teal">walk-out</span>
              <span className="text-teal">.</span>
            </h2>
            <p className="text-ink-mid text-base leading-[1.65] max-w-md">
              Four steps. No mystery. No upselling. Most visits complete in under 90 minutes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group"
              >
                <Card className="glass-card rounded-xl border-white/45 transition-all group-hover:-translate-y-1 group-hover:shadow-card-hover">
                  <CardContent className="p-5">
                    <div className="font-display font-extrabold text-3xl text-teal mb-1">{s.value}</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-ink-mid">{s.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <Card className="glass-card relative rounded-2xl border-white/45 transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <CardHeader className="pb-2">
                  <div className="font-mono text-xs text-teal font-semibold mb-2">{s.num}</div>
                  <s.icon className="size-7 text-teal mb-2" strokeWidth={1.5} aria-hidden />
                  <CardTitle className="font-display text-lg font-bold text-ink">{s.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-ink-mid text-sm leading-[1.6]">{s.body}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
