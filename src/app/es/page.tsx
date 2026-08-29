import Link from "next/link";
import Container from "@/components/Container";
import WorkGrid from "@/components/WorkGrid";
import { getAllProjects } from "@/content/projects-es";

export default function HomePageEs() {
  const projects = getAllProjects();

  return (
    <>
      <section className="py-28 md:py-40">
        <Container>
          <h1 className="font-display font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] max-w-5xl">
            Somos Tresunotres.
            <br />
            Dos diseñadores en Costa Rica que
            <br />
            construyen identidad de marca, empaques
            <br />
            y sistemas visuales{" "}
            <span className="italic">desde adentro hacia afuera.</span>
          </h1>
          <div className="mt-16 flex justify-center">
            <a
              href="#work"
              aria-label="Ir al trabajo"
              className="text-2xl text-stone hover:text-cobalt transition-colors"
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
              Trabajo seleccionado
            </h2>
            <Link
              href="/es/work"
              className="font-mono text-xs uppercase tracking-[0.2em] hover:text-cobalt hover:font-bold transition-colors"
            >
              Ver todo
            </Link>
          </div>
          <WorkGrid projects={projects} locale="es" />
        </Container>
      </section>
    </>
  );
}
