"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import IconArrowLeft from "./icons/IconArrowLeft";

// Fraction of the viewport width the drag has to cross before release
// commits to the navigation instead of springing back.
const COMMIT_RATIO = 0.35;
// Small deadzone (px) before a touch is confirmed as this gesture, so an
// ordinary vertical scroll or a tap never triggers it.
const DEADZONE = 10;
const SPRING_MS = 280;
// How quickly the on-screen position catches up to the raw finger
// position each animation frame (0-1). Damping this, rather than
// mirroring the finger 1:1, smooths out the natural jitter of a real
// finger (including quick direction reversals) into one continuous
// motion instead of a jumpy one.
const FOLLOW = 0.28;

/**
 * Mobile only: on a case study page, dragging left to right peels the
 * current screen away like a native app's edge-swipe-back, revealing a
 * solid "back to Work" card underneath in real time. Releasing past
 * ~35% of the screen width commits to the Work archive; releasing short
 * springs the case study back into place. The drag is clamped so the
 * screen can never travel past its resting position, however hard or
 * fast the touch moves, so the blue card never shows on the wrong edge.
 * Deactivates while the nav drawer is open, since the same gesture
 * there closes the menu instead (see Nav's own swipe handling and the
 * `navOpen` flag it sets on the body).
 */
export default function CaseStudyBackSwipe({
  workHref,
  workTitle,
  children,
}: {
  workHref: string;
  workTitle: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const frontRef = useRef<HTMLDivElement | null>(null);
  const [previewMounted, setPreviewMounted] = useState(false);

  // One time, shortly after a case study loads on a touch device: a
  // subtle double nudge with a bounce, hinting that the page can be
  // swiped away to reveal Work. The blue "Work" card shows behind it
  // too, same as a real drag, so the nudge doesn't just look like a
  // glitch. Any real touch on the page cancels it outright (whether or
  // not it turns into the actual gesture), so it can never start, or
  // keep playing, at the same time as a real swipe.
  useEffect(() => {
    const front = frontRef.current;
    if (!front) return;
    if (typeof window === "undefined" || !window.matchMedia("(pointer: coarse)").matches) return;

    let cancelled = false;

    const timer = window.setTimeout(() => {
      if (cancelled) return;
      setPreviewMounted(true);
      front?.classList.add("animate-swipe-hint");
    }, 700);

    function clearHint() {
      front?.classList.remove("animate-swipe-hint");
      setPreviewMounted(false);
    }

    function cancelHint() {
      if (cancelled) return;
      cancelled = true;
      window.clearTimeout(timer);
      clearHint();
    }

    front.addEventListener("animationend", clearHint);
    window.addEventListener("touchstart", cancelHint, { passive: true });

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      front.removeEventListener("animationend", clearHint);
      window.removeEventListener("touchstart", cancelHint);
    };
  }, []);

  useEffect(() => {
    const front = frontRef.current;
    if (!front) return;

    let startX = 0;
    let startY = 0;
    let tracking = false;
    let active = false;
    // targetDelta: where the finger actually is (clamped to >= 0, so it
    // can never sit left of the resting position). displayDelta: where
    // the front layer is currently drawn, easing toward targetDelta each
    // frame (see FOLLOW).
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
      if (!front) return;
      displayDelta += (targetDelta - displayDelta) * FOLLOW;
      if (Math.abs(targetDelta - displayDelta) < 0.5) displayDelta = targetDelta;
      // Belt and suspenders: never let the drawn position dip below 0,
      // whatever the easing math above works out to.
      const clamped = Math.max(0, displayDelta);
      front.style.transform = `translateX(${clamped}px)`;
      rafId = requestAnimationFrame(tick);
    }

    function onTouchStart(e: TouchEvent) {
      if (e.touches.length !== 1) return;
      if (document.body.dataset.navOpen === "true") return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      tracking = true;
      active = false;
      targetDelta = 0;
    }

    function onTouchMove(e: TouchEvent) {
      if (!tracking || !front) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;

      if (!active) {
        if (Math.abs(deltaX) < DEADZONE && Math.abs(deltaY) < DEADZONE) return;
        const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
        if (!isHorizontal || deltaX <= 0) {
          // A vertical scroll or a leftward move: not this gesture, let
          // the browser handle it normally (e.g. ordinary scrolling).
          tracking = false;
          return;
        }
        active = true;
        displayDelta = 0;
        front.style.transition = "none";
        setPreviewMounted(true);
        stopLoop();
        rafId = requestAnimationFrame(tick);
      }

      // Now that this touch is confirmed as our gesture, stop the page
      // itself from scrolling. This is deliberately NOT done by toggling
      // body overflow: that can make a mobile browser briefly resize its
      // visible viewport (the address bar area), which nudges anything
      // pinned to the top/bottom edge, like the nav bar and the back-to-
      // top button. Calling preventDefault on the touch avoids that
      // entirely, since it never touches layout.
      e.preventDefault();
      // Clamped to >= 0: the finger can never drag the screen past its
      // resting position, so the reveal can only ever show on the left.
      targetDelta = Math.max(0, deltaX);
    }

    function settle() {
      if (!active || !front) {
        tracking = false;
        return;
      }
      tracking = false;
      active = false;
      stopLoop();

      const vw = window.innerWidth;
      const shouldCommit = targetDelta > vw * COMMIT_RATIO;

      front.style.transition = `transform ${SPRING_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;

      if (shouldCommit) {
        front.style.transform = `translateX(${vw}px)`;
        window.setTimeout(() => {
          router.push(workHref);
        }, SPRING_MS);
      } else {
        front.style.transform = "translateX(0px)";
        window.setTimeout(() => {
          front.style.transition = "";
          front.style.transform = "";
          setPreviewMounted(false);
        }, SPRING_MS);
      }
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    // Not passive: engaging the gesture calls preventDefault above, to
    // lock page scroll for the rest of the touch without touching layout.
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
      {previewMounted && (
        <div
          // top-20 (matches Nav's h-20 header) instead of inset-0: keeps
          // this blue reveal from showing through the semi-transparent
          // header bar. The strip directly behind the header stays the
          // page's own dark background instead, matching the header's
          // usual blurred-dark look.
          className="fixed inset-x-0 bottom-0 top-20 z-30 flex items-center bg-cobalt text-paper"
          aria-hidden="true"
        >
          <div className="flex items-center gap-3 pl-6">
            <IconArrowLeft className="h-8 w-8 shrink-0" />
            <span className="font-display text-2xl md:text-3xl font-normal">{workTitle}</span>
          </div>
        </div>
      )}

      <div
        ref={frontRef}
        // touch-pan-y + overscroll-x-none: tell the browser never to take
        // over horizontal touches on this content itself (no native pan
        // or overscroll glow), since we handle horizontal drags entirely
        // in JS above. Vertical scrolling is untouched.
        className="relative z-40 touch-pan-y overscroll-x-none bg-ink"
      >
        {children}
      </div>
    </>
  );
}
