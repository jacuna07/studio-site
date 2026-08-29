import type { Project } from "../projects/types";
import oxygen from "./oxygen";
import puralma from "./puralma";
import susanaMendez from "./susana-mendez";
import cocoBrew from "./co-co-brew";
import fiveTrainingCenter from "./five-training-center";
import nahmudRealEstate from "./nahmud-real-estate";

export const projects: Project[] = [
  oxygen,
  puralma,
  susanaMendez,
  cocoBrew,
  fiveTrainingCenter,
  nahmudRealEstate,
];

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

export function getPreviousProject(slug: string): Project {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return projects[0];
  return projects[(idx - 1 + projects.length) % projects.length];
}
