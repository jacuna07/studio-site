import type { Project } from "../projects/types";

const project: Project = {
  slug: "amimed",
  title: "Amimed",
  tagline: "[MARCADOR DE ESLOGAN] Una línea breve que capture la esencia de la marca.",
  client: "Amimed",
  year: "2017",
  industry: "Salud",
  summary:
    "[MARCADOR DE RESUMEN] Reemplazar con una descripción de una línea del proyecto Amimed.",
  brief:
    "[MARCADOR DE BRIEF] Reemplazar con el reto o la pregunta de una línea que enmarcó este proyecto.",
  overview: [
    "[MARCADOR] Reemplazar con el brief real del proyecto: qué necesitaba el cliente y por qué.",
    "[MARCADOR] Reemplazar con un párrafo breve sobre el enfoque y el resultado.",
  ],
  hero: {
    src: "/images/amimed/cover.svg",
    alt: "Amimed. Imagen de portada",
  },
  gallery: [
    {
      src: "/images/amimed/gallery-1.svg",
      alt: "Amimed. Marcador de posición — aquí se necesita el sistema de logotipo.",
      aspect: "square",
    },
    {
      src: "/images/amimed/gallery-2.svg",
      alt: "Amimed. Marcador de posición — aquí se necesita color y tipografía.",
      aspect: "square",
    },
    {
      src: "/images/amimed/gallery-3.svg",
      alt: "Amimed. Marcador de posición — aquí se necesita foto de aplicación principal.",
      aspect: "portrait",
    },
    {
      src: "/images/amimed/gallery-4.svg",
      alt: "Amimed. Marcador de posición — aquí se necesita foto de entorno o estilo de vida.",
      aspect: "wide",
    },
  ],
};

export default project;
