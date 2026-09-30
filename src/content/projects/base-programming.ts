import type { Project } from "./types";

const project: Project = {
  slug: "base-programming",
  title: "Base Programming",
  tagline: "Always a work in progress.",
  client: "Base Programming",
  year: "2024",
  industry: "Fitness",
  featured: true,
  featuredOrder: 3,
  summary:
    "A training brand identity built around an unfinished letterform system that adapts to whatever it's placed on.",
  brief:
    "A personal training brand for athletes who are never quite finished, and never want to be.",
  // **Double asterisks** mark a phrase to show bold, in the accent color.
  overview: [
    "Base is built around one idea: **\"Seek discomfort.\"** Progress happens right at the edge of what feels finished, so the identity was built to never quite feel that way either.",
    "We built a geometric typeface from scratch just for the logo, each letter missing its last piece, on purpose. The wordmark stretches too: it adapts to fit whatever it's placed on, the same way the athletes training under it do to whatever the day asks of them.",
  ],
  hero: {
    src: "/images/base-programming/cover.jpg",
    alt: "Base Programming. Cover image",
  },
  gallery: [
    {
      src: "/images/base-programming/01-gallery.mp4",
      poster: "/images/base-programming/01-gallery-poster.jpg",
      alt: "Base Programming. The b mark in pink, white and black, followed by the wordmark.",
      aspect: "square",
      type: "video",
    },
    {
      src: "/images/base-programming/02-gallery.jpg",
      alt: "Base Programming. The wordmark on its construction grid, in white on black.",
      aspect: "wide",
    },
    {
      src: "/images/base-programming/05-gallery.mp4",
      poster: "/images/base-programming/05-gallery-poster.jpg",
      alt: "Base Programming. A stretched line resolving into the logo: the b mark beside the pink wordmark.",
      aspect: "square",
      type: "video",
      align: "right",
    },
    {
      src: "/images/base-programming/03-gallery.jpg",
      alt: "Base Programming. A woven label with the b mark and wordmark, stitched onto a white tee.",
      aspect: "portrait",
    },
    {
      src: "/images/base-programming/04-gallery.jpg",
      alt: "Base Programming. A black water bottle with the stretched b in pink, in an athlete's hand.",
      aspect: "portrait",
    },
    {
      src: "/images/base-programming/06-gallery.jpg",
      alt: "Base Programming. The b stretched wide to frame a training photo, above the line \"Seek discomfort.\"",
      aspect: "wide",
    },
  ],
  theme: { bodyColor: "#D24C6D" },
};

export default project;
