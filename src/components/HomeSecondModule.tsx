"use client";

import { createContext, useState, type ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * Whether the Home carousel has come in (read by FeaturedCarousel's home
 * variant: it only plays once this is true). null outside the Home
 * second module.
 */
export const HomeCarouselInPlace = createContext<boolean | null>(null);

/**
 * The Home page's second module: the statement, then the Featured
 * carousel, each rising and fading in, in full, once it comes into view
 * (Reveal). The carousel starts playing once it has come in.
 */
export default function HomeSecondModule({
  statement,
  children,
}: {
  statement: ReactNode;
  /** The Featured section (carousel). */
  children: ReactNode;
}) {
  const [inPlace, setInPlace] = useState(false);
  return (
    <>
      <Reveal>{statement}</Reveal>
      <Reveal onShownChange={setInPlace}>
        <HomeCarouselInPlace.Provider value={inPlace}>{children}</HomeCarouselInPlace.Provider>
      </Reveal>
    </>
  );
}
