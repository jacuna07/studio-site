"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

// Size of the floating preview, and how far it sits from the cursor.
export const PREVIEW_W = 240;
export const PREVIEW_H = 135; // 16:9, same as the project covers
const OFFSET = 16;

type PreviewImage = { src: string };

function shuffleList<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * A small image preview that follows the cursor while it's over an
 * element (inspired by thisistinge.com's hover images, kept deliberately
 * small). Used by the case study prev/next links (a project's own
 * imagery, in order) and every "See all projects" / "Discover more" CTA
 * (all project covers, shuffled, flicking fast).
 *
 * Returns mouse handlers to spread onto the hovered element, plus the
 * preview itself to render next to it.
 *
 * - `side`: which side of the cursor the preview sits on ("left" for
 *   things near the right edge of the screen, "right" otherwise), always
 *   above the cursor, so it never runs off screen.
 * - Several images: steps through them every `cycleMs` while hovered, in
 *   a fresh random order per hover when `shuffle` is on, otherwise in the
 *   given order (starting from the first). It only ever steps to an image
 *   that has finished loading, so a fast cycle never flashes an empty box.
 * - Loading: nothing downloads until the first hover, except with `eager`,
 *   which loads just the first image with the page so it's instant.
 * - `placement` "below" (the Home hero's cursor card) puts it below and
 *   to the right of the arrow instead, flipping to the other side near
 *   the screen's edges; `width` sets its size (always 16:9); `morph`
 *   makes it grow out of the cursor point instead of just fading.
 * - Only on devices with a real hover pointer (and hidden below md), so
 *   touch screens just get the plain link.
 * - Portaled to <body> and positioned by writing a transform on mousemove
 *   (no re-render per move). The portal matters: case study pages carry
 *   an entrance animation that leaves a transform on the page, and a
 *   transformed ancestor would make `position: fixed` relative to the page
 *   instead of the screen.
 */
export function useCursorPreview({
  images,
  side,
  cycleMs = 600,
  shuffle = true,
  eager = false,
  placement = "above",
  width = PREVIEW_W,
  morph = false,
}: {
  images: PreviewImage[];
  side: "left" | "right";
  cycleMs?: number;
  shuffle?: boolean;
  eager?: boolean;
  placement?: "above" | "below";
  width?: number;
  morph?: boolean;
}): {
  handlers: {
    onMouseEnter: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseLeave: () => void;
  };
  preview: ReactNode;
} {
  const posRef = useRef<HTMLDivElement>(null);
  const canHoverRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [activated, setActivated] = useState(false);
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState<PreviewImage[]>(images);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState<Set<string>>(() => new Set());
  const loadedRef = useRef(loaded);
  loadedRef.current = loaded;

  useEffect(() => {
    canHoverRef.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setMounted(true);
  }, []);

  // While hovered, step to the next image that has loaded (skipping any
  // still downloading). Stays put if none of the others are ready yet.
  useEffect(() => {
    if (!visible || order.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => {
        for (let step = 1; step < order.length; step++) {
          const candidate = (i + step) % order.length;
          if (loadedRef.current.has(order[candidate].src)) return candidate;
        }
        return i;
      });
    }, cycleMs);
    return () => window.clearInterval(id);
  }, [visible, order, cycleMs]);

  const height = Math.round((width * 9) / 16);

  function place(e: React.MouseEvent) {
    const el = posRef.current;
    if (!el) return;
    let x: number;
    let y: number;
    if (placement === "below") {
      // Clear of the arrow's tip, below and to the right; flips to the
      // left / above near the right / bottom edge of the screen.
      x = e.clientX + 20;
      y = e.clientY + 28;
      if (x + width > window.innerWidth - 8) x = e.clientX - width - 12;
      if (y + height > window.innerHeight - 8) y = e.clientY - height - 12;
    } else {
      x = side === "right" ? e.clientX + OFFSET : e.clientX - width - OFFSET;
      y = e.clientY - height - OFFSET;
    }
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  const handlers = {
    onMouseEnter: (e: React.MouseEvent) => {
      if (!canHoverRef.current) return;
      if (images.length > 1) {
        const next = shuffle ? shuffleList(images) : images;
        setOrder(next);
        // Start on an image that's already loaded when shuffling (so the
        // preview is never blank); in order, always start from the first.
        const firstReady = shuffle ? next.findIndex((img) => loadedRef.current.has(img.src)) : 0;
        setIndex(firstReady >= 0 ? firstReady : 0);
      }
      setActivated(true);
      place(e);
      setVisible(true);
    },
    onMouseMove: (e: React.MouseEvent) => {
      if (canHoverRef.current) place(e);
    },
    onMouseLeave: () => setVisible(false),
  };

  function markLoaded(src: string) {
    setLoaded((s) => {
      if (s.has(src)) return s;
      const copy = new Set(s);
      copy.add(src);
      return copy;
    });
  }

  const preview =
    mounted &&
    createPortal(
      <div
        ref={posRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden md:block"
        style={{ width, height }}
      >
        <div
          className={`relative h-full w-full overflow-hidden rounded-lg bg-mist transition-[opacity,transform] ease-out ${
            morph ? "origin-top-left duration-300" : "duration-200"
          } ${visible ? "opacity-100 scale-100" : morph ? "opacity-0 scale-50" : "opacity-0 scale-95"}`}
        >
          {order.map((img, i) =>
            activated || (eager && i === 0) ? (
              <Image
                key={img.src}
                src={img.src}
                alt=""
                fill
                sizes={`${width}px`}
                onLoad={() => markLoaded(img.src)}
                className={`object-cover ${i === index ? "opacity-100" : "opacity-0"}`}
              />
            ) : null
          )}
        </div>
      </div>,
      document.body
    );

  return { handlers, preview };
}
