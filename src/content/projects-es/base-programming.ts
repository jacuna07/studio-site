import type { Project } from "../projects/types";

const project: Project = {
  slug: "base-programming",
  title: "Base Programming",
  tagline: "[MARCADOR DE ESLOGAN] Una línea breve que capture la esencia de la marca.",
  client: "Base Programming",
  year: "2024",
  industry: "Fitness",
  summary:
    "[MARCADOR DE RESUMEN] Reemplazar con una descripción de una línea del proyecto Base Programming.",
  brief:
    "[MARCADOR DE BRIEF] Reemplazar con el reto o la pregunta de una línea que enmarcó este proyecto.",
  overview: [
    "[MARCADOR] Reemplazar con el brief real del proyecto: qué necesitaba el cliente y por qué.",
    "[MARCADOR] Reemplazar con un párrafo breve sobre el enfoque y el resultado.",
  ],
  hero: {
    src: "/images/base-programming/cover.svg",
    alt: "Base Programming. Imagen de portada",
  },
  gallery: [
    {
      src: "/images/base-programming/gallery-1.svg",
      alt: "Base Programming. Marcador de posición — aquí se necesita el sistema de logotipo.",
      aspect: "square",
    },
    {
      src: "/images/base-programming/gallery-2.svg",
      alt: "Base Programming. Marcador de posición — aquí se necesita color y tipografía.",
      aspect: "square",
    },
    {
      src: "/images/base-programming/gallery-3.svg",
      alt: "Base Programming. Marcador de posición — aquí se necesita foto de aplicación principal.",
      aspect: "portrait",
    },
    {
      src: "/images/base-programming/gallery-4.svg",
      alt: "Base Programming. Marcador de posición — aquí se necesita foto de entorno o estilo de vida.",
      aspect: "wide",
    },
  ],
};

export default project;
