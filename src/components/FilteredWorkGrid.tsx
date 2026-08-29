"use client";

import { useMemo, useState } from "react";
import WorkGrid from "./WorkGrid";
import type { Project } from "@/content/projects/types";

type Locale = "en" | "es";

const copy: Record<Locale, { all: string }> = {
  en: { all: "All" },
  es: { all: "Todos" },
};

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
      <WorkGrid projects={filtered} locale={locale} variant="grid" />
    </div>
  );
}
