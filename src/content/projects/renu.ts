import type { Project } from "./types";

const project: Project = {
  slug: "renu",
  title: "Renū",
  tagline: "[TAGLINE PLACEHOLDER] A short line capturing the brand's essence.",
  client: "Renū",
  year: "2021",
  industry: "Fitness",
  summary:
    "[SUMMARY PLACEHOLDER] Replace with a one-line description of the Renū project.",
  brief:
    "[BRIEF PLACEHOLDER] Replace with the one-line challenge or question that framed this project.",
  overview: [
    "[PLACEHOLDER] Replace with the real project brief: what the client needed, and why.",
    "[PLACEHOLDER] Replace with a short paragraph on the approach and the outcome.",
  ],
  hero: {
    src: "/images/renu/cover.jpg",
    alt: "Renū. Cover image",
  },
  gallery: [
    {
      src: "/images/renu/gallery-1.svg",
      alt: "Renū. Placeholder — logo system needed here.",
      aspect: "square",
    },
    {
      src: "/images/renu/gallery-2.svg",
      alt: "Renū. Placeholder — color & type needed here.",
      aspect: "square",
    },
    {
      src: "/images/renu/gallery-3.svg",
      alt: "Renū. Placeholder — primary application photo needed here.",
      aspect: "portrait",
    },
    {
      src: "/images/renu/gallery-4.svg",
      alt: "Renū. Placeholder — environment or lifestyle photo needed here.",
      aspect: "wide",
    },
  ],
};

export default project;
