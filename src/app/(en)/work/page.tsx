import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Container from "@/components/Container";
import FilteredWorkGrid from "@/components/FilteredWorkGrid";
import CaseStudyBackSwipe from "@/components/CaseStudyBackSwipe";
import { getAllProjects } from "@/content/projects";

export const metadata: Metadata = pageMetadata({
  page: "Work",
  description: "Selected brand identities by Tresunotres, a brand design studio based in Costa Rica.",
  path: "/work",
});

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <CaseStudyBackSwipe targetHref="/" targetLabel="Home" hint={false}>
      <section className="py-16 animate-page-in">
        <Container>
          {/* Phones (set 2026-10-06, like Home and Studio): the title and
              the filters rise in on load, then each card as it comes into
              view. */}
          <h1 className="reveal-on-load-phone font-display font-normal text-3xl md:text-[56px] md:leading-tight tracking-normal mb-12">
            Work
          </h1>
          <FilteredWorkGrid projects={projects} revealOnPhones />
        </Container>
      </section>
    </CaseStudyBackSwipe>
  );
}
