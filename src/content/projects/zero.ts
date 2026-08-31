import type { Project } from "./types";

const project: Project = {
  slug: "zero",
  title: "Zero",
  tagline: "[TAGLINE PLACEHOLDER] A short line capturing the brand's essence.",
  client: "Zero",
  year: "2016",
  industry: "Media",
  summary:
    "[SUMMARY PLACEHOLDER] Replace with a one-line description of the Zero project.",
  brief:
    "[BRIEF PLACEHOLDER] Replace with the one-line challenge or question that framed this project.",
  overview: [
    "[PLACEHOLDER] Replace with the real project brief: what the client needed, and why.",
    "[PLACEHOLDER] Replace with a short paragraph on the approach and the outcome.",
  ],
  hero: {
    src: "/images/zero/cover.jpg",
    alt: "Zero. Cover image",
  },
  gallery: [
    {
      src: "/images/zero/gallery-1.svg",
      alt: "Zero. Placeholder — logo system needed here.",
      aspect: "square",
    },
    {
      src: "/images/zero/gallery-2.svg",
      alt: "Zero. Placeholder — color & type needed here.",
      aspect: "square",
    },
    {
      src: "/images/zero/gallery-3.svg",
      alt: "Zero. Placeholder — primary application photo needed here.",
      aspect: "portrait",
    },
    {
      src: "/images/zero/gallery-4.svg",
      alt: "Zero. Placeholder — environment or lifestyle photo needed here.",
      aspect: "wide",
    },
  ],
};

export default project;
