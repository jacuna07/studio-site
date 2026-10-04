"use client";

import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import CircledWordmark from "./icons/CircledWordmark";
import { useCursorPreview } from "./useCursorPreview";

// Scroll distances, as a share of the screen height.
// While the hero is pinned, the copy reveals over REVEAL of scrolling;
// then the rest of the page slides up over it during one more screen.
const REVEAL = 0.9;
// Each sentence's [start, end] within the reveal, overlapping a little.
const LINES: [number, number][] = [
  [0, 0.5],
  [0.4, 0.9],
];
// How far below its spot each sentence starts (px), as on Studio.
const DISTANCE = 48;
// The circled wordmark turns with the scroll (degrees per pixel), easing
// toward that angle so it glides rather than ticks.
const DEG_PER_PX = 0.12;
const EASE = 0.12;
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

function announce(onScreen: boolean) {
  window.dispatchEvent(
    new CustomEvent<HeroWordmarkDetail>(HERO_WORDMARK_EVENT, { detail: { onScreen } })
  );
}

/**
 * The Home page hero on desktop (md and up; phones keep their own hero).
 *
 * - Pinned: the hero is fixed to the screen while a spacer the height of
 *   its scroll time passes by, and the rest of the page (an opaque panel
 *   right after this component) slides up over it, like
 *   veintitres.studio. The content dims and shrinks a touch as it's
 *   covered, and the hero is switched off once fully covered.
 * - On load only the circled wordmark shows. Scrolling reveals the two
 *   sentences one after the other, tied to the scroll (rise 48px + fade,
 *   ease out, same feel as the Studio reveals), then the page covers it.
 * - The circled wordmark turns with the scroll, like nevermodern.xyz.
 * - Over the hero, the cursor carries a rounded 16:9 card that flicks
 *   through every 16:9 image on the site (covers + wide gallery images),
 *   like cuestudiodesign.com.
 * - Tells the nav when the circled wordmark is covered, so the nav's own
 *   wordmark only appears then (HERO_WORDMARK_EVENT).
 *
 * Fails toward visible: before the JS takes over, the sentences are only
 * hidden when scripting is on, with a CSS failsafe after 4s (globals.css,
 * [data-hero]). Reduced motion: sentences show from the start, nothing
 * turns or dims; the page still slides over the hero.
 */
export default function HomeHeroDesktop({ images }: { images: { src: string }[] }) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const markBoxRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
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
    const content = contentRef.current;
    const markBox = markBoxRef.current;
    const mark = markRef.current;
    if (!spacer || !hero || !content || !markBox || !mark) return;
    const lines = lineRefs.current.filter((l): l is HTMLSpanElement => !!l);

    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    let angle = window.scrollY * DEG_PER_PX;
    let onScreen: boolean | null = null;

    function report(next: boolean) {
      if (next === onScreen) return;
      onScreen = next;
      announce(next);
    }

    function update() {
      frame = 0;
      if (!spacer || !hero || !content || !markBox || !mark) return;
      if (!desktop.matches) {
        // Phones: this hero isn't shown; leave the nav alone.
        report(false);
        return;
      }
      const vh = window.innerHeight;
      const y = window.scrollY;
      const reveal = REVEAL * vh;

      if (!reduced) {
        lines.forEach((line, i) => {
          const [start, end] = LINES[i] ?? [0, 1];
          const p = easeOut(clamp01((y - start * reveal) / ((end - start) * reveal)));
          line.style.opacity = p >= 1 ? "" : p.toFixed(3);
          line.style.transform = p >= 1 ? "" : `translate3d(0, ${((1 - p) * DISTANCE).toFixed(2)}px, 0)`;
        });

        // Covered share: 0 when the page starts sliding over, 1 when the
        // hero is fully hidden.
        const covered = clamp01((y - reveal) / vh);
        content.style.opacity = covered > 0 ? (1 - 0.75 * covered).toFixed(3) : "";
        content.style.transform = covered > 0 ? `scale(${(1 - 0.04 * covered).toFixed(4)})` : "";
      }

      // Fully covered (the panel's top has reached the top of the screen):
      // switch the hero off, so it never shows or takes the mouse later.
      const panelTop = spacer.getBoundingClientRect().bottom;
      hero.style.visibility = panelTop <= 0 ? "hidden" : "";

      // The circled wordmark counts as gone once the panel covers it.
      report(panelTop > markBox.getBoundingClientRect().top);

      if (!reduced) {
        const target = y * DEG_PER_PX;
        angle += (target - angle) * EASE;
        if (Math.abs(target - angle) < 0.02) angle = target;
        else frame = window.requestAnimationFrame(update);
        mark.style.transform = `rotate(${angle.toFixed(2)}deg)`;
      }
    }

    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    // Hold the hidden look inline (same as the pending CSS) before the
    // CSS rule is switched off, so the sentences never flash.
    if (!reduced && desktop.matches) {
      lines.forEach((line) => {
        line.style.opacity = "0";
        line.style.transform = `translate3d(0, ${DISTANCE}px, 0)`;
      });
    }
    setState("live");
    update();

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
    <div
      ref={spacerRef}
      // The hero's scroll time: the reveal plus one screen for the page to
      // slide over it. -mt-20 cancels main's top padding so the hero sits
      // under the fixed nav from the very top.
      className="hidden md:block md:-mt-20"
      style={{ height: `${(REVEAL + 1) * 100}vh` }}
    >
      <section
        ref={heroRef}
        data-hero={state}
        className="fixed inset-0 z-0 flex items-center bg-ink"
        {...card.handlers}
      >
        <Container>
          {/* From lg up the hero starts a quarter of the way across, in
              line with the footer's "Where to next?" column. */}
          <div ref={contentRef} className="origin-left pb-16 lg:pl-[25%]">
            <div ref={markBoxRef} className="h-40 w-40 lg:h-44 lg:w-44">
              <div ref={markRef} className="h-full w-full">
                <CircledWordmark className="h-full w-full text-paper" />
              </div>
            </div>
            <h1 className="mt-8 font-display font-normal text-5xl lg:text-[56px] leading-[1.2] tracking-normal">
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
                    className="absolute left-0 -bottom-1 h-[2px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full"
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
