import Link from "next/link";
import Container from "@/components/Container";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/content/projects";

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <>
      <section className="py-20 md:py-28">
        <Container>
          <h1 className="font-display font-normal text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-normal max-w-3xl">
            A branding studio building identities that last.
          </h1>
          <p className="mt-6 text-lg text-stone max-w-xl">
            We design brand identity, packaging, and visual systems for
            companies that want to be remembered.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-8 border border-paper px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] hover:bg-paper hover:text-ink transition-colors"
          >
            Start a project
          </Link>
        </Container>
      </section>

      <section className="py-16 border-t border-mist">
        <Container>
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-stone">
              Selected work
            </h2>
            <Link
              href="/work"
              className="font-mono text-xs uppercase tracking-[0.2em] hover:text-stone transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-mist border border-mist">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i + 1} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
