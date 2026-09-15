import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Gallery from "@/components/Gallery";
import ShareButton from "@/components/ShareButton";
import CaseStudyBackSwipe from "@/components/CaseStudyBackSwipe";
import {
  getAllProjects,
  getProjectBySlug,
  getAdjacentProject,
  getPreviousProject,
} from "@/content/projects-es";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return { title: `${project.title}. Tresunotres`, description: project.summary };
}

export default function ProjectPageEs({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  const next = getAdjacentProject(project.slug);
  const prev = getPreviousProject(project.slug);

  return (
    <CaseStudyBackSwipe workHref="/es/work" workTitle="Trabajo">
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
            <h1 className="font-display font-normal text-[42px] md:text-[50px] leading-tight tracking-normal mt-2">
              {project.title}
            </h1>
            <p className="font-display text-xl md:text-2xl italic text-stone mt-0 max-w-2xl">
              {project.tagline}
            </p>

            <div className="mt-6">
              <ShareButton title={project.title} text={project.tagline} locale="es" />
            </div>

            <div className="mt-10">
              <h2 className="font-mono font-bold text-xs uppercase tracking-[0.2em] text-stone mb-3">
                El brief
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
                La idea
              </h2>
              <div className="space-y-4 text-paper">
                {project.overview.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
          <dl className="font-mono text-sm space-y-6 md:border-l md:border-mist md:pl-10">
            <div>
              <dt className="font-bold uppercase tracking-[0.2em] text-stone text-xs">
                Cliente
              </dt>
              <dd className="mt-1">{project.client}</dd>
            </div>
            <div>
              <dt className="font-bold uppercase tracking-[0.2em] text-stone text-xs">
                Año
              </dt>
              <dd className="mt-1">{project.year}</dd>
            </div>
            <div>
              <dt className="font-bold uppercase tracking-[0.2em] text-stone text-xs">
                Industria
              </dt>
              <dd className="mt-1">{project.industry}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-16">
          <Gallery images={project.gallery} />
        </div>

        {project.quote && (
          <blockquote className="mt-16 border-t border-mist pt-10 text-xl md:text-2xl font-medium max-w-2xl">
            &ldquo;{project.quote.text}&rdquo;
            <footer className="mt-4 text-sm text-stone">
              {project.quote.author}
            </footer>
          </blockquote>
        )}

        <div className="mt-20 border-t border-mist pt-10 flex items-center justify-between">
          <Link href={`/es/work/${prev.slug}`} className="group">
            <span className="block font-mono font-bold text-xs uppercase tracking-[0.2em] text-stone mb-2">
              ← Anterior
            </span>
            <span className="font-display text-lg group-hover:text-cobalt group-hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] transition-colors">
              {prev.title}
            </span>
          </Link>
          <Link href={`/es/work/${next.slug}`} className="group text-right">
            <span className="block font-mono font-bold text-xs uppercase tracking-[0.2em] text-stone mb-2">
              Siguiente →
            </span>
            <span className="font-display text-lg group-hover:text-cobalt group-hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] transition-colors">
              {next.title}
            </span>
          </Link>
        </div>

        <div className="mt-10 flex justify-center">
          <ShareButton title={project.title} text={project.tagline} locale="es" />
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/es/work"
            className="group inline-flex items-center gap-2 font-mono text-base uppercase tracking-[0.2em] hover:text-cobalt transition-colors"
          >
            <span className="relative">
              Ver más proyectos
              <span
                aria-hidden="true"
                className="absolute left-0 -bottom-2 h-[2px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full"
              />
            </span>
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Container>
      </article>
    </CaseStudyBackSwipe>
  );
}
