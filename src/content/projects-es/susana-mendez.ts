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
      src: "/images/susana-mendez/gallery-1.jpg",
      alt: "Susana Méndez. Cuadrícula de construcción de la marca M.",
      aspect: "square",
    },
    {
      src: "/images/susana-mendez/gallery-2.jpg",
      alt: "Susana Méndez. El wordmark M en la pantalla de bloqueo de un teléfono.",
      aspect: "square",
    },
    {
      src: "/images/susana-mendez/gallery-3.jpg",
      alt: "Susana Méndez. Tarjetas de presentación apiladas para Susana Méndez, Abogada & Notaria.",
      aspect: "wide",
    },
    {
      src: "/images/susana-mendez/gallery-4.jpg",
      alt: "Susana Méndez. Papelería membretada con la marca M.",
      aspect: "portrait",
    },
    {
      src: "/images/susana-mendez/gallery-5.jpg",
      alt: "Susana Méndez. Señalética exterior iluminada con la marca M, montada en una fachada de concreto.",
      aspect: "portrait",
    },
    {
      src: "/images/susana-mendez/gallery-6.jpg",
      alt: "Susana Méndez. Colgador de puerta con el mensaje \"Reunión en proceso\" y la marca M.",
      aspect: "wide",
    },
    {
      src: "/images/susana-mendez/gallery-7.jpg",
      alt: "Susana Méndez. Composición del wordmark y eslogan de Susana Méndez.",
      aspect: "wide",
    },
  ],
};

export default project;
