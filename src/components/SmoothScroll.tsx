"use client";

import { useEffect, useRef } from "react";

// Wheel delta multiplier: 1 keeps roughly native scroll distance per tick.
// Nudge above 1 for a lighter feel, below 1 for heavier.
const SPEED = 1;
// How far the visual scroll position closes the gap to the target each
// frame (0-1). Lower = slower, heavier ease; higher = snappier, closer to
// native. This is the main "feel" knob -- currently set light/fast as a
// starting point to tune from.
const EASE = 0.35;
// Once the remaining distance is under this many pixels, snap to the target
// and stop the animation loop rather than chasing forever.
const SETTLE_PX = 0.5;

/**
 * Replaces native wheel-scrolling with an eased, lerp-driven scroll on
 * desktop/trackpad, matching the "buttery" scroll feel seen on sites like
 * thisistinge.com and folk-estudio.com. It intentionally does NOT touch
 * keyboard scrolling, scrollbar dragging, anchor jumps, or touch scrolling —
 * those stay fully native, which keeps the page accessible and avoids the
 * usual pitfalls of scroll-hijacking libraries (broken screen readers,
 * broken find-in-page, broken position:fixed children). It also backs off
 * entirely for reduced-motion users and skips the Work page's horizontal
 * industry-filter pills (see isExemptTarget below), which keep their
 * native wheel behavior untouched.
 *
 * Renders nothing — it's a behavior-only component, mount it once near the
 * root of the app.
 */
export default function SmoothScroll() {
  const targetRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const canHover =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canHover || reduceMotion) return;

    targetRef.current = window.scrollY;

    function maxScroll() {
      return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    }

    // The only element in the site that scrolls on its own is the Work
    // page's horizontal industry-filter row (class "scrollbar-hide"). A
    // plain closest() check is effectively free; an earlier version of this
    // walked the DOM calling getComputedStyle on every ancestor for every
    // single wheel event, which forces a synchronous layout each time --
    // at trackpad wheel-event frequency that was expensive enough to jam
    // the main thread and made scrolling feel laggy/uncontrollable. If a
    // new horizontally-scrollable widget is added later, give it this same
    // class (or extend the selector below).
    function isExemptTarget(target: EventTarget | null): boolean {
      return target instanceof Element ? !!target.closest(".scrollbar-hide") : false;
    }

    // Normalize deltaY to pixels: most trackpads/modern mice report pixel
    // deltas already (deltaMode 0), but older "notched" mice can report in
    // lines (1) or pages (2), which would otherwise under-scroll badly.
    function normalizedDeltaY(e: WheelEvent): number {
      if (e.deltaMode === 1) return e.deltaY * 16;
      if (e.deltaMode === 2) return e.deltaY * window.innerHeight;
      return e.deltaY;
    }

    function step() {
      const current = window.scrollY;
      const target = targetRef.current;
      const diff = target - current;

      if (Math.abs(diff) < SETTLE_PX) {
        window.scrollTo(0, target);
        isAnimatingRef.current = false;
        rafIdRef.current = null;
        return;
      }

      window.scrollTo(0, current + diff * EASE);
      rafIdRef.current = requestAnimationFrame(step);
    }

    function onWheel(e: WheelEvent) {
      if (isExemptTarget(e.target)) return;

      e.preventDefault();
      const next = targetRef.current + normalizedDeltaY(e) * SPEED;
      targetRef.current = Math.max(0, Math.min(next, maxScroll()));

      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        rafIdRef.current = requestAnimationFrame(step);
      }
    }

    function onScroll() {
      // Adopt scroll changes we didn't drive ourselves — keyboard, scrollbar
      // drag, anchor jumps, the Back to Top button — as the new baseline so
      // the next wheel tick continues from the right place.
      if (!isAnimatingRef.current) {
        targetRef.current = window.scrollY;
      }
    }

    function onResize() {
      targetRef.current = Math.max(0, Math.min(targetRef.current, maxScroll()));
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return null;
}
