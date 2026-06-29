'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, MessageCircle, ArrowLeft, Sparkles } from 'lucide-react';
import { SERVICES, type ServiceKey } from '@/lib/booking/services';
import { buildWhatsAppUrl, WHATSAPP_TEMPLATES } from '@/lib/booking/whatsapp-templates';
import { useBookingStore } from '@/lib/booking-store';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { cn } from '@/lib/utils';

type MergedService = { key: string; name: string; price: number; unit: string; icon: typeof Sparkles; doctorPreference: string; duration: number };

export function BookingForm() {
  const close = useBookingStore((s) => s.close);
  const [step, setStep] = useState<0 | 1>(0);
  const [serviceKey, setServiceKey] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [storeServices, setStoreServices] = useState<{ key: string; name: string; price: number; unit: string }[]>([]);

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setStoreServices(data);
      })
      .catch(() => {});
  }, []);

  const mergedServices: MergedService[] = [
    ...SERVICES,
    ...storeServices
      .filter((s) => !SERVICES.some((h) => h.key === s.key))
      .map((s) => ({
        key: s.key,
        name: s.name,
        price: s.price,
        unit: s.unit,
        icon: Sparkles,
        doctorPreference: 'any' as const,
        duration: 30,
      })),
  ];

  const selectedService = mergedServices.find((s) => s.key === serviceKey);

  async function handleSendToWhatsApp() {
    if (!selectedService) return;
    
    // Create a simple booking record (no time slot selection in this flow)
    const today = new Date();
    const bookingData = {
      serviceKey: selectedService.key,
      patientName: name.trim() || 'WhatsApp Walk-in',
      patientPhone: '',
      patientEmail: '',
      patientNotes: preferredTime.trim() || 'Requested via website booking button',
      date: today.toISOString().split('T')[0],
      time: '13:00', // Default slot, will be adjusted via WhatsApp
    };

    try {
      // Save booking to database first
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      
      if (!res.ok) {
        console.error('Failed to save booking');
      }
    } catch (err) {
      console.error('Booking save error:', err);
      // Continue anyway - WhatsApp will still work
    }

    // Now open WhatsApp with the message
    const template = WHATSAPP_TEMPLATES[selectedService.key as keyof typeof WHATSAPP_TEMPLATES];
    if (!template) {
      console.error('No WhatsApp template for service:', selectedService.key);
      return;
    }
    const message = template({
      name: name.trim(),
      preferredTime: preferredTime.trim(),
      serviceName: selectedService.name,
      price: selectedService.price,
      unit: selectedService.unit,
    });
    const url = buildWhatsAppUrl(message);
    
    try {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        window.location.href = url;
      }
    } catch (err) {
      window.location.href = url;
    }
    
    setTimeout(() => {
      close();
      setStep(0);
      setServiceKey(null);
      setName('');
      setPreferredTime('');
    }, 800);
  }

  return (
    <div className="mx-auto max-w-lg space-y-5 max-[390px]:space-y-4 pb-4">
      {/* Header */}
      <div className="space-y-2 border-b border-stroke pb-4">
        <div className="flex items-center gap-2">
          <span className="glass-pill grid size-8 place-items-center rounded-full">
            <MessageCircle className="size-4 text-teal" strokeWidth={2.2} aria-hidden />
          </span>
          <div>
            <h2 className="font-display text-lg font-bold leading-tight text-ink">
              Book on WhatsApp
            </h2>
            <p className="text-xs text-ink-mid leading-tight">
              Pick your treatment — we&apos;ll draft the message for you.
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {step === 0 ? (
          <motion.div
            key="pick-service"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            <p className="text-sm font-semibold text-ink">Select a treatment</p>
            <div className="grid max-h-[52dvh] gap-2 max-[390px]:gap-1.5 overflow-y-auto pr-1">
              {SERVICES.map((s) => {
                const Icon = s.icon;
                const active = serviceKey === s.key;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setServiceKey(s.key as ServiceKey)}
                    className={cn(
                      'glass-card flex items-center gap-3 max-[390px]:gap-2 rounded-2xl border px-4 max-[390px]:px-3 py-3 max-[390px]:py-2.5 text-left transition-all',
                      active
                        ? 'border-teal ring-2 ring-teal/40'
                        : 'border-stroke hover:border-stroke-strong',
                    )}
                    aria-pressed={active}
                  >
                    <span className="glass-pill flex size-10 max-[390px]:size-9 shrink-0 items-center justify-center rounded-xl text-teal">
                      <Icon className="size-5 max-[390px]:size-4" strokeWidth={1.5} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-ink">{s.name}</span>
                      <span className="text-sm max-[390px]:text-xs text-ink-mid">
                        {s.unit === 'AED' ? `${s.price} AED` : `${s.unit} ${s.price}`}
                      </span>
                    </span>
                    {active ? (
                      <span className="glass-pill grid size-7 shrink-0 place-items-center rounded-full">
                        <Check className="size-4 text-teal" strokeWidth={2.5} aria-hidden />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <LiquidButton
              type="button"
              onClick={() => {
                if (!serviceKey) return;
                setStep(1);
              }}
              disabled={!serviceKey}
              className="w-full rounded-full py-3.5 max-[390px]:py-3 font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-60"
            >
              Continue
              <Sparkles className="size-4 text-teal" strokeWidth={2} aria-hidden />
            </LiquidButton>
          </motion.div>
        ) : null}

        {step === 1 && selectedService ? (
          <motion.div
            key="compose"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="space-y-4"
          >
            {/* Recap card */}
            <div className="glass-card rounded-2xl border border-teal/40 p-4 flex items-center gap-3">
              <span className="glass-pill flex size-10 shrink-0 items-center justify-center rounded-xl text-teal">
                <Sparkles className="size-5" strokeWidth={1.6} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-teal">
                  Selected treatment
                </p>
                <p className="font-display font-bold text-ink leading-tight">
                  {selectedService.name}
                </p>
                <p className="text-xs text-ink-mid">
                  {selectedService.unit === 'AED'
                    ? `${selectedService.price} AED`
                    : `${selectedService.unit} ${selectedService.price}`}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label
                  htmlFor="booking-name"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink"
                >
                  Your name <span className="text-ink-mid">(optional)</span>
                </label>
                <input
                  id="booking-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="glass-card w-full rounded-xl border border-stroke px-4 max-[390px]:px-3 py-3 max-[390px]:py-2.5 text-ink placeholder:text-ink-dim/70 outline-none transition-colors focus:border-teal"
                  placeholder="So the front desk knows who's coming"
                />
              </div>
              <div>
                <label
                  htmlFor="booking-time"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink"
                >
                  Preferred time{' '}
                  <span className="text-ink-mid">(optional)</span>
                </label>
                <input
                  id="booking-time"
                  type="text"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="glass-card w-full rounded-xl border border-stroke px-4 max-[390px]:px-3 py-3 max-[390px]:py-2.5 text-ink placeholder:text-ink-dim/70 outline-none transition-colors focus:border-teal"
                  placeholder="e.g. Tomorrow evening, or Saturday afternoon"
                />
                <p className="mt-1.5 text-[11px] leading-snug text-ink-mid">
                  We&apos;re open daily 8 AM – 8 PM. Skip this and we&apos;ll suggest the next free
                  slot.
                </p>
              </div>
            </div>

            {/* Message preview */}
            <div className="glass-card-strong rounded-2xl p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-teal">
                  Drafted WhatsApp message
                </p>
                <span className="text-[10px] font-semibold text-ink-mid">Sends to +971 58 588 6915</span>
              </div>
              <pre className="whitespace-pre-wrap break-words font-body text-[13px] leading-[1.55] text-ink">
                {WHATSAPP_TEMPLATES[selectedService.key as ServiceKey]({
                  name: name.trim(),
                  preferredTime: preferredTime.trim(),
                  serviceName: selectedService.name,
                  price: selectedService.price,
                  unit: selectedService.unit,
                })}
              </pre>
            </div>

            <div className="flex gap-3 max-[390px]:gap-2 pt-1">
              <LiquidButton
                type="button"
                variant="outline"
                onClick={() => setStep(0)}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full py-3 max-[390px]:py-2.5 font-semibold text-ink"
              >
                <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
                Back
              </LiquidButton>
              <LiquidButton
                type="button"
                onClick={handleSendToWhatsApp}
                className="flex-[1.4] inline-flex items-center justify-center gap-2 rounded-full py-3 max-[390px]:py-2.5 font-semibold text-ink"
              >
                <MessageCircle className="size-4 text-green" strokeWidth={2} aria-hidden />
                Open WhatsApp
              </LiquidButton>
            </div>

            <p className="text-center text-[11px] leading-snug text-ink-mid">
              You can edit the message before sending. Or call{' '}
              <a href="tel:+971585886915" className="font-semibold text-teal hover:underline">
                +971 58 588 6915
              </a>
              .
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
