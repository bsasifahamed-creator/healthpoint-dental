'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Stethoscope, DollarSign, FileText, Globe, LogOut, ArrowLeft } from 'lucide-react';

export function AdminMobileNav({ onLogout }: { onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [top, setTop] = useState(0);

  useEffect(() => {
    if (open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setTop(rect.bottom + 8);
    }
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="glass-pill inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-ink md:hidden"
        aria-label={open ? 'Close admin menu' : 'Open admin menu'}
      >
        {open ? <X className="size-4" strokeWidth={1.75} /> : <Menu className="size-4" strokeWidth={1.75} />}
      </button>

      {open && (
        <div className="fixed inset-0 z-[99999] md:hidden" onClick={() => setOpen(false)}>
          <div
            className="fixed w-56 flex-col gap-0.5 rounded-2xl border border-white/40 bg-white/90 p-2 shadow-xl backdrop-blur-xl"
            style={{ right: 12, top }}
            onClick={(e) => e.stopPropagation()}
          >
            <NavItem href="/admin" icon={ArrowLeft} label="Bookings" onClick={() => setOpen(false)} />
            <NavItem href="/admin/doctors" icon={Stethoscope} label="Doctors" onClick={() => setOpen(false)} />
            <NavItem href="/admin/services" icon={DollarSign} label="Services / Prices" onClick={() => setOpen(false)} />
            <NavItem href="/admin/blog" icon={FileText} label="Blog" onClick={() => setOpen(false)} />
            <div className="mt-1 border-t border-white/30 pt-1">
              <form action={onLogout}>
                <button
                  type="submit"
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-white/50"
                  onClick={() => setOpen(false)}
                >
                  <LogOut className="size-4" strokeWidth={1.75} />
                  Log out
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white/50"
    >
      <Icon className="size-4 text-teal" strokeWidth={1.75} />
      {label}
    </Link>
  );
}
