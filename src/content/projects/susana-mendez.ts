import type { Project } from "./types";

const project: Project = {
  slug: "susana-mendez",
  title: "Susana Méndez",
  client: "Susana Méndez",
  year: "[YEAR]",
  type: "[PROJECT TYPE]",
  services: ["[SERVICES TBD]"],
  summary: "[SUMMARY PLACEHOLDER] Replace with a one-line description of the Susana Méndez project.",
  hero: {
    src: "/images/susana-mendez/cover.jpg",
    alt: "Susana Méndez. Cover image",
  },
  overview: [
    "[PLACEHOLDER] Replace with the real project brief: what the client needed, and why.",
    "[PLACEHOLDER] Replace with a short paragraph on the approach and the outcome.",
  ],
  gallery: [
    {
      src: "/images/susana-mendez/gallery-1.svg",
      alt: "Susana Méndez. Placeholder — logo system needed here.",
      aspect: "square",
    },
    {
      src: "/images/susana-mendez/gallery-2.svg",
      alt: "Susana Méndez. Placeholder — color & type needed here.",
      aspect: "square",
    },
    {
      src: "/images/susana-mendez/gallery-3.svg",
      alt: "Susana Méndez. Placeholder — primary application photo needed here.",
      aspect: "portrait",
    },
    {
      src: "/images/susana-mendez/gallery-4.svg",
      alt: "Susana Méndez. Placeholder — environment or lifestyle photo needed here.",
      aspect: "wide",
    },
  ],
};

export default project;
