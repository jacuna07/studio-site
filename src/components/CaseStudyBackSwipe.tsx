"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "./Container";
import FilteredWorkGrid from "./FilteredWorkGrid";
import IconArrowLeft from "./icons/IconArrowLeft";
import type { Project } from "@/content/projects/types";

// Fraction of the viewport width the drag has to cross before release
// commits to the navigation instead of springing back.
const COMMIT_RATIO = 0.35;
// Small deadzone (px) before a touch is confirmed as this gesture, so an
// ordinary vertical scroll or a tap never triggers it.
const DEADZONE = 10;
// How far (px) the drag has to travel for the back-arrow badge to reach
// full opacity/scale.
const ARROW_RANGE = 90;
const SPRING_MS = 280;
// How quickly the on-screen position catches up to the raw finger
// position each animation frame (0-1). Damping this, rather than
// mirroring the finger 1:1, smooths out the natural jitter of a real
// finger (including quick direction reversals) into one continuous
// motion instead of a jumpy one.
const FOLLOW = 0.28;

/**
 * Mobile only: on a case study page, dragging left to right peels the
 * current screen away like a native app's edge-swipe-back, revealing the
 * real Work archive underneath in real time, with a circular back arrow
 * fading in near the left edge as a hint. Releasing past ~35% of the
 * screen width commits to the Work archive; releasing short springs the
 * case study back into place. Deactivates while the nav drawer is open,
 * since the same gesture there closes the menu instead (see Nav's own
 * swipe handling and the `navOpen` flag it sets on the body).
 */
export default function CaseStudyBackSwipe({
  workHref,
  workTitle,
  locale = "en",
  projects,
  children,
}: {
  workHref: string;
  workTitle: string;
  locale?: "en" | "es";
  projects: Project[];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const frontRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const [previewMounted, setPreviewMounted] = useState(false);

  useEffect(() => {
    const front = frontRef.current;
    const arrow = arrowRef.current;
    if (!front || !arrow) return;

    let startX = 0;
    let startY = 0;
    let tracking = false;
    let active = false;
    // targetDelta: where the finger actually is. displayDelta: where the
    // front layer is currently drawn, easing toward targetDelta each
    // frame (see FOLLOW).
    let targetDelta = 0;
    let displayDelta = 0;
    let rafId: number | null = null;

    function setArrowProgress(progress: number) {
      if (!arrow) return;
      const clamped = Math.max(0, Math.min(1, progress));
      arrow.style.opacity = String(clamped);
      arrow.style.transform = `translateY(-50%) scale(${0.6 + clamped * 0.4})`;
    }

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
      front.style.transform = `translateX(${displayDelta}px)`;
      setArrowProgress(displayDelta / ARROW_RANGE);
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
        document.body.style.overflow = "hidden";
        setPreviewMounted(true);
        stopLoop();
        rafId = requestAnimationFrame(tick);
      }

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
        setArrowProgress(1);
        window.setTimeout(() => {
          // Unlock scroll before navigating, or the destination page
          // (which shares this same <body>) would land frozen/unscrollable.
          document.body.style.overflow = "";
          router.push(workHref);
        }, SPRING_MS);
      } else {
        front.style.transform = "translateX(0px)";
        setArrowProgress(0);
        window.setTimeout(() => {
          front.style.transition = "";
          front.style.transform = "";
          document.body.style.overflow = "";
          setPreviewMounted(false);
        }, SPRING_MS);
      }
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", settle, { passive: true });
    window.addEventListener("touchcancel", settle, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", settle);
      window.removeEventListener("touchcancel", settle);
      stopLoop();
      document.body.style.overflow = "";
    };
  }, [router, workHref]);

  return (
    <>
      {previewMounted && (
        <div className="fixed inset-0 z-30 overflow-hidden bg-ink" aria-hidden="true">
          <section className="h-full overflow-hidden py-16">
            <Container>
              <h1 className="font-display font-normal text-3xl md:text-4xl tracking-normal mb-12">
                {workTitle}
              </h1>
              <FilteredWorkGrid projects={projects} locale={locale} />
            </Container>
          </section>
        </div>
      )}

      <div
        ref={arrowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-5 top-1/2 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-cobalt text-paper opacity-0"
        style={{ transform: "translateY(-50%) scale(0.6)" }}
      >
        <IconArrowLeft className="h-7 w-7" />
      </div>

      <div ref={frontRef} className="relative z-40 bg-ink">
        {children}
      </div>
    </>
  );
}
