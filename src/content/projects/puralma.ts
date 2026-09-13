import type { Project } from "./types";

const project: Project = {
  slug: "puralma",
  title: "Puralma",
  tagline: "An identity as bold as the food.",
  client: "Puralma",
  year: "2026",
  industry: "Food & Restaurants",
  featured: true,
  featuredOrder: 2,
  summary:
    "A rebrand for one of Costa Rica's best known vegan restaurants, built around the tagline: Revolutionary but kind.",
  brief:
    "A brand update for Barrio Escalante's staple vegan kitchen, made for a more mature chapter.",
  overview: [
    "Puralma opened in Barrio Escalante and let the kitchen speak first. No fuss, just food good enough to make it a regular stop in one of Costa Rica's most visited neighborhoods, celebrities passing through the country included.",
    "That kind of reach called for a brand that could hold it. We built the identity around \"Revolutionary but kind,\" the same conviction that built the kitchen's reputation in the first place, now given a face that matches where Puralma stands today.",
    "The result is a brand that reads as confidently as the food tastes: ready for a bigger stage, without losing the kindness that built it.",
  ],
  hero: { src: "/images/puralma/cover.jpg", alt: "Puralma. Cover image" },
  gallery: [
    {
      src: "/images/puralma/gallery-1.svg",
      alt: "Puralma. Placeholder — logo system needed here.",
      aspect: "square",
    },
    {
      src: "/images/puralma/gallery-2.svg",
      alt: "Puralma. Placeholder — color & type needed here.",
      aspect: "square",
    },
    {
      src: "/images/puralma/gallery-3.svg",
      alt: "Puralma. Placeholder — primary application photo needed here.",
      aspect: "portrait",
    },
    {
      src: "/images/puralma/gallery-4.svg",
      alt: "Puralma. Placeholder — environment or lifestyle photo needed here.",
      aspect: "wide",
    },
  ],
};

export default project;
