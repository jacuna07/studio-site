"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import IconArrowLeft from "./icons/IconArrowLeft";

// Size of the floating cover preview, and how far it sits from the cursor.
const PREVIEW_W = 240;
const PREVIEW_H = 135; // 16:9, same as the covers
const OFFSET = 16;

/**
 * The "previous / next project" links at the end of a case study. On
 * desktop, hovering one shows a small preview of that project's cover
 * that follows the cursor (inspired by thisistinge.com's hover images,
 * but deliberately small: a quick peek, not a takeover).
 *
 * The preview sits above the cursor, and toward the middle of the page:
 * to the right of it for "previous" (left edge), to the left for "next"
 * (right edge), so it never runs off screen. It's positioned by writing
 * a transform on mousemove (no re-render per move), and only appears on
 * devices with a real hover pointer; touch screens just get the link.
 *
 * The preview is portaled to <body>: the case study page wraps everything
 * in an entrance animation that leaves a transform on the page, and a
 * transformed ancestor would make `position: fixed` relative to the page
 * instead of the screen, so the preview would drift from the cursor.
 */
export default function AdjacentProjectLink({
  href,
  title,
  cover,
  direction,
}: {
  href: string;
  title: string;
  cover: { src: string; alt: string };
  direction: "prev" | "next";
}) {
  const posRef = useRef<HTMLDivElement>(null);
  const canHoverRef = useRef(false);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    canHoverRef.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setMounted(true);
  }, []);

  function place(e: React.MouseEvent) {
    const el = posRef.current;
    if (!el) return;
    const x = direction === "prev" ? e.clientX + OFFSET : e.clientX - PREVIEW_W - OFFSET;
    const y = e.clientY - PREVIEW_H - OFFSET;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  const isNext = direction === "next";

  return (
    <>
      <Link
        href={href}
        onMouseEnter={(e) => {
          if (!canHoverRef.current) return;
          place(e);
          setVisible(true);
        }}
        onMouseMove={(e) => canHoverRef.current && place(e)}
        onMouseLeave={() => setVisible(false)}
        className={`group flex items-center gap-2 ${isNext ? "text-right" : ""}`}
      >
        {!isNext && <IconArrowLeft className="h-3 w-3 md:h-4 md:w-4 shrink-0" />}
        {/* Hover only on desktop (md:): on mobile there's no real hover,
            and a tapped link can otherwise get visually "stuck" in its
            hover state on some mobile browsers. */}
        <span className="font-display text-lg md:text-xl md:group-hover:text-cobalt md:group-hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] transition-colors">
          {title}
        </span>
        {/* Same icon as Previous, mirrored: guarantees the two arrows are
            pixel-identical instead of relying on a font's left/right
            glyphs matching each other. */}
        {isNext && <IconArrowLeft className="h-3 w-3 md:h-4 md:w-4 shrink-0 rotate-180" />}
      </Link>

      {mounted &&
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
              <Image src={cover.src} alt="" fill sizes={`${PREVIEW_W}px`} className="object-cover" />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
