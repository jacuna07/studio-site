"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import IconArrowLeft from "./icons/IconArrowLeft";
import type { Project } from "@/content/projects/types";

const copy = {
  en: { discover: "See project" },
  es: { discover: "Ver proyecto" },
};

// How often the active slide's image cycles to its next frame — matches
// ProjectCard's own auto-cycle interval on the desktop grid.
const CYCLE_MS = 1500;

function getFrames(project: Project) {
  return [
    {
      src: project.hero.src,
      alt: project.hero.alt,
      type: "image" as const,
      poster: undefined as string | undefined,
    },
    ...project.gallery.map((img) => ({
      src: img.src,
      alt: img.alt,
      type: img.type ?? "image",
      poster: img.poster,
    })),
  ];
}

/**
 * Mobile-only horizontal gallery for the Home page's Featured module,
 * modeled on mclaren.com's project carousel: one card at a time (with a
 * peek of the next), title/summary/link underneath, and a scroll-progress
 * bar with prev/next controls below that. Desktop keeps the existing
 * WorkGrid layout — this never renders past the md breakpoint.
 *
 * The currently active (centered) slide auto-cycles through its own
 * hero + gallery frames, same effect as ProjectCard's image swipe on the
 * desktop grid; other slides stay on their hero image.
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFrame, setActiveFrame] = useState(0);
  const t = copy[locale];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    function handleScroll() {
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);

      const card = el.querySelector<HTMLElement>("[data-slide]");
      const gap = 16;
      const step = card ? card.getBoundingClientRect().width + gap : el.clientWidth;
      const index = step > 0 ? Math.round(el.scrollLeft / step) : 0;
      const clamped = Math.min(Math.max(index, 0), Math.max(projects.length - 1, 0));
      setActiveIndex((prev) => (clamped === prev ? prev : clamped));
    }

    handleScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [projects.length]);

  // Restarts the active card's frame cycle from its hero image whenever a
  // new slide becomes active.
  useEffect(() => {
    setActiveFrame(0);
    const project = projects[activeIndex];
    if (!project) return;
    const frameCount = getFrames(project).length;
    if (frameCount < 2) return;
    const id = window.setInterval(() => {
      setActiveFrame((f) => (f + 1) % frameCount);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [activeIndex, projects]);

  function scrollByCard(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    const gap = 16;
    const amount = card ? card.getBoundingClientRect().width + gap : el.clientWidth * 0.85;
    el.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  // Keeps the horizontal drag that scrolls this carousel from also being
  // read by Nav's window-level swipe-to-open listener — same fix
  // ProjectCard already uses for its own image-swipe gesture.
  function handleTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 1) e.stopPropagation();
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (e.changedTouches.length === 1) e.stopPropagation();
  }

  const barWidth = Math.max(progress * 100, projects.length > 0 ? 100 / projects.length : 0);

  return (
    <div className="md:hidden">
      <div
        ref={trackRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        // Bleeds only on the right, so slides can scroll past the edge
        // for the "peek" effect while the left edge stays exactly where
        // Container's own padding already sits, matching the rest of the
        // page's copy — no negative margin on the left to get wrong.
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mr-6 pr-6"
      >
        {projects.map((project, i) => {
          const isActive = i === activeIndex;
          const frames = isActive ? getFrames(project) : null;

          return (
            <Link
              key={project.slug}
              href={locale === "es" ? `/es/work/${project.slug}` : `/work/${project.slug}`}
              data-slide
              className="group block w-[85%] shrink-0 snap-start"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                {frames ? (
                  frames.map((f, fi) =>
                    f.type === "video" ? (
                      <video
                        key={f.src}
                        src={f.src}
                        poster={f.poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-label={f.alt}
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
                          fi === activeFrame ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    ) : (
                      <Image
                        key={f.src}
                        src={f.src}
                        alt={f.alt}
                        fill
                        sizes="85vw"
                        priority={i === 0 && fi === 0}
                        className={`object-cover transition-opacity duration-500 ease-out ${
                          fi === activeFrame ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    )
                  )
                ) : (
                  <Image
                    src={project.hero.src}
                    alt={project.hero.alt}
                    fill
                    sizes="85vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="font-display text-2xl leading-snug mt-5">{project.title}</div>
              <p className="text-stone mt-3">{project.summary}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
                {t.discover}
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 flex items-center gap-6">
        <div className="h-[2px] flex-1 bg-mist">
          <div
            className="h-full bg-cobalt transition-[width] duration-150 ease-out"
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
