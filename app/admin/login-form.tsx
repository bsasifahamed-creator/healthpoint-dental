'use client';

import Image from 'next/image';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { AdminBackground } from '@/components/admin/admin-background';
import { loginAdmin } from './actions';

export function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AdminBackground />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
        <div className="glass-card-strong w-full max-w-md rounded-3xl p-8 sm:p-10">
          <div className="flex flex-col items-center text-center">
            <div className="glass-pill mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1">
              <ShieldCheck className="size-3.5 text-teal" strokeWidth={1.75} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink">
                Admin Portal
              </span>
            </div>

            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/health point png logo.png"
                alt=""
                width={40}
                height={40}
                className="size-10 object-contain"
                priority
              />
              <div className="text-left">
                <p className="font-display text-lg font-extrabold uppercase tracking-[0.16em] text-ink leading-none">
                  Health Point
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mid">
                  Dental Clinic
                </p>
              </div>
            </div>

            <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink">
              Welcome back<span className="text-teal">.</span>
            </h1>
            <p className="mt-1 max-w-xs text-sm text-ink-mid">
              Sign in to view today&rsquo;s bookings and manage the schedule.
            </p>
          </div>

          <form
            className="mt-7 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              setError(null);
              startTransition(async () => {
                const res = await loginAdmin(fd);
                if (res.ok) {
                  router.refresh();
                } else {
                  setError(res.error);
                }
              });
            }}
          >
            <div>
              <label
                htmlFor="admin-pw"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid"
              >
                Password
              </label>
              <div className="glass-pill flex items-center gap-2 rounded-2xl px-4 py-3">
                <Lock className="size-4 shrink-0 text-ink-mid" strokeWidth={1.75} />
                <input
                  id="admin-pw"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter admin password"
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-dim"
                  required
                />
              </div>
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50/80 px-4 py-2.5 text-sm font-medium text-red-700 backdrop-blur-sm">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={pending}
              className="liquid-cta group inline-flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
            >
              {pending ? 'Signing in…' : 'Sign in'}
              {!pending ? (
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              ) : null}
            </button>
          </form>

          <p className="mt-6 text-center text-[11px] font-medium text-ink-dim">
            Authorised personnel only · Health Point Dental
          </p>
        </div>
      </main>
    </div>
  );
}
