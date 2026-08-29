import type { Project } from "../projects/types";

const project: Project = {
  slug: "sunari",
  title: "Sunari",
  tagline: "[MARCADOR DE ESLOGAN] Una línea breve que capture la esencia de la marca.",
  client: "Sunari",
  year: "2017",
  industry: "Startups",
  summary:
    "[MARCADOR DE RESUMEN] Reemplazar con una descripción de una línea del proyecto Sunari.",
  brief:
    "[MARCADOR DE BRIEF] Reemplazar con el reto o la pregunta de una línea que enmarcó este proyecto.",
  overview: [
    "[MARCADOR] Reemplazar con el brief real del proyecto: qué necesitaba el cliente y por qué.",
    "[MARCADOR] Reemplazar con un párrafo breve sobre el enfoque y el resultado.",
  ],
  hero: {
    src: "/images/sunari/cover.svg",
    alt: "Sunari. Imagen de portada",
  },
  gallery: [
    {
      src: "/images/sunari/gallery-1.svg",
      alt: "Sunari. Marcador de posición — aquí se necesita el sistema de logotipo.",
      aspect: "square",
    },
    {
      src: "/images/sunari/gallery-2.svg",
      alt: "Sunari. Marcador de posición — aquí se necesita color y tipografía.",
      aspect: "square",
    },
    {
      src: "/images/sunari/gallery-3.svg",
      alt: "Sunari. Marcador de posición — aquí se necesita foto de aplicación principal.",
      aspect: "portrait",
    },
    {
      src: "/images/sunari/gallery-4.svg",
      alt: "Sunari. Marcador de posición — aquí se necesita foto de entorno o estilo de vida.",
      aspect: "wide",
    },
  ],
};

export default project;
