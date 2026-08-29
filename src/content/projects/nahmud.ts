import type { Project } from "./types";

const project: Project = {
  slug: "nahmud",
  title: "Nahmud",
  tagline: "[TAGLINE PLACEHOLDER] A short line capturing the brand's essence.",
  client: "Nahmud",
  year: "2023",
  industry: "Real Estate",
  summary:
    "[SUMMARY PLACEHOLDER] Replace with a one-line description of the Nahmud project.",
  brief:
    "[BRIEF PLACEHOLDER] Replace with the one-line challenge or question that framed this project.",
  overview: [
    "[PLACEHOLDER] Replace with the real project brief: what the client needed, and why.",
    "[PLACEHOLDER] Replace with a short paragraph on the approach and the outcome.",
  ],
  hero: {
    src: "/images/nahmud/cover.jpg",
    alt: "Nahmud. Cover image",
  },
  gallery: [
    {
      src: "/images/nahmud/gallery-1.svg",
      alt: "Nahmud. Placeholder — logo system needed here.",
      aspect: "square",
    },
    {
      src: "/images/nahmud/gallery-2.svg",
      alt: "Nahmud. Placeholder — color & type needed here.",
      aspect: "square",
    },
    {
      src: "/images/nahmud/gallery-3.svg",
      alt: "Nahmud. Placeholder — primary application photo needed here.",
      aspect: "portrait",
    },
    {
      src: "/images/nahmud/gallery-4.svg",
      alt: "Nahmud. Placeholder — environment or lifestyle photo needed here.",
      aspect: "wide",
    },
  ],
};

export default project;
