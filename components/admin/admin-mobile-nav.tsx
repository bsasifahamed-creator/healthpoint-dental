'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X, Stethoscope, DollarSign, FileText, LogOut, ArrowLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export function AdminMobileNav({ onLogout }: { onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const scrollY = useRef(0);

  useEffect(() => {
    if (open) {
      scrollY.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
    } else if (scrollY.current > 0) {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      window.scrollTo(0, scrollY.current);
      scrollY.current = 0;
    }
    return () => {
      if (scrollY.current > 0) {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        window.scrollTo(0, scrollY.current);
      }
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="glass-pill inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-ink md:hidden"
        aria-label={open ? 'Close admin menu' : 'Open admin menu'}
      >
        {open ? <X className="size-4" strokeWidth={1.75} /> : <Menu className="size-4" strokeWidth={1.75} />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[99999] bg-black/30 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
              className="fixed inset-y-0 right-0 z-[99999] w-72 max-w-[85vw] md:hidden"
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(70% 60% at 20% 30%, #d4f8ea 0%, #c9f3d9 35%, #ddffd2 65%, #eefcff 100%)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/40" />
              <div className="relative flex flex-col gap-1 p-6 pt-20">
                <NavItem href="/admin" icon={ArrowLeft} label="Bookings" onClick={() => setOpen(false)} />
                <NavItem href="/admin/doctors" icon={Stethoscope} label="Doctors" onClick={() => setOpen(false)} />
                <NavItem href="/admin/services" icon={DollarSign} label="Services / Prices" onClick={() => setOpen(false)} />
                <NavItem href="/admin/blog" icon={FileText} label="Blog" onClick={() => setOpen(false)} />
                <div className="mt-4 border-t border-white/30 pt-4">
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
