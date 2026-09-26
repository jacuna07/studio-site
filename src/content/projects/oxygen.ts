import type { Project } from "./types";

const project: Project = {
  slug: "oxygen",
  title: "Oxygen",
  tagline: "A brand that grew with the box.",
  client: "Oxygen",
  year: "2022",
  industry: "Fitness",
  featured: true,
  featuredOrder: 5,
  summary: "An identity built for a fitness community that outgrew its own warehouse.",
  brief: "A fitness box built by three brothers who went all in from the start.",
  overview: [
    "Oxygen's founders, three brothers, rented a warehouse and built their box before anything else existed. They came to us for the brand from the very start with a clear picture of what the project would become.",
    "We built an identity around what actually holds their community together: the people, not just the workouts. It gives Oxygen room to keep evolving.",
    "That community is still at the center. Oxygen has since moved into a space built entirely for them.",
  ],
  hero: { src: "/images/oxygen/cover.jpg", alt: "Oxygen. Cover image" },
  gallery: [],
  theme: { bodyColor: "#80ffd8" },
};

export default project;
