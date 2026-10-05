"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// The look: rises 48px and fades in over 0.9s with a smooth ease out.
const DISTANCE = 48;
const DURATION_MS = 900;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
// Plays once the block's top is 15% up from the bottom of the screen.
const SHOW_AT = 0.85;

type State = "pending" | "live" | "off";

/** The block's top on the page, ignoring its own rise (offsetTop skips transforms). */
function restingTop(el: HTMLElement) {
  let top = 0;
  for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) {
    top += n.offsetTop;
  }
  return top;
}

/**
 * A block that rises and fades in, in full (timed, not tied to the
 * finger), once it scrolls into view, on phones and desktop (Home and
 * Studio, set 2026-10-04). It resets once it's back below the screen, so
 * it plays again on the way down.
 *
 * - When the page opens at the top, a block that's already on screen
 *   waits for the first scroll (so only what's above the Reveal blocks
 *   shows at load: on Studio, the title and intro).
 * - `delay` (ms) staggers blocks that come into view together (the two
 *   team cards side by side on desktop).
 * - `onShownChange` reports when it plays / resets (Home's carousel only
 *   starts moving once it has come in).
 *
 * Fails toward visible, after the opacity bugs noted in globals.css:
 * before the JS takes over, blocks are hidden only when the browser
 * reports scripting is on, with a CSS failsafe that shows them after 4s;
 * once played, the transition is dropped so a frozen one snaps to
 * visible. Reduced motion: shown from the start.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  onShownChange,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  onShownChange?: (shown: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("pending");
  const onShownChangeRef = useRef(onShownChange);
  onShownChangeRef.current = onShownChange;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("off");
      onShownChangeRef.current?.(true);
      return;
    }

    let shown = false;
    let frame = 0;
    let settleTimer: number | undefined;
    // Opened at the top: blocks already on screen wait for a first scroll.
    let armed = window.scrollY >= 10;

    function hide() {
      if (!el) return;
      el.style.transition = "none";
      el.style.opacity = "0";
      el.style.transform = `translate3d(0, ${DISTANCE}px, 0)`;
    }

    function check() {
      frame = 0;
      if (!el) return;
      if (!armed && window.scrollY > 8) armed = true;
      const top = restingTop(el) - window.scrollY;
      const vh = window.innerHeight;
      if (!shown && armed && top < vh * SHOW_AT) {
        shown = true;
        el.style.transition = `opacity ${DURATION_MS}ms ${EASE} ${delay}ms, transform ${DURATION_MS}ms ${EASE} ${delay}ms`;
        el.style.opacity = "";
        el.style.transform = "";
        window.clearTimeout(settleTimer);
        settleTimer = window.setTimeout(() => {
          if (shown) el.style.transition = "";
        }, delay + DURATION_MS + 200);
        onShownChangeRef.current?.(true);
      } else if (shown && top >= vh) {
        shown = false;
        window.clearTimeout(settleTimer);
        hide();
        onShownChangeRef.current?.(false);
      }
    }

    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(check);
    }

    hide();
    setState("live");
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
    };
  }, [delay]);

  return (
    <div ref={ref} data-reveal={state} className={className || undefined}>
      {children}
    </div>
  );
}
