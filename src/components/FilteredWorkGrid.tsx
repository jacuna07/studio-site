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
      <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10 font-mono text-xs uppercase tracking-[0.2em]">
        <button type="button" onClick={() => setActive(null)} className={pillClass(active === null)}>
          {t.all}
        </button>
        {industries.map((industry) => (
          <button
            key={industry}
            type="button"
            onClick={() => setActive(industry)}
            className={pillClass(active === industry)}
          >
            {industry}
          </button>
        ))}
      </div>
      <WorkGrid projects={filtered} locale={locale} variant="grid" />
    </div>
  );
}
