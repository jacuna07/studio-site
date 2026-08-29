import type { Project } from "./types";

const project: Project = {
  slug: "prime-futbol",
  title: "Prime Fútbol",
  tagline: "[TAGLINE PLACEHOLDER] A short line capturing the brand's essence.",
  client: "Prime Fútbol",
  year: "2023",
  industry: "Media",
  summary:
    "[SUMMARY PLACEHOLDER] Replace with a one-line description of the Prime Fútbol project.",
  brief:
    "[BRIEF PLACEHOLDER] Replace with the one-line challenge or question that framed this project.",
  overview: [
    "[PLACEHOLDER] Replace with the real project brief: what the client needed, and why.",
    "[PLACEHOLDER] Replace with a short paragraph on the approach and the outcome.",
  ],
  hero: {
    src: "/images/prime-futbol/cover.svg",
    alt: "Prime Fútbol. Cover image",
  },
  gallery: [
    {
      src: "/images/prime-futbol/gallery-1.svg",
      alt: "Prime Fútbol. Placeholder — logo system needed here.",
      aspect: "square",
    },
    {
      src: "/images/prime-futbol/gallery-2.svg",
      alt: "Prime Fútbol. Placeholder — color & type needed here.",
      aspect: "square",
    },
    {
      src: "/images/prime-futbol/gallery-3.svg",
      alt: "Prime Fútbol. Placeholder — primary application photo needed here.",
      aspect: "portrait",
    },
    {
      src: "/images/prime-futbol/gallery-4.svg",
      alt: "Prime Fútbol. Placeholder — environment or lifestyle photo needed here.",
      aspect: "wide",
    },
  ],
};

export default project;
