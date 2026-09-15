import type { Metadata } from "next";
import Container from "@/components/Container";
import FilteredWorkGrid from "@/components/FilteredWorkGrid";
import CaseStudyBackSwipe from "@/components/CaseStudyBackSwipe";
import { getAllProjects } from "@/content/projects";

export const metadata: Metadata = { title: "Work. Tresunotres" };

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <CaseStudyBackSwipe targetHref="/" targetLabel="Home" hint={false}>
      <section className="py-16 animate-page-in">
        <Container>
          <h1 className="font-display font-normal text-3xl md:text-4xl tracking-normal mb-12">
            Work
          </h1>
          <FilteredWorkGrid projects={projects} />
        </Container>
      </section>
    </CaseStudyBackSwipe>
  );
}
