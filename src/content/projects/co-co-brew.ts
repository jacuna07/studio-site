import type { Project } from "./types";

const project: Project = {
  slug: "co-co-brew",
  title: "Co.Co Brew",
  tagline: "Brewed, but never poured.",
  client: "Co.Co Brew",
  year: "2023",
  industry: "Startups",
  featured: true,
  featuredOrder: 5,
  summary:
    "A flexible brand system for Co.Co, an ambitious coworking, coffee, and craft beer concept built to grow into whatever came next.",
  brief:
    "A coworking concept from seven partners, built around a word big enough to hold coffee, beer, ideas, and the people behind them.",
  overview: [
    "Seven partners came to us with an idea bigger than a coworking space: one roof for craft beer, specialty coffee, and the events and connections that come from sharing a room with the right people. They built it around a single word, Brew, meant to work four ways: brew coffee, brew beer, brew ideas, brew connections.",
    "We built Co.Co as a holding name, flexible enough to carry whatever came next: Co.Co [brew], Co.Co [workspaces], Co.Co [tech], each bracket standing in for a different piece of the idea. The identity was designed to grow the same way the concept did, one piece at a time.",
    "The space never opened. What survived is that system itself, one of the most complete identities in our own portfolio.",
  ],
  hero: {
    src: "/images/co-co-brew/cover.jpg",
    alt: "Co.Co Brew. Cover image",
  },
  gallery: [
    {
      src: "/images/co-co-brew/gallery-logos.jpg",
      alt: "Co.Co Brew. Logo lockups across the brand's three verticals: brew, tech, and workspaces.",
      aspect: "square",
    },
    {
      src: "/images/co-co-brew/gallery-ripple.mp4",
      poster: "/images/co-co-brew/gallery-ripple-poster.jpg",
      alt: "Co.Co Brew. The mark pulsing outward in concentric rings.",
      aspect: "square",
      type: "video",
    },
    {
      src: "/images/co-co-brew/gallery-cup.jpg",
      alt: "Co.Co Brew. A product render for the brew vertical's to go cup.",
      aspect: "wide",
    },
    {
      src: "/images/co-co-brew/gallery-cards-cans.jpg",
      alt: "Co.Co Brew. A mockup of business cards and craft beer can packaging.",
      aspect: "portrait",
    },
    {
      src: "/images/co-co-brew/gallery-phones.jpg",
      alt: "Co.Co Brew. Instagram story designs for the brew, tech, and workspaces verticals.",
      aspect: "portrait",
    },
    {
      src: "/images/co-co-brew/gallery-staircase.jpg",
      alt: "Co.Co Brew. A concept render imagining the space, the brew logo lockup alongside it.",
      aspect: "wide",
    },
    {
      src: "/images/co-co-brew/gallery-logo-spin.mp4",
      poster: "/images/co-co-brew/gallery-logo-spin-poster.jpg",
      alt: "Co.Co Brew. The wordmark spinning in a ring around the asterisk mark.",
      aspect: "wide",
      type: "video",
    },
  ],
  theme: { bodyColor: "#9DED07" },
};

export default project;
