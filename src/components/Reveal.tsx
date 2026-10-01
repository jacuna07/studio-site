"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Keep in step with the [data-reveal] transition in globals.css.
const DURATION_MS = 1000;
// Blocks already on screen when the page starts wait a moment, so they
// come in after the page's opening lines (.reveal-on-load, CSS only).
const INITIAL_DELAY_MS = 450;

type State = "pending" | "hidden" | "shown" | "static" | "off";

/**
 * Phones only (below md): a block that fades in from below when it
 * scrolls into view, and fades back out when the visitor scrolls back up
 * past it, so scrolling drives the content both ways. Blocks scrolled
 * past (above the screen) stay visible. Desktop renders it as is. The
 * look (1s, 48px, smooth ease out) lives in globals.css under
 * [data-reveal].
 *
 * Fails toward visible, after the opacity bugs noted in globals.css:
 * - Before the page's JS runs, blocks are hidden only when the browser
 *   reports scripting is on, and a CSS failsafe shows them anyway after
 *   4s if the JS never takes over.
 * - Once a block has come in, its transition is dropped after it should
 *   have ended ("static"), so a frozen transition snaps to fully visible.
 * - Reduced motion or desktop: no animation.
 */
export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("pending");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isPhone = window.matchMedia("(max-width: 767px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isPhone || reduced) {
      setState("off");
      return;
    }

    let timer: number | undefined;
    let frame = 0;
    let visible: boolean | null = null;
    let initial = true;

    // Follows the scroll position itself (not just crossings), so even a
    // big jump, like tapping the iPhone status bar to go back to the top,
    // leaves every block in the right state. The trigger line sits a
    // fifth of the way up from the bottom of the screen, so the movement
    // happens where the visitor is looking. While hidden, a block sits
    // 48px lower, which keeps it from flickering right at the line.
    function update() {
      frame = 0;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const show = rect.top < window.innerHeight * 0.8;
      const wasInitial = initial;
      initial = false;
      if (show === visible) return;
      visible = show;
      window.clearTimeout(timer);
      if (!show) {
        setState("hidden");
      } else if (wasInitial && rect.bottom <= 0) {
        // Already scrolled past when the page opened: just show it.
        setState("static");
      } else {
        const reveal = () => {
          setState("shown");
          timer = window.setTimeout(() => setState("static"), DURATION_MS + 200);
        };
        if (wasInitial) timer = window.setTimeout(reveal, INITIAL_DELAY_MS);
        else reveal();
      }
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
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={ref} data-reveal={state} className={className || undefined}>
      {children}
    </div>
  );
}
