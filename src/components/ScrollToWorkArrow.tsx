"use client";

import { useEffect, useRef, useState } from "react";

// Same "settle" idea as BackToTop: once there's no further scroll
// movement for this long, the tap's own scroll (native anchor jump,
// smoothed by the global `scroll-behavior: smooth`) counts as
// finished and the arrow's pressed/blue state clears. Also serves as
// the fallback for a tap that produces no scroll at all, e.g. tapping
// it while the Work section is already in view.
const SETTLE_MS = 150;

export default function ScrollToWorkArrow({ label }: { label: string }) {
  const [pressed, setPressed] = useState(false);
  const settleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!pressed) return;

    function clearSettleTimer() {
      if (settleTimerRef.current !== null) {
        window.clearTimeout(settleTimerRef.current);
        settleTimerRef.current = null;
      }
    }

    function onScroll() {
      clearSettleTimer();
      settleTimerRef.current = window.setTimeout(() => setPressed(false), SETTLE_MS);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    // Seeds the same timer immediately, so a tap that never actually
    // scrolls still clears itself instead of staying blue forever.
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearSettleTimer();
    };
  }, [pressed]);

  return (
    <a
      href="#work"
      aria-label={label}
      onClick={() => setPressed(true)}
      className={`text-6xl md:text-7xl transition-colors ${
        pressed ? "text-cobalt" : "text-stone md:hover:text-cobalt"
      }`}
    >
      ↓
    </a>
  );
}
