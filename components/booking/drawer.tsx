'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useBookingStore } from '@/lib/booking-store';
import { BookingForm } from './form';

export function BookingDrawer() {
  const open = useBookingStore((s) => s.isOpen);
  const close = useBookingStore((s) => s.close);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center md:items-center">
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-[2px]"
        onClick={close}
        aria-hidden
      />
      <div
        className="glass-card-strong relative flex max-h-[92dvh] w-full max-w-lg flex-col rounded-t-3xl border-t border-stroke shadow-card-hover md:rounded-3xl md:border max-[390px]:max-h-[95dvh]"
        style={{ zIndex: 61 }}
      >
        <div className="flex items-center justify-between border-b border-stroke px-5 max-[390px]:px-4 py-4">
          <h2 className="font-display text-lg font-bold text-ink">Book on WhatsApp</h2>
          <button
            type="button"
            onClick={close}
            className="flex size-8 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close booking"
          >
            <X className="size-5 text-ink-mid" strokeWidth={1.5} />
          </button>
        </div>
        <div className="overflow-y-auto px-5 max-[390px]:px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] max-[390px]:pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-2">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
