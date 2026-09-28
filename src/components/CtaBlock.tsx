"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Container from "./Container";
import { useCursorPreview } from "./useCursorPreview";
import { COVER_CYCLE_MS } from "./CoverPreviewLink";

/**
 * A full-width call to action: one big display-type link between two
 * dividers. Hovering the link turns the whole block cobalt. The footer's
 * "Tell us about the next big thing." uses it, and so does the Home
 * page's "See all projects" block right above it.
 *
 * Pass `covers` to also get the small cursor preview that flicks through
 * project covers (see useCursorPreview), as on every link to the Work page.
 */
export default function CtaBlock({
  href,
  covers = [],
  className = "",
  children,
}: {
  href: string;
  covers?: { src: string }[];
  className?: string;
  children: ReactNode;
}) {
  const [hot, setHot] = useState(false);
  const withPreview = covers.length > 0;
  const { handlers, preview } = useCursorPreview({
    images: covers,
    side: "right",
    cycleMs: COVER_CYCLE_MS,
  });

  return (
    <div
      className={`border-t transition-colors duration-300 ${
        hot ? "bg-cobalt border-cobalt" : "bg-ink border-mist"
      } ${className}`}
    >
      <Container className="py-20">
        <Link
          href={href}
          onMouseEnter={(e) => {
            setHot(true);
            if (withPreview) handlers.onMouseEnter(e);
          }}
          onMouseMove={withPreview ? handlers.onMouseMove : undefined}
          onMouseLeave={() => {
            setHot(false);
            if (withPreview) handlers.onMouseLeave();
          }}
          className="font-display text-4xl md:text-6xl font-normal leading-[1.08] inline-block text-paper"
        >
          {children}
        </Link>
      </Container>
      {withPreview && preview}
    </div>
  );
}
