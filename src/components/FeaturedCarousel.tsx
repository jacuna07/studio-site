"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import IconArrowLeft from "./icons/IconArrowLeft";
import type { Project } from "@/content/projects/types";

const copy = {
  en: { discover: "Discover now" },
  es: { discover: "Descubrir ahora" },
};

/**
 * Mobile-only horizontal gallery for the Home page's Featured module,
 * modeled on mclaren.com's project carousel: one card at a time (with a
 * peek of the next), title/summary/link underneath, and a scroll-progress
 * bar with prev/next controls below that. Desktop keeps the existing
 * WorkGrid layout — this never renders past the md breakpoint.
 */
export default function FeaturedCarousel({
  projects,
  locale = "en",
}: {
  projects: Project[];
  locale?: "en" | "es";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const t = copy[locale];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    function handleScroll() {
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    }

    handleScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollByCard(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    const gap = 16;
    const amount = card ? card.getBoundingClientRect().width + gap : el.clientWidth * 0.85;
    el.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  // Keeps a minimum sliver visible at rest (slide 1 of N) instead of a
  // literal 0% bar before the visitor has scrolled at all.
  const barWidth = Math.max(progress * 100, projects.length > 0 ? 100 / projects.length : 0);

  return (
    <div className="md:hidden">
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6"
      >
        {projects.map((project, i) => (
          <Link
            key={project.slug}
            href={locale === "es" ? `/es/work/${project.slug}` : `/work/${project.slug}`}
            data-slide
            className="group block w-[85%] shrink-0 snap-start"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-mist">
              <Image
                src={project.hero.src}
                alt={project.hero.alt}
                fill
                sizes="85vw"
                priority={i === 0}
                className="object-cover"
              />
            </div>
            <div className="font-display text-2xl leading-snug mt-5">{project.title}</div>
            <p className="text-stone mt-3">{project.summary}</p>
            <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
              {t.discover}
              <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-6">
        <div className="h-[2px] flex-1 bg-mist">
          <div
            className="h-full bg-paper transition-[width] duration-150 ease-out"
            style={{ width: `${barWidth}%` }}
          />
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            aria-label={locale === "es" ? "Proyecto anterior" : "Previous project"}
            onClick={() => scrollByCard(-1)}
            className="flex h-10 w-10 items-center justify-center"
          >
            <IconArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={locale === "es" ? "Siguiente proyecto" : "Next project"}
            onClick={() => scrollByCard(1)}
            className="flex h-10 w-10 items-center justify-center"
          >
            <IconArrowLeft className="h-4 w-4 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
