"use client";

import { useEffect, useRef, type ReactNode } from "react";

// As the page slides over it the photo zooms in a touch. No dimming or
// blur (removed 2026-10-04, Javier's call).
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
 * As it's covered it zooms in a touch, following the scroll (unless
 * `zoom` is off), and it's switched off once fully covered
 * (`visibility: hidden`, which also pauses a HeroGradient inside it,
 * through `data-cover-hero`). Reduced motion: it still stays put, without
 * the zoom.
 *
 * Also the Studio page's title and intro over the shader gradient (set
 * 2026-10-05): full screen, from the very top on phones too, no zoom.
 */
export default function CoverHero({
  children,
  className = "",
  offsetClassName = "md:-mt-20",
  zoom = true,
}: {
  children: ReactNode;
  /** Classes for the frame (size, aspect, background). */
  className?: string;
  /** Pulls it up under the nav. Default: desktop only (the case study:
   *  phones keep the photo below the nav). */
  offsetClassName?: string;
  /** Zoom in a touch as it's covered. */
  zoom?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    function update() {
      frame = 0;
      if (!el || !inner) return;
      const next = el.nextElementSibling as HTMLElement | null;
      if (!next) return;
      const r = el.getBoundingClientRect();
      // Covered share: how far the content's top edge has come up over it.
      const c = r.height > 0 ? clamp01((r.bottom - next.getBoundingClientRect().top) / r.height) : 0;
      el.style.visibility = c >= 1 ? "hidden" : "";
      if (reduced || !zoom) return;
      inner.style.transform = c > 0 ? `scale(${(1 + MAX_ZOOM * c).toFixed(4)})` : "";
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
  }, [zoom]);

  return (
    // -mt-20 cancels main's top padding, so it starts at the very top
    // edge, under the nav (the case study: desktop only, set 2026-10-04).
    <div ref={ref} data-cover-hero className={`sticky top-0 z-0 ${offsetClassName}`}>
      <div className={className}>
        <div ref={innerRef} className="absolute inset-0">
          {children}
        </div>
      </div>
    </div>
  );
}
