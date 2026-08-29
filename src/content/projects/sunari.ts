import type { Project } from "./types";

const project: Project = {
  slug: "sunari",
  title: "Sunari",
  tagline: "[TAGLINE PLACEHOLDER] A short line capturing the brand's essence.",
  client: "Sunari",
  year: "2017",
  industry: "Startups",
  summary:
    "[SUMMARY PLACEHOLDER] Replace with a one-line description of the Sunari project.",
  brief:
    "[BRIEF PLACEHOLDER] Replace with the one-line challenge or question that framed this project.",
  overview: [
    "[PLACEHOLDER] Replace with the real project brief: what the client needed, and why.",
    "[PLACEHOLDER] Replace with a short paragraph on the approach and the outcome.",
  ],
  hero: {
    src: "/images/sunari/cover.svg",
    alt: "Sunari. Cover image",
  },
  gallery: [
    {
      src: "/images/sunari/gallery-1.svg",
      alt: "Sunari. Placeholder — logo system needed here.",
      aspect: "square",
    },
    {
      src: "/images/sunari/gallery-2.svg",
      alt: "Sunari. Placeholder — color & type needed here.",
      aspect: "square",
    },
    {
      src: "/images/sunari/gallery-3.svg",
      alt: "Sunari. Placeholder — primary application photo needed here.",
      aspect: "portrait",
    },
    {
      src: "/images/sunari/gallery-4.svg",
      alt: "Sunari. Placeholder — environment or lifestyle photo needed here.",
      aspect: "wide",
    },
  ],
};

export default project;
