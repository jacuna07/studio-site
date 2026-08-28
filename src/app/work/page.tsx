import type { Metadata } from "next";
import Container from "@/components/Container";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/content/projects";

export const metadata: Metadata = { title: "Work — Studio" };

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <section className="py-16">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight mb-12">Work</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
