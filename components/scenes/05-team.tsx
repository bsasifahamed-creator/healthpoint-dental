'use client';

import { motion } from 'motion/react';
import { Languages, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const defaultDoctors = [
  { name: 'Dr. Iqra', role: 'Lead Dentist', quote: 'The tooth tells you what it needs. We just have to listen.', specialties: ['Endodontics', 'Cosmetic', 'Pediatric'], languages: ['English', 'Hindi', 'Urdu'], color: 'from-teal to-green' },
  { name: 'Dr. Mafaza', role: 'Specialist', quote: "Honest pricing isn't a strategy. It's the right thing to do.", specialties: ['Orthodontics', 'Implants', 'Whitening'], languages: ['English', 'Arabic', 'Hindi'], color: 'from-green to-teal' },
  { name: 'Dr. Mohamad', role: 'Specialist', quote: 'A Hollywood smile that ages well is engineered, not painted.', specialties: ['Veneers', 'Crowns', 'Restorative'], languages: ['English', 'Arabic', 'Tagalog'], color: 'from-teal-dim to-green-dim' },
];

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

function gradientColors(index: number) {
  const palettes = ['from-teal to-green', 'from-green to-teal', 'from-teal-dim to-green-dim'];
  return palettes[index % palettes.length];
}

export function Team({ id, doctors }: { id: string; doctors?: { name: string; role: string; bio?: string; imageUrl?: string; specialties: string[]; languages: string[] }[] }) {
  const team = doctors ?? defaultDoctors;
  return (
    <section id={id} className="relative min-h-[60dvh] md:min-h-[76dvh] flex items-center px-4 sm:px-6 lg:px-12 py-14 sm:py-20 lg:py-24 z-10 bg-transparent">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal font-semibold mb-4">Meet the Team</p>
          <h2 className="font-display font-extrabold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-ink">
            Specialists you can <span className="text-teal">trust</span>
            <span className="text-teal">.</span>
          </h2>
          <p className="text-ink-mid text-base mt-4 max-w-xl mx-auto leading-[1.6]">
            Three specialists. Multilingual. Complex cases stay in-house — we don&apos;t refer out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <Card className="glass-card rounded-2xl border-white/45 p-8 transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <CardHeader className="p-0 pb-4">
                  {'imageUrl' in d && d.imageUrl ? (
                    <img src={d.imageUrl} alt={d.name} className="size-20 rounded-full object-cover mb-6 shadow-medium group-hover:scale-105 transition-transform" />
                  ) : (
                    <div
                      className={`size-20 rounded-full bg-gradient-to-br ${gradientColors(i)} flex items-center justify-center mb-6 shadow-medium group-hover:scale-105 transition-transform`}
                    >
                      <span className="font-display font-extrabold text-2xl text-white tracking-tight">{initials(d.name)}</span>
                    </div>
                  )}
                  <CardTitle className="font-display text-2xl font-bold text-ink">{d.name}</CardTitle>
                  <div className="font-mono text-xs uppercase tracking-[0.15em] text-teal font-semibold">{d.role}</div>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-ink-mid text-sm leading-[1.65] mb-6 italic">&ldquo;{('bio' in d ? d.bio : (d as { quote: string }).quote)}&rdquo;</p>

                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Award className="size-3.5 text-ink" strokeWidth={1.5} aria-hidden />
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink font-semibold">Specialties</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {d.specialties.map((s) => (
                        <span key={s} className="glass-pill px-2.5 py-1 rounded-full text-teal text-xs font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Languages className="size-3.5 text-ink" strokeWidth={1.5} aria-hidden />
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink font-semibold">Languages</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {d.languages.map((l) => (
                        <span key={l} className="glass-pill px-2.5 py-1 rounded-full text-ink text-xs font-medium">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-ink-dim text-xs mt-8">
          Real photos coming soon · Contact +971 58 588 6915 to learn more about our team
        </p>
      </div>
    </section>
  );
}
