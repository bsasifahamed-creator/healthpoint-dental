'use client';

import { useEffect, useState, useRef } from 'react';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useBookingStore } from '@/lib/booking-store';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { AnimatePresence, motion } from 'motion/react';

function MobileMenu({ onClose, openBooking }: { onClose: () => void; openBooking: () => void }) {
  const touchStartX = useRef<number>(0);
  const touchCurrentX = useRef<number>(0);
  const [touchOffset, setTouchOffset] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = 0;
    setTouchOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchCurrentX.current = e.touches[0].clientX - touchStartX.current;
    setTouchOffset(Math.max(0, touchCurrentX.current));
  };

  const handleTouchEnd = () => {
    if (touchCurrentX.current > 80) {
      onClose();
    }
    touchStartX.current = 0;
    touchCurrentX.current = 0;
    setTouchOffset(0);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
      className="fixed inset-0 z-[56] md:hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ x: touchOffset > 0 ? touchOffset : undefined }}
    >
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          background:
            'radial-gradient(70% 60% at 20% 30%, #d4f8ea 0%, #c9f3d9 35%, #ddffd2 65%, #eefcff 100%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/40" />
      <div className="relative h-full overflow-y-auto px-6 max-[390px]:px-4 pt-24 pb-8">
        <ul className="flex flex-col gap-6 max-[390px]:gap-5 text-lg max-[390px]:text-base font-medium text-ink pt-4">
          <li>
            <a href="/" onClick={onClose} className="block py-2">
              Home
            </a>
          </li>
          <li>
            <a href="#scene-services" onClick={onClose} className="block py-2">
              Services
            </a>
          </li>
          <li>
            <a href="#scene-why" onClick={onClose} className="block py-2">
              Why Us
            </a>
          </li>
          <li>
            <a href="#scene-team" onClick={onClose} className="block py-2">
              Team
            </a>
          </li>
          <li>
            <a href="#contact" onClick={onClose} className="block py-2">
              Contact
            </a>
          </li>
          <li>
            <Link href="/blog" onClick={onClose} className="block py-2">
              Blog
            </Link>
          </li>
          <li className="pt-6 border-t border-stroke">
            <a href="tel:+971585886915" className="flex items-center gap-2 text-teal py-2">
              <Phone className="size-5" strokeWidth={1.5} aria-hidden />
              +971 58 588 6915
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/971585886915"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-dim py-2"
              onClick={onClose}
            >
              <MessageCircle className="size-5" strokeWidth={1.5} aria-hidden />
              WhatsApp
            </a>
          </li>
          <li>
            <LiquidButton
              type="button"
              onClick={() => {
                openBooking();
                onClose();
              }}
              className="liquid-cta w-full rounded-full"
            >
              Book Now
            </LiquidButton>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = useBookingStore((s) => s.open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollYRef = useRef(0);
  useEffect(() => {
    if (mobileOpen) {
      scrollYRef.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
    } else if (scrollYRef.current > 0) {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      window.scrollTo(0, scrollYRef.current);
      scrollYRef.current = 0;
    }
    return () => {
      if (scrollYRef.current > 0) {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        window.scrollTo(0, scrollYRef.current);
      }
    };
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

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[55] md:hidden bg-black/30"
              onClick={() => setMobileOpen(false)}
            />
            <MobileMenu onClose={() => setMobileOpen(false)} openBooking={open} />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
