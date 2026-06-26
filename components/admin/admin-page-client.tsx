'use client';

import { CalendarCheck, LogOut, Stethoscope, FileText, DollarSign, XCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { AdminBackground } from '@/components/admin/admin-background';
import { AdminMobileNav } from '@/components/admin/admin-mobile-nav';
import { StatusPill } from '@/components/admin/status-pill';
import { logoutAdmin } from '@/app/admin/actions';
import { cancelBookingForm } from '@/app/admin/actions';


type Counts = { confirmed: number; pending: number; cancelled: number; completed: number };

function StatCard({ label, value, tint }: { label: string; value: number; tint: 'teal' | 'green' | 'muted' }) {
  const accent = tint === 'teal' ? 'text-teal' : tint === 'green' ? 'text-green' : 'text-ink-mid';
  return (
    <div className="glass-card rounded-2xl px-4 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mid">{label}</p>
      <p className={`mt-1 font-display text-3xl font-extrabold ${accent}`}>{value}</p>
    </div>
  );
}

export function AdminPageClient({ bookings, error }: { bookings: any[]; error?: string }) {
  const counts = bookings.reduce(
    (acc, b) => {
      const s = (b.status ?? 'pending').toLowerCase();
      if (s === 'confirmed') acc.confirmed += 1;
      else if (s === 'cancelled') acc.cancelled += 1;
      else if (s === 'completed') acc.completed += 1;
      else acc.pending += 1;
      return acc;
    },
    { confirmed: 0, pending: 0, cancelled: 0, completed: 0 },
  );

  return (
    <div className="relative min-h-screen overflow-hidden text-ink">
      <AdminBackground />

      <header className="relative z-10 px-4 pt-6 sm:px-8">
        <div className="glass-card-strong mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 rounded-3xl px-4 py-3 sm:flex-nowrap sm:gap-4 sm:px-7 sm:py-4">
          <div className="flex items-center gap-3">
            <Image src="/health point png logo.png" alt="" width={36} height={36} className="size-9 object-contain" priority />
            <div className="leading-tight">
              <p className="font-display text-base font-extrabold uppercase tracking-[0.16em] text-ink">Health Point</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mid">Admin · Bookings</p>
            </div>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <span className="glass-pill inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-ink">
              <CalendarCheck className="size-3.5 text-teal" strokeWidth={1.75} />
              {bookings.length} total
            </span>
          </div>

          <div className="flex items-center gap-2">
            <AdminMobileNav onLogout={logoutAdmin} />
            <div className="hidden md:flex items-center gap-2">
              <Link href="/admin/doctors" className="glass-pill inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-ink transition-colors hover:text-teal">
                <Stethoscope className="size-3.5" strokeWidth={1.75} aria-hidden />
                Doctors
              </Link>
              <Link href="/admin/services" className="glass-pill inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-ink transition-colors hover:text-teal">
                <DollarSign className="size-3.5" strokeWidth={1.75} aria-hidden />
                Services
              </Link>
              <Link href="/admin/blog" className="glass-pill inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-ink transition-colors hover:text-teal">
                <FileText className="size-3.5" strokeWidth={1.75} aria-hidden />
                Blog
              </Link>
              <form action={logoutAdmin}>
                <button type="submit" className="glass-pill inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-ink transition-colors hover:text-teal">
                  <LogOut className="size-3.5" strokeWidth={1.75} aria-hidden />
                  Log out
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-6 sm:px-8 sm:py-8">
        <div className="mb-6 flex flex-col gap-2">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Today&rsquo;s bookings<span className="text-teal">.</span>
          </h1>
          <p className="max-w-xl text-sm text-ink-mid">Live view of every appointment across the clinic. Cancel slots to free them up for new patients.</p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Confirmed" value={counts.confirmed} tint="teal" />
          <StatCard label="Pending" value={counts.pending} tint="green" />
          <StatCard label="Completed" value={counts.completed} tint="teal" />
          <StatCard label="Cancelled" value={counts.cancelled} tint="muted" />
        </div>

        {error ? (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50/80 px-4 py-2.5 text-sm font-medium text-red-700 backdrop-blur-sm">{error}</div>
        ) : null}

        {bookings.length === 0 ? (
          <div className="glass-card rounded-3xl px-6 py-10 text-center">
            <p className="font-display text-lg font-bold text-ink">No bookings yet</p>
            <p className="mt-1 text-sm text-ink-mid">New WhatsApp appointments will appear here in real time.</p>
          </div>
        ) : (
          <div className="glass-card overflow-hidden rounded-3xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/40 text-[11px] uppercase tracking-[0.14em] text-ink-mid">
                    <th className="px-5 py-3 font-semibold">When</th>
                    <th className="px-5 py-3 font-semibold">Patient</th>
                    <th className="px-5 py-3 font-semibold">Service</th>
                    <th className="px-5 py-3 font-semibold">Doctor</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="w-28 px-5 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b border-white/25 align-middle transition-colors last:border-0 hover:bg-white/30">
                      <td className="whitespace-nowrap px-5 py-4 font-medium text-ink">
                        {b.slot_date}
                        <span className="ml-1 text-ink-mid">{String(b.slot_time).slice(0, 5)}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-ink">{b.patient_name}</div>
                        <div className="text-xs text-ink-mid">{b.patient_phone}</div>
                      </td>
                      <td className="px-5 py-4 text-ink">{b.service_name}</td>
                      <td className="px-5 py-4 text-ink">{b.doctor_name}</td>
                      <td className="px-5 py-4">
                        <StatusPill status={b.status as string} />
                      </td>
                      <td className="px-5 py-4 text-right">
                        {b.status !== 'cancelled' ? (
                          <form action={cancelBookingForm} className="inline-block">
                            <input type="hidden" name="id" value={b.id} />
                            <button type="submit" className="glass-pill inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold text-red-600 transition-colors hover:text-red-700">
                              <XCircle className="size-3" strokeWidth={2} />
                              Cancel
                            </button>
                          </form>
                        ) : (
                          <span className="text-xs text-ink-dim">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <footer className="mt-8 flex flex-col items-center gap-1 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mid">Health Point Dental · Admin</p>
          <p className="text-[11px] text-ink-dim">Confidential clinic data — handle with care.</p>
        </footer>
      </main>
    </div>
  );
}
