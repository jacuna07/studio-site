"use client";

import { useEffect, useRef, useState } from "react";

type Locale = "en" | "es";

const label: Record<Locale, string> = {
  en: "Back to top",
  es: "Volver arriba",
};

// How long with no further scroll movement before the button's own
// "returning to top" trip counts as finished — used to clear its
// pressed/blue state, and (since it's re-armed on every click) as a
// fallback for a tap that produces no scroll movement at all, e.g.
// tapping it while already at or very near the top.
const SETTLE_MS = 150;

export default function BackToTop({ locale = "en" }: { locale?: Locale }) {
  const [scrolledPast, setScrolledPast] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pressed, setPressed] = useState(false);
  const pressedRef = useRef(false);
  const settleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    pressedRef.current = pressed;
  }, [pressed]);

  useEffect(() => {
    let lastY = window.scrollY;

    function clearSettleTimer() {
      if (settleTimerRef.current !== null) {
        window.clearTimeout(settleTimerRef.current);
        settleTimerRef.current = null;
      }
    }

    function onScroll() {
      const currentY = window.scrollY;
      const goingDown = currentY > lastY;

      setScrolledPast(currentY > 400);
      setVisible(currentY < 80 ? true : !goingDown);
      lastY = currentY;

      // Only re-arm the settle timer while a click-triggered trip is
      // actually in progress, so ordinary scrolling doesn't churn a
      // timer on every scroll event for no reason.
      if (pressedRef.current) {
        clearSettleTimer();
        settleTimerRef.current = window.setTimeout(() => setPressed(false), SETTLE_MS);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearSettleTimer();
    };
  }, []);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setPressed(true);
    pressedRef.current = true;
    if (settleTimerRef.current !== null) window.clearTimeout(settleTimerRef.current);
    settleTimerRef.current = window.setTimeout(() => setPressed(false), SETTLE_MS);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Held visible/interactive for the whole return-to-top trip, even
  // once scrolling back up crosses under the normal reveal threshold
  // (currentY > 400) partway through. Without `pressed` in this OR,
  // the button used to disappear (opacity-0, pointer-events-none)
  // while the tap that triggered it was still effectively in
  // progress — a floating element vanishing out from under an
  // in-flight tap is a classic "ghost tap" setup, where the browser's
  // hit-test lands on whatever page content is newly underneath
  // instead. Keeping it in place until the trip actually settles
  // closes that gap.
  const show = (scrolledPast && visible) || pressed;

  return (
    <a
      href="#top"
      onClick={handleClick}
      aria-label={label[locale]}
      className={`fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-2xl border text-3xl transition-all duration-300 ${
        pressed
          ? "border-cobalt bg-cobalt text-paper"
          : "border-paper/20 bg-ink text-paper md:hover:border-cobalt md:hover:bg-cobalt md:hover:text-paper"
      } ${show ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      ↑
    </a>
  );
}
