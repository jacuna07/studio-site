import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Gallery from "@/components/Gallery";
import ShareButton from "@/components/ShareButton";
import CaseStudyBackSwipe from "@/components/CaseStudyBackSwipe";
import IconArrowLeft from "@/components/icons/IconArrowLeft";
import {
  getAllProjects,
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
  return { title: `${project.title}. Tresunotres`, description: project.summary };
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
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
          <div className="md:col-span-2">
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
          <dl className="font-mono text-sm space-y-6 md:self-start md:rounded-2xl md:border md:border-mist md:p-8">
            <div>
              <dt className="font-bold uppercase tracking-[0.2em] text-stone text-xs">
                Client
              </dt>
              <dd className="mt-1">{project.client}</dd>
            </div>
            <div>
              <dt className="font-bold uppercase tracking-[0.2em] text-stone text-xs">
                Year
              </dt>
              <dd className="mt-1">{project.year}</dd>
            </div>
            <div>
              <dt className="font-bold uppercase tracking-[0.2em] text-stone text-xs">
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

        <div className="mt-16">
          <Gallery images={project.gallery} />
        </div>

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
          <Link href={`/work/${prev.slug}`} className="group flex items-center gap-2">
            <IconArrowLeft className="h-3 w-3 md:h-4 md:w-4 shrink-0" />
            {/* Hover only on desktop (md:) — on mobile there's no real
                hover, and a tapped link can otherwise get visually
                "stuck" in its hover state on some mobile browsers. */}
            <span className="font-display text-lg md:text-xl md:group-hover:text-cobalt md:group-hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] transition-colors">
              {prev.title}
            </span>
          </Link>
          <Link href={`/work/${next.slug}`} className="group flex items-center gap-2 text-right">
            <span className="font-display text-lg md:text-xl md:group-hover:text-cobalt md:group-hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] transition-colors">
              {next.title}
            </span>
            {/* Same icon as Previous, mirrored: guarantees the two
                arrows are pixel-identical instead of relying on a
                font's left/right glyphs matching each other. */}
            <IconArrowLeft className="h-3 w-3 md:h-4 md:w-4 shrink-0 rotate-180" />
          </Link>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/work"
            className="group font-mono font-bold text-base md:text-lg uppercase tracking-[0.2em] md:hover:text-cobalt transition-colors"
          >
            <span className="relative">
              See all projects
              <span
                aria-hidden="true"
                className="absolute left-0 -bottom-2 h-[2px] w-0 bg-current transition-all duration-300 ease-out md:group-hover:w-full"
              />
            </span>
          </Link>
        </div>
      </Container>
      </article>
    </CaseStudyBackSwipe>
  );
}
