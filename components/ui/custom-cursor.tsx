'use client';

import { useEffect, useRef } from 'react';

const LENS_SIZE = 42;
const DISPLACEMENT_SCALE = 30;

export function CustomCursor() {
  const lensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return;

    const lens = lensRef.current;
    if (!lens) return;

    document.body.classList.add('custom-cursor-on');

    const cnv = document.createElement('canvas');
    cnv.width = LENS_SIZE;
    cnv.height = LENS_SIZE;
    const ctx = cnv.getContext('2d');
    if (!ctx) return;
    const imgData = ctx.createImageData(LENS_SIZE, LENS_SIZE);
    const c = LENS_SIZE / 2;
    const r = LENS_SIZE / 2 - 1;
    const strength = 0.85;
    for (let y = 0; y < LENS_SIZE; y++) {
      for (let x = 0; x < LENS_SIZE; x++) {
        const i = (y * LENS_SIZE + x) * 4;
        const dx = x - c;
        const dy = y - c;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > r) {
          imgData.data[i] = 128;
          imgData.data[i + 1] = 128;
          imgData.data[i + 2] = 0;
          imgData.data[i + 3] = 255;
        } else {
          const t = dist / r;
          const factor = t * t * strength;
          const nx = dist === 0 ? 0 : (-dx / dist) * factor;
          const ny = dist === 0 ? 0 : (-dy / dist) * factor;
          imgData.data[i] = Math.max(0, Math.min(255, Math.round(128 + nx * 127)));
          imgData.data[i + 1] = Math.max(0, Math.min(255, Math.round(128 + ny * 127)));
          imgData.data[i + 2] = 0;
          imgData.data[i + 3] = 255;
        }
      }
    }
    ctx.putImageData(imgData, 0, 0);
    const dataUrl = cnv.toDataURL('image/png');

    const filterId = `lens-magnify-${Math.floor(Math.random() * 1e9)}`;
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText =
      'position:fixed;width:0;height:0;overflow:hidden;pointer-events:none;left:-9999px;top:-9999px;';

    const defs = document.createElementNS(NS, 'defs');
    const filter = document.createElementNS(NS, 'filter');
    filter.setAttribute('id', filterId);
    filter.setAttribute('x', '0%');
    filter.setAttribute('y', '0%');
    filter.setAttribute('width', '100%');
    filter.setAttribute('height', '100%');
    filter.setAttribute('color-interpolation-filters', 'sRGB');

    const feImage = document.createElementNS(NS, 'feImage');
    feImage.setAttribute('href', dataUrl);
    feImage.setAttribute('result', 'dmap');
    feImage.setAttribute('preserveAspectRatio', 'none');
    feImage.setAttribute('x', '0');
    feImage.setAttribute('y', '0');
    feImage.setAttribute('width', String(LENS_SIZE));
    feImage.setAttribute('height', String(LENS_SIZE));
    filter.appendChild(feImage);

    const feDM = document.createElementNS(NS, 'feDisplacementMap');
    feDM.setAttribute('in', 'SourceGraphic');
    feDM.setAttribute('in2', 'dmap');
    feDM.setAttribute('scale', String(DISPLACEMENT_SCALE));
    feDM.setAttribute('xChannelSelector', 'R');
    feDM.setAttribute('yChannelSelector', 'G');
    filter.appendChild(feDM);

    defs.appendChild(filter);
    svg.appendChild(defs);
    document.body.appendChild(svg);

    lens.style.backdropFilter = `url(#${filterId})`;
    (lens.style as unknown as Record<string, string>).webkitBackdropFilter = `url(#${filterId})`;

    const onMove = (e: MouseEvent) => {
      lens.style.transform = `translate3d(${e.clientX - LENS_SIZE / 2}px, ${e.clientY - LENS_SIZE / 2}px, 0)`;
      lens.classList.remove('cursor-magnifier-hidden');
    };
    const onLeave = () => lens.classList.add('cursor-magnifier-hidden');
    const onDown = () => lens.classList.add('cursor-magnifier-active');
    const onUp = () => lens.classList.remove('cursor-magnifier-active');

    const hoverSel = 'a, button, [role="button"], input, textarea, select, label, summary';
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest?.(hoverSel)) lens.classList.add('cursor-magnifier-hover');
    };
    const onOut = (e: MouseEvent) => {
      const related = (e as unknown as { relatedTarget: Element | null }).relatedTarget;
      if (!related || !related.closest?.(hoverSel)) {
        lens.classList.remove('cursor-magnifier-hover');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      svg.remove();
      document.body.classList.remove('custom-cursor-on');
    };
  }, []);

  return (
    <div ref={lensRef} aria-hidden className="cursor-magnifier cursor-magnifier-hidden">
      <span className="cursor-magnifier-glare" aria-hidden />
      <span className="cursor-magnifier-handle" aria-hidden />
    </div>
  );
}
