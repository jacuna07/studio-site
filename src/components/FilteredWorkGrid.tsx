"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import WorkGrid from "./WorkGrid";
import type { Project } from "@/content/projects/types";

type Locale = "en" | "es";

const copy: Record<Locale, { all: string; cursorLabel: string }> = {
  en: { all: "All", cursorLabel: "\u{1F440}" },
  es: { all: "Todos", cursorLabel: "\u{1F440}" },
};

// How long the cursor bubble's own grow-in transition takes (see the
// "transition-all duration-300" on the bubble below). It starts blue and
// flips to black once it has finished expanding to full size, then stays
// black until it shrinks away on mouse-out.
const GROW_MS = 300;

export default function FilteredWorkGrid({
  projects,
  locale = "en",
}: {
  projects: Project[];
  locale?: Locale;
}) {
  const industries = useMemo(() => {
    const set = new Set(projects.map((p) => p.industry));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const [active, setActive] = useState<string | null>(null);
  const t = copy[locale];

  const filtered = active ? projects.filter((p) => p.industry === active) : projects;

  const pillClass = (isActive: boolean) =>
    isActive
      ? "text-paper font-bold underline underline-offset-4"
      : "text-stone hover:text-cobalt hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] transition-colors";

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

  function handleGridMouseOver(e: React.MouseEvent) {
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

  function handleGridMouseOut(e: React.MouseEvent) {
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
    <div>
      <div className="relative mb-10">
        <div className="scrollbar-hide flex gap-x-6 overflow-x-auto whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] sm:flex-wrap sm:gap-y-3 sm:overflow-visible sm:whitespace-normal">
          <button
            type="button"
            onClick={() => setActive(null)}
            className={`flex-shrink-0 ${pillClass(active === null)}`}
          >
            {t.all}
          </button>
          {industries.map((industry) => (
            <button
              key={industry}
              type="button"
              onClick={() => setActive(industry)}
              className={`flex-shrink-0 ${pillClass(active === industry)}`}
            >
              {industry}
            </button>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-ink to-transparent sm:hidden"
        />
      </div>

      <div
        onMouseOver={handleGridMouseOver}
        onMouseOut={handleGridMouseOut}
        className="[&_a]:cursor-none"
      >
        <WorkGrid projects={filtered} locale={locale} variant="grid" />
      </div>

      <div
        ref={cursorPosRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden md:block"
      >
        <div
          className={`flex items-center justify-center rounded-full text-center transition-all duration-300 ease-out ${
            cursorActive
              ? `h-28 w-28 text-4xl opacity-100 ${
                  cursorInverted ? "bg-ink" : "bg-cobalt"
                }`
              : "h-0 w-0 bg-cobalt text-4xl opacity-0"
          }`}
        >
          {t.cursorLabel}
        </div>
      </div>
    </div>
  );
}
