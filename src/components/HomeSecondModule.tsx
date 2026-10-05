"use client";

import { createContext, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Whether the Home carousel has come in and is in view (read by
 * FeaturedCarousel's home variant: it only plays while this is true).
 * null outside the Home second module.
 */
export const HomeCarouselInPlace = createContext<boolean | null>(null);

/**
 * The scroll timeline, in screens of scrolling from the moment the panel
 * has fully covered the hero (0). `pin`: how long the module then stays
 * pinned to the top of the screen. `statement` / `carousel`: when each
 * rises and fades in; the statement starts a little before the pin, while
 * the panel finishes covering the hero.
 */
type Timeline = { pin: number; statement: [number, number]; carousel: [number, number] };
const DESKTOP: Timeline = { pin: 0.75, statement: [-0.3, 0.25], carousel: [0.2, 0.7] };
// The pin spacer height must match `pin` screens (desktop only: phones
// don't pin).
const PIN_CLASS = "h-0 md:h-[75vh]";
// Phones: each part plays in full once its top is 15% up from the bottom
// of the screen, and resets once it's back below the screen.
const PHONE_SHOW_AT = 0.85;
const PHONE_MS = 900;
const PHONE_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
// How far below its spot each step starts (px), as in the hero.
const DISTANCE = 48;

function clamp01(n: number) {
  return Math.min(Math.max(n, 0), 1);
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * The Home page's second module: the statement, then the Featured
 * carousel. Desktop: like the hero, it comes in as a sequence tied to the
 * scroll: once the panel has slid over the hero, the module pins to the
 * top of the screen (sticky; the carousel runs off the bottom) while
 * first the statement, then the carousel, rise 48px and fade in. Then it
 * scrolls on normally. Scrolling back up reverses it. Phones: no pin;
 * each part plays its rise and fade in full once it comes into view.
 *
 * Fails toward visible: before the JS takes over, both are hidden only
 * when scripting is on, with a CSS failsafe after 4s (globals.css,
 * [data-home-pin]). Reduced motion: shown from the start, no pin effect.
 */
export default function HomeSecondModule({
  statement,
  children,
}: {
  statement: ReactNode;
  /** The Featured section (carousel). */
  children: ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"pending" | "live">("pending");
  const [inPlace, setInPlace] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const spacer = spacerRef.current;
    const steps = [statementRef.current, carouselRef.current];
    if (!wrap || !spacer || !steps[0] || !steps[1]) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    // Phones: which parts are showing; and the layout last seen.
    const shown = [false, false];
    let wasDesktop: boolean | null = null;

    function update() {
      frame = 0;
      if (!wrap || !spacer || !steps[0] || !steps[1]) return;
      if (wasDesktop !== desktop.matches) {
        wasDesktop = desktop.matches;
        steps.forEach((el) => {
          if (el) el.style.transition = "";
        });
        shown[0] = shown[1] = false;
      }
      if (!desktop.matches) {
        const vh = window.innerHeight;
        steps.forEach((el, i) => {
          if (!el) return;
          // Its resting position (offsetTop ignores its own rise).
          let docTop = 0;
          for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) {
            docTop += n.offsetTop;
          }
          const top = docTop - window.scrollY;
          if (!shown[i] && top < vh * PHONE_SHOW_AT) {
            shown[i] = true;
            if (!reduced) {
              el.style.transition = `opacity ${PHONE_MS}ms ${PHONE_EASE}, transform ${PHONE_MS}ms ${PHONE_EASE}`;
              el.style.opacity = "";
              el.style.transform = "";
            }
          } else if (shown[i] && top >= vh) {
            shown[i] = false;
            if (!reduced) {
              el.style.transition = "none";
              el.style.opacity = "0";
              el.style.transform = `translate3d(0, ${DISTANCE}px, 0)`;
            }
          }
        });
        const r = steps[1].getBoundingClientRect();
        setInPlace(shown[1] && r.bottom > 0 && r.top < vh);
        return;
      }
      const t = DESKTOP;
      // One "screen" as CSS sizes the spacer (svh on phones).
      const unit = spacer.offsetHeight / t.pin || window.innerHeight;
      const s = -wrap.getBoundingClientRect().top / unit;
      const ranges = [t.statement, t.carousel];
      let carouselDone = true;
      if (!reduced) {
        steps.forEach((el, i) => {
          if (!el) return;
          const [a, b] = ranges[i];
          const p = easeOut(clamp01((s - a) / (b - a)));
          el.style.opacity = p >= 1 ? "" : p.toFixed(3);
          el.style.transform = p >= 1 ? "" : `translate3d(0, ${((1 - p) * DISTANCE).toFixed(2)}px, 0)`;
          if (i === 1) carouselDone = p >= 1;
        });
      }
      const r = steps[1].getBoundingClientRect();
      setInPlace(carouselDone && r.bottom > 0 && r.top < window.innerHeight);
    }

    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    if (!reduced) {
      steps.forEach((el) => {
        if (!el) return;
        el.style.opacity = "0";
        el.style.transform = `translate3d(0, ${DISTANCE}px, 0)`;
      });
    }
    update();
    setState("live");

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    desktop.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      desktop.removeEventListener("change", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={wrapRef} data-home-pin={state}>
      <div className="sticky top-0">
        <div ref={statementRef} data-home-step>
          {statement}
        </div>
        <div ref={carouselRef} data-home-step>
          <HomeCarouselInPlace.Provider value={inPlace}>{children}</HomeCarouselInPlace.Provider>
        </div>
      </div>
      {/* The pin's scroll time. */}
      <div ref={spacerRef} aria-hidden="true" className={PIN_CLASS} />
    </div>
  );
}
