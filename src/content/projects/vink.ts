import type { Project } from "./types";

const project: Project = {
  slug: "vink",
  title: "Vink",
  tagline: "[TAGLINE PLACEHOLDER] A short line capturing the brand's essence.",
  client: "Vink",
  year: "2016",
  industry: "Tech",
  summary:
    "[SUMMARY PLACEHOLDER] Replace with a one-line description of the Vink project.",
  brief:
    "[BRIEF PLACEHOLDER] Replace with the one-line challenge or question that framed this project.",
  overview: [
    "[PLACEHOLDER] Replace with the real project brief: what the client needed, and why.",
    "[PLACEHOLDER] Replace with a short paragraph on the approach and the outcome.",
  ],
  hero: {
    src: "/images/vink/cover.jpg",
    alt: "Vink. Cover image",
  },
  gallery: [
    {
      src: "/images/vink/gallery-1.svg",
      alt: "Vink. Placeholder — logo system needed here.",
      aspect: "square",
    },
    {
      src: "/images/vink/gallery-2.svg",
      alt: "Vink. Placeholder — color & type needed here.",
      aspect: "square",
    },
    {
      src: "/images/vink/gallery-3.svg",
      alt: "Vink. Placeholder — primary application photo needed here.",
      aspect: "portrait",
    },
    {
      src: "/images/vink/gallery-4.svg",
      alt: "Vink. Placeholder — environment or lifestyle photo needed here.",
      aspect: "wide",
    },
  ],
};

export default project;
