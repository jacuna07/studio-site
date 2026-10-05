"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import IconArrowLeft from "./icons/IconArrowLeft";
import { useCursorPreview } from "./useCursorPreview";
import { COVER_CYCLE_MS } from "./CoverPreviewLink";
import { HomeCarouselInPlace } from "./HomeSecondModule";
import type { Project } from "@/content/projects/types";

const copy = {
  en: { discover: "See project", seeAll: "See all projects" },
  es: { discover: "Ver proyecto", seeAll: "Ver todos los proyectos" },
};

// How often the active slide's image cycles to its next frame — matches
// ProjectCard's own auto-cycle interval on the desktop grid.
const CYCLE_MS = 1500;
// Home, desktop: the slow drift once the carousel is in place (px per
// second), and how long it waits after the visitor moves it themselves.
const DRIFT_PX_PER_S = 24;
const DRIFT_RESUME_MS = 2500;

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
 * The active slides auto-cycle through their own hero + gallery frames,
 * same effect as ProjectCard's image swipe on the desktop grid; other
 * slides stay on their hero image. Phones: the one card in front, and
 * a card that swipes into place moves on to its next image straight
 * away instead of waiting a full cycle. Desktop: the two cards fully in
 * view (the first two positions), each on its own cycle.
 *
 * `variant="home"` (the Home page):
 * - Plays only once it's in place (HomeCarouselInPlace, from
 *   HomeSecondModule: it has come in and is on screen). Then images start
 *   cycling straight away, and on desktop the whole strip drifts slowly
 *   sideways on its own (turning back at either end), pausing while
 *   hovered, dragged or scrolled by the visitor.
 * - Desktop only, and it needs a full-width ancestor that's a size
 *   container (Home's Featured section): full bleed (the track runs edge
 *   to edge of the screen, first card at the very left), no snapping to
 *   cards, cards 2px apart, no progress bar (mouse users can click and
 *   drag the track instead), and the project's name and industry come up
 *   in a cobalt band on hover, with a slight zoom, like the Work page.
 *   Wrap it in CursorRevealGrid for the 👀 cursor; the "See all
 *   projects" card opts out of it.
 * Phones keep their titles, summaries and progress bar. The in-progress
 * pages (default variant) are unchanged.
 *
 * The trailing slide differs by breakpoint: on mobile it's a vertically
 * scrollable "more work" panel of extra projects (just the "See all
 * projects" row when `moreProjects` is empty); on desktop it's a single
 * "See all projects" card. It's always there, so every carousel ends
 * with a way through to the full Work page.
 */
export default function FeaturedCarousel({
  projects,
  moreProjects = [],
  previewCovers = [],
  locale = "en",
  variant = "default",
}: {
  projects: Project[];
  /** Shown as a trailing "more work" panel once the visitor swipes past the last project. */
  moreProjects?: Project[];
  /**
   * Covers to flick through, in a random order, in a small preview that
   * follows the cursor over the desktop "See all projects" card. No
   * preview when empty.
   */
  previewCovers?: { src: string }[];
  locale?: "en" | "es";
  variant?: "default" | "home";
}) {
  const isHome = variant === "home";
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  // Current frame of each animating card, by slide index.
  const [frameBySlide, setFrameBySlide] = useState<Record<number, number>>({});
  const [isDesktop, setIsDesktop] = useState(false);
  const firstActivationRef = useRef(true);
  const rootRef = useRef<HTMLDivElement>(null);
  // Home: whether the carousel has come in and is on screen (it only
  // plays then). Outside HomeSecondModule it always counts as in place.
  const homeInPlace = useContext(HomeCarouselInPlace);
  const inPlace = !isHome || homeInPlace !== false;
  const hoveredRef = useRef(false);
  const resumeAtRef = useRef(0);
  const wasRunningRef = useRef(false);
  // Home, desktop: click and drag the track with a mouse.
  const dragRef = useRef<{ x: number; left: number; moved: boolean; id: number } | null>(null);
  const suppressClickRef = useRef(false);
  const [scrubbing, setScrubbing] = useState(false);
  const scrubbingRef = useRef(false); // same flag, readable mid-gesture
  const snapTimerRef = useRef<number | undefined>(undefined);
  const t = copy[locale];
  // +1 for the trailing "more work" / "See all projects" slide.
  const slideCount = projects.length + 1;
  // The card sits at the right end of the track, so the preview goes to
  // the left of the cursor.
  const seeAllPreview = useCursorPreview({
    images: previewCovers,
    side: "left",
    cycleMs: COVER_CYCLE_MS,
  });

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    function handleScroll() {
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);

      const card = el.querySelector<HTMLElement>("[data-slide]");
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      const step = card ? card.getBoundingClientRect().width + gap : el.clientWidth;
      const index = step > 0 ? Math.round(el.scrollLeft / step) : 0;
      const clamped = Math.min(Math.max(index, 0), Math.max(slideCount - 1, 0));
      setActiveIndex((prev) => (clamped === prev ? prev : clamped));
    }

    handleScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [slideCount]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // How many cards animate at once: the first two positions on desktop
  // (both fully in view), the front card on phones.
  const activeCount = isDesktop ? 2 : 1;
  const activeSlides = useMemo(() => {
    const list: number[] = [];
    const end = Math.min(activeIndex + activeCount, projects.length);
    for (let i = activeIndex; i < end; i++) list.push(i);
    return list;
  }, [activeIndex, activeCount, projects.length]);

  // Cycles every active card through its frames. A card that stays
  // active keeps its place in its cycle; a card that just became active
  // starts from its hero image, except on phones, where it moves on to
  // its next image right away (no wait). The very first card on page
  // load always starts from its hero.
  useEffect(() => {
    // Home: nothing cycles until the carousel is in place; then every
    // active card moves on to its next image straight away.
    const running = !isHome || inPlace;
    const justStarted = running && !wasRunningRef.current;
    wasRunningRef.current = running;
    if (!running) {
      setFrameBySlide({});
      return;
    }
    const counts = activeSlides.map((i) => getFrames(projects[i]).length);
    const immediate = (isHome && justStarted) || (!isDesktop && !firstActivationRef.current);
    firstActivationRef.current = false;
    setFrameBySlide((prev) => {
      const next: Record<number, number> = {};
      activeSlides.forEach((slide, k) => {
        next[slide] = slide in prev ? prev[slide] : immediate && counts[k] > 1 ? 1 : 0;
      });
      return next;
    });
    if (!counts.some((c) => c > 1)) return;
    const id = window.setInterval(() => {
      setFrameBySlide((prev) => {
        const next: Record<number, number> = {};
        activeSlides.forEach((slide, k) => {
          next[slide] = ((prev[slide] ?? 0) + 1) % counts[k];
        });
        return next;
      });
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [activeSlides, isDesktop, projects, isHome, inPlace]);

  function scrollByCard(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const amount = card ? card.getBoundingClientRect().width + gap : el.clientWidth * 0.85;
    el.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  // Desktop only: press anywhere on the progress bar and drag to scrub
  // through the carousel. The fill follows the cursor (pointer position
  // across the bar = scroll position across the track); on release it
  // glides to the nearest card. Snapping is paused while scrubbing, since
  // mandatory snapping would otherwise yank every step back to a card.
  function scrubTo(e: React.PointerEvent<HTMLDivElement>) {
    const el = trackRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    el.scrollLeft = ratio * (el.scrollWidth - el.clientWidth);
  }

  function handleBarPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const el = trackRef.current;
    if (!el || e.pointerType !== "mouse" || e.button !== 0) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    e.preventDefault(); // no text selection while dragging
    e.currentTarget.setPointerCapture(e.pointerId);
    window.clearTimeout(snapTimerRef.current);
    el.style.scrollSnapType = "none";
    document.body.style.cursor = "grabbing";
    scrubbingRef.current = true;
    setScrubbing(true);
    scrubTo(e);
  }

  function handleBarPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (scrubbingRef.current) scrubTo(e);
  }

  function handleBarPointerUp() {
    const el = trackRef.current;
    if (!scrubbingRef.current || !el) return;
    scrubbingRef.current = false;
    setScrubbing(false);
    document.body.style.cursor = "";
    glideToNearest(el);
  }

  // Home, desktop: with no progress bar, a mouse can click and drag the
  // track itself. A real drag (past 6px) moves the cards and then glides
  // to the nearest one; a plain click still opens the project.
  function handleTrackPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const el = trackRef.current;
    if (!isHome || !el || e.pointerType !== "mouse" || e.button !== 0) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    dragRef.current = { x: e.clientX, left: el.scrollLeft, moved: false, id: e.pointerId };
  }

  function handleTrackPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const d = dragRef.current;
    const el = trackRef.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    if (!d.moved) {
      if (Math.abs(dx) < 6) return;
      d.moved = true;
      el.setPointerCapture(d.id);
    }
    el.scrollLeft = d.left - dx;
    resumeAtRef.current = performance.now() + DRIFT_RESUME_MS;
  }

  // The strip stays wherever it's let go (no snapping to a card).
  function handleTrackPointerUp() {
    const d = dragRef.current;
    dragRef.current = null;
    if (!d?.moved) return;
    suppressClickRef.current = true;
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 50);
    resumeAtRef.current = performance.now() + DRIFT_RESUME_MS;
  }

  // Home, desktop: the slow drift. Moves by its own running position (so
  // sub-pixel steps add up), turns back at either end, and pauses while
  // the strip is hovered or dragged, or for a moment after the visitor
  // scrolls it themselves.
  useEffect(() => {
    if (!isHome || !inPlace || !isDesktop) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = trackRef.current;
    if (!el) return;
    let frame = 0;
    let last = 0;
    let pos = el.scrollLeft;
    let dir = 1;
    function step(now: number) {
      if (!el) return;
      const dt = last ? Math.min(now - last, 64) : 0;
      last = now;
      // The visitor moved it (trackpad, drag): pick up from there.
      if (Math.abs(el.scrollLeft - Math.round(pos)) > 2) {
        pos = el.scrollLeft;
        resumeAtRef.current = Math.max(resumeAtRef.current, now + DRIFT_RESUME_MS);
      }
      const paused = hoveredRef.current || dragRef.current !== null || now < resumeAtRef.current;
      if (!paused) {
        const max = el.scrollWidth - el.clientWidth;
        pos += (dir * DRIFT_PX_PER_S * dt) / 1000;
        if (pos >= max) {
          pos = max;
          dir = -1;
        } else if (pos <= 0) {
          pos = 0;
          dir = 1;
        }
        el.scrollLeft = pos;
      }
      frame = window.requestAnimationFrame(step);
    }
    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [isHome, inPlace, isDesktop]);

  // Glide to whichever card's snap position is closest, then hand control
  // back to CSS snapping once the glide is done.
  function glideToNearest(el: HTMLDivElement) {
    const max = el.scrollWidth - el.clientWidth;
    // Where snapped cards line up (the page margin on the home variant).
    const trackLeft =
      el.getBoundingClientRect().left + (parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0);
    let target = el.scrollLeft;
    let best = Infinity;
    el.querySelectorAll<HTMLElement>("[data-slide]").forEach((slide) => {
      const left = Math.min(
        Math.max(el.scrollLeft + slide.getBoundingClientRect().left - trackLeft, 0),
        max
      );
      const distance = Math.abs(left - el.scrollLeft);
      if (distance < best) {
        best = distance;
        target = left;
      }
    });
    el.scrollTo({ left: target, behavior: "smooth" });
    snapTimerRef.current = window.setTimeout(() => {
      el.style.scrollSnapType = "";
    }, 500);
  }

  useEffect(() => () => window.clearTimeout(snapTimerRef.current), []);

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
    <div ref={rootRef}>
      <div
        ref={trackRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onPointerDown={handleTrackPointerDown}
        onPointerMove={handleTrackPointerMove}
        onPointerUp={handleTrackPointerUp}
        onPointerCancel={handleTrackPointerUp}
        onClickCapture={(e) => {
          if (suppressClickRef.current) {
            e.preventDefault();
            e.stopPropagation();
            suppressClickRef.current = false;
          }
        }}
        onDragStart={(e) => {
          if (isHome) e.preventDefault();
        }}
        onMouseEnter={() => {
          hoveredRef.current = true;
        }}
        onMouseLeave={() => {
          hoveredRef.current = false;
        }}
        // Bleeds only on the right (by exactly the Container's padding), so
        // the peeking slide runs to the edge of the screen while the left
        // edge stays where Container's own padding already sits, matching
        // the rest of the page's copy. Mobile unchanged.
        //
        // overflow-y-hidden + pb-2: with overflow-x set, browsers make the
        // track scrollable vertically too, and the "See project" hover
        // underline poked ~1px out of its bottom. That sliver of vertical
        // scroll was enough for a Mac trackpad to lock a scroll gesture
        // onto the track when it started over a card, so the page stopped
        // scrolling. Now the track can't scroll vertically at all (vertical
        // gestures always go to the page), and pb-2 leaves room for the
        // underline so it isn't clipped.
        //
        // Home variant, desktop: full bleed. The negative margins pull the
        // track out of the page grid on both sides, so it runs edge to
        // edge with the first card at the very left; no snapping. cqw is
        // the Home section's width (it's a size container), so a
        // permanent scrollbar doesn't throw it off the way vw would.
        className={`flex gap-4 overflow-x-auto overflow-y-hidden pb-2 snap-x snap-mandatory scrollbar-hide -mr-6 pr-6 ${
          isHome ? "md:snap-none md:gap-0.5 md:mx-[calc(50%-50cqw)] md:px-0" : "md:-mr-8 md:pr-8"
        }`}
      >
        {projects.map((project, i) => {
          // Frames are loaded for the active cards and the next one in
          // line, so a card's images are ready by the time it animates.
          const isLoaded = i >= activeIndex && i <= activeIndex + activeCount;
          const frames = isLoaded ? getFrames(project) : null;
          const shownFrame = frameBySlide[i] ?? 0;

          return (
            <Link
              key={project.slug}
              href={locale === "es" ? `/es/work/${project.slug}` : `/work/${project.slug}`}
              data-slide
              className={`group block w-[85%] shrink-0 snap-start ${
                isHome ? "md:w-[calc((100%-4px)/2.2)]" : "md:w-[calc((100%-2rem)/2.2)]"
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg md:rounded-none bg-mist">
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
                        className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-500 ease-out ${isHome ? "md:group-hover:scale-105" : ""} ${
                          fi === shownFrame ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    ) : (
                      <Image
                        key={f.src}
                        src={f.src}
                        alt={f.alt}
                        fill
                        sizes="(min-width: 768px) 45vw, 85vw"
                        priority={i === 0 && fi === 0}
                        className={`object-cover transition-[opacity,transform] duration-500 ease-out ${isHome ? "md:group-hover:scale-105" : ""} ${
                          fi === shownFrame ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    )
                  )
                ) : (
                  <Image
                    src={project.hero.src}
                    alt={project.hero.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 85vw"
                    className={`object-cover transition-transform duration-500 ease-out ${
                      isHome ? "md:group-hover:scale-105" : ""
                    }`}
                  />
                )}
                {/* Home, desktop: name and industry come up in a cobalt
                    band on hover, the same as the Work page's cards. */}
                {isHome && (
                  <div className="absolute inset-x-0 bottom-0 hidden overflow-hidden md:block">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 origin-bottom scale-y-0 bg-cobalt transition-transform duration-500 ease-out md:group-hover:scale-y-100"
                    />
                    <div className="relative z-10 px-8 py-5 opacity-0 transition-opacity delay-100 duration-300 md:group-hover:opacity-100">
                      <div className="font-display text-2xl md:text-3xl font-medium text-paper">
                        {project.title}
                      </div>
                      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper">
                        {project.industry}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className={`font-display text-2xl leading-snug mt-5 ${isHome ? "md:hidden" : ""}`}>
                {project.title}
              </div>
              <p className={`text-stone mt-3 ${isHome ? "md:hidden" : ""}`}>{project.summary}</p>
              <span
                className={`relative inline-block mt-5 font-mono text-xs uppercase tracking-[0.2em] md:group-hover:text-cobalt transition-colors ${
                  isHome ? "md:hidden" : ""
                }`}
              >
                {t.discover}
                <span
                  aria-hidden="true"
                  className="absolute left-0 -bottom-1 h-[2px] w-0 bg-current transition-all duration-300 ease-out md:group-hover:w-full"
                />
              </span>
            </Link>
          );
        })}

        <div
          data-slide
          className={`w-[85%] shrink-0 snap-start ${
            isHome ? "md:w-[calc((100%-4px)/2.2)]" : "md:w-[calc((100%-2rem)/2.2)]"
          }`}
        >
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
              // first:pt-0 keeps it top-aligned with the other cards when
              // it's the only row (no moreProjects passed in).
              className="flex items-center gap-4 py-3 first:pt-0 snap-start"
            >
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-mist">
                <IconArrowLeft className="h-5 w-5 rotate-180" />
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.2em]">{t.seeAll}</div>
            </Link>
          </div>

          {/* Desktop: a single "see all projects" card, same footprint
              as the other cards' images. On hover it turns cobalt and a
              small preview flicks through random project covers next to
              the cursor. */}
          <Link
            href={workHref}
            data-cursor-reveal-skip
            {...(previewCovers.length > 0 ? seeAllPreview.handlers : {})}
            className="group hidden md:flex aspect-[4/3] items-center justify-center bg-mist md:hover:bg-cobalt transition-colors"
          >
            <span className="font-mono text-2xl uppercase tracking-[0.2em] md:group-hover:text-paper transition-colors">
              {t.seeAll}
            </span>
          </Link>
          {previewCovers.length > 0 && seeAllPreview.preview}
        </div>
      </div>

      {/* mt-6 + the track's pb-2 = the same 32px gap as before. Not on
          the Home page's desktop (drag the track instead). */}
      <div className={`mt-6 flex items-center gap-6 ${isHome ? "md:hidden" : ""}`}>
        {/* The padding gives the 2px bar a comfortable grab area; the
            negative margin cancels it out of the layout. Dragging only
            kicks in for a mouse on desktop (see handleBarPointerDown). */}
        <div
          onPointerDown={handleBarPointerDown}
          onPointerMove={handleBarPointerMove}
          onPointerUp={handleBarPointerUp}
          onPointerCancel={handleBarPointerUp}
          className={`flex-1 -my-3 py-3 ${scrubbing ? "md:cursor-grabbing" : "md:cursor-grab"}`}
        >
          <div className="h-[2px] bg-mist">
            <div
              className={`h-full bg-cobalt ${
                scrubbing ? "" : "transition-[width] duration-150 ease-out"
              }`}
              style={{ width: `${barWidth}%` }}
            />
          </div>
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
