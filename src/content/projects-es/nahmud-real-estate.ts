import type { Project } from "../projects/types";

const project: Project = {
  slug: "nahmud-real-estate",
  title: "Nahmud Real Estate",
  tagline: "[MARCADOR DE ESLOGAN] Una línea breve que capture la esencia de la marca.",
  client: "Nahmud Real Estate",
  year: "[AÑO]",
  industry: "[INDUSTRIA]",
  summary:
    "[MARCADOR DE RESUMEN] Reemplazar con una descripción de una línea del proyecto Nahmud Real Estate.",
  brief:
    "[MARCADOR DE BRIEF] Reemplazar con el reto o la pregunta de una línea que enmarcó este proyecto.",
  overview: [
    "[MARCADOR] Reemplazar con el brief real del proyecto: qué necesitaba el cliente y por qué.",
    "[MARCADOR] Reemplazar con un párrafo breve sobre el enfoque y el resultado.",
  ],
  hero: {
    src: "/images/nahmud-real-estate/cover.svg",
    alt: "Nahmud Real Estate. Marcador de posición de la imagen de portada.",
  },
  gallery: [
    {
      src: "/images/nahmud-real-estate/gallery-1.svg",
      alt: "Nahmud Real Estate. Marcador de posición — aquí se necesita el sistema de logotipo.",
      aspect: "square",
    },
    {
      src: "/images/nahmud-real-estate/gallery-2.svg",
      alt: "Nahmud Real Estate. Marcador de posición — aquí se necesita color y tipografía.",
      aspect: "square",
    },
    {
      src: "/images/nahmud-real-estate/gallery-3.svg",
      alt: "Nahmud Real Estate. Marcador de posición — aquí se necesita foto de aplicación principal.",
      aspect: "portrait",
    },
    {
      src: "/images/nahmud-real-estate/gallery-4.svg",
      alt: "Nahmud Real Estate. Marcador de posición — aquí se necesita foto de entorno o estilo de vida.",
      aspect: "wide",
    },
  ],
};

export default project;
