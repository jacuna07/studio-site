import type { Project } from "./types";

const project: Project = {
  slug: "aurora-coffee",
  title: "Aurora Coffee Co.",
  client: "Aurora Coffee Co.",
  year: "2026",
  type: "Brand Identity",
  services: ["Logo Design", "Typography", "Color System", "Packaging"],
  summary:
    "PLACEHOLDER. A warm, modern identity for a specialty coffee roaster expanding from one cafe to a regional brand.",
  hero: {
    src: "/images/aurora-coffee/hero.svg",
    alt: "Aurora Coffee Co. brand identity. Placeholder hero image",
  },
  overview: [
    "PLACEHOLDER. Replace with the real project brief: what the client needed, and why.",
    "PLACEHOLDER. Replace with a short paragraph on the approach and the outcome.",
  ],
  gallery: [
    {
      src: "/images/aurora-coffee/gallery-1.svg",
      alt: "Aurora Coffee Co. Placeholder logo variations",
      aspect: "square",
    },
    {
      src: "/images/aurora-coffee/gallery-2.svg",
      alt: "Aurora Coffee Co. Placeholder packaging mockup",
      aspect: "square",
    },
    {
      src: "/images/aurora-coffee/gallery-3.svg",
      alt: "Aurora Coffee Co. Placeholder signage mockup",
      aspect: "portrait",
    },
    {
      src: "/images/aurora-coffee/gallery-4.svg",
      alt: "Aurora Coffee Co. Placeholder brand pattern",
      aspect: "wide",
    },
  ],
};

export default project;
