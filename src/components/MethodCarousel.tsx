"use client";

import { useEffect, useRef, useState } from "react";

type MethodItem = {
  number: string;
  label: string;
  description: string;
};

/**
 * The "Our method" cards: a plain 3-column grid at md and up, unchanged.
 * Below md, they become a snap-scroll carousel with dot navigation
 * instead of a tall vertical stack — one card at a time, swipeable, with
 * the active dot tracking scroll position via IntersectionObserver.
 */
export default function MethodCarousel({ items }: { items: MethodItem[] }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Whichever card is most centered in the track wins the active dot.
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        }
        if (best && best.intersectionRatio > 0.5) {
          const index = cardRefs.current.findIndex((el) => el === best!.target);
          if (index !== -1) setActive(index);
        }
      },
      { root: track, threshold: [0.5, 0.75, 1] }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [items.length]);

  function scrollToIndex(index: number) {
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }

  return (
    <div>
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible md:mx-0 md:px-0 md:pb-0 md:gap-6"
      >
        {items.map((item, index) => (
          <div
            key={item.label}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            tabIndex={0}
            className="group relative overflow-hidden rounded-2xl border border-paper/20 bg-cobalt h-[380px] md:h-[440px] focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-ink shrink-0 w-[85%] snap-center md:w-auto md:shrink"
          >
            <div className="absolute inset-x-0 bottom-0 h-[35%] flex items-center p-6 md:p-8">
              <p className="text-paper text-sm leading-snug">{item.description}</p>
            </div>

            <div className="absolute inset-x-0 top-0 flex h-[65%] md:h-full flex-col justify-between bg-ink p-8 transition-[height] duration-300 ease-out md:group-hover:h-[65%] md:group-focus:h-[65%]">
              <span className="font-display font-bold text-6xl md:text-7xl leading-none text-paper -mt-2 md:-mt-3">
                {item.number}
              </span>
              <span className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-paper max-w-[14ch]">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Dot navigation: mobile/carousel only, hidden once the grid takes over at md. */}
      <div className="flex justify-center items-center gap-2 mt-6 md:hidden">
        {items.map((item, index) => (
          <button
            key={item.label}
            type="button"
            aria-label={item.label}
            aria-current={index === active}
            onClick={() => scrollToIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === active ? "w-6 bg-cobalt" : "w-2 bg-paper/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
