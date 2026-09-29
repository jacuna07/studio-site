import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/Container";
import Gallery from "@/components/Gallery";
import ShareButton from "@/components/ShareButton";
import CaseStudyBackSwipe from "@/components/CaseStudyBackSwipe";
import InProgressCaseStudy from "@/components/InProgressCaseStudy";
import AdjacentProjectLink from "@/components/AdjacentProjectLink";
import SeeAllProjectsCta from "@/components/SeeAllProjectsCta";
import { pageMetadata, projectShareImage } from "@/lib/metadata";
import {
  getAllProjects,
  getProjectImagery,
  getProjectBySlug,
  getAdjacentProject,
  getPreviousProject,
} from "@/content/projects";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  // "[Project] | Tresunotres.co", shared with the project's own cover.
  const base = {
    page: project.title,
    path: `/work/${project.slug}`,
    image: projectShareImage(project.slug, project.hero),
  };
  if (project.inProgress) {
    // The project's own copy may still be placeholder text, so it's kept
    // out of the description, and the page is kept out of search results
    // (and the sitemap) until the case study is ready.
    return pageMetadata({
      ...base,
      description: `The ${project.title} case study is still in the works.`,
      noindex: true,
    });
  }
  return pageMetadata({ ...base, description: project.summary });
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  if (project.inProgress) return <InProgressCaseStudy project={project} />;
  const next = getAdjacentProject(project.slug);
  const prev = getPreviousProject(project.slug);

  return (
    <CaseStudyBackSwipe targetHref="/work" targetLabel="Work">
      <article className="animate-case-study-in">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-mist">
          {project.hero.video ? (
            <video
              src={project.hero.video}
              poster={project.hero.src}
              aria-label={project.hero.alt}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <Image
              src={project.hero.src}
              alt={project.hero.alt}
              fill
              priority
              className="object-cover"
            />
          )}
        </div>

        <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* max-w-copy: keeps the case study text at a reading width on
              big screens now that the grid is wider (unchanged at 1440). */}
          <div className="md:col-span-2 max-w-copy">
            <span className="font-mono font-bold text-xs uppercase tracking-[0.2em] text-stone">
              {project.industry}
            </span>
            <h1 className="font-display font-normal text-[42px] md:text-[56px] leading-tight tracking-normal mt-2">
              {project.title}
            </h1>
            <p className="font-display text-xl md:text-2xl italic text-stone mt-0 max-w-2xl">
              {project.tagline}
            </p>

            <div className="mt-10">
              <h2 className="font-mono font-bold text-xs uppercase tracking-[0.2em] text-stone mb-3">
                The brief
              </h2>
              <p
                className="font-display text-[27px] md:text-[32px] font-normal leading-snug max-w-2xl text-[var(--body-color,#ffffff)]"
                style={
                  project.theme
                    ? ({ "--body-color": project.theme.bodyColor } as CSSProperties)
                    : undefined
                }
              >
                {project.brief}
              </p>
            </div>

            <div className="mt-10">
              <h2 className="font-mono font-bold text-xs uppercase tracking-[0.2em] text-stone mb-3">
                The idea
              </h2>
              <div className="space-y-4 text-paper md:text-lg">
                {project.overview.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
          {/* Desktop: a thin line on the left sets the details apart, and
              the labels take the project's accent color (the same one the
              brief above uses; stone when a project has none). Mobile keeps
              plain stone labels with no divider. */}
          <dl
            className="font-mono text-sm space-y-6 md:self-start md:border-l md:border-mist md:pl-8"
            style={
              project.theme
                ? ({ "--meta-accent": project.theme.bodyColor } as CSSProperties)
                : undefined
            }
          >
            <div>
              <dt className="font-bold uppercase tracking-[0.2em] text-stone md:text-[var(--meta-accent,#8B8F9B)] text-xs">
                Client
              </dt>
              <dd className="mt-1">{project.client}</dd>
            </div>
            <div>
              <dt className="font-bold uppercase tracking-[0.2em] text-stone md:text-[var(--meta-accent,#8B8F9B)] text-xs">
                Year
              </dt>
              <dd className="mt-1">{project.year}</dd>
            </div>
            <div>
              <dt className="font-bold uppercase tracking-[0.2em] text-stone md:text-[var(--meta-accent,#8B8F9B)] text-xs">
                Industry
              </dt>
              <dd className="mt-1">{project.industry}</dd>
            </div>
            <div>
              <ShareButton
                title={project.title}
                text={project.tagline}
                locale="en"
                label="Share project"
              />
            </div>
          </dl>
        </div>

        {project.gallery.length > 0 && (
          <div className="mt-16">
            <Gallery images={project.gallery} />
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <ShareButton title={project.title} text={project.tagline} locale="en" size="lg" />
        </div>

        {project.quote && (
          <blockquote className="mt-16 border-t border-mist pt-10 text-xl md:text-[36px] font-medium max-w-2xl">
            &ldquo;{project.quote.text}&rdquo;
            <footer className="mt-4 text-sm text-stone">
              {project.quote.author}
            </footer>
          </blockquote>
        )}

        <div className="mt-20 border-t border-mist pt-10 flex items-center justify-between">
          {/* On desktop, hovering either link shows a small preview next
              to the cursor that steps through that project's imagery. */}
          <AdjacentProjectLink
            href={`/work/${prev.slug}`}
            title={prev.title}
            images={getProjectImagery(prev)}
            direction="prev"
          />
          <AdjacentProjectLink
            href={`/work/${next.slug}`}
            title={next.title}
            images={getProjectImagery(next)}
            direction="next"
          />
        </div>

      </Container>

      {/* Same closing block as the Home page, right above the footer. */}
      <SeeAllProjectsCta className="mt-4" />
      </article>
    </CaseStudyBackSwipe>
  );
}
