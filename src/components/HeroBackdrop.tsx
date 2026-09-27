"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type BackdropImage = { src: string; alt: string };

// How long each image holds before crossfading into the next one, and
// how long the crossfade itself takes.
const HOLD_MS = 2000;
const FADE_MS = 1000;

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Background for the Home hero: a random slideshow of 16:9 stills from
 * across all projects (see getBackdropImages), desaturated and held at
 * 15% opacity: the balance between the headline staying easy to read
 * (20% got too busy behind it) and the photos keeping some contrast (10%
 * went flat).
 *
 * - The order is shuffled after mount rather than on the server, so every
 *   visit gets its own sequence without a hydration mismatch.
 * - At most three images are mounted at a time: the one fading out, the
 *   one showing, and the next one (loading, still invisible), so the page
 *   never downloads the whole set up front.
 * - An image only fades in once it has actually loaded, the first one
 *   included. Otherwise the fade could run on an empty frame and the
 *   picture would just pop in when the download finished.
 * - Everything is a CSS transition, no keyframe animation (see the notes
 *   in globals.css). If a transition ever failed to run, the worst case
 *   is a missing or static background; the headline is unaffected.
 * - With "reduce motion" turned on it shows one random still, with no
 *   crossfades and no zoom.
 */
export default function HeroBackdrop({ images }: { images: BackdropImage[] }) {
  const [order, setOrder] = useState<BackdropImage[] | null>(null);
  // -1 = first image mounted (and loading) but not shown yet.
  const [step, setStep] = useState(-1);
  const [loaded, setLoaded] = useState<Set<string>>(() => new Set());
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (images.length === 0) return;
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setOrder(shuffle(images));
  }, [images]);

  const n = order?.length ?? 0;
  const current = step < 0 ? -1 : step % n;
  const next = n === 0 ? -1 : step < 0 ? 0 : (step + 1) % n;
  const prev = step >= 1 ? (step - 1) % n : -1;
  const nextLoaded = next >= 0 && !!order && loaded.has(order[next].src);

  // First image: fade in as soon as it has loaded. Two frames of delay so
  // it has been painted at opacity 0 first, which is what lets the fade
  // transition run instead of jumping straight to visible.
  useEffect(() => {
    if (step !== -1 || !nextLoaded) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setStep(0));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [step, nextLoaded]);

  // After that: hold, then move on, but only once the next image is ready.
  useEffect(() => {
    if (step < 0 || n < 2 || reducedMotion || !nextLoaded) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), HOLD_MS);
    return () => window.clearTimeout(id);
  }, [step, n, reducedMotion, nextLoaded]);

  if (!order) return null;

  const mounted = Array.from(new Set([prev, current, next].filter((i) => i >= 0)));

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.15] grayscale"
    >
      {mounted.map((i) => {
        const src = order[i].src;
        const isCurrent = i === current;
        const isUpcoming = i === next && !isCurrent;
        // The upcoming image waits unzoomed and invisible; once current it
        // fades in and starts a very slight zoom, and it keeps that zoom
        // while it fades back out as the previous image.
        const zoomed = !reducedMotion && !isUpcoming;
        return (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            sizes="100vw"
            quality={60}
            loading="eager"
            onLoad={() =>
              setLoaded((s) => {
                if (s.has(src)) return s;
                const copy = new Set(s);
                copy.add(src);
                return copy;
              })
            }
            className={`object-cover ${isCurrent ? "opacity-100" : "opacity-0"} ${
              zoomed ? "scale-[1.04]" : "scale-100"
            }`}
            style={{
              transition: reducedMotion
                ? "none"
                : `opacity ${FADE_MS}ms ease-out, transform ${HOLD_MS + FADE_MS * 2}ms linear`,
            }}
          />
        );
      })}
    </div>
  );
}
