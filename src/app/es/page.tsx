import Link from "next/link";
import Container from "@/components/Container";
import WorkGrid from "@/components/WorkGrid";
import { getAllProjects } from "@/content/projects-es";

export default function HomePageEs() {
  const projects = getAllProjects();

  return (
    <>
      <section className="py-20 md:py-28">
        <Container>
          <h1 className="font-display font-normal text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-normal max-w-3xl">
            Un estudio de branding que construye identidades duraderas.
          </h1>
          <p className="mt-6 text-lg text-stone max-w-xl">
            Diseñamos identidad de marca, empaques y sistemas visuales para
            empresas que quieren ser recordadas.
          </p>
          <Link
            href="/es/contact"
            className="inline-block mt-8 border border-paper px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] hover:border-cobalt hover:bg-cobalt hover:text-paper transition-colors"
          >
            Trabajemos juntos
          </Link>
        </Container>
      </section>

      <section className="py-16 border-t border-mist">
        <Container>
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-stone">
              Trabajo seleccionado
            </h2>
            <Link
              href="/es/work"
              className="font-mono text-xs uppercase tracking-[0.2em] hover:text-stone transition-colors"
            >
              Ver todo
            </Link>
          </div>
          <WorkGrid projects={projects} />
        </Container>
      </section>
    </>
  );
}
