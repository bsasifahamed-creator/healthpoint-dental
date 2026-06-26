'use client';

import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const reviews = [
  {
    text: 'I was quoted 4,500 AED for a root canal at another clinic. Here it was 399. Same X-ray. Same result. The honesty is what brought me back.',
    name: 'Ahmed K.',
    date: 'September 2024',
    rating: 5,
  },
  {
    text: 'My son had been dreading the dentist for two years. He walked out smiling. Dr. Iqra was patient, gentle, and explained everything to him.',
    name: 'Nadia S.',
    date: 'November 2024',
    rating: 5,
  },
  {
    text: 'Walked in on a Sunday at 8pm for scaling. They took me right away. No appointment. No upsell. Just clean teeth and a fair bill.',
    name: 'James R.',
    date: 'October 2024',
    rating: 5,
  },
  {
    text: 'Filipino family in Al Barsha — Dr. Mohamad speaks Tagalog! That alone made my mother comfortable. Quality care, fair prices.',
    name: 'Maria L.',
    date: 'December 2024',
    rating: 5,
  },
];

export function Reviews({ id }: { id: string }) {
  return (
    <section id={id} className="relative min-h-[60dvh] md:min-h-[76dvh] flex items-center px-4 sm:px-6 lg:px-12 py-14 sm:py-20 lg:py-24 z-10 bg-transparent">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal font-semibold mb-4">
            Real Patients · Real Reviews
          </p>
          <h2 className="font-display font-extrabold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-ink mb-3">
            <span className="text-teal">4.8</span> stars from <span className="text-green">247+</span> patients
            <span className="text-ink">.</span>
          </h2>
          <div className="inline-flex items-center gap-2 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-5 fill-warning-amber text-warning-amber" strokeWidth={1.5} aria-hidden />
            ))}
            <span className="text-ink-mid text-sm ml-1">on Google</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <Card className="glass-card relative rounded-2xl border-white/45 transition-all hover:shadow-medium">
                <CardContent className="p-7">
                  <Quote className="absolute top-5 right-5 size-8 text-teal/15" strokeWidth={1.5} aria-hidden />

                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: r.rating }).map((_, idx) => (
                      <Star key={idx} className="size-4 fill-warning-amber text-warning-amber" strokeWidth={1.5} aria-hidden />
                    ))}
                  </div>

                  <p className="text-ink text-base leading-[1.65] mb-5">{r.text}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/30">
                    <div>
                      <div className="font-display font-bold text-sm text-ink">{r.name}</div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-ink-dim mt-0.5">
                        {r.date} · via Google
                      </div>
                    </div>
                    <div className="size-7 rounded-full bg-gradient-to-br from-trust-blue/20 to-teal/20 flex items-center justify-center text-[10px] font-display font-extrabold text-trust-blue">
                      G
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            className="glass-pill rounded-full text-ink hover:border-teal hover:text-teal"
            onClick={() =>
              window.open(
                'https://www.google.com/search?q=health+point+dental+clinic+al+barsha',
                '_blank',
                'noopener,noreferrer',
              )
            }
          >
            Read all 247+ reviews on Google
            <Star className="size-4 fill-warning-amber text-warning-amber" strokeWidth={1.5} aria-hidden />
          </Button>
        </div>
      </div>
    </section>
  );
}
