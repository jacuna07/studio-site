"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import IconArrowLeft from "./icons/IconArrowLeft";

// How far into the screen, as a fraction of its width, a touch can
// start and still arm this gesture. Swiping anywhere between the left
// edge and the horizontal middle counts — not just a narrow strip
// right at the edge.
const TRIGGER_ZONE_RATIO = 0.5;
// Small deadzone (px) before a touch inside the trigger zone is
// confirmed as this gesture, so an ordinary vertical scroll or a tap
// never triggers it.
const DEADZONE = 10;
// Drag distance, in px, needed to commit to the Work page on release.
// The blob is also fully grown to its final size by this point (see
// paint()), so dragging further doesn't make it any bigger.
const COMMIT_DISTANCE = 150;
// Radius of the resting circle and the leading "tip" circle that
// trails the finger — the same size for both, so the blob reads as a
// uniform pill with matching rounded ends, not a small circle growing
// into a bigger one.
const R = 28;
// Small gap from the true screen edge so the resting circle isn't
// clipped by it.
const EDGE_MARGIN = 6;
// Inner padding, on both sides, between the pill's rounded cap and its
// content (the arrow on the left, the label on the right) once fully
// grown — kept equal on both ends so the pill looks snug around its
// content instead of one side trailing off into empty space.
const PAD = 16;
// How far above the actual touch point the blob is drawn, so the
// user's own thumb doesn't sit on top of the animation it's driving.
const THUMB_OFFSET = 64;
// How quickly the drawn position catches up to the raw finger position
// each animation frame (0-1). Damping this, rather than mirroring the
// finger 1:1, is what gives the blob its liquid lag rather than
// tracking rigidly — the whole point of the effect.
const FOLLOW = 0.22;
const FADE_MS = 220;
const COMMIT_HOLD_MS = 140;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Mobile only, swipe-to-go-back-to-Work. Dragging right, starting
 * anywhere between the left edge and the horizontal middle of the
 * screen, grows a small liquid blob a bit above the thumb — a circle
 * that stretches into a pill and reveals "Work" as the drag continues
 * — using a classic SVG "goo" filter (blur + contrast) to blend the
 * growing shapes into one continuous blob instead of a plain rounded
 * rectangle, tinted translucent with a backdrop blur to match the
 * site header's own frosted-glass treatment. The pill grows toward a
 * fixed, content-sized width (measured once from the arrow + label
 * themselves, padded equally on both sides) rather than toward
 * however far the finger happens to travel, so it never keeps
 * stretching the further you drag. Releasing past COMMIT_DISTANCE
 * commits to the Work archive; releasing short fades the blob out
 * right where it was, in place, rather than springing it back.
 *
 * Everything here is imperative (refs + direct style writes), not
 * React state, including the one-time hint below — there's nothing
 * about this gesture that needs a re-render mid-interaction, and
 * keeping it that way also means the content block used to measure
 * the pill's target width is always mounted and ready to read,
 * instead of only existing once a gesture has already begun.
 *
 * Used on case study pages (with the one-time hint below) and on
 * About/Contact (gesture only, no hint: `hint={false}`).
 */
export default function CaseStudyBackSwipe({
  workHref,
  workTitle,
  hint = true,
  children,
}: {
  workHref: string;
  workTitle: string;
  /** Show the one-time swipe hint nudge on mount. Default true. */
  hint?: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const bridgeRef = useRef<HTMLDivElement | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);
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

  // Paints the blob for a given raw drag distance (0 = resting circle,
  // COMMIT_DISTANCE = fully grown). Writes straight to the DOM through
  // the refs above instead of through React state, so this can run
  // every animation frame during a drag without forcing a re-render.
  function paint(delta: number) {
    const bridge = bridgeRef.current;
    const tip = tipRef.current;
    const label = labelRef.current;
    if (!bridge || !tip || !label) return;
    const progress = Math.min(1, Math.max(0, delta / COMMIT_DISTANCE));
    const pillWidth = R * 2 + (fitWidthRef.current - R * 2) * progress;
    const tipCenter = EDGE_MARGIN + pillWidth - R;
    bridge.style.width = `${Math.max(0, pillWidth - R)}px`;
    tip.style.transform = `translateX(${tipCenter - R}px)`;
    // The label fades in over the back half of the growth, so it's
    // never still fading in right as the gesture completes.
    const labelProgress = Math.min(1, Math.max(0, (progress - 0.4) / 0.5));
    label.style.opacity = String(labelProgress);
  }

  function show(y: number) {
    const container = containerRef.current;
    if (!container) return;
    container.style.transition = "";
    container.style.top = `${y - R}px`;
    container.style.opacity = "1";
  }

  function fadeOut(after: () => void) {
    const container = containerRef.current;
    if (container) {
      container.style.transition = `opacity ${FADE_MS}ms ease`;
      container.style.opacity = "0";
    }
    window.setTimeout(after, FADE_MS);
  }

  // One time, shortly after a case study loads on a touch device: a
  // quick preview of the gesture, growing the blob part way toward
  // Work and back down, using the same paint() the real drag uses so
  // the hint can never look different from the real thing. Any real
  // touch anywhere cancels it outright.
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

    function setShapeTransitions(value: string) {
      const bridge = bridgeRef.current;
      const tip = tipRef.current;
      const label = labelRef.current;
      if (bridge) bridge.style.transition = value;
      if (tip) tip.style.transition = value;
      if (label) label.style.transition = value;
    }

    armTimer = window.setTimeout(() => {
      if (cancelled) return;
      setShapeTransitions("none");
      paint(0);
      show(window.innerHeight * 0.5);
      raf = requestAnimationFrame(() => {
        if (cancelled) return;
        const transition = `width ${TRANSITION_MS}ms ${EASE}, transform ${TRANSITION_MS}ms ${EASE}, opacity ${TRANSITION_MS}ms ${EASE}`;
        setShapeTransitions(transition);
        paint(HINT_PEAK);
      });
      backTimer = window.setTimeout(() => {
        if (cancelled) return;
        paint(0);
      }, TRANSITION_MS + 250);
      doneTimer = window.setTimeout(() => {
        if (cancelled) return;
        fadeOut(() => {});
      }, TRANSITION_MS * 2 + 300);
    }, 700);

    function cancelHint() {
      if (cancelled) return;
      cancelled = true;
      window.clearTimeout(armTimer);
      window.clearTimeout(backTimer);
      window.clearTimeout(doneTimer);
      if (raf !== undefined) cancelAnimationFrame(raf);
      setShapeTransitions("");
      const container = containerRef.current;
      if (container) {
        container.style.transition = "";
        container.style.opacity = "0";
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
      // Only arm from the left half of the screen — see
      // TRIGGER_ZONE_RATIO above.
      if (touch.clientX > window.innerWidth * TRIGGER_ZONE_RATIO) return;
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
        const bridge = bridgeRef.current;
        const tip = tipRef.current;
        const label = labelRef.current;
        if (bridge) bridge.style.transition = "none";
        if (tip) tip.style.transition = "none";
        if (label) label.style.transition = "none";
        paint(0);
        // Drawn a bit above the touch point (not centered on it) so
        // the thumb itself never covers the animation it's driving.
        show(Math.max(90, startY - THUMB_OFFSET));
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
      // eased displayDelta the blob is currently drawn at — a quick
      // flick past COMMIT_DISTANCE should commit even if the blob's
      // own lagging animation hasn't visually caught up yet.
      const shouldCommit = targetDelta > COMMIT_DISTANCE;
      const bridge = bridgeRef.current;
      const tip = tipRef.current;
      const label = labelRef.current;
      const settleTransition = `width ${FADE_MS}ms ${EASE}, transform ${FADE_MS}ms ${EASE}`;
      if (bridge) bridge.style.transition = settleTransition;
      if (tip) tip.style.transition = settleTransition;
      if (label) label.style.transition = `opacity ${FADE_MS}ms ${EASE}`;

      if (shouldCommit) {
        // Confirm at full size, hold briefly so the completion actually
        // reads before the page changes, then fade out while the route
        // change happens underneath.
        paint(COMMIT_DISTANCE);
        window.setTimeout(() => {
          fadeOut(() => {});
          router.push(workHref);
        }, COMMIT_HOLD_MS);
      } else {
        // Fade out exactly where it was released, in place — no
        // snap-back to a resting circle first.
        fadeOut(() => {});
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
  }, [router, workHref]);

  return (
    <>
      {/* Always mounted (never conditionally rendered) so the content
          block below can be measured the instant the page loads, well
          before any gesture starts — see fitWidthRef. Hidden by
          default via opacity + an off-screen resting position; show()
          and fadeOut() control both imperatively. */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="fixed left-0 z-40 pointer-events-none"
        style={{ top: -9999, height: R * 2, width: "100vw", opacity: 0 }}
      >
        {/* The liquid shapes: goo-filtered together so the anchor
            circle, the growing bridge, and the leading tip blend into
            one continuous blob instead of reading as three separate
            rounded shapes. Translucent + backdrop-blurred to match
            the site header's own frosted-glass treatment, instead of
            a solid fill. */}
        <div className="absolute inset-0 backdrop-blur-md" style={{ filter: "url(#work-swipe-goo)" }}>
          <div
            className="absolute rounded-full bg-cobalt/60"
            style={{ width: R * 2, height: R * 2, left: EDGE_MARGIN, top: 0 }}
          />
          <div
            ref={bridgeRef}
            className="absolute bg-cobalt/60"
            style={{ left: EDGE_MARGIN, top: 0, width: 0, height: R * 2, borderRadius: R }}
          />
          <div
            ref={tipRef}
            className="absolute rounded-full bg-cobalt/60"
            style={{ width: R * 2, height: R * 2, left: 0, top: 0 }}
          />
        </div>

        {/* Arrow + label sit in their own unfiltered layer, on top, so
            the goo blur never touches them — only the liquid shapes
            behind get that effect. */}
        <div className="absolute inset-0 flex items-center text-paper" style={{ paddingLeft: PAD }}>
          <div ref={contentRef} className="inline-flex items-center gap-2">
            <IconArrowLeft className="h-5 w-5 shrink-0" />
            <span
              ref={labelRef}
              className="font-display text-base font-normal whitespace-nowrap"
              style={{ opacity: 0 }}
            >
              {workTitle}
            </span>
          </div>
        </div>
      </div>

      {/* Hidden SVG defs only — never rendered visibly itself, just
          referenced by the filter: url(...) above. */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="work-swipe-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>

      {children}
    </>
  );
}
