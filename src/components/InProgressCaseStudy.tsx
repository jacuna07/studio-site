import Link from "next/link";
import Container from "./Container";
import FeaturedCarousel from "./FeaturedCarousel";
import CaseStudyBackSwipe from "./CaseStudyBackSwipe";
import { getFeaturedProjects } from "@/content/projects";
import type { Project } from "@/content/projects/types";

/**
 * Shown in place of a case study while its project has `inProgress: true`
 * (see src/content/projects/types.ts). The project's card still sits on
 * the Work grid, so a visitor can land here: this page says so plainly,
 * points them at finished work (the Home page's Featured carousel), and
 * offers a way to ask about this project directly.
 */
export default function InProgressCaseStudy({ project }: { project: Project }) {
  // Featured already excludes in-progress projects; the slug check is a
  // belt and braces guard so a project never recommends itself.
  const finished = getFeaturedProjects().filter((p) => p.slug !== project.slug);

  return (
    // hint={false}: the swipe-back hint would otherwise sit on top of the
    // carousel, which has its own horizontal swipe. The gesture still works.
    <CaseStudyBackSwipe targetHref="/work" targetLabel="Work" hint={false}>
      <section className="py-16 animate-page-in">
        <Container>
          <div className="max-w-4xl">
            <span className="font-mono font-bold text-xs md:text-sm uppercase tracking-[0.2em] text-stone">
              {project.title}
            </span>
            <h1 className="font-display font-normal text-3xl md:text-[56px] md:leading-tight tracking-normal mt-3 md:mt-4">
              This case study is still in the works.
            </h1>
            <p className="mt-6 md:mt-8 max-w-2xl text-lg md:text-[22px] md:leading-[1.5] text-paper">
              We&apos;re enjoying the process a little too much to call it
              finished. In the meantime, here&apos;s some work that is.
            </p>
          </div>
        </Container>

        <Container className="mt-12 md:mt-16">
          <FeaturedCarousel projects={finished} />
        </Container>

        {/* Same closing treatment as the Studio page's sign-off. */}
        <Container className="mt-24 md:mt-32">
          <p className="font-display font-normal text-3xl md:text-[56px] md:leading-tight">
            Curious about {project.title}?{" "}
            <Link href="/contact" className="group relative inline-block text-cobalt">
              Ask us about it.
              <span
                aria-hidden="true"
                className="absolute left-0 -bottom-1 h-[2px] w-0 bg-current transition-all duration-300 ease-out md:group-hover:w-full"
              />
            </Link>
          </p>
        </Container>
      </section>
    </CaseStudyBackSwipe>
  );
}
