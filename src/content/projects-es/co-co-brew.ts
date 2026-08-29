import type { Project } from "../projects/types";

const project: Project = {
  slug: "co-co-brew",
  title: "Co.Co Brew",
  tagline: "[MARCADOR DE ESLOGAN] Una línea breve que capture la esencia de la marca.",
  client: "Co.Co Brew",
  year: "2021",
  industry: "Startups",
  featured: true,
  summary:
    "[MARCADOR DE RESUMEN] Reemplazar con una descripción de una línea del proyecto Co.Co Brew.",
  brief:
    "[MARCADOR DE BRIEF] Reemplazar con el reto o la pregunta de una línea que enmarcó este proyecto.",
  overview: [
    "[MARCADOR] Reemplazar con el brief real del proyecto: qué necesitaba el cliente y por qué.",
    "[MARCADOR] Reemplazar con un párrafo breve sobre el enfoque y el resultado.",
  ],
  hero: {
    src: "/images/co-co-brew/cover.jpg",
    alt: "Co.Co Brew. Imagen de portada",
  },
  gallery: [
    {
      src: "/images/co-co-brew/gallery-1.svg",
      alt: "Co.Co Brew. Marcador de posición — aquí se necesita el sistema de logotipo.",
      aspect: "square",
    },
    {
      src: "/images/co-co-brew/gallery-2.svg",
      alt: "Co.Co Brew. Marcador de posición — aquí se necesita color y tipografía.",
      aspect: "square",
    },
    {
      src: "/images/co-co-brew/gallery-3.svg",
      alt: "Co.Co Brew. Marcador de posición — aquí se necesita foto de aplicación principal.",
      aspect: "portrait",
    },
    {
      src: "/images/co-co-brew/gallery-4.svg",
      alt: "Co.Co Brew. Marcador de posición — aquí se necesita foto de entorno o estilo de vida.",
      aspect: "wide",
    },
  ],
};

export default project;
