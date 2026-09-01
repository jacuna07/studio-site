import type { Project } from "./types";

const project: Project = {
  slug: "base-programming",
  title: "Base Programming",
  tagline: "[TAGLINE PLACEHOLDER] A short line capturing the brand's essence.",
  client: "Base Programming",
  year: "2024",
  industry: "Fitness",
  featured: true,
  featuredOrder: 3,
  summary:
    "[SUMMARY PLACEHOLDER] Replace with a one-line description of the Base Programming project.",
  brief:
    "[BRIEF PLACEHOLDER] Replace with the one-line challenge or question that framed this project.",
  overview: [
    "[PLACEHOLDER] Replace with the real project brief: what the client needed, and why.",
    "[PLACEHOLDER] Replace with a short paragraph on the approach and the outcome.",
  ],
  hero: {
    src: "/images/base-programming/cover.jpg",
    alt: "Base Programming. Cover image",
  },
  gallery: [
    {
      src: "/images/base-programming/gallery-1.svg",
      alt: "Base Programming. Placeholder — logo system needed here.",
      aspect: "square",
    },
    {
      src: "/images/base-programming/gallery-2.svg",
      alt: "Base Programming. Placeholder — color & type needed here.",
      aspect: "square",
    },
    {
      src: "/images/base-programming/gallery-3.svg",
      alt: "Base Programming. Placeholder — primary application photo needed here.",
      aspect: "portrait",
    },
    {
      src: "/images/base-programming/gallery-4.svg",
      alt: "Base Programming. Placeholder — environment or lifestyle photo needed here.",
      aspect: "wide",
    },
  ],
};

export default project;
