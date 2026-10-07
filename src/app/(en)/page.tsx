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

        {/* Tablets and desktop: a closing line before the big CTA, right
            aligned. The same room after it (to the CTA's divider, counting
            the CTA's mt-4) as before it: 136px (from the cards, with the
            track's 8px bottom padding). It and the CTA rise and fade in, in
            full, as they come into view. Phones (since 2026-10-06): no
            line here (its looping version sits in the footer, between "Say
            hi" and the links), so the last project's tagline is 80px from
            the CTA's divider. */}
        <section className="hidden md:block md:pt-32 md:pb-[120px]">
          <Container>
            <Reveal>
              <p className="font-display font-normal text-2xl md:text-right lg:text-3xl leading-[1.25] tracking-normal">
                With love, from Costa Rica.
              </p>
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
