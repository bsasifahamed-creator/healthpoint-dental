'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MeshGradient } from '@paper-design/shaders-react';

/**
 * Glassy splash loader — reuses the exact same MeshGradient stack as the
 * hero (so the background feels continuous with the site) and shows a
 * centered glass card with the logo, wordmark, and a 3-dot bounce loader.
 *
 * Dismisses on `window.load` with a short minimum display window and a
 * safety timeout fallback so the loader never gets stuck.
 */
const MIN_DISPLAY_MS = 900;
const SAFETY_TIMEOUT_MS = 5000;

export function SiteLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const start = performance.now();
    let resolved = false;

    const finish = () => {
      if (resolved) return;
      resolved = true;
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);
      window.setTimeout(() => setVisible(false), wait);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }
    const safety = window.setTimeout(finish, SAFETY_TIMEOUT_MS);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.clearTimeout(safety);
      window.removeEventListener('load', finish);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = '';
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="site-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100000] flex items-center justify-center overflow-hidden"
          aria-label="Loading Health Point Dental"
          role="status"
          aria-live="polite"
        >
          {/* Identical shader stack to the hero — keeps the loader visually
              continuous with the site behind it. */}
          <MeshGradient
            className="absolute inset-0 h-full w-full"
            colors={['#f3fffb', '#d4f8ea', '#c9f3d9', '#ddffd2', '#eefcff']}
            speed={0.26}
          />
          <MeshGradient
            className="absolute inset-0 h-full w-full opacity-55"
            colors={['#84e1bc', '#9be37f', '#7ed321', '#6dd3af']}
            speed={0.2}
          />
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_78%_26%,rgba(126,211,33,0.32),rgba(126,211,33,0.08)_45%,transparent_72%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/12 via-white/0 to-white/20" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(50% 42% at 0% 0%, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.10) 35%, transparent 60%),' +
                'radial-gradient(45% 38% at 100% 100%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.08) 35%, transparent 58%)',
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            }}
            className="glass-card relative z-10 flex flex-col items-center gap-5 rounded-3xl px-10 py-8"
          >
            <Image
              src="/health point png logo.png"
              alt=""
              width={44}
              height={44}
              className="size-11 object-contain"
              priority
            />

            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-ink">
              Health Point
            </p>

            <div className="flex items-center gap-2" aria-label="Loading">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block size-2 rounded-full bg-teal"
                  initial={{ y: 0, opacity: 0.4 }}
                  animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
