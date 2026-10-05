import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import SeeAllProjectsCta from "@/components/SeeAllProjectsCta";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import HomeHero from "@/components/HomeHero";
import Reveal from "@/components/Reveal";
import CursorRevealGrid from "@/components/CursorRevealGrid";
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
          along its top edge. Each module rises and fades in with the
          scroll (Reveal), fully in place once its top is 40% of the way
          up the screen: the statement, then the carousel, then the closing
          line, then the big CTA. */}
      <div className="relative z-10 border-t border-mist bg-ink">
        {/* The statement; "custom process" goes to Studio. Desktop: in the
            hero copy's column, with room around it so the carousel below
            runs off the bottom of the screen once the panel is in place. */}
        <section className="pt-24 pb-16 md:flex md:min-h-[60vh] md:items-center md:py-24">
          <Container>
            <Reveal scope="all" end={0.6} className="lg:pl-[25%]">
              <p className="font-display font-normal text-[28px] sm:text-3xl md:text-4xl lg:text-5xl leading-[1.2] tracking-normal">
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
            </Reveal>
          </Container>
        </section>

        {/* Desktop: a size container, so the full-width carousel inside can
            measure the page width (cqw). */}
        <section id="work" className="pb-16 md:pb-0 md:[container-type:inline-size]">
          <Container>
            <Reveal scope="all" end={0.6}>
              {/* Phones only: the desktop module goes straight to the cards. */}
              <div className="flex items-end justify-between mb-10 md:hidden">
                <h2 className="font-mono font-bold text-xs uppercase tracking-[0.2em] text-stone">
                  Featured
                </h2>
                <Link
                  href="/work"
                  className="font-mono text-xs uppercase tracking-[0.2em] md:hover:text-cobalt md:hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] transition-colors"
                >
                  View all
                </Link>
              </div>
              {/* Desktop: the 👀 cursor over the cards, as on the Work page. */}
              <CursorRevealGrid>
                <FeaturedCarousel
                  projects={projects}
                  moreProjects={moreProjects}
                  previewCovers={workCovers}
                  variant="home"
                />
              </CursorRevealGrid>
            </Reveal>
          </Container>
        </section>

        {/* A closing line before the big CTA: right aligned on desktop,
            left aligned on phones. */}
        <section className="pt-8 pb-16 md:pt-32">
          <Container>
            <Reveal scope="all" end={0.6}>
              <p className="font-display font-normal text-2xl md:text-right lg:text-3xl leading-[1.25] tracking-normal">
                With love, from Costa Rica.
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Closes the page right above the footer's "Say hi 👋" block. */}
        <Reveal scope="all" end={0.6}>
          <SeeAllProjectsCta className="mt-4" />
        </Reveal>
      </div>
    </div>
  );
}
