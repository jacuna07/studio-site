import Link from "next/link";
import Container from "@/components/Container";
import WorkGrid from "@/components/WorkGrid";
import { getAllProjects } from "@/content/projects";

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <>
      <section className="min-h-[calc(100vh-5rem)] flex flex-col justify-center py-20">
        <Container>
          <h1 className="font-display font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] max-w-5xl">
            <span className="block animate-line" style={{ animationDelay: "0ms" }}>
              We&rsquo;re Tresunotres.
            </span>
            <span className="block animate-line" style={{ animationDelay: "150ms" }}>
              Two designers in Costa Rica who build
            </span>
            <span className="block animate-line" style={{ animationDelay: "300ms" }}>
              brand identity, packaging, and visual
            </span>
            <span className="block animate-line" style={{ animationDelay: "450ms" }}>
              systems <span className="italic">from the inside out.</span>
            </span>
          </h1>
          <div className="mt-16 flex justify-center">
            <a
              href="#work"
              aria-label="Scroll to work"
              className="text-6xl md:text-7xl text-stone hover:text-cobalt transition-colors"
            >
              ↓
            </a>
          </div>
        </Container>
      </section>

      <section id="work" className="py-16 border-t border-mist">
        <Container>
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-stone">
              Selected work
            </h2>
            <Link
              href="/work"
              className="font-mono text-xs uppercase tracking-[0.2em] hover:text-cobalt hover:font-bold transition-colors"
            >
              View all
            </Link>
          </div>
          <WorkGrid projects={projects} />
          <div className="mt-16 flex justify-center">
            <Link
              href="/work"
              className="inline-block border border-paper px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] hover:border-cobalt hover:bg-cobalt hover:text-paper transition-colors"
            >
              See more
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
