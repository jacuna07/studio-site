import type { Project } from "./types";
import auroraCoffee from "./aurora-coffee";
import lumenSupply from "./lumen-supply";
import northField from "./north-field";

export const projects: Project[] = [auroraCoffee, lumenSupply, northField];

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
