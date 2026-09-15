import type { Project } from "./types";

const project: Project = {
  slug: "susana-mendez",
  title: "Susana Méndez",
  tagline: "Signed, not stamped.",
  client: "Susana Méndez",
  year: "2025",
  industry: "Law",
  featured: true,
  featuredOrder: 6,
  summary:
    "An identity for an independent lawyer and notary, anchored by a mark that doubles as her own signature.",
  brief:
    "An independent lawyer and notary, built to stand out in an industry that's used to looking one way. And a brand that works the same way.",
  overview: [
    "Susana Méndez needed a brand that read as credible as any law office, in an industry still mostly run by men. So the identity is built around an idea, not a look: her initials, and the scales of justice, folded into a single mark serving as her own signature.",
    "The result reads as personal as it does professional, a brand that stands out for the same reason she does.",
  ],
  hero: {
    src: "/images/susana-mendez/cover.jpg",
    alt: "Susana Méndez. Cover image",
  },
  gallery: [
    {
      src: "/images/susana-mendez/gallery-1.jpg",
      alt: "Susana Méndez. Logo construction grid for the M mark.",
      aspect: "square",
    },
    {
      src: "/images/susana-mendez/gallery-2.jpg",
      alt: "Susana Méndez. The M wordmark on a phone lock screen.",
      aspect: "square",
    },
    {
      src: "/images/susana-mendez/gallery-3.jpg",
      alt: "Susana Méndez. Stacked business cards for Susana Méndez, Abogada & Notaria.",
      aspect: "wide",
    },
    {
      src: "/images/susana-mendez/gallery-4.jpg",
      alt: "Susana Méndez. Letterhead stationery with the M mark.",
      aspect: "portrait",
    },
    {
      src: "/images/susana-mendez/gallery-5.jpg",
      alt: "Susana Méndez. Illuminated exterior signage with the M mark, mounted on a concrete facade.",
      aspect: "portrait",
    },
    {
      src: "/images/susana-mendez/gallery-6.jpg",
      alt: "Susana Méndez. A door hanger reading \"Reunión en proceso\" with the M mark.",
      aspect: "wide",
    },
    {
      src: "/images/susana-mendez/gallery-7.jpg",
      alt: "Susana Méndez. The Susana Méndez wordmark and tagline lockup.",
      aspect: "wide",
    },
  ],
  theme: { bodyColor: "#ECAEAE" },
};

export default project;
