import type { Project } from "./types";

const project: Project = {
  slug: "five-training-center",
  title: "Five Training Center",
  tagline: "[TAGLINE PLACEHOLDER] A short line capturing the brand's essence.",
  client: "Five Training Center",
  year: "[YEAR]",
  industry: "[INDUSTRY]",
  summary:
    "[SUMMARY PLACEHOLDER] Replace with a one-line description of the Five Training Center project.",
  brief:
    "[BRIEF PLACEHOLDER] Replace with the one-line challenge or question that framed this project.",
  overview: [
    "[PLACEHOLDER] Replace with the real project brief: what the client needed, and why.",
    "[PLACEHOLDER] Replace with a short paragraph on the approach and the outcome.",
  ],
  hero: {
    src: "/images/five-training-center/cover.svg",
    alt: "Five Training Center. Cover image placeholder.",
  },
  gallery: [
    {
      src: "/images/five-training-center/gallery-1.svg",
      alt: "Five Training Center. Placeholder — logo system needed here.",
      aspect: "square",
    },
    {
      src: "/images/five-training-center/gallery-2.svg",
      alt: "Five Training Center. Placeholder — color & type needed here.",
      aspect: "square",
    },
    {
      src: "/images/five-training-center/gallery-3.svg",
      alt: "Five Training Center. Placeholder — primary application photo needed here.",
      aspect: "portrait",
    },
    {
      src: "/images/five-training-center/gallery-4.svg",
      alt: "Five Training Center. Placeholder — environment or lifestyle photo needed here.",
      aspect: "wide",
    },
  ],
};

export default project;
