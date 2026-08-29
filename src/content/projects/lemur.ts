import type { Project } from "./types";

const project: Project = {
  slug: "lemur",
  title: "Lemur",
  tagline: "[TAGLINE PLACEHOLDER] A short line capturing the brand's essence.",
  client: "Lemur",
  year: "2018",
  industry: "Hospitality",
  summary:
    "[SUMMARY PLACEHOLDER] Replace with a one-line description of the Lemur project.",
  brief:
    "[BRIEF PLACEHOLDER] Replace with the one-line challenge or question that framed this project.",
  overview: [
    "[PLACEHOLDER] Replace with the real project brief: what the client needed, and why.",
    "[PLACEHOLDER] Replace with a short paragraph on the approach and the outcome.",
  ],
  hero: {
    src: "/images/lemur/cover.svg",
    alt: "Lemur. Cover image",
  },
  gallery: [
    {
      src: "/images/lemur/gallery-1.svg",
      alt: "Lemur. Placeholder — logo system needed here.",
      aspect: "square",
    },
    {
      src: "/images/lemur/gallery-2.svg",
      alt: "Lemur. Placeholder — color & type needed here.",
      aspect: "square",
    },
    {
      src: "/images/lemur/gallery-3.svg",
      alt: "Lemur. Placeholder — primary application photo needed here.",
      aspect: "portrait",
    },
    {
      src: "/images/lemur/gallery-4.svg",
      alt: "Lemur. Placeholder — environment or lifestyle photo needed here.",
      aspect: "wide",
    },
  ],
};

export default project;
