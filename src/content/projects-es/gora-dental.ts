import type { Project } from "../projects/types";

const project: Project = {
  slug: "gora-dental",
  title: "Gora Dental",
  tagline: "[MARCADOR DE ESLOGAN] Una línea breve que capture la esencia de la marca.",
  client: "Gora Dental",
  year: "2016",
  industry: "Salud",
  summary:
    "[MARCADOR DE RESUMEN] Reemplazar con una descripción de una línea del proyecto Gora Dental.",
  brief:
    "[MARCADOR DE BRIEF] Reemplazar con el reto o la pregunta de una línea que enmarcó este proyecto.",
  overview: [
    "[MARCADOR] Reemplazar con el brief real del proyecto: qué necesitaba el cliente y por qué.",
    "[MARCADOR] Reemplazar con un párrafo breve sobre el enfoque y el resultado.",
  ],
  hero: {
    src: "/images/gora-dental/cover.jpg",
    alt: "Gora Dental. Imagen de portada",
  },
  gallery: [
    {
      src: "/images/gora-dental/gallery-1.svg",
      alt: "Gora Dental. Marcador de posición — aquí se necesita el sistema de logotipo.",
      aspect: "square",
    },
    {
      src: "/images/gora-dental/gallery-2.svg",
      alt: "Gora Dental. Marcador de posición — aquí se necesita color y tipografía.",
      aspect: "square",
    },
    {
      src: "/images/gora-dental/gallery-3.svg",
      alt: "Gora Dental. Marcador de posición — aquí se necesita foto de aplicación principal.",
      aspect: "portrait",
    },
    {
      src: "/images/gora-dental/gallery-4.svg",
      alt: "Gora Dental. Marcador de posición — aquí se necesita foto de entorno o estilo de vida.",
      aspect: "wide",
    },
  ],
};

export default project;
