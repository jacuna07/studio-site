import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import SeeAllProjectsCta from "@/components/SeeAllProjectsCta";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import FeaturedStack from "@/components/FeaturedStack";
import HomeHero from "@/components/HomeHero";
import Reveal from "@/components/Reveal";
import CursorRevealGrid from "@/components/CursorRevealGrid";
import HomeSecondModule from "@/components/HomeSecondModule";
import { getAllCovers, getFeaturedProjects } from "@/content/projects";

// Title, description and share preview come from the root layout's
// site-wide defaults ("Tresunotres | Brand Design Studio").
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  const projects = getFeaturedProjects().slice(0, 6);
  // Every project on the Work page, for the hover preview on the
  // carousel's "See all projects" card.
  const workCovers = getAllCovers();

  return (
    <div className="animate-page-in">
      {/* The circled wordmark (big and centered over the shader gradient
          at load), then the two sentences, pinned while the page below
          slides up over it. Phones and desktop. */}
      <HomeHero />

      {/* Everything after the hero, as one opaque panel that slides over
          the pinned hero (z-10 over the hero's z-0), with a thin mist line
          along its top edge. */}
      <div className="relative z-10 border-t border-mist bg-ink">
        {/* The second module: the statement, then the featured work, each
            rising and fading in, in full, once it comes into view
            (HomeSecondModule). */}
        <HomeSecondModule
          statement={
            // Desktop: in the hero copy's column, with room around it so the
            // carousel below runs off the bottom of the screen.
            <section className="pt-24 pb-16 md:flex md:min-h-[60vh] md:items-center md:py-24">
              <Container>
                <p className="font-display font-normal text-[28px] sm:text-3xl md:text-4xl lg:text-5xl leading-[1.2] tracking-normal lg:pl-[25%]">
                  <span className="md:block">We build visual identities</span>{" "}
                  <span className="md:block">
                    through a{" "}
                    <Link href="/studio" className="group relative inline-block text-cobalt">
                      proven process
                      <span
                        aria-hidden="true"
                        className="absolute left-0 -bottom-1 h-[2px] w-0 bg-current transition-all duration-300 ease-out md:group-hover:w-full"
                      />
                    </Link>
                  </span>{" "}
                  <span className="md:block">we&apos;ve refined over the years.</span>
                </p>
              </Container>
            </section>
          }
        >
          {/* Desktop: a size container, so the full-bleed carousel inside
              can measure the page width (cqw). */}
          <section id="work" className="pb-16 md:pb-0 md:[container-type:inline-size]">
            <Container>
              {/* Phones (set 2026-10-06): the projects one under the other,
                  each cover swiping through its images. */}
              <FeaturedStack projects={projects} className="md:hidden" />
              {/* Tablets and desktop: the carousel, with the 👀 cursor over
                  the cards, as on the Work page. */}
              <div className="hidden md:block">
                <CursorRevealGrid>
                  <FeaturedCarousel projects={projects} previewCovers={workCovers} variant="home" />
                </CursorRevealGrid>
              </div>
            </Container>
          </section>
        </HomeSecondModule>

        {/* A closing line before the big CTA: right aligned on desktop,
            looping across the screen on phones. The same room after it (to the CTA's
            divider, counting the CTA's mt-4) as before it: 96px phones
            (from the last project's tagline), 136px desktop (from the cards, with
            the track's 8px bottom padding). It and the CTA rise and fade
            in, in full, as they come into view. */}
        <section className="pt-8 pb-20 md:pt-32 md:pb-[120px]">
          <Container>
            <Reveal>
              <p className="hidden font-display font-normal text-2xl md:block md:text-right lg:text-3xl leading-[1.25] tracking-normal">
                With love, from Costa Rica.
              </p>
              {/* Phones (set 2026-10-05): the line loops across the screen,
                  edge to edge, right to left (.animate-marquee in
                  globals.css), small and in dark gray (Ink 600). Two
                  identical halves, so the loop is seamless. Reduced
                  motion: the line once, still. */}
              <div className="md:hidden">
                <p className="sr-only font-display font-normal text-lg leading-[1.25] tracking-normal text-ink-600 motion-reduce:not-sr-only">
                  Made with love in Costa Rica
                </p>
                <div aria-hidden="true" className="-mx-6 overflow-hidden motion-reduce:hidden">
                  <div className="flex w-max animate-marquee font-display font-normal text-lg leading-[1.25] tracking-normal text-ink-600">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className="shrink-0 whitespace-nowrap">
                        Made with love in Costa Rica<span className="px-[0.5em]">•</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Closes the page right above the footer's "Say hi 👋" block. */}
        <Reveal>
          <SeeAllProjectsCta className="mt-4" />
        </Reveal>
      </div>
    </div>
  );
}
