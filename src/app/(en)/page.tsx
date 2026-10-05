import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import SeeAllProjectsCta from "@/components/SeeAllProjectsCta";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import HomeHero from "@/components/HomeHero";
import Reveal from "@/components/Reveal";
import CursorRevealGrid from "@/components/CursorRevealGrid";
import HomeSecondModule from "@/components/HomeSecondModule";
import { getAllCovers, getAllProjects, getBackdropImages, getFeaturedProjects } from "@/content/projects";

// Title, description and share preview come from the root layout's
// site-wide defaults ("Tresunotres | Brand Design Studio").
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  const projects = getFeaturedProjects().slice(0, 6);
  const backdropImages = getBackdropImages();
  // Every project on the Work page, for the hover preview on the
  // carousel's "See all projects" card.
  const workCovers = getAllCovers();
  // A handful of non-featured projects, shown as a "more work" panel at
  // the end of the mobile carousel once the visitor swipes past the last
  // featured project.
  const featuredSlugs = new Set(projects.map((p) => p.slug));
  const moreProjects = getAllProjects()
    .filter((p) => !featuredSlugs.has(p.slug))
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return (
    <div className="animate-page-in">
      {/* The circled wordmark (big and centered over the photo slideshow
          at load), then the two sentences, pinned while the page below
          slides up over it. Phones and desktop. Its images (slideshow and
          desktop cursor card) are every 16:9 image on the site. */}
      <HomeHero images={backdropImages} />

      {/* Everything after the hero, as one opaque panel that slides over
          the pinned hero (z-10 over the hero's z-0), with a thin mist line
          along its top edge. */}
      <div className="relative z-10 border-t border-mist bg-ink">
        {/* The second module: the statement, then the carousel, each
            rising and fading in, in full, once it comes into view
            (HomeSecondModule). */}
        <HomeSecondModule
          statement={
            // Desktop: in the hero copy's column, with room around it so the
            // carousel below runs off the bottom of the screen.
            <section className="pt-24 pb-16 md:flex md:min-h-[60vh] md:items-center md:py-24">
              <Container>
                <p className="font-display font-normal text-[28px] sm:text-3xl md:text-4xl lg:text-5xl leading-[1.2] tracking-normal lg:pl-[25%]">
                  <span className="md:block">We construct visual identities</span>{" "}
                  <span className="md:block">
                    through a{" "}
                    <Link href="/studio" className="group relative inline-block text-cobalt">
                      custom process
                      <span
                        aria-hidden="true"
                        className="absolute left-0 -bottom-1 h-[2px] w-0 bg-current transition-all duration-300 ease-out md:group-hover:w-full"
                      />
                    </Link>
                  </span>{" "}
                  <span className="md:block">perfected over years.</span>
                </p>
              </Container>
            </section>
          }
        >
          {/* Desktop: a size container, so the full-bleed carousel inside
              can measure the page width (cqw). */}
          <section id="work" className="pb-16 md:pb-0 md:[container-type:inline-size]">
            <Container>
              {/* Desktop: the 👀 cursor over the cards, as on the Work page. */}
              <CursorRevealGrid>
                <FeaturedCarousel
                  projects={projects}
                  moreProjects={moreProjects}
                  previewCovers={workCovers}
                  variant="home"
                />
              </CursorRevealGrid>
            </Container>
          </section>
        </HomeSecondModule>

        {/* A closing line before the big CTA: right aligned on desktop,
            left aligned on phones. The same room after it (to the CTA's
            divider, counting the CTA's mt-4) as before it: 96px phones
            (from the carousel's bar), 136px desktop (from the cards, with
            the track's 8px bottom padding). It and the CTA rise and fade
            in, in full, as they come into view. */}
        <section className="pt-8 pb-20 md:pt-32 md:pb-[120px]">
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
