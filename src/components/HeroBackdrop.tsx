"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type BackdropImage = { src: string; alt: string };

// How long each image holds before crossfading into the next one.
const HOLD_MS = 5000;
const FADE_MS = 1500;

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Background for the Home hero: a slow, random slideshow of 16:9 stills
 * from across all projects (see getBackdropImages), desaturated and held
 * at 20% opacity so the headline on top stays the focus.
 *
 * - The order is shuffled after mount rather than on the server, so every
 *   visit gets its own sequence without a hydration mismatch.
 * - At most three images are mounted at a time: the one fading out, the
 *   one showing, and the next one (already loading, still invisible), so
 *   the page never downloads the whole set up front.
 * - Everything is a CSS transition, no keyframe animation (see the notes
 *   in globals.css). If a transition ever failed to run, the worst case
 *   is a missing or static background; the headline is unaffected.
 * - With "reduce motion" turned on it shows one random still, with no
 *   crossfades and no zoom.
 */
export default function HeroBackdrop({ images }: { images: BackdropImage[] }) {
  const [order, setOrder] = useState<BackdropImage[] | null>(null);
  // -1 = first image mounted but not shown yet, so it can fade in.
  const [step, setStep] = useState(-1);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (images.length === 0) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduce);
    setOrder(shuffle(images));
    if (reduce) {
      setStep(0);
      return;
    }
    // Two frames so the first image is painted at opacity 0 before it
    // switches to visible, which is what lets its fade-in transition run.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setStep(0));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [images]);

  useEffect(() => {
    if (!order || order.length < 2 || reducedMotion || step < 0) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), HOLD_MS);
    return () => window.clearTimeout(id);
  }, [order, reducedMotion, step]);

  if (!order) return null;

  const n = order.length;
  const current = step < 0 ? -1 : step % n;
  const next = (Math.max(step, 0) + (step < 0 ? 0 : 1)) % n;
  const prev = step >= 1 ? (step - 1) % n : -1;
  const mounted = Array.from(new Set([prev, current, next].filter((i) => i >= 0)));

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-20 grayscale"
    >
      {mounted.map((i) => {
        const isCurrent = i === current;
        const isUpcoming = i === next && !isCurrent;
        // The upcoming image waits unzoomed and invisible; once current it
        // fades in and starts a slow zoom, and it keeps that zoom while it
        // fades back out as the previous image.
        const zoomed = !reducedMotion && !isUpcoming;
        return (
          <Image
            key={order[i].src}
            src={order[i].src}
            alt=""
            fill
            sizes="100vw"
            quality={60}
            className={`object-cover ${isCurrent ? "opacity-100" : "opacity-0"} ${
              zoomed ? "scale-[1.06]" : "scale-100"
            }`}
            style={{
              transition: reducedMotion
                ? "none"
                : `opacity ${FADE_MS}ms ease-out, transform ${HOLD_MS + FADE_MS}ms linear`,
            }}
          />
        );
      })}
    </div>
  );
}
