import type { Project } from "../projects/types";

const project: Project = {
  slug: "prime-futbol",
  title: "Prime Fútbol",
  tagline: "[MARCADOR DE ESLOGAN] Una línea breve que capture la esencia de la marca.",
  client: "Prime Fútbol",
  year: "2023",
  industry: "Medios",
  summary:
    "[MARCADOR DE RESUMEN] Reemplazar con una descripción de una línea del proyecto Prime Fútbol.",
  brief:
    "[MARCADOR DE BRIEF] Reemplazar con el reto o la pregunta de una línea que enmarcó este proyecto.",
  overview: [
    "[MARCADOR] Reemplazar con el brief real del proyecto: qué necesitaba el cliente y por qué.",
    "[MARCADOR] Reemplazar con un párrafo breve sobre el enfoque y el resultado.",
  ],
  hero: {
    src: "/images/prime-futbol/cover.svg",
    alt: "Prime Fútbol. Imagen de portada",
  },
  gallery: [
    {
      src: "/images/prime-futbol/gallery-1.svg",
      alt: "Prime Fútbol. Marcador de posición — aquí se necesita el sistema de logotipo.",
      aspect: "square",
    },
    {
      src: "/images/prime-futbol/gallery-2.svg",
      alt: "Prime Fútbol. Marcador de posición — aquí se necesita color y tipografía.",
      aspect: "square",
    },
    {
      src: "/images/prime-futbol/gallery-3.svg",
      alt: "Prime Fútbol. Marcador de posición — aquí se necesita foto de aplicación principal.",
      aspect: "portrait",
    },
    {
      src: "/images/prime-futbol/gallery-4.svg",
      alt: "Prime Fútbol. Marcador de posición — aquí se necesita foto de entorno o estilo de vida.",
      aspect: "wide",
    },
  ],
};

export default project;
