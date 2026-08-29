import type { Project } from "../projects/types";

const project: Project = {
  slug: "renu",
  title: "Renū",
  tagline: "[MARCADOR DE ESLOGAN] Una línea breve que capture la esencia de la marca.",
  client: "Renū",
  year: "2021",
  industry: "Fitness",
  summary:
    "[MARCADOR DE RESUMEN] Reemplazar con una descripción de una línea del proyecto Renū.",
  brief:
    "[MARCADOR DE BRIEF] Reemplazar con el reto o la pregunta de una línea que enmarcó este proyecto.",
  overview: [
    "[MARCADOR] Reemplazar con el brief real del proyecto: qué necesitaba el cliente y por qué.",
    "[MARCADOR] Reemplazar con un párrafo breve sobre el enfoque y el resultado.",
  ],
  hero: {
    src: "/images/renu/cover.jpg",
    alt: "Renū. Imagen de portada",
  },
  gallery: [
    {
      src: "/images/renu/gallery-1.svg",
      alt: "Renū. Marcador de posición — aquí se necesita el sistema de logotipo.",
      aspect: "square",
    },
    {
      src: "/images/renu/gallery-2.svg",
      alt: "Renū. Marcador de posición — aquí se necesita color y tipografía.",
      aspect: "square",
    },
    {
      src: "/images/renu/gallery-3.svg",
      alt: "Renū. Marcador de posición — aquí se necesita foto de aplicación principal.",
      aspect: "portrait",
    },
    {
      src: "/images/renu/gallery-4.svg",
      alt: "Renū. Marcador de posición — aquí se necesita foto de entorno o estilo de vida.",
      aspect: "wide",
    },
  ],
};

export default project;
