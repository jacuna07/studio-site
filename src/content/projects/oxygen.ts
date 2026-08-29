import type { Project } from "./types";

const project: Project = {
  slug: "oxygen",
  title: "Oxygen",
  client: "Oxygen",
  year: "[YEAR]",
  type: "[PROJECT TYPE]",
  services: ["[SERVICES TBD]"],
  summary: "[SUMMARY PLACEHOLDER] Replace with a one-line description of the Oxygen project.",
  hero: {
    src: "/images/oxygen/cover.jpg",
    alt: "Oxygen. Cover image",
  },
  overview: [
    "[PLACEHOLDER] Replace with the real project brief: what the client needed, and why.",
    "[PLACEHOLDER] Replace with a short paragraph on the approach and the outcome.",
  ],
  gallery: [
    {
      src: "/images/oxygen/gallery-1.svg",
      alt: "Oxygen. Placeholder — logo system needed here.",
      aspect: "square",
    },
    {
      src: "/images/oxygen/gallery-2.svg",
      alt: "Oxygen. Placeholder — color & type needed here.",
      aspect: "square",
    },
    {
      src: "/images/oxygen/gallery-3.svg",
      alt: "Oxygen. Placeholder — primary application photo needed here.",
      aspect: "portrait",
    },
    {
      src: "/images/oxygen/gallery-4.svg",
      alt: "Oxygen. Placeholder — environment or lifestyle photo needed here.",
      aspect: "wide",
    },
  ],
};

export default project;
