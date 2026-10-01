"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// How far below its spot a block starts (px).
const DISTANCE = 48;
// The block is fully hidden while its top is at the bottom edge of the
// screen, and fully in place once its top is 60% of the way up. In
// between, it follows the scroll (the finger) exactly.
const START = 1;
const END = 0.4;
// Blocks already on screen when the page opens settle in after this
// delay, so they follow the page's opening lines (.reveal-on-load).
const INTRO_DELAY_MS = 450;
// How long that first settle takes (matches [data-reveal="intro"]).
const INTRO_MS = 800;

type State = "pending" | "intro" | "live" | "off";

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Phones only (below md): a block that rises and fades in as it scrolls
 * up the screen, tied directly to the scroll position, so it moves with
 * the visitor's finger: stop scrolling and it stops; scroll back down
 * the page and it reverses. Desktop renders it as is.
 *
 * Fails toward visible, after the opacity bugs noted in globals.css:
 * before the page's JS runs, blocks are hidden only when the browser
 * reports scripting is on, and a CSS failsafe shows them anyway after 4s
 * if the JS never takes over. Reduced motion or desktop: no effect.
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

    let frame = 0;
    let offset = DISTANCE;
    let ready = false;

    // Hold the hidden look inline (same as the pending CSS) while the
    // intro transition switches on, so nothing flashes.
    el.style.opacity = "0";
    el.style.transform = `translate3d(0, ${DISTANCE}px, 0)`;
    setState("intro");

    function update() {
      frame = 0;
      if (!el || !ready) return;
      const vh = window.innerHeight;
      // Where the block's top would be without its own offset, so the
      // movement never feeds back into the measurement.
      const top = el.getBoundingClientRect().top - offset;
      const t = Math.min(Math.max((START * vh - top) / ((START - END) * vh), 0), 1);
      const p = easeOut(t);
      offset = (1 - p) * DISTANCE;
      el.style.opacity = p >= 1 ? "" : p.toFixed(3);
      el.style.transform = offset < 0.1 ? "" : `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    }

    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    const introTimer = window.setTimeout(() => {
      ready = true;
      update();
    }, INTRO_DELAY_MS);
    const liveTimer = window.setTimeout(() => setState("live"), INTRO_DELAY_MS + INTRO_MS + 100);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
      window.clearTimeout(introTimer);
      window.clearTimeout(liveTimer);
    };
  }, []);

  return (
    <div ref={ref} data-reveal={state} className={className || undefined}>
      {children}
    </div>
  );
}
