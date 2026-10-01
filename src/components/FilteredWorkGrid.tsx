"use client";

import { useMemo, useState } from "react";
import WorkGrid from "./WorkGrid";
import CursorRevealGrid from "./CursorRevealGrid";
import { actionBarCenteredClass } from "./ActionCard";
import type { Project } from "@/content/projects/types";

type Locale = "en" | "es";

const copy: Record<Locale, { all: string; showMore: string }> = {
  en: { all: "All", showMore: "Show more" },
  es: { all: "Todos", showMore: "Ver más" },
};

// Phones (the single column view): how many projects show at first, and
// how many more each "Show more" tap adds, so the footer's contact CTA is
// never a long scroll away.
const MOBILE_PAGE = 5;

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
  const [mobileVisible, setMobileVisible] = useState(MOBILE_PAGE);
  const t = copy[locale];

  function selectFilter(industry: string | null) {
    setActive(industry);
    setMobileVisible(MOBILE_PAGE);
  }

  const filtered = active ? projects.filter((p) => p.industry === active) : projects;

  // md: only — on mobile these are tapped, not hovered, and an
  // unguarded :hover style needs a first tap just to enter that state
  // and a second to actually select the filter.
  const pillClass = (isActive: boolean) =>
    isActive
      ? "text-paper font-bold underline underline-offset-4"
      : "text-stone md:hover:text-cobalt md:hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] transition-colors";

  return (
    <div>
      <div className="relative mb-10">
        <div
          className="scrollbar-hide flex gap-x-6 overflow-x-auto whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] sm:flex-wrap sm:gap-y-3 sm:overflow-visible sm:whitespace-normal"
          // Stop this horizontal drag from also bubbling up to Nav's
          // window-level swipe-to-open listener, same fix as the
          // featured thumbnails: without it, scrolling the pills can
          // also pop the mobile menu open or closed.
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => selectFilter(null)}
            className={`flex-shrink-0 ${pillClass(active === null)}`}
          >
            {t.all}
          </button>
          {industries.map((industry) => (
            <button
              key={industry}
              type="button"
              onClick={() => selectFilter(industry)}
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

      <CursorRevealGrid>
        <WorkGrid
          projects={filtered}
          locale={locale}
          variant="grid"
          enableHoverLoop
          mobileVisible={mobileVisible}
        />
      </CursorRevealGrid>

      {/* Phones only: the Send button's shape, as wide as the cards. */}
      {mobileVisible < filtered.length && (
        <button
          type="button"
          onClick={() => setMobileVisible((n) => n + MOBILE_PAGE)}
          className={`${actionBarCenteredClass} w-full sm:hidden`}
        >
          {t.showMore}
        </button>
      )}
    </div>
  );
}
