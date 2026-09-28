"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCursorPreview } from "./useCursorPreview";

/** How fast the covers flick by in the "see all" style previews. */
export const COVER_CYCLE_MS = 250;

/**
 * A link that, on desktop hover, shows the small cursor-following preview
 * flicking through every project cover in a random order (see
 * useCursorPreview). Used for the "See all projects" and "Discover more"
 * CTAs, which all lead to the Work page. Pass `covers` from a server
 * component, e.g. getAllProjects().map((p) => ({ src: p.hero.src })).
 */
export default function CoverPreviewLink({
  href,
  covers,
  className,
  side = "right",
  children,
}: {
  href: string;
  covers: { src: string }[];
  className?: string;
  side?: "left" | "right";
  children: ReactNode;
}) {
  const { handlers, preview } = useCursorPreview({
    images: covers,
    side,
    cycleMs: COVER_CYCLE_MS,
  });

  return (
    <>
      <Link href={href} {...handlers} className={className}>
        {children}
      </Link>
      {preview}
    </>
  );
}
