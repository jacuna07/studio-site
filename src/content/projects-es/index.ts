import type { Project } from "../projects/types";
import oxygen from "./oxygen";
import puralma from "./puralma";
import susanaMendez from "./susana-mendez";

export const projects: Project[] = [oxygen, puralma, susanaMendez];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string): Project {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return projects[0];
  return projects[(idx + 1) % projects.length];
}
