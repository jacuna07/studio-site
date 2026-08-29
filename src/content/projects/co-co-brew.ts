import type { Project } from "./types";

const project: Project = {
  slug: "co-co-brew",
  title: "Co.Co Brew",
  tagline: "[TAGLINE PLACEHOLDER] A short line capturing the brand's essence.",
  client: "Co.Co Brew",
  year: "2021",
  industry: "Startups",
  summary:
    "[SUMMARY PLACEHOLDER] Replace with a one-line description of the Co.Co Brew project.",
  brief:
    "[BRIEF PLACEHOLDER] Replace with the one-line challenge or question that framed this project.",
  overview: [
    "[PLACEHOLDER] Replace with the real project brief: what the client needed, and why.",
    "[PLACEHOLDER] Replace with a short paragraph on the approach and the outcome.",
  ],
  hero: {
    src: "/images/co-co-brew/cover.jpg",
    alt: "Co.Co Brew. Cover image",
  },
  gallery: [
    {
      src: "/images/co-co-brew/gallery-1.svg",
      alt: "Co.Co Brew. Placeholder — logo system needed here.",
      aspect: "square",
    },
    {
      src: "/images/co-co-brew/gallery-2.svg",
      alt: "Co.Co Brew. Placeholder — color & type needed here.",
      aspect: "square",
    },
    {
      src: "/images/co-co-brew/gallery-3.svg",
      alt: "Co.Co Brew. Placeholder — primary application photo needed here.",
      aspect: "portrait",
    },
    {
      src: "/images/co-co-brew/gallery-4.svg",
      alt: "Co.Co Brew. Placeholder — environment or lifestyle photo needed here.",
      aspect: "wide",
    },
  ],
};

export default project;
