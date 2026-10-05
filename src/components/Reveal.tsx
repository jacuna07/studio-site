"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// How far below its spot a block starts (px).
const DISTANCE = 48;
// The block is fully hidden while its top is at the bottom edge of the
// screen, and fully in place once its top is 60% of the way up (the
// default `end`, a share of the screen height from the top). In between,
// it follows the scroll (the finger) exactly.
const START = 1;
const DEFAULT_END = 0.4;
// A block that's already on screen when the page opens (at the top)
// stays hidden until the visitor scrolls, then rises from where it sits.
// It still gets at least this much scrolling (share of the screen
// height) to come fully in place.
const MIN_RANGE = 0.3;
// Only when the page opens partway down (e.g. coming back to it): blocks
// on screen settle in once after this delay, over INTRO_MS (matches
// [data-reveal="intro"]).
const INTRO_DELAY_MS = 450;
const INTRO_MS = 800;

type State = "pending" | "intro" | "live" | "off";

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Phones only (below md) by default, or every screen size with
 * scope="all" (the Home page): a block that rises and fades in as it scrolls
 * up the screen, tied directly to the scroll position, so it moves with
 * the visitor's finger: stop scrolling and it stops; scroll back down
 * the page and it reverses. When the page opens, only what's above the
 * Reveal blocks shows (on Studio, the title and intro): blocks already
 * on screen wait for the first scroll and start rising from where they
 * sit, so nothing jumps. Desktop renders it as is.
 *
 * Fails toward visible, after the opacity bugs noted in globals.css:
 * before the page's JS runs, blocks are hidden only when the browser
 * reports scripting is on, and a CSS failsafe shows them anyway after 4s
 * if the JS never takes over. Reduced motion or desktop: no effect.
 */
export default function Reveal({
  children,
  className = "",
  scope = "phone",
  end: END = DEFAULT_END,
  phoneTrigger = false,
}: {
  children: ReactNode;
  className?: string;
  /** "phone": below md only (Studio). "all": every screen size (Home). */
  scope?: "phone" | "all";
  /** Where the block's top is once fully in place (share of the screen). */
  end?: number;
  /**
   * Phones: instead of following the scroll, play the rise and fade in
   * full once the block's top is 15% up from the bottom of the screen,
   * and reset once it's back below the screen (Home).
   */
  phoneTrigger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("pending");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isPhone = window.matchMedia("(max-width: 767px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if ((scope === "phone" && !isPhone) || reduced) {
      setState("off");
      return;
    }

    // Phones with phoneTrigger: play in full when it comes into view.
    if (phoneTrigger && isPhone) {
      let shown = false;
      let raf = 0;
      el.style.opacity = "0";
      el.style.transform = `translate3d(0, ${DISTANCE}px, 0)`;
      setState("live");
      const check = () => {
        raf = 0;
        let docTop = 0;
        for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) {
          docTop += n.offsetTop;
        }
        const top = docTop - window.scrollY;
        const vh = window.innerHeight;
        if (!shown && top < vh * 0.85) {
          shown = true;
          el.style.transition =
            "opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1)";
          el.style.opacity = "";
          el.style.transform = "";
        } else if (shown && top >= vh) {
          shown = false;
          el.style.transition = "none";
          el.style.opacity = "0";
          el.style.transform = `translate3d(0, ${DISTANCE}px, 0)`;
        }
      };
      const onScrollTrigger = () => {
        if (!raf) raf = window.requestAnimationFrame(check);
      };
      check();
      window.addEventListener("scroll", onScrollTrigger, { passive: true });
      window.addEventListener("resize", onScrollTrigger);
      return () => {
        window.removeEventListener("scroll", onScrollTrigger);
        window.removeEventListener("resize", onScrollTrigger);
        window.cancelAnimationFrame(raf);
      };
    }

    let frame = 0;
    let offset = DISTANCE;
    let ready = false;

    // Hold the hidden look inline (same as the pending CSS), so nothing
    // flashes when the JS takes over.
    el.style.opacity = "0";
    el.style.transform = `translate3d(0, ${DISTANCE}px, 0)`;

    // Page opened at the top, and this block is already on screen: its
    // range starts where it sits (fully hidden there) instead of at the
    // bottom edge, so it only moves once the visitor scrolls.
    const vh0 = window.innerHeight;
    const openedAtTop = window.scrollY < 10;
    let customStart: number | null = null;
    let customEnd: number | null = null;
    let cancelled = false;
    function measureStart() {
      if (!el) return;
      const top = el.getBoundingClientRect().top - offset;
      if (top < START * vh0) {
        customStart = top;
        customEnd = Math.min(END * vh0, top - MIN_RANGE * vh0);
      } else {
        customStart = customEnd = null;
      }
    }
    if (openedAtTop) {
      measureStart();
      // The brand fonts can arrive a moment later and shift the text
      // above by a few pixels: measure again then, if the visitor
      // hasn't scrolled yet, so no block shows faintly at rest.
      document.fonts?.ready.then(() => {
        if (cancelled || window.scrollY >= 10) return;
        measureStart();
        onScroll();
      });
    }

    function update() {
      frame = 0;
      if (!el || !ready) return;
      const vh = window.innerHeight;
      const start = customStart ?? START * vh;
      const end = customEnd ?? END * vh;
      // Where the block's top would be without its own offset, so the
      // movement never feeds back into the measurement.
      const top = el.getBoundingClientRect().top - offset;
      const t = Math.min(Math.max((start - top) / (start - end), 0), 1);
      const p = easeOut(t);
      offset = (1 - p) * DISTANCE;
      el.style.opacity = p >= 1 ? "" : p.toFixed(3);
      el.style.transform = offset < 0.1 ? "" : `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    }

    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    let introTimer: number | undefined;
    let liveTimer: number | undefined;
    if (openedAtTop) {
      // Everything below the intro starts hidden and follows the scroll
      // from the very first move.
      setState("live");
      ready = true;
      update();
    } else {
      setState("intro");
      introTimer = window.setTimeout(() => {
        ready = true;
        update();
      }, INTRO_DELAY_MS);
      liveTimer = window.setTimeout(() => setState("live"), INTRO_DELAY_MS + INTRO_MS + 100);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
      window.clearTimeout(introTimer);
      window.clearTimeout(liveTimer);
    };
  }, [scope, END, phoneTrigger]);

  return (
    <div ref={ref} data-reveal={state} data-reveal-scope={scope} className={className || undefined}>
      {children}
    </div>
  );
}
