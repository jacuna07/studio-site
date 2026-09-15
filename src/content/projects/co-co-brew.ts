import type { Project } from "./types";

const project: Project = {
  slug: "co-co-brew",
  title: "Co.Co Brew",
  tagline: "One mark, three ways to spend your day.",
  client: "Co.Co Brew",
  year: "2023",
  industry: "Startups",
  featured: true,
  featuredOrder: 5,
  summary:
    "An identity system flexible enough to hold three different businesses under one brand.",
  brief:
    "A coffee and craft beer bar that grew into three different businesses under one name.",
  overview: [
    "Co.Co started as a coffee and craft beer bar, then grew into CoCo [workspaces], a coworking space with monthly rentals from $25, and CoCo [tech]. We built one identity flexible enough to hold all three without losing what makes each one its own.",
    "A shared wordmark and an asterisk mark carry across every vertical, cups, cans, business cards, signage, and social. Each one keeps its own bracketed tag, [brew], [workspaces], [tech], so the difference reads at a glance while the brand stays one thing.",
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
      alt: "Co.Co Brew. A specialty coffee to go cup on a wood counter.",
      aspect: "wide",
    },
    {
      src: "/images/co-co-brew/gallery-cards-cans.jpg",
      alt: "Co.Co Brew. Business cards and craft beer cans on a black notebook background.",
      aspect: "portrait",
    },
    {
      src: "/images/co-co-brew/gallery-phones.jpg",
      alt: "Co.Co Brew. Instagram story designs for the brew, tech, and workspaces verticals.",
      aspect: "portrait",
    },
    {
      src: "/images/co-co-brew/gallery-staircase.jpg",
      alt: "Co.Co Brew. A silhouette climbing an illuminated staircase, the brew logo lockup beside it.",
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
