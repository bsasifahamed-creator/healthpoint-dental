'use client';

import { motion } from 'motion/react';
import { ArrowUpRight, MessageCircle, MapPin, Clock, Phone } from 'lucide-react';
import { useBookingStore } from '@/lib/booking-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function CTASummons({ id }: { id: string }) {
  const open = useBookingStore((s) => s.open);

  return (
    <section id={id} className="relative min-h-[64dvh] md:min-h-[76dvh] flex items-center justify-center px-4 sm:px-6 lg:px-12 py-14 sm:py-20 lg:py-24 z-10 bg-transparent">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.2em] text-teal font-semibold mb-6"
        >
          Ready When You Are
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-[clamp(2.5rem,7vw,6rem)] max-[390px]:text-[clamp(2rem,9vw,2.8rem)] leading-[1] tracking-[-0.02em] text-ink mb-6 max-[390px]:mb-4"
        >
          Reserve <span className="text-teal">today</span>
          <span className="text-green">.</span>
          <br />
          Smile <span className="text-green">tomorrow</span>
          <span className="text-teal">.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-ink-mid text-lg max-[390px]:text-base leading-[1.65] mb-8 max-[390px]:mb-6 max-w-2xl mx-auto"
        >
          Book online in 60 seconds. Walk-ins welcome daily 1PM to 9PM. Same-day appointments often available.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap gap-3 max-[390px]:gap-2 justify-center mb-8"
        >
          <Button
            onClick={open}
            variant="default"
            size="lg"
            className="glass-pill h-12 rounded-full px-8 max-[390px]:px-5 text-base max-[390px]:text-sm font-semibold text-ink"
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
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-[390px]:gap-3 max-w-3xl mx-auto"
        >
          <Card className="glass-card rounded-xl border-white/45">
            <CardContent className="flex items-center justify-center gap-3 p-4">
              <MapPin className="size-4 text-teal shrink-0" strokeWidth={1.5} aria-hidden />
              <span className="text-sm text-ink-mid text-left">
                Office 603, Bedaia Building
                <br />
                Al Barsha 1, Dubai
              </span>
            </CardContent>
          </Card>
          <Card className="glass-card rounded-xl border-white/45">
            <CardContent className="flex items-center justify-center gap-3 p-4">
              <Clock className="size-4 text-teal shrink-0" strokeWidth={1.5} aria-hidden />
              <span className="text-sm text-ink-mid text-left">
                Daily
                <br />
                1:00 PM — 9:00 PM
              </span>
            </CardContent>
          </Card>
          <Card className="glass-card rounded-xl border-white/45">
            <CardContent className="flex items-center justify-center gap-3 p-4">
              <Phone className="size-4 text-teal shrink-0" strokeWidth={1.5} aria-hidden />
              <a href="tel:+971585886915" className="text-sm text-ink-mid text-left hover:text-teal transition-colors">
                Call us
                <br />
                <span className="font-mono text-xs">+971 58 588 6915</span>
              </a>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
