import type { Project } from "./types";

const project: Project = {
  slug: "amimed",
  title: "Amimed",
  tagline: "[TAGLINE PLACEHOLDER] A short line capturing the brand's essence.",
  client: "Amimed",
  year: "2017",
  industry: "Healthcare",
  summary:
    "[SUMMARY PLACEHOLDER] Replace with a one-line description of the Amimed project.",
  brief:
    "[BRIEF PLACEHOLDER] Replace with the one-line challenge or question that framed this project.",
  overview: [
    "[PLACEHOLDER] Replace with the real project brief: what the client needed, and why.",
    "[PLACEHOLDER] Replace with a short paragraph on the approach and the outcome.",
  ],
  hero: {
    src: "/images/amimed/cover.jpg",
    alt: "Amimed. Cover image",
  },
  gallery: [
    {
      src: "/images/amimed/gallery-1.svg",
      alt: "Amimed. Placeholder — logo system needed here.",
      aspect: "square",
    },
    {
      src: "/images/amimed/gallery-2.svg",
      alt: "Amimed. Placeholder — color & type needed here.",
      aspect: "square",
    },
    {
      src: "/images/amimed/gallery-3.svg",
      alt: "Amimed. Placeholder — primary application photo needed here.",
      aspect: "portrait",
    },
    {
      src: "/images/amimed/gallery-4.svg",
      alt: "Amimed. Placeholder — environment or lifestyle photo needed here.",
      aspect: "wide",
    },
  ],
};

export default project;
