"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects/types";

export default function ProjectCard({
  project,
  index,
  aspect = "wide",
  locale = "en",
  overlay = "gradient",
  showIndex = true,
  enableImageSwipe = false,
}: {
  project: Project;
  index: number;
  aspect?: "wide" | "square" | "uniform";
  locale?: "en" | "es";
  overlay?: "gradient" | "solid";
  showIndex?: boolean;
  /** Mobile only: swiping over the thumbnail cycles through the project's images. */
  enableImageSwipe?: boolean;
}) {
  const href = locale === "es" ? `/es/work/${project.slug}` : `/work/${project.slug}`;

  const aspectClass =
    aspect === "wide"
      ? "aspect-[4/3] md:aspect-[21/9]"
      : aspect === "uniform"
        ? "aspect-[5/4]"
        : "aspect-[4/3] md:aspect-[4/3]";

  const frames = [
    { src: project.hero.src, alt: project.hero.alt },
    ...project.gallery.map((img) => ({
      src: img.type === "video" ? img.poster ?? img.src : img.src,
      alt: img.alt,
    })),
  ];

  const [frameIndex, setFrameIndex] = useState(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const autoTimerRef = useRef<number | null>(null);
  const frame = frames[frameIndex] ?? frames[0];

  // While a swipe-enabled card sits near the middle of the viewport,
  // auto-cycle its images slowly, like a video preview. It's a hint
  // that the thumbnail is swipeable, and it pauses as soon as the
  // visitor swipes it themselves or the card scrolls out of the
  // center band.
  useEffect(() => {
    if (!enableImageSwipe || frames.length < 2) return;
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    function clearAutoTimer() {
      if (autoTimerRef.current !== null) {
        window.clearInterval(autoTimerRef.current);
        autoTimerRef.current = null;
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearAutoTimer();
          autoTimerRef.current = window.setInterval(() => {
            setFrameIndex((i) => (i + 1) % frames.length);
          }, 1500);
        } else {
          clearAutoTimer();
          setFrameIndex(0);
        }
      },
      // Fires only while the card sits within the middle band of the
      // viewport, not merely once it's visible at the edges.
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearAutoTimer();
    };
  }, [enableImageSwipe, frames.length]);

  function handleTouchStart(e: React.TouchEvent) {
    if (!enableImageSwipe || e.touches.length !== 1) return;
    // Stop this touch from bubbling up to Nav's window-level swipe
    // listener, so cycling a card's image doesn't also open the menu.
    e.stopPropagation();
    // A manual swipe takes over from the auto-cycle; it won't resume
    // until the card leaves and re-enters the center band.
    if (autoTimerRef.current !== null) {
      window.clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    }
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!enableImageSwipe || !start || frames.length < 2) return;
    e.stopPropagation();

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    // Mostly-horizontal swipe past a threshold, same gesture rule used
    // elsewhere on the site (see Nav's swipe-to-open).
    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

    setFrameIndex((i) => {
      const next = deltaX < 0 ? i + 1 : i - 1;
      return (next + frames.length) % frames.length;
    });
  }

  return (
    <Link href={href} className="group block">
      <div
        ref={cardRef}
        className={`relative overflow-hidden bg-mist shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] ${aspectClass}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {enableImageSwipe ? (
          frames.map((f, i) => (
            <Image
              key={f.src}
              src={f.src}
              alt={f.alt}
              fill
              priority={i === 0}
              className={`object-cover transition-[opacity,transform] duration-500 ease-out md:group-hover:scale-105 ${
                i === frameIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))
        ) : (
          <Image
            src={frame.src}
            alt={frame.alt}
            fill
            className="object-cover transition-transform duration-500 ease-out md:group-hover:scale-105"
          />
        )}
        {overlay === "solid" ? (
          <div className="absolute inset-x-0 bottom-0 overflow-hidden hidden md:block">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cobalt origin-bottom scale-y-0 transition-transform duration-500 ease-out md:group-hover:scale-y-100"
            />
            <div className="relative z-10 px-8 py-5 opacity-0 transition-opacity duration-300 delay-100 md:group-hover:opacity-100">
              <div className="font-display text-2xl md:text-3xl font-medium text-paper">
                {project.title}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper mt-2">
                {project.industry}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="absolute inset-0 hidden md:flex flex-col justify-end p-8 opacity-0 transition-opacity duration-300 md:group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(to top, rgba(10,10,10,0.88), rgba(10,10,10,0) 58%)",
            }}
          >
            {showIndex && (
              <div className="font-mono text-[11px] tracking-[0.2em] text-stone mb-2">
                {String(index).padStart(2, "0")}
              </div>
            )}
            <div className="font-display text-2xl md:text-3xl font-medium">
              {project.title}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper mt-2">
              {project.industry}
            </div>
          </div>
        )}
      </div>

      {/* Mobile only: no hover to reveal this, so show it as plain text below the image */}
      <div className="md:hidden pt-2 pb-10">
        {overlay === "gradient" && showIndex && (
          <div className="font-mono text-[11px] tracking-[0.2em] text-stone mb-1">
            {String(index).padStart(2, "0")}
          </div>
        )}
        <div className="font-display text-xl font-medium text-paper">{project.title}</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone mt-1">
          {project.industry}
        </div>
      </div>
    </Link>
  );
}
