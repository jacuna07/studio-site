import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import CtaBlock from "@/components/CtaBlock";
import IconArrowLeft from "@/components/icons/IconArrowLeft";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import ScrollToWorkArrow from "@/components/ScrollToWorkArrow";
import HeroBackdrop from "@/components/HeroBackdrop";
import { getAllCovers, getAllProjects, getBackdropImages, getFeaturedProjects } from "@/content/projects";

// Title, description and share preview come from the root layout's
// site-wide defaults ("Tresunotres | Brand Design Studio").
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  const projects = getFeaturedProjects().slice(0, 6);
  const backdropImages = getBackdropImages();
  // Every project on the Work page, for the hover previews on the
  // carousel's "See all projects" card and the block below it.
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
      <section className="relative overflow-hidden min-h-[calc(100vh-5rem)] flex flex-col justify-center py-20">
        <HeroBackdrop images={backdropImages} />
        <Container className="relative">
          <h1 className="font-display font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] max-w-5xl">
            <span className="block animate-line" style={{ animationDelay: "0ms" }}>
              Based in Costa Rica.
            </span>
            <span className="block animate-line" style={{ animationDelay: "150ms" }}>
              We construct visual identities
            </span>
            <span className="block animate-line" style={{ animationDelay: "300ms" }}>
              through a custom process
            </span>
            <span className="block animate-line" style={{ animationDelay: "450ms" }}>
              perfected over years.
            </span>
            <span className="block animate-line mt-10" style={{ animationDelay: "900ms" }}>
              We design the foundations.
            </span>
            <span className="block animate-line" style={{ animationDelay: "1050ms" }}>
              Your brand enjoys{" "}
              <a href="#work" className="group relative inline-block text-cobalt">
                the spotlight.
                <span
                  aria-hidden="true"
                  className="absolute left-0 -bottom-1 h-[2px] w-0 bg-current transition-all duration-300 ease-out md:group-hover:w-full"
                />
              </a>
            </span>
          </h1>
          <div className="mt-16 flex justify-center">
            <ScrollToWorkArrow label="Scroll to work" />
          </div>
        </Container>
      </section>

      <section id="work" className="py-16 border-t border-mist">
        <Container>
          <div className="flex items-end justify-between mb-10">
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
          <FeaturedCarousel
            projects={projects}
            moreProjects={moreProjects}
            previewCovers={workCovers}
          />
        </Container>
      </section>

      {/* Same big block as the footer's "Tell us about the next big
          thing." (which stacks right under it), plus the cover preview
          every link to the Work page has. mt-4: same 80px before the
          divider as the footer (see Footer.tsx). */}
      <CtaBlock href="/work" covers={workCovers} className="mt-4">
        See all{" "}
        <span className="whitespace-nowrap">
          projects
          <IconArrowLeft className="inline-block ml-[0.25em] h-[0.7em] w-[0.7em] rotate-180 align-[-0.05em]" />
        </span>
      </CtaBlock>
    </div>
  );
}
