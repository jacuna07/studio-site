"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Same motion as the Home intro lines (.animate-line): 24px up, 0.6s.
const DURATION_MS = 600;

type Phase = "static" | "hidden" | "showing";

/**
 * Phones only (below md): wraps a block so it fades in from below the
 * first time it scrolls into view. Desktop renders it as is.
 *
 * Built to fail toward visible, after the opacity bugs noted in
 * globals.css (.animate-page-in, .animate-case-study-in):
 * - The server renders it fully visible. It's only hidden after the page
 *   is running, and only if it starts below the screen, so a block that's
 *   already on screen never blinks out, and nothing hides without JS.
 * - Once revealed, the transition is dropped after it should have ended,
 *   so a frozen transition snaps to fully visible instead of staying
 *   faded.
 * - Reduced motion: no animation at all.
 */
export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setPhase("hidden");
    let doneTimer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setPhase("showing");
        doneTimer = window.setTimeout(() => setPhase("static"), DURATION_MS + 200);
      },
      // Starts once the block is a little way up from the bottom edge, so
      // the movement is actually seen.
      { rootMargin: "0px 0px -12% 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(doneTimer);
    };
  }, []);

  const phaseClass =
    phase === "hidden"
      ? "opacity-0 translate-y-6"
      : phase === "showing"
        ? "transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        : "";

  return (
    <div ref={ref} className={`${className} ${phaseClass}`.trim() || undefined}>
      {children}
    </div>
  );
}
