import Link from "next/link";
import Container from "@/components/Container";
import WorkGrid from "@/components/WorkGrid";
import CursorRevealGrid from "@/components/CursorRevealGrid";
import { getFeaturedProjects } from "@/content/projects-es";

export default function HomePageEs() {
  const projects = getFeaturedProjects().slice(0, 6);

  return (
    <>
      <section className="min-h-[calc(100vh-5rem)] flex flex-col justify-center py-20">
        <Container>
          <h1 className="font-display font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] max-w-5xl">
            <span className="block animate-line" style={{ animationDelay: "0ms" }}>
              Construimos identidades visuales mediante un
            </span>
            <span className="block animate-line" style={{ animationDelay: "150ms" }}>
              proceso a la medida perfeccionado por años.
            </span>
            <span className="block animate-line mt-10" style={{ animationDelay: "600ms" }}>
              Diseñamos los cimientos.
            </span>
            <span className="block animate-line" style={{ animationDelay: "750ms" }}>
              Tu marca disfruta{" "}
              <a href="#work" className="group relative inline-block text-cobalt">
                el protagonismo.
                <span
                  aria-hidden="true"
                  className="absolute left-0 -bottom-1 h-[2px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full"
                />
              </a>
            </span>
          </h1>
          <div className="mt-16 flex justify-center">
            <a
              href="#work"
              aria-label="Ir al trabajo"
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
              Destacado
            </h2>
            <Link
              href="/es/work"
              className="font-mono text-xs uppercase tracking-[0.2em] hover:text-cobalt hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] transition-colors"
            >
              Ver todo
            </Link>
          </div>
          <CursorRevealGrid>
            <WorkGrid projects={projects} locale="es" />
          </CursorRevealGrid>
          <div className="mt-16 flex justify-center">
            <Link
              href="/es/work"
              className="group inline-flex items-center gap-2 font-mono text-base uppercase tracking-[0.2em] hover:text-cobalt transition-colors"
            >
              <span className="relative">
                Más cosas geniales
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
      </section>
    </>
  );
}
