import type { Project } from "../projects/types";

const project: Project = {
  slug: "totoppo",
  title: "Totoppo",
  tagline: "[MARCADOR DE ESLOGAN] Una línea breve que capture la esencia de la marca.",
  client: "Totoppo",
  year: "2026",
  industry: "Muebles",
  summary:
    "[MARCADOR DE RESUMEN] Reemplazar con una descripción de una línea del proyecto Totoppo.",
  brief:
    "[MARCADOR DE BRIEF] Reemplazar con el reto o la pregunta de una línea que enmarcó este proyecto.",
  overview: [
    "[MARCADOR] Reemplazar con el brief real del proyecto: qué necesitaba el cliente y por qué.",
    "[MARCADOR] Reemplazar con un párrafo breve sobre el enfoque y el resultado.",
  ],
  hero: {
    src: "/images/totoppo/cover.svg",
    alt: "Totoppo. Imagen de portada",
  },
  gallery: [
    {
      src: "/images/totoppo/gallery-1.svg",
      alt: "Totoppo. Marcador de posición — aquí se necesita el sistema de logotipo.",
      aspect: "square",
    },
    {
      src: "/images/totoppo/gallery-2.svg",
      alt: "Totoppo. Marcador de posición — aquí se necesita color y tipografía.",
      aspect: "square",
    },
    {
      src: "/images/totoppo/gallery-3.svg",
      alt: "Totoppo. Marcador de posición — aquí se necesita foto de aplicación principal.",
      aspect: "portrait",
    },
    {
      src: "/images/totoppo/gallery-4.svg",
      alt: "Totoppo. Marcador de posición — aquí se necesita foto de entorno o estilo de vida.",
      aspect: "wide",
    },
  ],
};

export default project;
