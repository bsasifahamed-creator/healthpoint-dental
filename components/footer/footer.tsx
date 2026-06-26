'use client';

import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Languages,
  ShieldCheck,
  ArrowUpRight,
  Mail,
} from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  return (
    <footer id="contact" className="relative bg-transparent border-t border-white/35 pt-14 pb-6 z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="glass-card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 p-6 md:p-8 rounded-3xl border border-white/40">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="size-16 rounded-2xl overflow-hidden bg-white ring-2 ring-teal/35"
                style={{
                  boxShadow:
                    '0 10px 24px rgba(0,166,166,0.28), 0 4px 10px rgba(15,20,25,0.18), inset 0 0 0 1px rgba(255,255,255,0.9)',
                }}
              >
                <Image
                  src="/health point png logo.png"
                  alt="Health Point Dental logo"
                  width={128}
                  height={128}
                  className="h-full w-full object-contain"
                  style={{ filter: 'contrast(1.18) saturate(1.22) brightness(1.05) drop-shadow(0 2px 4px rgba(0,166,166,0.15))' }}
                />
              </div>
              <div>
                <div className="font-display font-extrabold text-[17px] text-ink leading-none tracking-tight">HEALTH POINT</div>
                <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-ink-mid mt-1.5 font-semibold">
                  Dental Clinic · Dubai
                </div>
              </div>
            </div>
            <p className="text-ink-mid text-sm leading-[1.65] mb-5">
              Trusted dental care in Al Barsha 1. DHA Licensed. Walk-ins welcome.
            </p>
            <div className="glass-pill inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-trust-blue/20">
              <ShieldCheck className="size-3.5 text-trust-blue" strokeWidth={1.5} aria-hidden />
              <span className="font-mono text-[10px] font-semibold text-trust-blue tracking-wide">DHA LICENSED</span>
            </div>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-ink font-semibold mb-4">Visit Us</div>
            <a
              href="https://maps.app.goo.gl/?q=Bedaia+Building+Al+Barsha"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-ink-mid hover:text-teal transition-colors mb-3 group"
            >
              <MapPin className="size-4 mt-0.5 shrink-0" strokeWidth={1.5} aria-hidden />
              <span className="text-sm leading-[1.6]">
                Office 603
                <br />
                Bedaia Building
                <br />
                Al Barsha 1, Dubai
                <ArrowUpRight
                  className="inline-block size-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </span>
            </a>
            <div className="flex items-start gap-2 text-ink-mid">
              <Clock className="size-4 mt-0.5 shrink-0" strokeWidth={1.5} aria-hidden />
              <span className="text-sm leading-[1.6]">Daily 1:00 PM — 9:00 PM</span>
            </div>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-ink font-semibold mb-4">Contact</div>
            <a
              href="tel:+971585886915"
              className="flex items-center gap-2 text-ink-mid hover:text-teal transition-colors mb-3 group"
            >
              <Phone className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
              <span className="font-mono text-sm">+971 58 588 6915</span>
              <ArrowUpRight
                className="size-3 opacity-0 group-hover:opacity-100 transition-opacity"
                strokeWidth={1.5}
                aria-hidden
              />
            </a>
            <a
              href="https://wa.me/971585886915"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-ink-mid hover:text-teal transition-colors mb-3 group"
            >
              <MessageCircle className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
              <span className="text-sm">WhatsApp Us</span>
              <ArrowUpRight
                className="size-3 opacity-0 group-hover:opacity-100 transition-opacity"
                strokeWidth={1.5}
                aria-hidden
              />
            </a>
            <a
              href="mailto:contact@healthpoint.ae"
              className="flex items-center gap-2 text-ink-mid hover:text-teal transition-colors group"
            >
              <Mail className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
              <span className="text-sm">contact@healthpoint.ae</span>
              <ArrowUpRight
                className="size-3 opacity-0 group-hover:opacity-100 transition-opacity"
                strokeWidth={1.5}
                aria-hidden
              />
            </a>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-ink font-semibold mb-4">Spoken Here</div>
            <div className="flex items-start gap-2 text-ink-mid mb-5">
              <Languages className="size-4 mt-0.5 shrink-0" strokeWidth={1.5} aria-hidden />
              <span className="text-sm leading-[1.65]">
                English · Arabic
                <br />
                Hindi · Urdu · Tagalog
              </span>
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-ink font-semibold mb-3">
              Insurance Accepted
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Daman', 'Aafiya', 'Cigna', 'AXA', 'MetLife', 'NextCare'].map((p) => (
                <span key={p} className="glass-pill px-2 py-0.5 rounded text-xs text-ink-mid border border-stroke">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/35 pt-8 pb-6 text-center">
          <div className="font-display font-extrabold text-[clamp(2rem,12vw,9rem)] leading-[0.9] tracking-[-0.04em] text-ink/95">
            Health <span className="text-teal">Point</span>
            <span className="text-teal">.</span>
          </div>
        </div>

        <div className="glass-pill flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between items-center pt-6 px-4 py-3 border border-white/35 rounded-2xl">
          <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-dim">
            © {new Date().getFullYear()} Health Point Dental Clinic
          </div>
          <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-dim">
            DHA Licensed · Al Barsha 1 · Dubai · UAE
          </div>
        </div>
      </div>
    </footer>
  );
}
