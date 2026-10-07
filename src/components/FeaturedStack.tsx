"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import type { Project } from "@/content/projects/types";

// The small squared chips over each cover (the industry, the counter):
// the label type at 10px on the nav's dark glass. The right padding is
// trimmed by the letter spacing so the word sits centered in the chip.
const chip =
  "pointer-events-none absolute bottom-3 border border-paper/10 bg-ink/75 py-1 pl-2 pr-[calc(0.5rem-0.2em)] font-mono font-bold text-[10px] leading-[14px] uppercase tracking-[0.2em] text-paper backdrop-blur-md";

function getFrames(project: Project) {
  return [
    { src: project.hero.src, alt: project.hero.alt, type: "image" as const, poster: undefined },
    ...project.gallery.map((img) => ({
      src: img.src,
      alt: img.alt,
      type: img.type ?? "image",
      poster: img.poster,
    })),
  ];
}

function StackCard({ project }: { project: Project }) {
  const frames = getFrames(project);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  // The furthest image reached so far (images stay loaded once reached).
  const [reach, setReach] = useState(0);
  // Once the card is close to the screen, the image after the one in
  // view is loaded too, so a swipe never lands on an empty frame.
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "100% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Which image is in view, from the track's scroll position.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    function onScroll() {
      if (!el || el.clientWidth === 0) return;
      const i = Math.min(Math.max(Math.round(el.scrollLeft / el.clientWidth), 0), frames.length - 1);
      setIndex(i);
      setReach((prev) => Math.max(prev, i));
    }
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [frames.length]);

  // Clips play only while they're the image in view, on screen.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const videos = el.querySelectorAll("video");
    if (videos.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target as HTMLVideoElement;
          if (entry.intersectionRatio >= 0.6) void v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: [0, 0.6] }
    );
    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, [reach, near]);

  // Keeps the sideways swipe from also reaching the nav's window-level
  // swipe listener (the same fix as the carousel and ProjectCard).
  function stop(e: React.TouchEvent) {
    e.stopPropagation();
  }

  // The cover, then (once the card is near) every image reached so far
  // and the one after it. The rest are empty frames until they're needed.
  const loadedUpTo = near ? reach + 1 : 0;

  return (
    <Link href={`/work/${project.slug}`} className="block">
      <div className="relative">
        <div
          ref={trackRef}
          onTouchStart={stop}
          onTouchEnd={stop}
          className="scrollbar-hide flex aspect-[4/3] snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain bg-mist"
        >
          {frames.map((f, fi) => (
            <div key={f.src} className="relative h-full w-full shrink-0 snap-start snap-always">
              {fi <= loadedUpTo &&
                (f.type === "video" ? (
                  <video
                    src={f.src}
                    poster={f.poster}
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-label={f.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={f.src}
                    alt={f.alt}
                    fill
                    sizes="100vw"
                    loading={fi === 0 ? "lazy" : "eager"}
                    draggable={false}
                    className="object-cover"
                  />
                ))}
            </div>
          ))}
        </div>
        <span className={`${chip} left-3`}>{project.industry}</span>
        {frames.length > 1 && (
          <span aria-hidden="true" className={`${chip} right-3 tabular-nums`}>
            {index + 1}/{frames.length}
          </span>
        )}
      </div>
      <h3 className="mt-4 font-display font-normal text-xl leading-tight text-paper">
        {project.title}
      </h3>
      <p className="mt-1 text-base leading-snug text-stone">{project.tagline}</p>
    </Link>
  );
}

/**
 * Home, phones only (set 2026-10-06, replaces the carousel there): the
 * featured projects one under the other, laid out like
 * thisistinge.com's: a full-width cover with the industry as a small tag
 * over its bottom-left corner, then the name and tagline. Each cover
 * swipes sideways through the project's images (cover first, then the
 * gallery), one at a time, with a counter in the bottom-right corner.
 * Square corners, our label type for the chips.
 *
 * Every card after the first rises in on its own as it comes into view
 * (Reveal); the first comes in with the section around it.
 */
export default function FeaturedStack({
  projects,
  className = "",
}: {
  projects: Project[];
  className?: string;
}) {
  return (
    <div className={`space-y-12 ${className}`}>
      {projects.map((project, i) =>
        i === 0 ? (
          <StackCard key={project.slug} project={project} />
        ) : (
          <Reveal key={project.slug}>
            <StackCard project={project} />
          </Reveal>
        )
      )}
    </div>
  );
}
