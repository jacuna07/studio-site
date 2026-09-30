import type { Project } from "./types";

const project: Project = {
  slug: "amimed",
  title: "Amimed",
  tagline: "Designed to feel like deep sleep.",
  client: "Amimed",
  year: "2020",
  industry: "Healthcare",
  summary: "A healthcare brand identity built around rest, not diagnosis.",
  brief: "A healthcare brand built around rest, not diagnosis.",
  overview: [
    "Amimed provides sleep therapy devices, an industry that usually looks and sounds clinical. We wanted the brand to feel less like a diagnosis and more like a good night's rest.",
    "The identity is built around a gradient pattern that moves like a slow wave, a loose, abstracted nod to the bars in a sleep quality graph without ever feeling like a chart. The palette drifts from a deep, cozy night into a soft morning blue, the same shift the product is meant to help people make.",
  ],
  hero: {
    src: "/images/amimed/cover.jpg",
    alt: "Amimed. Cover image",
  },
  gallery: [
    {
      src: "/images/amimed/01-gallery.jpg",
      alt: "Amimed. The a mark over the gradient pattern, bars fading from night blue into violet.",
      aspect: "square",
    },
    {
      src: "/images/amimed/02-gallery.jpg",
      alt: "Amimed. The wordmark in pale blue on deep navy, beside a sliver of the gradient.",
      aspect: "square",
    },
    {
      src: "/images/amimed/03-gallery.jpg",
      alt: "Amimed. A navy skincare box with the wordmark, opened along its tear strip.",
      aspect: "portrait",
    },
    {
      src: "/images/amimed/04-gallery.jpg",
      alt: "Amimed. An ad for a sleep therapy device on a bedside table, above a large wordmark.",
      aspect: "portrait",
    },
    {
      src: "/images/amimed/05-gallery.jpg",
      alt: "Amimed. Three posters: \"We exist so you can sleep tight,\" \"Have you been sleeping well lately?\" and \"8 hours shouldn't feel like four.\"",
      aspect: "wide",
    },
    {
      src: "/images/amimed/06-gallery.jpg",
      alt: "Amimed. A translucent navy shopping bag with the wordmark, holding a product catalog and boxes.",
      aspect: "square",
      align: "right",
    },
    {
      src: "/images/amimed/07-gallery.jpg",
      alt: "Amimed. Three social posts from the \"May you sleep like\" series, over photos of clouds, rain and flowers.",
      aspect: "wide",
    },
  ],
  theme: { bodyColor: "#c3dae7" },
};

export default project;
