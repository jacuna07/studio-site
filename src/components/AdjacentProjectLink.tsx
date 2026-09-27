"use client";

import Link from "next/link";
import IconArrowLeft from "./icons/IconArrowLeft";
import { useCursorPreview } from "./useCursorPreview";

/**
 * The "previous / next project" links at the end of a case study. On
 * desktop, hovering one shows a small preview of that project's cover
 * next to the cursor (see useCursorPreview): to the right of it for
 * "previous" (left edge of the page), to the left for "next" (right edge).
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
  const isNext = direction === "next";
  const { handlers, preview } = useCursorPreview({
    images: [cover],
    side: isNext ? "left" : "right",
    eager: true,
  });

  return (
    <>
      <Link
        href={href}
        {...handlers}
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
      {preview}
    </>
  );
}
