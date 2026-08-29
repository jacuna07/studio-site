import type { Project } from "./types";

const project: Project = {
  slug: "sama",
  title: "Sama",
  tagline: "[TAGLINE PLACEHOLDER] A short line capturing the brand's essence.",
  client: "Sama",
  year: "2020",
  industry: "Wellness",
  summary:
    "[SUMMARY PLACEHOLDER] Replace with a one-line description of the Sama project.",
  brief:
    "[BRIEF PLACEHOLDER] Replace with the one-line challenge or question that framed this project.",
  overview: [
    "[PLACEHOLDER] Replace with the real project brief: what the client needed, and why.",
    "[PLACEHOLDER] Replace with a short paragraph on the approach and the outcome.",
  ],
  hero: {
    src: "/images/sama/cover.svg",
    alt: "Sama. Cover image",
  },
  gallery: [
    {
      src: "/images/sama/gallery-1.svg",
      alt: "Sama. Placeholder — logo system needed here.",
      aspect: "square",
    },
    {
      src: "/images/sama/gallery-2.svg",
      alt: "Sama. Placeholder — color & type needed here.",
      aspect: "square",
    },
    {
      src: "/images/sama/gallery-3.svg",
      alt: "Sama. Placeholder — primary application photo needed here.",
      aspect: "portrait",
    },
    {
      src: "/images/sama/gallery-4.svg",
      alt: "Sama. Placeholder — environment or lifestyle photo needed here.",
      aspect: "wide",
    },
  ],
};

export default project;
