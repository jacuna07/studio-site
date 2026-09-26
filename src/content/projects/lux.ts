import type { Project } from "./types";

const project: Project = {
  slug: "lux",
  inProgress: true,
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
  gallery: [],
  theme: { bodyColor: "#EFA80A" },
};

export default project;
