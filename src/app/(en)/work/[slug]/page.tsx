import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Gallery from "@/components/Gallery";
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
    <article>
      <div className="relative aspect-[16/9] w-full bg-mist">
        <Image
          src={project.hero.src}
          alt={project.hero.alt}
          fill
          priority
          className="object-cover"
        />
      </div>

      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-stone">
              {project.industry}
            </span>
            <h1 className="font-display font-normal text-3xl md:text-4xl tracking-normal mt-2">
              {project.title}
            </h1>
            <p className="font-display text-xl md:text-2xl italic text-stone mt-3 max-w-2xl">
              {project.tagline}
            </p>

            <div className="mt-10">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-stone mb-3">
                The brief
              </h2>
              <p className="font-display text-xl md:text-2xl font-normal leading-snug max-w-2xl">
                {project.brief}
              </p>
            </div>

            <div className="mt-10">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-stone mb-3">
                The idea
              </h2>
              <div className="space-y-4 text-stone">
                {project.overview.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
          <dl className="font-mono text-sm space-y-6 md:border-l md:border-mist md:pl-10">
            <div>
              <dt className="uppercase tracking-[0.2em] text-stone text-xs">
                Client
              </dt>
              <dd className="mt-1">{project.client}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.2em] text-stone text-xs">
                Year
              </dt>
              <dd className="mt-1">{project.year}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.2em] text-stone text-xs">
                Industry
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
          <Link href={`/work/${prev.slug}`} className="group">
            <span className="block font-mono text-xs uppercase tracking-[0.2em] text-stone mb-2">
              ← Previous
            </span>
            <span className="font-display text-lg group-hover:text-cobalt group-hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] transition-colors">
              {prev.title}
            </span>
          </Link>
          <Link href={`/work/${next.slug}`} className="group text-right">
            <span className="block font-mono text-xs uppercase tracking-[0.2em] text-stone mb-2">
              Next →
            </span>
            <span className="font-display text-lg group-hover:text-cobalt group-hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] transition-colors">
              {next.title}
            </span>
          </Link>
        </div>
      </Container>
    </article>
  );
}
