'use client';

import { useCallback, useEffect, useState } from 'react';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useBookingStore } from '@/lib/booking-store';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = useBookingStore((s) => s.open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-[60] transition-all duration-300 ${
          scrolled ? 'glass-card-strong border-b border-stroke shadow-soft' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 max-[390px]:px-4 lg:px-12 py-4 max-[390px]:py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 max-[390px]:gap-2 group" aria-label="Health Point Dental — Home">
            <div
              className="size-14 max-[390px]:size-12 rounded-2xl overflow-hidden bg-white ring-2 ring-teal/35 transition-all group-hover:ring-teal/60"
              style={{
                boxShadow:
                  '0 10px 24px rgba(0,166,166,0.28), 0 4px 10px rgba(15,20,25,0.18), inset 0 0 0 1px rgba(255,255,255,0.9)',
              }}
            >
              <Image
                src="/health point png logo.png"
                alt="Health Point Dental logo"
                width={112}
                height={112}
                className="h-full w-full object-contain"
                style={{ filter: 'contrast(1.18) saturate(1.22) brightness(1.05) drop-shadow(0 2px 4px rgba(0,166,166,0.15))' }}
                priority
              />
            </div>
            <div className="min-w-0">
              <div className="font-display font-extrabold text-[17px] max-[390px]:text-[15px] max-[360px]:text-[13px] text-ink leading-none tracking-tight whitespace-nowrap truncate">
                HEALTH POINT
              </div>
              <div className="font-mono text-[9px] max-[390px]:text-[8px] max-[360px]:text-[7px] tracking-[0.18em] uppercase text-ink-mid mt-1.5 font-semibold whitespace-nowrap truncate">
                Dental Clinic · Dubai
              </div>
            </div>
          </Link>

          <ul className="hidden md:flex gap-8 text-[13px] font-medium text-ink-mid">
            <li>
              <a href="/" className="hover:text-teal transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#scene-services" className="hover:text-teal transition-colors">
                Services
              </a>
            </li>
            <li>
              <a href="#scene-why" className="hover:text-teal transition-colors">
                Why Us
              </a>
            </li>
            <li>
              <a href="#scene-team" className="hover:text-teal transition-colors">
                Team
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-teal transition-colors">
                Contact
              </a>
            </li>
            <li>
              <Link href="/blog" className="hover:text-teal transition-colors">
                Blog
              </Link>
            </li>
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+971585886915"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-ink-mid hover:text-teal transition-colors"
            >
              <Phone className="size-4" strokeWidth={1.5} aria-hidden />
              +971 58 588 6915
            </a>
            <LiquidButton type="button" onClick={open} size="sm" className="liquid-cta rounded-full">
              Book Now
            </LiquidButton>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden size-10 max-[390px]:size-9 flex items-center justify-center"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

       {mobileOpen ? (
        <div className="fixed inset-0 z-[55] md:hidden">
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="absolute inset-0 overflow-y-auto"
            style={{ top: '72px' }}
          >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(70% 60% at 20% 30%, #d4f8ea 0%, #c9f3d9 35%, #ddffd2 65%, #eefcff 100%)',
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/40" />
          <div className="relative px-6 max-[390px]:px-4 pt-12 pb-8">
          <ul className="flex flex-col gap-6 max-[390px]:gap-5 text-lg max-[390px]:text-base font-medium text-ink">
            <li>
              <a href="/" onClick={() => setMobileOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="#scene-services" onClick={() => setMobileOpen(false)}>
                Services
              </a>
            </li>
            <li>
              <a href="#scene-why" onClick={() => setMobileOpen(false)}>
                Why Us
              </a>
            </li>
            <li>
              <a href="#scene-team" onClick={() => setMobileOpen(false)}>
                Team
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setMobileOpen(false)}>
                Contact
              </a>
            </li>
            <li>
              <Link href="/blog" onClick={() => setMobileOpen(false)}>
                Blog
              </Link>
            </li>
            <li className="pt-6 border-t border-stroke">
              <a href="tel:+971585886915" className="flex items-center gap-2 text-teal">
                <Phone className="size-5" strokeWidth={1.5} aria-hidden />
                +971 58 588 6915
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/971585886915"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-dim"
                onClick={() => setMobileOpen(false)}
              >
                <MessageCircle className="size-5" strokeWidth={1.5} aria-hidden />
                WhatsApp
              </a>
            </li>
            <li>
              <LiquidButton
                type="button"
                onClick={() => {
                  open();
                  setMobileOpen(false);
                }}
                className="liquid-cta w-full rounded-full"
              >
                Book Now
              </LiquidButton>
            </li>
          </ul>
        </div>
        </div>
        </div>
      ) : null}
    </>
  );
}
