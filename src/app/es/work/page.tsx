import type { Metadata } from "next";
import Container from "@/components/Container";
import FilteredWorkGrid from "@/components/FilteredWorkGrid";
import CaseStudyBackSwipe from "@/components/CaseStudyBackSwipe";
import { getAllProjects } from "@/content/projects-es";

export const metadata: Metadata = { title: "Trabajo. Tresunotres" };

export default function WorkPageEs() {
  const projects = getAllProjects();

  return (
    <CaseStudyBackSwipe targetHref="/es" targetLabel="Inicio" hint={false}>
      <section className="py-16 animate-page-in">
        <Container>
          <h1 className="font-display font-normal text-3xl md:text-[56px] md:leading-tight tracking-normal mb-12">
            Trabajo
          </h1>
          <FilteredWorkGrid projects={projects} locale="es" />
        </Container>
      </section>
    </CaseStudyBackSwipe>
  );
}
