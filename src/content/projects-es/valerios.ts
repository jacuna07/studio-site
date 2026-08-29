import type { Project } from "../projects/types";

const project: Project = {
  slug: "valerios",
  title: "Valerios",
  tagline: "[MARCADOR DE ESLOGAN] Una línea breve que capture la esencia de la marca.",
  client: "Valerios",
  year: "2026",
  industry: "Automotriz",
  summary:
    "[MARCADOR DE RESUMEN] Reemplazar con una descripción de una línea del proyecto Valerios.",
  brief:
    "[MARCADOR DE BRIEF] Reemplazar con el reto o la pregunta de una línea que enmarcó este proyecto.",
  overview: [
    "[MARCADOR] Reemplazar con el brief real del proyecto: qué necesitaba el cliente y por qué.",
    "[MARCADOR] Reemplazar con un párrafo breve sobre el enfoque y el resultado.",
  ],
  hero: {
    src: "/images/valerios/cover.svg",
    alt: "Valerios. Imagen de portada",
  },
  gallery: [
    {
      src: "/images/valerios/gallery-1.svg",
      alt: "Valerios. Marcador de posición — aquí se necesita el sistema de logotipo.",
      aspect: "square",
    },
    {
      src: "/images/valerios/gallery-2.svg",
      alt: "Valerios. Marcador de posición — aquí se necesita color y tipografía.",
      aspect: "square",
    },
    {
      src: "/images/valerios/gallery-3.svg",
      alt: "Valerios. Marcador de posición — aquí se necesita foto de aplicación principal.",
      aspect: "portrait",
    },
    {
      src: "/images/valerios/gallery-4.svg",
      alt: "Valerios. Marcador de posición — aquí se necesita foto de entorno o estilo de vida.",
      aspect: "wide",
    },
  ],
};

export default project;
