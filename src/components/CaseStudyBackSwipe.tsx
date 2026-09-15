"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Mobile only: on a case study page, swiping left to right returns to
 * the work archive. Deactivates whenever the nav drawer is open, since
 * the same gesture there closes the menu instead (see Nav's own swipe
 * handling and the `navOpen` flag it sets on the body).
 */
export default function CaseStudyBackSwipe({ workHref }: { workHref: string }) {
  const router = useRouter();

  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let tracking = false;

    function onTouchStart(e: TouchEvent) {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      tracking = true;
    }

    function onTouchEnd(e: TouchEvent) {
      if (!tracking) return;
      tracking = false;

      // The nav's own swipe-to-close owns this gesture while it's open.
      if (document.body.dataset.navOpen === "true") return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);

      if (deltaX > 60 && isHorizontal) {
        router.push(workHref);
      }
    }

    function onTouchCancel() {
      tracking = false;
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchCancel, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);
    };
  }, [router, workHref]);

  return null;
}
