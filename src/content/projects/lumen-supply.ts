import type { Project } from "./types";

const project: Project = {
  slug: "lumen-supply",
  title: "Lumen Supply",
  client: "Lumen Supply Co.",
  year: "2025",
  type: "Rebrand & Packaging",
  services: ["Brand Strategy", "Identity System", "Packaging", "Brand Guidelines"],
  summary:
    "PLACEHOLDER — A ground-up rebrand for a home goods supply company moving toward sustainable materials.",
  hero: {
    src: "/images/lumen-supply/hero.svg",
    alt: "Lumen Supply — placeholder hero image",
  },
  overview: [
    "PLACEHOLDER — Replace with the real project brief: what the client needed, and why.",
    "PLACEHOLDER — Replace with a short paragraph on the approach and the outcome.",
  ],
  gallery: [
    {
      src: "/images/lumen-supply/gallery-1.svg",
      alt: "Lumen Supply — placeholder logo variations",
      aspect: "square",
    },
    {
      src: "/images/lumen-supply/gallery-2.svg",
      alt: "Lumen Supply — placeholder packaging mockup",
      aspect: "square",
    },
    {
      src: "/images/lumen-supply/gallery-3.svg",
      alt: "Lumen Supply — placeholder label detail",
      aspect: "portrait",
    },
    {
      src: "/images/lumen-supply/gallery-4.svg",
      alt: "Lumen Supply — placeholder brand pattern",
      aspect: "wide",
    },
  ],
};

export default project;
