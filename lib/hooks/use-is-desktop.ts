'use client';

import { useEffect, useState } from 'react';

/**
 * SSR-safe media-query hook. Returns `true` only after the component has
 * mounted on a viewport that meets `(min-width: <breakpoint>px)`. While
 * server-rendering and during the first client paint the value is `false`,
 * which means desktop-only effects (heavy WebGL canvases, GSAP scroll
 * orchestration, etc.) skip safely on mobile and lazily activate on
 * desktop after hydration.
 */
export function useIsDesktop(breakpointPx = 768): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia(`(min-width: ${breakpointPx}px)`);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [breakpointPx]);

  return isDesktop;
}
