import type { Project } from "../projects/types";

const project: Project = {
  slug: "susana-mendez",
  title: "Susana Méndez",
  tagline: "Firmada, no sellada.",
  client: "Susana Méndez",
  year: "2025",
  industry: "Legal",
  summary:
    "Una identidad para una abogada y notaria independiente, anclada en una marca que también funciona como su propia firma.",
  brief:
    "Una abogada y notaria independiente, construida para destacar en una industria acostumbrada a verse siempre igual. Y una marca que funciona de la misma manera.",
  overview: [
    "Susana Méndez necesitaba una marca tan creíble como la de cualquier bufete, en una industria todavía dominada por hombres. Por eso la identidad se construyó a partir de una idea, no de una estética: sus iniciales y la balanza de la justicia, fundidas en un solo símbolo que funciona como su firma.",
    "El resultado se lee tan personal como profesional, una marca que destaca por la misma razón que ella.",
  ],
  hero: {
    src: "/images/susana-mendez/cover.jpg",
    alt: "Susana Méndez. Imagen de portada",
  },
  gallery: [
    {
      src: "/images/susana-mendez/gallery-1.svg",
      alt: "Susana Méndez. Marcador de posición — aquí se necesita el sistema de logotipo.",
      aspect: "square",
    },
    {
      src: "/images/susana-mendez/gallery-2.svg",
      alt: "Susana Méndez. Marcador de posición — aquí se necesita color y tipografía.",
      aspect: "square",
    },
    {
      src: "/images/susana-mendez/gallery-3.svg",
      alt: "Susana Méndez. Marcador de posición — aquí se necesita foto de aplicación principal.",
      aspect: "portrait",
    },
    {
      src: "/images/susana-mendez/gallery-4.svg",
      alt: "Susana Méndez. Marcador de posición — aquí se necesita foto de entorno o estilo de vida.",
      aspect: "wide",
    },
  ],
};

export default project;
