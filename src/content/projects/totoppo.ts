import type { Project } from "./types";

const project: Project = {
  slug: "totoppo",
  title: "Totoppo",
  tagline: "[TAGLINE PLACEHOLDER] A short line capturing the brand's essence.",
  client: "Totoppo",
  year: "2026",
  industry: "Furniture",
  summary:
    "[SUMMARY PLACEHOLDER] Replace with a one-line description of the Totoppo project.",
  brief:
    "[BRIEF PLACEHOLDER] Replace with the one-line challenge or question that framed this project.",
  overview: [
    "[PLACEHOLDER] Replace with the real project brief: what the client needed, and why.",
    "[PLACEHOLDER] Replace with a short paragraph on the approach and the outcome.",
  ],
  hero: {
    src: "/images/totoppo/cover.jpg",
    alt: "Totoppo. Cover image",
  },
  gallery: [
    {
      src: "/images/totoppo/gallery-1.jpg",
      alt: "Totoppo. Brand mark on maroon.",
      aspect: "square",
    },
    {
      src: "/images/totoppo/gallery-2.jpg",
      alt: "Totoppo. Chair in a styled interior.",
      aspect: "square",
    },
    {
      src: "/images/totoppo/gallery-3.jpg",
      alt: "Totoppo. Logotype construction detail.",
      aspect: "wide",
    },
  ],
};

export default project;
