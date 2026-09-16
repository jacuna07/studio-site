import type { Project } from "./types";

const project: Project = {
  slug: "totoppo",
  title: "Totoppo",
  tagline: "A space, a need, and the piece built to fill both.",
  client: "Totoppo",
  year: "2026",
  industry: "Furniture",
  featured: true,
  featuredOrder: 4,
  summary:
    "A rebrand for Totoppo, a custom furniture workshop that designs every piece around a client's space and need. It marks the studio's move from a one-person shop to a small team.",
  brief:
    "How do you rebrand a one-person workshop into a small studio, without losing the hands-on, made-to-measure spirit that built it in the first place?",
  overview: [
    "Totoppo builds furniture the way it always has: around a real space and a real need, piece by piece, nothing off the shelf. What started as one person handling design, building, and delivery alone has grown into a team of four. The identity needed to grow with it.",
    "The new mark keeps that hands-on core: a wordmark with the weight of something built by hand, and a house-shaped mark that nods to the spaces the furniture is made for. It's a system built to carry Totoppo into its next chapter as a studio, without losing the maker behind it.",
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
    {
      src: "/images/totoppo/gallery-4.jpg",
      alt: "Totoppo. A presentation cover reading \"No creemos en catálogos,\" over a close up of a hand carving wood.",
      aspect: "portrait",
    },
    {
      src: "/images/totoppo/gallery-5.jpg",
      alt: "Totoppo. The house mark on a woven canvas tag.",
      aspect: "portrait",
    },
    {
      src: "/images/totoppo/gallery-6.jpg",
      alt: "Totoppo. Business cards for the studio and its head carpenter, on a bed of wood shavings.",
      aspect: "wide",
    },
    {
      src: "/images/totoppo/gallery-7.jpg",
      alt: "Totoppo. A cover card mockup with the wordmark and house mark, on a wood surface.",
      aspect: "portrait",
    },
    {
      src: "/images/totoppo/gallery-8.jpg",
      alt: "Totoppo. A before and after comparison: the previous Totoppo Woodworks logo beside the new totoppo muebles mark.",
      aspect: "wide",
    },
  ],
  theme: { bodyColor: "#ebe9db" },
};

export default project;
