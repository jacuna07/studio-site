import type { Project } from "../projects/types";

const project: Project = {
  slug: "lux",
  title: "Lux Project",
  tagline: "[MARCADOR DE ESLOGAN] Una línea breve que capture la esencia de la marca.",
  client: "Lux",
  year: "2018",
  industry: "Fitness",
  summary:
    "[MARCADOR DE RESUMEN] Reemplazar con una descripción de una línea del proyecto Lux.",
  brief:
    "[MARCADOR DE BRIEF] Reemplazar con el reto o la pregunta de una línea que enmarcó este proyecto.",
  overview: [
    "[MARCADOR] Reemplazar con el brief real del proyecto: qué necesitaba el cliente y por qué.",
    "[MARCADOR] Reemplazar con un párrafo breve sobre el enfoque y el resultado.",
  ],
  hero: {
    src: "/images/lux/cover.jpg",
    alt: "Lux Project. Imagen de portada",
  },
  gallery: [
    {
      src: "/images/lux/gallery-1.svg",
      alt: "Lux. Marcador de posición — aquí se necesita el sistema de logotipo.",
      aspect: "square",
    },
    {
      src: "/images/lux/gallery-2.svg",
      alt: "Lux. Marcador de posición — aquí se necesita color y tipografía.",
      aspect: "square",
    },
    {
      src: "/images/lux/gallery-3.svg",
      alt: "Lux. Marcador de posición — aquí se necesita foto de aplicación principal.",
      aspect: "portrait",
    },
    {
      src: "/images/lux/gallery-4.svg",
      alt: "Lux. Marcador de posición — aquí se necesita foto de entorno o estilo de vida.",
      aspect: "wide",
    },
  ],
};

export default project;
