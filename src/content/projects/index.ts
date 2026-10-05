import type { Project } from "./types";
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
];

export function getAllProjects(): Project[] {
  return projects;
}

/**
 * Featured projects in their Home page order. In-progress projects are
 * left out even when marked featured, so the module only ever links to
 * finished case studies; they reappear automatically once the
 * `inProgress` toggle comes off.
 */
export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured && !p.inProgress)
    .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));
}

/**
 * Every project's cover (everything on the Work page), for the hover
 * previews on the "See all projects" / "Discover more" CTAs.
 */
export function getAllCovers(): { src: string }[] {
  return projects.map((p) => ({ src: p.hero.src }));
}

/**
 * One project's stills in page order: cover first, then its gallery
 * images (videos left out). Drives the prev/next hover preview.
 */
export function getProjectImagery(project: Project): { src: string }[] {
  return [
    { src: project.hero.src },
    ...project.gallery
      .filter((g) => (g.type ?? "image") === "image")
      .map((g) => ({ src: g.src })),
  ];
}

/**
 * Every project's hero photo (16:9), for the Home hero's background
 * slideshow and its desktop cursor card.
 */
export function getBackdropImages(): { src: string; alt: string }[] {
  const seen = new Set<string>();
  const images: { src: string; alt: string }[] = [];
  // Hero photos only (set 2026-10-04; wide gallery images used to join).
  for (const p of projects) {
    const img = { src: p.hero.src, alt: p.hero.alt };
    if (seen.has(img.src)) continue;
    seen.add(img.src);
    images.push(img);
  }
  return images;
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
