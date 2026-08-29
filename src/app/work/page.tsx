import type { Metadata } from "next";
import Container from "@/components/Container";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/content/projects";

export const metadata: Metadata = { title: "Work — Tresunotres" };

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <section className="py-16">
      <Container>
        <h1 className="font-display font-normal text-3xl md:text-4xl tracking-normal mb-12">
          Work
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-mist border border-mist">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i + 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}
