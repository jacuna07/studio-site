import type { Project } from "../projects/types";

const project: Project = {
  slug: "puralma",
  title: "Puralma",
  tagline: "[MARCADOR DE ESLOGAN] Una línea breve que capture la esencia de la marca.",
  client: "Puralma",
  year: "2026",
  industry: "Alimentos y Restaurantes",
  featured: true,
  featuredOrder: 2,
  summary:
    "[MARCADOR DE RESUMEN] Reemplazar con una descripción de una línea del proyecto Puralma.",
  brief:
    "[MARCADOR DE BRIEF] Reemplazar con el reto o la pregunta de una línea que enmarcó este proyecto.",
  overview: [
    "[MARCADOR] Reemplazar con el brief real del proyecto: qué necesitaba el cliente y por qué.",
    "[MARCADOR] Reemplazar con un párrafo breve sobre el enfoque y el resultado.",
  ],
  hero: {
    src: "/images/puralma/cover.jpg",
    alt: "Puralma. Imagen de portada",
  },
  gallery: [
    {
      src: "/images/puralma/gallery-1.svg",
      alt: "Puralma. Marcador de posición — aquí se necesita el sistema de logotipo.",
      aspect: "square",
    },
    {
      src: "/images/puralma/gallery-2.svg",
      alt: "Puralma. Marcador de posición — aquí se necesita color y tipografía.",
      aspect: "square",
    },
    {
      src: "/images/puralma/gallery-3.svg",
      alt: "Puralma. Marcador de posición — aquí se necesita foto de aplicación principal.",
      aspect: "portrait",
    },
    {
      src: "/images/puralma/gallery-4.svg",
      alt: "Puralma. Marcador de posición — aquí se necesita foto de entorno o estilo de vida.",
      aspect: "wide",
    },
  ],
};

export default project;
