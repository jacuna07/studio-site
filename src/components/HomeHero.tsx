"use client";

import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import HeroBackdrop from "./HeroBackdrop";
import CircledWordmark from "./icons/CircledWordmark";
import { useCursorPreview } from "./useCursorPreview";

/**
 * The scroll timeline, in screens of scrolling (phones are shorter).
 * `reveal`: how long the hero stays pinned before the page starts to
 * slide over it (then one more screen until it's fully covered).
 * Each [start, end] is a stretch within the reveal:
 * - `mark`: the circled wordmark shrinks from the middle of the screen
 *   into its place above the copy,
 * - `gallery`: the photo slideshow behind it fades to solid ink,
 * - `lines`: the two sentences, one after the other.
 */
type Timeline = {
  reveal: number;
  mark: [number, number];
  gallery: [number, number];
  lines: [number, number][];
};
const DESKTOP: Timeline = {
  reveal: 1.2,
  mark: [0, 0.45],
  gallery: [0, 0.7],
  lines: [
    [0.35, 0.8],
    [0.7, 1.15],
  ],
};
const PHONE: Timeline = {
  reveal: 0.95,
  mark: [0, 0.35],
  gallery: [0, 0.55],
  lines: [
    [0.28, 0.6],
    [0.55, 0.9],
  ],
};
// The spacer heights below must match: (reveal + 1) screens.
const SPACER_CLASS = "h-[195svh] md:h-[220vh]";

// How big the wordmark is in the middle of the screen at load, relative
// to its final size.
const MARK_START_SCALE = 2;
// How far below its spot each sentence starts (px), as on Studio.
const DISTANCE = 48;
// The wordmark always turns (the same pace as the phone header logo, one
// turn every 22s) and speeds up with the scroll: every px/s of scrolling
// adds this many degrees/s; scrolling back up slows it, or turns it the
// other way when fast.
const SPIN_DEG_PER_S = 360 / 22;
const SPIN_PER_SCROLL = 0.15;
// Blur at the very end of the cover, starting from none.
const MAX_BLUR_PX = 12;
// The cursor card: 16:9, grows out of the cursor, flicks every 400ms.
const CARD_WIDTH = 288;
const CARD_CYCLE_MS = 400;

/** Fired on window whenever the circled wordmark goes off or on screen. */
export const HERO_WORDMARK_EVENT = "tresunotres:hero-wordmark";
export type HeroWordmarkDetail = { onScreen: boolean };

function clamp01(n: number) {
  return Math.min(Math.max(n, 0), 1);
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function progress(s: number, [start, end]: [number, number]) {
  return clamp01((s - start) / (end - start));
}

function announce(onScreen: boolean) {
  window.dispatchEvent(
    new CustomEvent<HeroWordmarkDetail>(HERO_WORDMARK_EVENT, { detail: { onScreen } })
  );
}

/**
 * The Home page hero, phones and desktop.
 *
 * - Pinned: the hero is fixed to the screen while a spacer the height of
 *   its scroll time passes by, and the rest of the page (an opaque panel
 *   right after this component) slides up over it, like
 *   veintitres.studio. The copy dims, shrinks a touch and blurs as it's
 *   covered, and the hero is switched off once fully covered.
 * - On load: the circled wordmark, big, in the middle of the screen, over
 *   the photo slideshow (HeroBackdrop). Scrolling shrinks it into its
 *   place while the slideshow fades to ink, then reveals the two
 *   sentences one after the other, all tied to the scroll.
 * - The wordmark is always turning, faster or slower with the scroll
 *   (like nevermodern.xyz).
 * - Desktop, over the hero: the cursor carries a rounded 16:9 card that
 *   flicks through every 16:9 image on the site (like cuestudiodesign.com).
 * - Tells the nav when the wordmark is covered, so the nav's own logo
 *   only appears then (HERO_WORDMARK_EVENT).
 *
 * Fails toward visible: before the JS takes over, the wordmark and the
 * sentences are only hidden when scripting is on, with a CSS failsafe
 * after 4s (globals.css, [data-hero]). Reduced motion: everything shows
 * in place from the start, nothing moves, turns, dims or blurs; the page
 * still slides over the hero.
 */
export default function HomeHero({ images }: { images: { src: string; alt: string }[] }) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const markBoxRef = useRef<HTMLDivElement>(null);
  const markMoveRef = useRef<HTMLDivElement>(null);
  const markSpinRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [state, setState] = useState<"pending" | "live">("pending");

  const card = useCursorPreview({
    images,
    side: "right",
    placement: "below",
    width: CARD_WIDTH,
    cycleMs: CARD_CYCLE_MS,
    morph: true,
    eager: true,
  });

  useEffect(() => {
    const spacer = spacerRef.current;
    const hero = heroRef.current;
    const gallery = galleryRef.current;
    const content = contentRef.current;
    const markBox = markBoxRef.current;
    const markMove = markMoveRef.current;
    const markSpin = markSpinRef.current;
    if (!spacer || !hero || !gallery || !content || !markBox || !markMove || !markSpin) return;
    const lines = lineRefs.current.filter((l): l is HTMLSpanElement => !!l);

    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    let lastTime = 0;
    let lastY = window.scrollY;
    let velocity = 0; // px per second, smoothed
    let angle = 0;
    let onScreen: boolean | null = null;

    function report(next: boolean) {
      if (next === onScreen) return;
      onScreen = next;
      announce(next);
    }

    function render(now: number) {
      if (!spacer || !hero || !gallery || !content || !markBox || !markMove || !markSpin) return false;
      const t = desktop.matches ? DESKTOP : PHONE;
      // One "screen" as CSS sizes the spacer (svh on phones), so the
      // timeline doesn't jump when a phone's address bar shows or hides.
      const unit = spacer.offsetHeight / (t.reveal + 1) || window.innerHeight;
      const y = window.scrollY;
      const s = y / unit;

      // Fully covered (the panel's top has reached the top of the screen):
      // switch the hero off, so it never shows or takes the mouse later.
      const panelTop = spacer.getBoundingClientRect().bottom;
      const visible = panelTop > 0;
      hero.style.visibility = visible ? "" : "hidden";

      if (!reduced) {
        // Wordmark: from big in the middle of the screen into its place.
        const m = easeInOut(progress(s, t.mark));
        const box = markBox.getBoundingClientRect();
        const dx = (hero.clientWidth / 2 - (box.left + box.width / 2)) * (1 - m);
        const dy = (hero.clientHeight / 2 - (box.top + box.height / 2)) * (1 - m);
        const scale = 1 + (MARK_START_SCALE - 1) * (1 - m);
        markMove.style.transform =
          m >= 1 ? "" : `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;

        // The slideshow fades to ink.
        const g = easeInOut(progress(s, t.gallery));
        gallery.style.opacity = g >= 1 ? "0" : (1 - g).toFixed(3);

        // The sentences rise and fade in.
        lines.forEach((line, i) => {
          const p = easeOut(progress(s, t.lines[i] ?? [0, 1]));
          line.style.opacity = p >= 1 ? "" : p.toFixed(3);
          line.style.transform = p >= 1 ? "" : `translate3d(0, ${((1 - p) * DISTANCE).toFixed(2)}px, 0)`;
        });

        // Covered share: 0 when the page starts sliding over, 1 when the
        // hero is fully hidden. Dims, shrinks and blurs (the blur eases in
        // from nothing, strongest at the very end).
        const c = clamp01(s - t.reveal);
        content.style.opacity = c > 0 ? (1 - 0.75 * c).toFixed(3) : "";
        content.style.transform = c > 0 ? `scale(${(1 - 0.04 * c).toFixed(4)})` : "";
        content.style.filter = c > 0 ? `blur(${(MAX_BLUR_PX * c * c).toFixed(2)}px)` : "";

        // Always turning; faster or slower with the scroll speed.
        const dt = lastTime ? Math.min(now - lastTime, 64) : 16;
        lastTime = now;
        const v = ((y - lastY) / Math.max(dt, 1)) * 1000;
        lastY = y;
        velocity += (v - velocity) * 0.1;
        angle = (angle + ((SPIN_DEG_PER_S + SPIN_PER_SCROLL * velocity) * dt) / 1000) % 360;
        markSpin.style.transform = `rotate(${angle.toFixed(2)}deg)`;
      }

      // The wordmark counts as gone once the panel covers it.
      report(panelTop > markBox.getBoundingClientRect().top);
      return visible;
    }

    function loop(now: number) {
      frame = 0;
      const visible = render(now);
      // Keep turning while the hero is on screen; once it's covered, wait
      // for the next scroll to start again.
      if (visible && !reduced) frame = window.requestAnimationFrame(loop);
      else lastTime = 0;
    }

    function wake() {
      if (!frame) frame = window.requestAnimationFrame(loop);
    }

    // Set everything in its starting place while the pending CSS still
    // hides the wordmark and sentences, then switch that CSS off: the
    // wordmark fades in (see [data-hero-mark] in globals.css), already
    // big and centered, and nothing jumps.
    if (!reduced) {
      lines.forEach((line) => {
        line.style.opacity = "0";
        line.style.transform = `translate3d(0, ${DISTANCE}px, 0)`;
      });
    }
    render(performance.now());
    setState("live");
    wake();

    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);
    desktop.addEventListener("change", wake);
    return () => {
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      desktop.removeEventListener("change", wake);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={spacerRef}
      // The hero's scroll time: the reveal plus one screen for the page to
      // slide over it. -mt-20 cancels main's top padding so the hero sits
      // under the fixed nav from the very top.
      className={`relative -mt-20 ${SPACER_CLASS}`}
    >
      <section
        ref={heroRef}
        data-hero={state}
        className="fixed inset-x-0 top-0 z-0 flex h-[100svh] items-center overflow-hidden bg-ink md:h-screen"
        {...card.handlers}
      >
        {/* The photo slideshow (15% grayscale), faded out with the scroll. */}
        <div ref={galleryRef} className="absolute inset-0">
          <HeroBackdrop images={images} />
        </div>

        <Container className="relative">
          {/* From lg up the copy starts a quarter of the way across, in
              line with the footer's "Where to next?" column. */}
          <div ref={contentRef} className="origin-left pb-10 md:pb-16 lg:pl-[25%]">
            <div ref={markBoxRef} className="h-28 w-28 md:h-40 md:w-40 lg:h-44 lg:w-44">
              <div ref={markMoveRef} data-hero-mark className="h-full w-full">
                <div ref={markSpinRef} className="h-full w-full">
                  <CircledWordmark className="h-full w-full text-paper" />
                </div>
              </div>
            </div>
            <h1 className="mt-6 font-display font-normal text-3xl sm:text-4xl md:mt-8 md:text-5xl lg:text-[56px] leading-[1.2] tracking-normal">
              <span
                ref={(el) => {
                  lineRefs.current[0] = el;
                }}
                data-hero-line
                className="block"
              >
                We design the foundations.
              </span>
              <span
                ref={(el) => {
                  lineRefs.current[1] = el;
                }}
                data-hero-line
                className="block"
              >
                Your brand enjoys{" "}
                <a href="#work" className="group relative inline-block text-cobalt">
                  the spotlight.
                  <span
                    aria-hidden="true"
                    className="absolute left-0 -bottom-1 h-[2px] w-0 bg-current transition-all duration-300 ease-out md:group-hover:w-full"
                  />
                </a>
              </span>
            </h1>
          </div>
        </Container>
      </section>
      {card.preview}
    </div>
  );
}
