"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// How long the cursor bubble's own grow-in transition takes (see the
// "transition-all duration-300" on the bubble below). It starts blue and
// flips to black once it has finished expanding to full size, then stays
// black until it shrinks away on mouse-out.
const GROW_MS = 300;

/**
 * Wraps a grid of project cards with a custom circular cursor that grows to
 * reveal a small emoji on hover, in place of the native pointer. Scope this
 * to just the grid you want the effect on — it hides the native cursor only
 * over <a> descendants inside it via `[&_a]:cursor-none`.
 */
export default function CursorRevealGrid({ children }: { children: ReactNode }) {
  const cursorPosRef = useRef<HTMLDivElement>(null);
  const fineHoverRef = useRef(false);
  const invertTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [cursorActive, setCursorActive] = useState(false);
  const [cursorInverted, setCursorInverted] = useState(false);

  useEffect(() => {
    fineHoverRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      const el = cursorPosRef.current;
      if (el) {
        el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  function handleMouseOver(e: React.MouseEvent) {
    if (!fineHoverRef.current) return;
    const card = (e.target as HTMLElement).closest("a");
    if (card && card.dataset.cursorEntered !== "1") {
      card.dataset.cursorEntered = "1";
      setCursorActive(true);
      setCursorInverted(false);
      if (invertTimerRef.current) clearTimeout(invertTimerRef.current);
      invertTimerRef.current = setTimeout(() => setCursorInverted(true), GROW_MS);
    }
  }

  function handleMouseOut(e: React.MouseEvent) {
    if (!fineHoverRef.current) return;
    const card = (e.target as HTMLElement).closest("a");
    if (!card) return;
    const related = e.relatedTarget as HTMLElement | null;
    if (!related || !card.contains(related)) {
      delete card.dataset.cursorEntered;
      setCursorActive(false);
      setCursorInverted(false);
      if (invertTimerRef.current) clearTimeout(invertTimerRef.current);
    }
  }

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="[&_a]:cursor-none">
      {children}

      <div
        ref={cursorPosRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden md:block"
      >
        <div
          className={`flex items-center justify-center rounded-full text-center transition-all duration-300 ease-out ${
            cursorActive
              ? `h-28 w-28 text-4xl opacity-100 ${cursorInverted ? "bg-ink" : "bg-cobalt"}`
              : "h-0 w-0 bg-cobalt text-4xl opacity-0"
          }`}
        >
          {"\u{1F440}"}
        </div>
      </div>
    </div>
  );
}
