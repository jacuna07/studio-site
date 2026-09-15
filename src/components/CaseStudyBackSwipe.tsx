"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import IconArrowLeft from "./icons/IconArrowLeft";

// Small deadzone (px) before a touch is confirmed as this gesture, so
// an ordinary vertical scroll or a tap never triggers it.
const DEADZONE = 10;
// Drag distance, in px, needed to commit to the target page on
// release. The pill is also fully grown to its final size by this
// point (see paint()), so dragging further doesn't make it any bigger.
const COMMIT_DISTANCE = 150;
// Radius of the resting circle, and half the pill's fixed height —
// both ends stay this same radius as it grows, so it reads as a
// uniform capsule rather than a small circle growing into a bigger
// one at the tip.
const R = 28;
// The pill is anchored to wherever the touch actually started, but
// never closer to the true screen edge than this (center-to-edge), so
// a touch starting right at x=0 doesn't clip the resting circle.
const MIN_ANCHOR_X = R + 4;
// Inner padding, on both sides, between the pill's rounded cap and its
// content (the arrow on the left, the label on the right) once fully
// grown — kept equal on both ends so the pill looks snug around its
// content instead of one side trailing off into empty space.
const PAD = 16;
// How far above the actual touch point the pill is drawn, so the
// user's own thumb doesn't sit on top of the animation it's driving.
const THUMB_OFFSET = 64;
// Where the one-time hint (no real touch to anchor to) is drawn.
const HINT_ANCHOR_X = 72;
// How quickly the drawn width catches up to the raw finger position
// each animation frame (0-1). Damping this, rather than mirroring the
// finger 1:1, is what gives the pill its springy lag rather than
// tracking rigidly.
const FOLLOW = 0.22;
const FADE_MS = 220;
const COMMIT_HOLD_MS = 140;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Mobile only, swipe-to-go-back. Dragging right, starting anywhere on
 * the page, grows a small pill a bit above the thumb — from a plain
 * circle into a rounded capsule that reveals its label as the drag
 * continues — filled solid cobalt. (A translucent, backdrop-blurred
 * version was tried to match the header's own frosted-glass treatment,
 * but the blur never rendered reliably on real devices — likely
 * because backdrop-filter can fail to live-sample behind an element
 * whose size is changing every animation frame — so it was dropped
 * for a plain solid fill instead.) It's anchored horizontally to
 * wherever the touch actually started, not to a fixed
 * point, and grows toward a fixed, content-sized width (measured once
 * from the arrow + label themselves, padded equally on both sides)
 * rather than toward however far the finger happens to travel, so it
 * never keeps stretching the further you drag. Releasing past
 * COMMIT_DISTANCE commits to `targetHref`; releasing short fades the
 * pill out right where it was, in place, rather than springing it
 * back.
 *
 * An earlier version of this built the pill from three separately
 * positioned circles blended with an SVG "goo" filter (blur +
 * contrast) for a more liquid, metaball-like merge. In practice that
 * filter's contrast boost is calibrated for a fully opaque shape, and
 * applying it to a translucent fill (for the frosted-glass look)
 * came out as a smeary, blurred gradient rather than a clean edge. A
 * single plain capsule, growing in width with the same springy
 * easing, reads just as smooth without that failure mode.
 *
 * Everything here is imperative (refs + direct style writes), not
 * React state — there's nothing about this gesture that needs a
 * re-render mid-interaction, and keeping it that way also means the
 * content block used to measure the pill's target width is always
 * mounted and ready to read, instead of only existing once a gesture
 * has already begun.
 *
 * Used on case study pages and the Work archive (with the one-time
 * hint below, pointing back to Work and Home respectively) and on
 * About/Contact (gesture only, no hint: `hint={false}`, pointing back
 * to Work).
 */
export default function CaseStudyBackSwipe({
  targetHref,
  targetLabel,
  hint = true,
  children,
}: {
  targetHref: string;
  targetLabel: string;
  /** Show the one-time swipe hint nudge on mount. Default true. */
  hint?: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const pillRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  // The pill's target width once fully grown: PAD + the arrow/label's
  // own natural width + PAD. Measured once below; this fallback is
  // only ever visible for the instant before that first measurement.
  const fitWidthRef = useRef(R * 2 + 120);

  // Measures the actual arrow+label block once on mount, and again
  // once web fonts finish loading (in case that shifts the label's
  // width), so the pill's fully-grown size always matches its real
  // content instead of a guessed constant.
  useEffect(() => {
    function measure() {
      const el = contentRef.current;
      if (el) fitWidthRef.current = PAD * 2 + el.getBoundingClientRect().width;
    }
    measure();
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(measure).catch(() => {});
    }
  }, []);

  // Paints the pill for a given raw drag distance (0 = resting circle,
  // COMMIT_DISTANCE = fully grown). Writes straight to the DOM through
  // the refs above instead of through React state, so this can run
  // every animation frame during a drag without forcing a re-render.
  function paint(delta: number) {
    const pill = pillRef.current;
    const label = labelRef.current;
    if (!pill || !label) return;
    const progress = Math.min(1, Math.max(0, delta / COMMIT_DISTANCE));
    const width = R * 2 + (fitWidthRef.current - R * 2) * progress;
    pill.style.width = `${width}px`;
    // The label fades in over the back half of the growth, so it's
    // never still fading in right as the gesture completes.
    const labelProgress = Math.min(1, Math.max(0, (progress - 0.4) / 0.5));
    label.style.opacity = String(labelProgress);
  }

  // Positions and reveals the pill. x is where its center rests (the
  // resting circle's left edge lands at x - R); y is its vertical
  // center. Both are only ever set once per gesture, at the start —
  // only the width (via paint) changes per frame after that.
  function show(x: number, y: number) {
    const pill = pillRef.current;
    if (!pill) return;
    pill.style.transition = "";
    pill.style.left = `${x - R}px`;
    pill.style.top = `${y - R}px`;
    pill.style.opacity = "1";
  }

  function fadeOut() {
    const pill = pillRef.current;
    if (pill) {
      pill.style.transition = `opacity ${FADE_MS}ms ease`;
      pill.style.opacity = "0";
    }
  }

  // One time, shortly after a page with the hint enabled loads on a
  // touch device: a quick preview of the gesture, growing the pill
  // part way toward its target and back down, using the same paint()
  // the real drag uses so the hint can never look different from the
  // real thing. Any real touch anywhere cancels it outright.
  useEffect(() => {
    if (!hint) return;
    if (typeof window === "undefined" || !window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const HINT_PEAK = COMMIT_DISTANCE * 0.55;
    const TRANSITION_MS = 550;
    let cancelled = false;
    let armTimer: number | undefined;
    let backTimer: number | undefined;
    let doneTimer: number | undefined;
    let raf: number | undefined;

    function setTransitions(value: string) {
      const pill = pillRef.current;
      const label = labelRef.current;
      if (pill) pill.style.transition = value;
      if (label) label.style.transition = value;
    }

    armTimer = window.setTimeout(() => {
      if (cancelled) return;
      setTransitions("none");
      paint(0);
      show(HINT_ANCHOR_X, window.innerHeight * 0.5);
      raf = requestAnimationFrame(() => {
        if (cancelled) return;
        const transition = `width ${TRANSITION_MS}ms ${EASE}, opacity ${TRANSITION_MS}ms ${EASE}`;
        setTransitions(transition);
        paint(HINT_PEAK);
      });
      backTimer = window.setTimeout(() => {
        if (cancelled) return;
        paint(0);
      }, TRANSITION_MS + 250);
      doneTimer = window.setTimeout(() => {
        if (cancelled) return;
        fadeOut();
      }, TRANSITION_MS * 2 + 300);
    }, 700);

    function cancelHint() {
      if (cancelled) return;
      cancelled = true;
      window.clearTimeout(armTimer);
      window.clearTimeout(backTimer);
      window.clearTimeout(doneTimer);
      if (raf !== undefined) cancelAnimationFrame(raf);
      setTransitions("");
      const pill = pillRef.current;
      if (pill) {
        pill.style.transition = "";
        pill.style.opacity = "0";
      }
    }

    window.addEventListener("touchstart", cancelHint, { passive: true });

    return () => {
      cancelled = true;
      window.clearTimeout(armTimer);
      window.clearTimeout(backTimer);
      window.clearTimeout(doneTimer);
      if (raf !== undefined) cancelAnimationFrame(raf);
      window.removeEventListener("touchstart", cancelHint);
    };
  }, [hint]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let startX = 0;
    let startY = 0;
    let tracking = false;
    let active = false;
    // targetDelta: where the finger actually is (clamped to >= 0).
    // displayDelta: what's actually drawn, easing toward targetDelta
    // each frame.
    let targetDelta = 0;
    let displayDelta = 0;
    let rafId: number | null = null;

    function stopLoop() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    function tick() {
      const follow = prefersReducedMotion ? 1 : FOLLOW;
      displayDelta += (targetDelta - displayDelta) * follow;
      if (Math.abs(targetDelta - displayDelta) < 0.5) displayDelta = targetDelta;
      paint(Math.max(0, displayDelta));
      rafId = requestAnimationFrame(tick);
    }

    function onTouchStart(e: TouchEvent) {
      if (e.touches.length !== 1) return;
      if (document.body.dataset.navOpen === "true") return;
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      tracking = true;
      active = false;
      targetDelta = 0;
    }

    function onTouchMove(e: TouchEvent) {
      if (!tracking) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;

      if (!active) {
        if (Math.abs(deltaX) < DEADZONE && Math.abs(deltaY) < DEADZONE) return;
        const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
        if (!isHorizontal || deltaX <= 0) {
          // A vertical scroll or a leftward move: not this gesture, let
          // the browser handle it normally.
          tracking = false;
          return;
        }
        active = true;
        displayDelta = 0;
        const pill = pillRef.current;
        const label = labelRef.current;
        if (pill) pill.style.transition = "none";
        if (label) label.style.transition = "none";
        paint(0);
        // Anchored to wherever the touch actually started (not a fixed
        // edge position), and drawn a bit above it — not centered on
        // it — so the thumb itself never covers the animation it's
        // driving.
        show(Math.max(MIN_ANCHOR_X, startX), Math.max(90, startY - THUMB_OFFSET));
        stopLoop();
        rafId = requestAnimationFrame(tick);
      }

      // Now that this touch is confirmed as our gesture, stop the page
      // itself from scrolling for the rest of this touch.
      e.preventDefault();
      targetDelta = Math.max(0, deltaX);
    }

    function settle() {
      if (!active) {
        tracking = false;
        return;
      }
      tracking = false;
      active = false;
      stopLoop();

      // Decided from the finger's own raw travel (targetDelta), not the
      // eased displayDelta the pill is currently drawn at — a quick
      // flick past COMMIT_DISTANCE should commit even if the pill's
      // own lagging animation hasn't visually caught up yet.
      const shouldCommit = targetDelta > COMMIT_DISTANCE;
      const pill = pillRef.current;
      const label = labelRef.current;
      if (pill) pill.style.transition = `width ${FADE_MS}ms ${EASE}`;
      if (label) label.style.transition = `opacity ${FADE_MS}ms ${EASE}`;

      if (shouldCommit) {
        // Confirm at full size, hold briefly so the completion actually
        // reads before the page changes, then fade out while the route
        // change happens underneath.
        paint(COMMIT_DISTANCE);
        window.setTimeout(() => {
          fadeOut();
          router.push(targetHref);
        }, COMMIT_HOLD_MS);
      } else {
        // Fade out exactly where it was released, in place — no
        // snap-back to a resting circle first.
        fadeOut();
      }
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    // Not passive: engaging the gesture calls preventDefault above, to
    // lock page scroll for the rest of the touch.
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", settle, { passive: true });
    window.addEventListener("touchcancel", settle, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", settle);
      window.removeEventListener("touchcancel", settle);
      stopLoop();
    };
  }, [router, targetHref]);

  return (
    <>
      {/* Always mounted (never conditionally rendered) so the arrow +
          label content can be measured the instant the page loads,
          well before any gesture starts — see fitWidthRef. Hidden by
          default via opacity alone (not also pushed off-screen with a
          large negative offset: even though this is position:fixed
          and so out of normal document flow, a stray large offset
          was one of the suspects when a blank gap reappeared before
          the Footer, so it's kept at a plain, in-bounds resting
          position instead). show() and fadeOut() control visibility
          imperatively. Solid cobalt fill (see the note above on why
          the frosted-glass attempt was dropped), and overflow-hidden
          so the label is clipped cleanly while the pill is still
          narrower than its content. */}
      <div
        ref={pillRef}
        aria-hidden="true"
        className="fixed z-40 flex items-center overflow-hidden rounded-full bg-cobalt text-paper pointer-events-none"
        style={{
          top: 0,
          left: 0,
          width: R * 2,
          height: R * 2,
          opacity: 0,
          paddingLeft: PAD,
        }}
      >
        <div ref={contentRef} className="inline-flex items-center gap-2">
          <IconArrowLeft className="h-5 w-5 shrink-0" />
          <span
            ref={labelRef}
            className="font-display text-base font-normal whitespace-nowrap"
            style={{ opacity: 0 }}
          >
            {targetLabel}
          </span>
        </div>
      </div>

      {children}
    </>
  );
}
