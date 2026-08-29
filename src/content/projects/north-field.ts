import type { Project } from "./types";

const project: Project = {
  slug: "north-field",
  title: "North Field",
  client: "North Field Outfitters",
  year: "2025",
  type: "Visual Identity",
  services: ["Logo Design", "Typography", "Brand Guidelines"],
  summary:
    "PLACEHOLDER. A rugged, minimal identity for an outdoor apparel brand built for the trail and the city.",
  hero: {
    src: "/images/north-field/hero.svg",
    alt: "North Field. Placeholder hero image",
  },
  overview: [
    "PLACEHOLDER. Replace with the real project brief: what the client needed, and why.",
    "PLACEHOLDER. Replace with a short paragraph on the approach and the outcome.",
  ],
  gallery: [
    {
      src: "/images/north-field/gallery-1.svg",
      alt: "North Field. Placeholder logo variations",
      aspect: "square",
    },
    {
      src: "/images/north-field/gallery-2.svg",
      alt: "North Field. Placeholder apparel mockup",
      aspect: "square",
    },
    {
      src: "/images/north-field/gallery-3.svg",
      alt: "North Field. Placeholder tag detail",
      aspect: "portrait",
    },
    {
      src: "/images/north-field/gallery-4.svg",
      alt: "North Field. Placeholder brand pattern",
      aspect: "wide",
    },
  ],
};

export default project;
