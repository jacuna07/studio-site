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
      src: "/images/oxygen/cover.jpg",
      alt: "Oxygen. Cover image",
      aspect: "wide",
    },
  ],
};

export default project;
