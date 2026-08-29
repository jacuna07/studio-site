import type { Project } from "../projects/types";

const project: Project = {
  slug: "lemur",
  title: "Lemur",
  tagline: "[MARCADOR DE ESLOGAN] Una línea breve que capture la esencia de la marca.",
  client: "Lemur",
  year: "2018",
  industry: "Hospitalidad",
  summary:
    "[MARCADOR DE RESUMEN] Reemplazar con una descripción de una línea del proyecto Lemur.",
  brief:
    "[MARCADOR DE BRIEF] Reemplazar con el reto o la pregunta de una línea que enmarcó este proyecto.",
  overview: [
    "[MARCADOR] Reemplazar con el brief real del proyecto: qué necesitaba el cliente y por qué.",
    "[MARCADOR] Reemplazar con un párrafo breve sobre el enfoque y el resultado.",
  ],
  hero: {
    src: "/images/lemur/cover.svg",
    alt: "Lemur. Imagen de portada",
  },
  gallery: [
    {
      src: "/images/lemur/gallery-1.svg",
      alt: "Lemur. Marcador de posición — aquí se necesita el sistema de logotipo.",
      aspect: "square",
    },
    {
      src: "/images/lemur/gallery-2.svg",
      alt: "Lemur. Marcador de posición — aquí se necesita color y tipografía.",
      aspect: "square",
    },
    {
      src: "/images/lemur/gallery-3.svg",
      alt: "Lemur. Marcador de posición — aquí se necesita foto de aplicación principal.",
      aspect: "portrait",
    },
    {
      src: "/images/lemur/gallery-4.svg",
      alt: "Lemur. Marcador de posición — aquí se necesita foto de entorno o estilo de vida.",
      aspect: "wide",
    },
  ],
};

export default project;
