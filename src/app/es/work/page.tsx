import type { Metadata } from "next";
import Container from "@/components/Container";
import FilteredWorkGrid from "@/components/FilteredWorkGrid";
import { getAllProjects } from "@/content/projects-es";

export const metadata: Metadata = { title: "Trabajo. Tresunotres" };

export default function WorkPageEs() {
  const projects = getAllProjects();

  return (
    <section className="py-16">
      <Container>
        <h1 className="font-display font-normal text-3xl md:text-4xl tracking-normal mb-12">
          Trabajo
        </h1>
        <FilteredWorkGrid projects={projects} locale="es" />
      </Container>
    </section>
  );
}
