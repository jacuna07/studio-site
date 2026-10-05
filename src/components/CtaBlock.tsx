"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Container from "./Container";
import { useCursorPreview } from "./useCursorPreview";
import { COVER_CYCLE_MS } from "./CoverPreviewLink";

/**
 * A full-width call to action: one big display-type link between two
 * dividers, sitting at the bottom left of the block (inset from the
 * bottom by the same 24 / 48 / 64px as the page's side margins). Hovering
 * anywhere on the block (desktop) turns the whole block cobalt and makes
 * it clickable: the link is stretched over the block with an invisible
 * ::after layer. On phones only the text itself is the link. The footer's
 * "Say hi 👋" uses it, and so does the Home page's "See all projects"
 * block right above it.
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
      className={`relative border-t transition-colors duration-300 ${
        hot ? "bg-cobalt border-cobalt" : "bg-ink border-mist"
      } ${className}`}
    >
      {/* 160px of padding in total, as when the text sat centered with
          80px above and below: the block keeps its height, the text just
          moves to the bottom. */}
      <Container className="pt-[136px] pb-6 md:pt-28 md:pb-12 lg:pt-24 lg:pb-16">
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
          className="font-display text-4xl md:text-6xl font-normal leading-[1.08] inline-block text-paper md:after:absolute md:after:inset-0"
        >
          {children}
        </Link>
      </Container>
      {withPreview && preview}
    </div>
  );
}
