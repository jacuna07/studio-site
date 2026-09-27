"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

// Size of the floating preview, and how far it sits from the cursor.
export const PREVIEW_W = 240;
export const PREVIEW_H = 135; // 16:9, same as the project covers
const OFFSET = 16;

type PreviewImage = { src: string };

function shuffle<T>(items: T[]): T[] {
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
 * small). Used by the case study prev/next links and the Featured
 * carousel's "See all projects" card.
 *
 * Returns mouse handlers to spread onto the hovered element, plus the
 * preview itself to render anywhere next to it.
 *
 * - `side`: which side of the cursor the preview sits on ("left" for
 *   things near the right edge of the screen, "right" for the left edge),
 *   always above the cursor, so it never runs off screen.
 * - One image: just shows it. Several: shows them in a random order,
 *   switching every `cycleMs` while hovered.
 * - `eager`: mount (and so download) the images right away. Otherwise
 *   they're only mounted on the first hover, which keeps a long list of
 *   covers from loading with the page.
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
  eager = false,
}: {
  images: PreviewImage[];
  side: "left" | "right";
  cycleMs?: number;
  eager?: boolean;
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
  const [activated, setActivated] = useState(eager);
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState<PreviewImage[]>(images);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    canHoverRef.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setMounted(true);
  }, []);

  // While hovered, step through the images (only when there's more than one).
  useEffect(() => {
    if (!visible || order.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % order.length), cycleMs);
    return () => window.clearInterval(id);
  }, [visible, order.length, cycleMs]);

  function place(e: React.MouseEvent) {
    const el = posRef.current;
    if (!el) return;
    const x = side === "right" ? e.clientX + OFFSET : e.clientX - PREVIEW_W - OFFSET;
    const y = e.clientY - PREVIEW_H - OFFSET;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  const handlers = {
    onMouseEnter: (e: React.MouseEvent) => {
      if (!canHoverRef.current) return;
      if (images.length > 1) {
        // A fresh random order on every hover.
        setOrder(shuffle(images));
        setIndex(0);
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

  const preview =
    mounted &&
    createPortal(
      <div
        ref={posRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden md:block"
        style={{ width: PREVIEW_W, height: PREVIEW_H }}
      >
        <div
          className={`relative h-full w-full overflow-hidden rounded-lg bg-mist transition-[opacity,transform] duration-200 ease-out ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {activated &&
            order.map((img, i) => (
              <Image
                key={img.src}
                src={img.src}
                alt=""
                fill
                sizes={`${PREVIEW_W}px`}
                className={`object-cover ${i === index ? "opacity-100" : "opacity-0"}`}
              />
            ))}
        </div>
      </div>,
      document.body
    );

  return { handlers, preview };
}
