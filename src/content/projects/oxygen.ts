import type { Project } from "./types";

const project: Project = {
  slug: "oxygen",
  title: "Oxygen",
  tagline: "A brand that grew with the box.",
  client: "Oxygen",
  year: "2022",
  industry: "Fitness",
  featured: true,
  featuredOrder: 1,
  summary: "An identity built for a fitness community that outgrew its own warehouse.",
  brief: "A fitness box built by three brothers who went all in from the start.",
  overview: [
    "Oxygen's founders, three brothers, rented a warehouse and built their box before anything else existed. They came to us for the brand from the very start with a clear picture of what the project would become.",
    "We built an identity around what actually holds their community together: the people, not just the workouts. It gives Oxygen room to keep evolving.",
    "That community is still at the center. Oxygen has since moved into a space built entirely for them.",
  ],
  hero: { src: "/images/oxygen/cover.jpg", alt: "Oxygen. Cover image" },
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
