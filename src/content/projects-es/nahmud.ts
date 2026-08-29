import type { Project } from "../projects/types";

const project: Project = {
  slug: "nahmud",
  title: "Nahmud",
  tagline: "[MARCADOR DE ESLOGAN] Una línea breve que capture la esencia de la marca.",
  client: "Nahmud",
  year: "2023",
  industry: "Bienes Raíces",
  featured: true,
  featuredOrder: 6,
  summary:
    "[MARCADOR DE RESUMEN] Reemplazar con una descripción de una línea del proyecto Nahmud.",
  brief:
    "[MARCADOR DE BRIEF] Reemplazar con el reto o la pregunta de una línea que enmarcó este proyecto.",
  overview: [
    "[MARCADOR] Reemplazar con el brief real del proyecto: qué necesitaba el cliente y por qué.",
    "[MARCADOR] Reemplazar con un párrafo breve sobre el enfoque y el resultado.",
  ],
  hero: {
    src: "/images/nahmud/cover.jpg",
    alt: "Nahmud. Imagen de portada",
  },
  gallery: [
    {
      src: "/images/nahmud/gallery-1.svg",
      alt: "Nahmud. Marcador de posición — aquí se necesita el sistema de logotipo.",
      aspect: "square",
    },
    {
      src: "/images/nahmud/gallery-2.svg",
      alt: "Nahmud. Marcador de posición — aquí se necesita color y tipografía.",
      aspect: "square",
    },
    {
      src: "/images/nahmud/gallery-3.svg",
      alt: "Nahmud. Marcador de posición — aquí se necesita foto de aplicación principal.",
      aspect: "portrait",
    },
    {
      src: "/images/nahmud/gallery-4.svg",
      alt: "Nahmud. Marcador de posición — aquí se necesita foto de entorno o estilo de vida.",
      aspect: "wide",
    },
  ],
};

export default project;
