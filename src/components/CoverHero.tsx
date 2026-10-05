"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Nearly the Home hero's cover effect: dims to 25% and blurs (0 to 12px,
// easing in) as the page slides over it. Instead of shrinking (which
// would show dark edges around a full-width photo) the photo zooms in a
// touch, which also keeps the blur's soft edges out of the frame.
const MAX_BLUR_PX = 12;
const MAX_ZOOM = 0.06;

function clamp01(n: number) {
  return Math.min(Math.max(n, 0), 1);
}

/**
 * A photo at the top of a page that stays put while the rest of the page
 * scrolls up over it, like the Home hero (the case study template, set
 * 2026-10-04). It's sticky (which works since html/body use
 * `overflow-x: clip`); the element right after it must be the opaque
 * content (`relative z-10 bg-ink`) that covers it. Its parent decides how
 * long it stays put (the case study article, so to the end of the page).
 *
 * As it's covered it dims, zooms in a touch and blurs, following the
 * scroll, and it's switched off once fully covered. Reduced motion: it
 * still stays put, without the dim, zoom or blur.
 */
export default function CoverHero({
  children,
  className = "",
}: {
  children: ReactNode;
  /** Classes for the photo's frame (size, aspect, background). */
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const media = mediaRef.current;
    const inner = innerRef.current;
    if (!el || !media || !inner) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    function update() {
      frame = 0;
      if (!el || !media || !inner) return;
      const next = el.nextElementSibling as HTMLElement | null;
      if (!next) return;
      const r = el.getBoundingClientRect();
      // Covered share: how far the content's top edge has come up over it.
      const c = r.height > 0 ? clamp01((r.bottom - next.getBoundingClientRect().top) / r.height) : 0;
      el.style.visibility = c >= 1 ? "hidden" : "";
      if (reduced) return;
      media.style.opacity = c > 0 ? (1 - 0.75 * c).toFixed(3) : "";
      inner.style.transform = c > 0 ? `scale(${(1 + MAX_ZOOM * c).toFixed(4)})` : "";
      inner.style.filter = c > 0 ? `blur(${(MAX_BLUR_PX * c * c).toFixed(2)}px)` : "";
    }

    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="sticky top-0 z-0">
      <div ref={mediaRef} className={className}>
        <div ref={innerRef} className="absolute inset-0">
          {children}
        </div>
      </div>
    </div>
  );
}
