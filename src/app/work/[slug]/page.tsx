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
} from "@/content/projects";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return { title: `${project.title}. Tresunotres` };
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  const next = getAdjacentProject(project.slug);

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
            <span className="font-mono text-xs uppercase tracking-widest text-stone">
              {project.type}
            </span>
            <h1 className="font-display font-normal text-3xl md:text-4xl tracking-normal mt-2">
              {project.title}
            </h1>
            <div className="mt-6 space-y-4 text-stone">
              {project.overview.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
          <dl className="font-mono text-sm space-y-4 md:border-l md:border-mist md:pl-10">
            <div>
              <dt className="uppercase tracking-widest text-stone text-xs">
                Client
              </dt>
              <dd className="mt-1">{project.client}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest text-stone text-xs">
                Year
              </dt>
              <dd className="mt-1">{project.year}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest text-stone text-xs">
                Services
              </dt>
              <dd className="mt-1">{project.services.join(", ")}</dd>
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
          <span className="font-mono text-xs uppercase tracking-widest text-stone">
            Next project
          </span>
          <Link
            href={`/work/${next.slug}`}
            className="font-display text-lg hover:text-stone transition-colors"
          >
            {next.title} →
          </Link>
        </div>
      </Container>
    </article>
  );
}
