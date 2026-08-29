import Link from "next/link";
import Container from "@/components/Container";
import WorkGrid from "@/components/WorkGrid";
import { getFeaturedProjects } from "@/content/projects";

export default function HomePage() {
  const projects = getFeaturedProjects().slice(0, 6);

  return (
    <>
      <section className="min-h-[calc(100vh-5rem)] flex flex-col justify-center py-20">
        <Container>
          <h1 className="font-display font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] max-w-5xl">
            <span className="block animate-line" style={{ animationDelay: "0ms" }}>
              Based in Costa Rica.
            </span>
            <span className="block animate-line" style={{ animationDelay: "150ms" }}>
              We construct visual identities through a
            </span>
            <span className="block animate-line" style={{ animationDelay: "300ms" }}>
              custom process perfected over years.
            </span>
            <span className="block animate-line" style={{ animationDelay: "450ms" }}>
              We design the foundations. Your brand enjoys the spotlight.
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
              Featured
            </h2>
            <Link
              href="/work"
              className="font-mono text-xs uppercase tracking-[0.2em] hover:text-cobalt hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] transition-colors"
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
