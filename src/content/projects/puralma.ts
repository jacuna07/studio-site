import type { Project } from "./types";

const project: Project = {
  slug: "puralma",
  title: "Puralma",
  tagline: "[TAGLINE PLACEHOLDER] A short line capturing the brand's essence.",
  client: "Puralma",
  year: "2026",
  industry: "Food & Restaurants",
  featured: true,
  featuredOrder: 2,
  summary: "[SUMMARY PLACEHOLDER] Replace with a one-line description of the Puralma project.",
  brief:
    "[BRIEF PLACEHOLDER] Replace with the one-line challenge or question that framed this project.",
  overview: [
    "[PLACEHOLDER] Replace with the real project brief: what the client needed, and why.",
    "[PLACEHOLDER] Replace with a short paragraph on the approach and the outcome.",
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
