import type { Project } from "../projects/types";
import oxygen from "./oxygen";
import puralma from "./puralma";
import susanaMendez from "./susana-mendez";
import cocoBrew from "./co-co-brew";
import fiveTrainingCenter from "./five-training-center";
import naharaPilates from "./nahara-pilates";
import lux from "./lux";
import vink from "./vink";
import goraDental from "./gora-dental";
import primeFutbol from "./prime-futbol";
import totoppo from "./totoppo";
import baseProgramming from "./base-programming";
import valerios from "./valerios";
import amimed from "./amimed";
import nahmud from "./nahmud";
import sunari from "./sunari";
import zero from "./zero";
import renu from "./renu";
import datasysGroup from "./datasys-group";

export const projects: Project[] = [
  oxygen,
  puralma,
  susanaMendez,
  cocoBrew,
  fiveTrainingCenter,
  naharaPilates,
  lux,
  vink,
  goraDental,
  primeFutbol,
  totoppo,
  baseProgramming,
  valerios,
  amimed,
  nahmud,
  sunari,
  zero,
  renu,
  datasysGroup,
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));
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
