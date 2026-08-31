import type { Project } from "./types";

const project: Project = {
  slug: "lux",
  title: "Lux Project",
  tagline: "[TAGLINE PLACEHOLDER] A short line capturing the brand's essence.",
  client: "Lux",
  year: "2018",
  industry: "Fitness",
  summary:
    "[SUMMARY PLACEHOLDER] Replace with a one-line description of the Lux project.",
  brief:
    "[BRIEF PLACEHOLDER] Replace with the one-line challenge or question that framed this project.",
  overview: [
    "[PLACEHOLDER] Replace with the real project brief: what the client needed, and why.",
    "[PLACEHOLDER] Replace with a short paragraph on the approach and the outcome.",
  ],
  hero: {
    src: "/images/lux/cover.jpg",
    alt: "Lux Project. Cover image",
  },
  gallery: [
    {
      src: "/images/lux/gallery-1.svg",
      alt: "Lux. Placeholder — logo system needed here.",
      aspect: "square",
    },
    {
      src: "/images/lux/gallery-2.svg",
      alt: "Lux. Placeholder — color & type needed here.",
      aspect: "square",
    },
    {
      src: "/images/lux/gallery-3.svg",
      alt: "Lux. Placeholder — primary application photo needed here.",
      aspect: "portrait",
    },
    {
      src: "/images/lux/gallery-4.svg",
      alt: "Lux. Placeholder — environment or lifestyle photo needed here.",
      aspect: "wide",
    },
  ],
};

export default project;
