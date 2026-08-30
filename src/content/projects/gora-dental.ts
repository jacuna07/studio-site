import type { Project } from "./types";

const project: Project = {
  slug: "gora-dental",
  title: "Gora Dental",
  tagline: "[TAGLINE PLACEHOLDER] A short line capturing the brand's essence.",
  client: "Gora Dental",
  year: "2016",
  industry: "Healthcare",
  summary:
    "[SUMMARY PLACEHOLDER] Replace with a one-line description of the Gora Dental project.",
  brief:
    "[BRIEF PLACEHOLDER] Replace with the one-line challenge or question that framed this project.",
  overview: [
    "[PLACEHOLDER] Replace with the real project brief: what the client needed, and why.",
    "[PLACEHOLDER] Replace with a short paragraph on the approach and the outcome.",
  ],
  hero: {
    src: "/images/gora-dental/cover.jpg",
    alt: "Gora Dental. Cover image",
  },
  gallery: [
    {
      src: "/images/gora-dental/gallery-1.svg",
      alt: "Gora Dental. Placeholder — logo system needed here.",
      aspect: "square",
    },
    {
      src: "/images/gora-dental/gallery-2.svg",
      alt: "Gora Dental. Placeholder — color & type needed here.",
      aspect: "square",
    },
    {
      src: "/images/gora-dental/gallery-3.svg",
      alt: "Gora Dental. Placeholder — primary application photo needed here.",
      aspect: "portrait",
    },
    {
      src: "/images/gora-dental/gallery-4.svg",
      alt: "Gora Dental. Placeholder — environment or lifestyle photo needed here.",
      aspect: "wide",
    },
  ],
};

export default project;
