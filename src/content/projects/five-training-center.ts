import type { Project } from "./types";

const project: Project = {
  slug: "five-training-center",
  inProgress: true,
  title: "Five Training Center",
  tagline: "[TAGLINE PLACEHOLDER] A short line capturing the brand's essence.",
  client: "Five Training Center",
  year: "2022",
  industry: "Fitness",
  featured: false,
  summary:
    "[SUMMARY PLACEHOLDER] Replace with a one-line description of the Five Training Center project.",
  brief:
    "[BRIEF PLACEHOLDER] Replace with the one-line challenge or question that framed this project.",
  overview: [
    "[PLACEHOLDER] Replace with the real project brief: what the client needed, and why.",
    "[PLACEHOLDER] Replace with a short paragraph on the approach and the outcome.",
  ],
  hero: {
    src: "/images/five-training-center/cover.jpg",
    alt: "Five Training Center. Cover image",
  },
  gallery: [],
  theme: { bodyColor: "#5B5BA5" },
};

export default project;
