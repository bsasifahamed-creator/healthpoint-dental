'use client';

import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useState } from 'react';
import { submitContact } from '@/lib/contact/actions';
import { contactSchema, CONTACT_TOPICS, type ContactInput } from '@/lib/contact/schema';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { cn } from '@/lib/utils';

const inputBase =
  'glass-card w-full rounded-xl border border-stroke px-4 max-[390px]:px-3 py-3 max-[390px]:py-2.5 text-ink placeholder:text-ink-dim/70 outline-none transition-colors focus:border-teal';

export function Contact({ id }: { id: string }) {
  const [sent, setSent] = useState(false);

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '+971 ',
      topic: 'general',
      message: '',
    },
  });

  const topic = form.watch('topic');

  const onSubmit = form.handleSubmit(async (values) => {
    const res = await submitContact(values);
    if (res.ok) {
      toast.success('Message sent. We will be in touch shortly.');
      form.reset();
      setSent(true);
    } else {
      toast.error(res.error ?? 'Could not send right now. Please try again.');
    }
  });

  return (
    <section
      id={id}
      className="relative z-10 px-6 max-[390px]:px-4 lg:px-12 py-6 max-[390px]:py-4 lg:py-8 bg-transparent"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="text-center mb-4 max-[390px]:mb-3">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-ink text-[clamp(2rem,5.5vw,4rem)] leading-[1] tracking-[-0.02em] mb-3 [text-shadow:0_2px_8px_rgba(255,255,255,0.45)]"
          >
            Get in <span className="text-teal">touch</span>
            <span className="text-teal">.</span>
          </motion.h2>
          <p className="text-ink-mid text-sm max-[390px]:text-xs mt-2 max-w-xl mx-auto leading-[1.6]">
            Send a note and the front desk will reach out within a few hours. For anything urgent,
            call or WhatsApp directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 max-[390px]:gap-4 lg:gap-10 items-start">
          {/* ----- Form card ----- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card-strong rounded-3xl p-6 max-[390px]:p-4 lg:p-8"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                <div className="glass-pill grid size-14 place-items-center rounded-full">
                  <CheckCircle2 className="size-6 text-teal" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="font-display text-2xl font-bold text-ink">Message sent</h3>
                <p className="text-ink-mid max-w-sm">
                  Thank you. A check confirmation has been emailed to you and the front desk will
                  follow up shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-2 text-sm font-semibold text-teal hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5 max-[390px]:space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-[390px]:gap-3">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold uppercase tracking-wide text-ink mb-1.5"
                    >
                      Full name
                    </label>
                    <input
                      id="contact-name"
                      autoComplete="name"
                      {...form.register('name')}
                      className={inputBase}
                      placeholder="Jane Patient"
                    />
                    {form.formState.errors.name ? (
                      <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.name.message}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold uppercase tracking-wide text-ink mb-1.5"
                    >
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      autoComplete="tel"
                      inputMode="tel"
                      {...form.register('phone')}
                      className={inputBase}
                      placeholder="+971 5X XXX XXXX"
                    />
                    {form.formState.errors.phone ? (
                      <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.phone.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-wide text-ink mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    {...form.register('email')}
                    className={inputBase}
                    placeholder="you@example.com"
                  />
                  {form.formState.errors.email ? (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.email.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-ink mb-2">
                    What&apos;s this about?
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {CONTACT_TOPICS.map((t) => {
                      const active = topic === t.value;
                      return (
                        <button
                          type="button"
                          key={t.value}
                          onClick={() =>
                            form.setValue('topic', t.value, { shouldValidate: true })
                          }
                          className={cn(
                            'glass-pill rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all',
                            active
                              ? 'text-teal border-teal/60 ring-2 ring-teal/40'
                              : 'text-ink hover:text-teal',
                          )}
                          aria-pressed={active}
                        >
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase tracking-wide text-ink mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    {...form.register('message')}
                    className={cn(inputBase, 'resize-none')}
                    placeholder="Tell us what you need. Mention any pain, prior treatment, or preferred dentist if relevant."
                  />
                  {form.formState.errors.message ? (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.message.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <p className="text-[11px] text-ink-mid leading-snug max-w-xs">
                    We&apos;ll only use your details to reply. No marketing, no third parties.
                  </p>
                  <LiquidButton
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="rounded-full px-6 py-3 font-semibold text-ink disabled:opacity-60"
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="size-4" strokeWidth={1.8} aria-hidden />
                      </>
                    )}
                  </LiquidButton>
                </div>
              </form>
            )}
          </motion.div>

          {/* ----- Contact info column ----- */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 max-[390px]:space-y-3"
            aria-label="Direct contact options"
          >
            <a
              href="tel:+971585886915"
              className="glass-card flex items-start gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <div className="glass-pill grid size-11 shrink-0 place-items-center rounded-xl">
                <Phone className="size-5 text-teal" strokeWidth={1.8} aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink font-semibold">
                  Phone
                </p>
                <p className="font-display text-lg font-bold text-ink leading-tight">
                  +971 58 588 6915
                </p>
                <p className="text-xs text-ink-mid mt-0.5">Front desk — daily, 1 PM to 9 PM</p>
              </div>
            </a>

            <a
              href="https://wa.me/971585886915"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex items-start gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <div className="glass-pill grid size-11 shrink-0 place-items-center rounded-xl">
                <MessageCircle className="size-5 text-green" strokeWidth={1.8} aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink font-semibold">
                  WhatsApp
                </p>
                <p className="font-display text-lg font-bold text-ink leading-tight">
                  Chat with reception
                </p>
                <p className="text-xs text-ink-mid mt-0.5">
                  Fastest for photos, prescriptions, and confirmations
                </p>
              </div>
            </a>

            <a
              href="mailto:hello@healthpointdental.ae"
              className="glass-card flex items-start gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <div className="glass-pill grid size-11 shrink-0 place-items-center rounded-xl">
                <Mail className="size-5 text-teal" strokeWidth={1.8} aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink font-semibold">
                  Email
                </p>
                <p className="font-display text-lg font-bold text-ink leading-tight">
                  hello@healthpointdental.ae
                </p>
                <p className="text-xs text-ink-mid mt-0.5">For records, referrals, and invoices</p>
              </div>
            </a>

            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-start gap-4">
                <div className="glass-pill grid size-11 shrink-0 place-items-center rounded-xl">
                  <MapPin className="size-5 text-teal" strokeWidth={1.8} aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink font-semibold">
                    Visit the clinic
                  </p>
                  <p className="font-display text-base font-bold text-ink leading-tight mt-0.5">
                    Office 603, Bedaia Building
                  </p>
                  <p className="text-sm text-ink-mid leading-snug">
                    Al Barsha 1, Dubai · 2 min from Mall of the Emirates
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-ink">
                    <Clock className="size-3.5 text-teal" strokeWidth={1.8} aria-hidden />
                    <span className="font-mono uppercase tracking-wider text-[10px] font-semibold">
                      Daily · 1 PM — 9 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
