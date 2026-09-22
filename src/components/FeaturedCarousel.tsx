"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import IconArrowLeft from "./icons/IconArrowLeft";
import type { Project } from "@/content/projects/types";

const copy = {
  en: { discover: "See project", seeAll: "See all projects" },
  es: { discover: "Ver proyecto", seeAll: "Ver todos los proyectos" },
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
 * Horizontal gallery for the Home page's Featured module, modeled on
 * mclaren.com's project carousel: one card at a time on mobile (with a
 * peek of the next) and several fixed-width cards on desktop, each with
 * title/summary/link underneath, plus a scroll-progress bar with prev/next
 * controls below the track. Renders at every breakpoint.
 *
 * The currently active (centered) slide auto-cycles through its own
 * hero + gallery frames, same effect as ProjectCard's image swipe on the
 * desktop grid; other slides stay on their hero image.
 *
 * The trailing slide differs by breakpoint: on mobile it's a vertically
 * scrollable "more work" panel of extra projects; on desktop it's a
 * single "See all projects" card.
 */
export default function FeaturedCarousel({
  projects,
  moreProjects = [],
  locale = "en",
}: {
  projects: Project[];
  /** Shown as a trailing "more work" panel once the visitor swipes past the last project. */
  moreProjects?: Project[];
  locale?: "en" | "es";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFrame, setActiveFrame] = useState(0);
  const t = copy[locale];
  const hasMoreSlide = moreProjects.length > 0;
  const slideCount = projects.length + (hasMoreSlide ? 1 : 0);

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
      const clamped = Math.min(Math.max(index, 0), Math.max(slideCount - 1, 0));
      setActiveIndex((prev) => (clamped === prev ? prev : clamped));
    }

    handleScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [slideCount]);

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

  const barWidth = Math.max(progress * 100, slideCount > 0 ? 100 / slideCount : 0);
  const workHref = locale === "es" ? "/es/work" : "/work";

  return (
    <div>
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
              className="group block w-[85%] md:w-[360px] shrink-0 snap-start"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-mist">
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
                        sizes="(min-width: 768px) 360px, 85vw"
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
                    sizes="(min-width: 768px) 360px, 85vw"
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

        {hasMoreSlide && (
          <div data-slide className="w-[85%] md:w-[360px] shrink-0 snap-start">
            {/* Mobile: a vertically scrollable list of extra projects. */}
            <div className="md:hidden max-h-[300px] overflow-y-auto snap-y snap-mandatory divide-y divide-mist">
              {moreProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={locale === "es" ? `/es/work/${project.slug}` : `/work/${project.slug}`}
                  className="flex items-center gap-4 py-3 first:pt-0 snap-start"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-mist">
                    <Image
                      src={project.hero.src}
                      alt={project.hero.alt}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-display text-lg leading-snug">{project.title}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone mt-1">
                      {project.industry}
                    </div>
                  </div>
                </Link>
              ))}
              <Link
                href={workHref}
                className="flex items-center gap-4 py-3 snap-start"
              >
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-mist">
                  <IconArrowLeft className="h-5 w-5 rotate-180" />
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.2em]">{t.seeAll}</div>
              </Link>
            </div>

            {/* Desktop: a single "see all projects" card, same footprint
                as the other cards' images. */}
            <Link
              href={workHref}
              className="group hidden md:flex aspect-[4/3] items-center justify-center rounded-lg bg-mist"
            >
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] md:group-hover:text-cobalt transition-colors">
                {t.seeAll}
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
        )}
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
