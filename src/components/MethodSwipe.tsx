"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export type MethodPillar = {
  /** Who / What / How (shown in caps, no question mark). */
  question: string;
  number: string;
  label: string;
  description: ReactNode;
};

/**
 * The Method on phones (set 2026-10-06, Javier's mobile mockup): one card
 * per pillar in a sideways swipe, one card at a time (each the width of
 * the page grid, 24px apart, so the next one waits just off screen).
 * Each card: the question in cobalt, the numeral (Syne Bold), the name in
 * bold caps, the description, and a hairline under it. Dots below show
 * which card is in view. Tablets and desktop use the table in the
 * Studio page instead.
 *
 * Spacing (from the mockup, on the 4px grid): 48px from the section
 * label (set on the label in the Studio page), 16px from the question to
 * the numeral, 14px from the numeral to the name, 12px to the
 * description, 32px to the hairline (more room above and below, Javier's
 * ask 2026-10-06), 8px to the dots. The numeral's line
 * height (0.37) puts the top of Syne's old style figures at the top of
 * its box, with room below for the 3's tail (as on the table).
 */
export default function MethodSwipe({
  items,
  className = "",
}: {
  items: MethodPillar[];
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    function onScroll() {
      if (!el) return;
      const card = el.firstElementChild as HTMLElement | null;
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      const step = card ? card.offsetWidth + gap : el.clientWidth;
      if (step <= 0) return;
      const i = Math.round(el.scrollLeft / step);
      setActive(Math.min(Math.max(i, 0), items.length - 1));
    }
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [items.length]);

  // Keeps the sideways swipe from also reaching the page's own swipe
  // listeners (the swipe back to Work, the nav).
  function stop(e: React.TouchEvent) {
    e.stopPropagation();
  }

  return (
    <div className={className}>
      <div
        ref={trackRef}
        onTouchStart={stop}
        onTouchEnd={stop}
        className="scrollbar-hide -mx-6 flex snap-x snap-mandatory scroll-px-6 gap-6 overflow-x-auto overflow-y-hidden overscroll-x-contain px-6"
      >
        {items.map((item) => (
          <div key={item.label} className="w-full shrink-0 snap-start snap-always border-b border-mist pb-8">
            <p className="font-mono font-bold text-xs leading-4 uppercase tracking-[0.2em] text-cobalt-400">
              {item.question}
            </p>
            <p
              aria-hidden="true"
              className="mt-3 pb-[0.31em] font-display font-bold text-[48px] leading-[0.37]"
            >
              {item.number}
            </p>
            <h3 className="mt-2 font-mono font-bold text-lg leading-6 uppercase tracking-[0.2em] text-paper">
              <span className="sr-only">{item.number} </span>
              {item.label}
            </h3>
            <p className="text-sm leading-[22px] text-paper">{item.description}</p>
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="mt-2 flex gap-1">
        {items.map((item, i) => (
          <span
            key={item.label}
            className={`h-1.5 w-1.5 rounded-full border transition-colors duration-300 ${
              i === active ? "border-paper bg-paper" : "border-stone"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
