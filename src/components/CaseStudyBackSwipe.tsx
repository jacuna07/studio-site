"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import IconArrowLeft from "./icons/IconArrowLeft";

// How close to the left edge, in px, a touch has to start for this
// gesture to arm at all. Restricting it to a narrow edge zone (rather
// than anywhere on the page, as before) makes it read as a deliberate
// "swipe from the edge" gesture instead of something that could
// trigger from an incidental horizontal drag mid-page.
const EDGE_ZONE = 24;
// Small deadzone (px) before a touch inside the edge zone is confirmed
// as this gesture, so an ordinary vertical scroll or a tap started
// near the edge never triggers it.
const DEADZONE = 10;
// Drag distance, in px, needed to commit to the Work page on release.
const COMMIT_DISTANCE = 150;
// How far past COMMIT_DISTANCE the blob still visually grows, for a
// little physical "give" instead of the drag hitting a hard wall.
const MAX_DRAG = COMMIT_DISTANCE * 1.15;
// Radius of the resting anchor circle and the leading "tip" circle
// that trails the finger. The tip is drawn a touch larger, which is
// what makes the leading edge of the blob read as a slightly bulging
// liquid head rather than a plain bar with rounded ends.
const BASE_R = 28;
const TIP_R = 32;
// Small gap from the true screen edge so the resting circle isn't
// clipped by it.
const EDGE_MARGIN = 6;
const ANCHOR_CENTER = BASE_R + EDGE_MARGIN;
// How quickly the drawn position catches up to the raw finger position
// each animation frame (0-1). Damping this, rather than mirroring the
// finger 1:1, is what gives the blob its liquid lag rather than
// tracking rigidly — the whole point of the effect.
const FOLLOW = 0.22;
// The label starts fading in once the drag is 35% of the way to
// COMMIT_DISTANCE, and is fully visible by 90% — chosen so it's never
// still fading in right as the gesture completes.
const LABEL_START = COMMIT_DISTANCE * 0.35;
const LABEL_SPAN = COMMIT_DISTANCE * 0.55;
const FADE_MS = 220;
const COMMIT_HOLD_MS = 140;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Mobile only, edge-swipe-to-go-back-to-Work. Dragging right from the
 * very left edge of the screen grows a small liquid blob under the
 * thumb — a circle that stretches into a pill and reveals "Work" as
 * the drag continues — using a classic SVG "goo" filter (blur +
 * contrast) to blend the growing shapes into one continuous blob
 * instead of a plain rounded rectangle. Releasing past COMMIT_DISTANCE
 * commits to the Work archive; releasing short fades the blob out
 * right where it was, in place, rather than springing it back.
 *
 * This replaces an earlier version of this gesture that slid the
 * whole page aside to reveal a full-height blue "Work" card behind
 * it. That approach is gone entirely: the page itself never moves now,
 * and the only page-level effect is this small, self-contained
 * indicator plus the eventual navigation.
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
  // null = blob not shown. { y, isHint } = shown, vertically anchored
  // at that point (the touch's own Y for a real gesture, a fixed
  // mid-screen point for the hint). isHint distinguishes the two,
  // since both flow through this same state: a real drag paints itself
  // frame by frame from touchmove, while the hint runs its own canned
  // tween below — without the flag, a real drag on a page where the
  // hint is enabled would also trigger that canned tween and fight
  // with the live one. This only changes at the start/end of a
  // gesture, never per frame, so it's fine as ordinary React state.
  const [preview, setPreview] = useState<{ y: number; isHint?: boolean } | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const bridgeRef = useRef<HTMLDivElement | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  // Paints the blob for a given eased delta (0 = resting circle,
  // growing toward MAX_DRAG). Writes straight to the DOM through the
  // refs above instead of through React state, so this can run every
  // animation frame during a drag without forcing a re-render each
  // time — the same approach the previous version of this gesture used
  // for its own per-frame transform updates.
  function paint(delta: number) {
    const bridge = bridgeRef.current;
    const tip = tipRef.current;
    const label = labelRef.current;
    if (!bridge || !tip || !label) return;
    const tipCenter = ANCHOR_CENTER + delta;
    bridge.style.width = `${Math.max(0, tipCenter - (ANCHOR_CENTER - BASE_R))}px`;
    tip.style.transform = `translateX(${tipCenter - TIP_R}px)`;
    const progress = Math.min(1, Math.max(0, (delta - LABEL_START) / LABEL_SPAN));
    label.style.opacity = String(progress);
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

    let cancelled = false;

    const armTimer = window.setTimeout(() => {
      if (cancelled) return;
      setPreview({ y: window.innerHeight * 0.5, isHint: true });
    }, 700);

    function cancelHint() {
      if (cancelled) return;
      cancelled = true;
      window.clearTimeout(armTimer);
      const bridge = bridgeRef.current;
      const tip = tipRef.current;
      if (bridge) bridge.style.transition = "";
      if (tip) tip.style.transition = "";
      setPreview(null);
    }

    window.addEventListener("touchstart", cancelHint, { passive: true });

    return () => {
      cancelled = true;
      window.clearTimeout(armTimer);
      window.removeEventListener("touchstart", cancelHint);
    };
    // preview intentionally excluded: this effect only ever sets it,
    // never reacts to it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hint]);

  // Runs the actual grow-and-back-down tween once the blob has
  // mounted for the hint (i.e. once its refs exist to animate).
  useEffect(() => {
    if (!hint || !preview || !preview.isHint) return;
    const bridge = bridgeRef.current;
    const tip = tipRef.current;
    const label = labelRef.current;
    if (!bridge || !tip || !label) return;

    const HINT_PEAK = COMMIT_DISTANCE * 0.55;
    const TRANSITION_MS = 550;
    let cancelled = false;

    paint(0);
    const raf = requestAnimationFrame(() => {
      if (cancelled) return;
      const transition = `width ${TRANSITION_MS}ms ${EASE}, transform ${TRANSITION_MS}ms ${EASE}, opacity ${TRANSITION_MS}ms ${EASE}`;
      bridge.style.transition = transition;
      tip.style.transition = transition;
      label.style.transition = transition;
      paint(HINT_PEAK);
    });

    const back = window.setTimeout(() => {
      if (cancelled) return;
      paint(0);
    }, TRANSITION_MS + 250);

    const done = window.setTimeout(() => {
      if (cancelled) return;
      const container = containerRef.current;
      if (container) {
        container.style.transition = `opacity ${FADE_MS}ms ease`;
        container.style.opacity = "0";
      }
      window.setTimeout(() => {
        if (!cancelled) setPreview(null);
      }, FADE_MS);
    }, TRANSITION_MS * 2 + 300);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(back);
      window.clearTimeout(done);
    };
    // Only re-runs when a fresh hint mounts (preview flips from null to
    // a value); paint()/refs are stable for the component's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview, hint]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let startX = 0;
    let startY = 0;
    let tracking = false;
    let active = false;
    // targetDelta: where the finger actually is (clamped to the
    // 0..MAX_DRAG range the blob can visually occupy). displayDelta:
    // what's actually drawn, easing toward targetDelta each frame.
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
      // Only arm from near the true left edge — see EDGE_ZONE above.
      if (touch.clientX > EDGE_ZONE) return;
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
        const container = containerRef.current;
        if (container) {
          container.style.transition = "";
          container.style.opacity = "1";
        }
        const bridge = bridgeRef.current;
        const tip = tipRef.current;
        const label = labelRef.current;
        if (bridge) bridge.style.transition = "none";
        if (tip) tip.style.transition = "none";
        if (label) label.style.transition = "none";
        setPreview({ y: startY });
        stopLoop();
        rafId = requestAnimationFrame(tick);
      }

      // Now that this touch is confirmed as our gesture, stop the page
      // itself from scrolling or triggering the browser's own edge
      // navigation for the rest of this touch.
      e.preventDefault();
      targetDelta = Math.min(MAX_DRAG, Math.max(0, deltaX));
    }

    function settle() {
      if (!active) {
        tracking = false;
        return;
      }
      tracking = false;
      active = false;
      stopLoop();

      const shouldCommit = displayDelta > COMMIT_DISTANCE;
      const bridge = bridgeRef.current;
      const tip = tipRef.current;
      const label = labelRef.current;
      const container = containerRef.current;
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
          if (container) {
            container.style.transition = `opacity ${FADE_MS}ms ease`;
            container.style.opacity = "0";
          }
          router.push(workHref);
          window.setTimeout(() => setPreview(null), FADE_MS);
        }, COMMIT_HOLD_MS);
      } else {
        // Fade out exactly where it was released, in place — no
        // snap-back to a resting circle first.
        if (container) {
          container.style.transition = `opacity ${FADE_MS}ms ease`;
          container.style.opacity = "0";
        }
        window.setTimeout(() => setPreview(null), FADE_MS);
      }
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    // Not passive: engaging the gesture calls preventDefault above, to
    // lock page scroll and the browser's own edge-back gesture for the
    // rest of the touch.
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
      {preview && (
        <div
          ref={containerRef}
          aria-hidden="true"
          className="fixed left-0 z-40 pointer-events-none"
          style={{ top: preview.y - TIP_R, height: TIP_R * 2, width: "100vw" }}
        >
          {/* The liquid shapes: goo-filtered together so the anchor
              circle, the growing bridge, and the leading tip blend
              into one continuous blob instead of reading as three
              separate rounded shapes. */}
          <div className="absolute inset-0" style={{ filter: "url(#work-swipe-goo)" }}>
            <div
              className="absolute rounded-full bg-cobalt"
              style={{
                width: BASE_R * 2,
                height: BASE_R * 2,
                left: EDGE_MARGIN,
                top: TIP_R - BASE_R,
              }}
            />
            <div
              ref={bridgeRef}
              className="absolute bg-cobalt"
              style={{
                left: EDGE_MARGIN,
                top: TIP_R - BASE_R,
                width: 0,
                height: BASE_R * 2,
                borderRadius: BASE_R,
              }}
            />
            <div
              ref={tipRef}
              className="absolute rounded-full bg-cobalt"
              style={{
                width: TIP_R * 2,
                height: TIP_R * 2,
                left: 0,
                top: 0,
              }}
            />
          </div>

          {/* Arrow + label sit in their own unfiltered layer, on top,
              so the goo blur never touches them — only the liquid
              shapes behind get that effect. */}
          <div
            className="absolute inset-0 flex items-center gap-2 text-paper"
            style={{ paddingLeft: ANCHOR_CENTER - 10 }}
          >
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
      )}

      {/* Hidden SVG defs only — never rendered visibly itself, just
          referenced by the filter: url(...) above. Kept mounted
          unconditionally so it's ready the instant the blob first
          appears. */}
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
