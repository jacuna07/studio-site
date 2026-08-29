import type { Project } from "../projects/types";

const project: Project = {
  slug: "five-training-center",
  title: "Five Training Center",
  tagline: "[MARCADOR DE ESLOGAN] Una línea breve que capture la esencia de la marca.",
  client: "Five Training Center",
  year: "2022",
  industry: "Fitness",
  summary:
    "[MARCADOR DE RESUMEN] Reemplazar con una descripción de una línea del proyecto Five Training Center.",
  brief:
    "[MARCADOR DE BRIEF] Reemplazar con el reto o la pregunta de una línea que enmarcó este proyecto.",
  overview: [
    "[MARCADOR] Reemplazar con el brief real del proyecto: qué necesitaba el cliente y por qué.",
    "[MARCADOR] Reemplazar con un párrafo breve sobre el enfoque y el resultado.",
  ],
  hero: {
    src: "/images/five-training-center/cover.jpg",
    alt: "Five Training Center. Imagen de portada",
  },
  gallery: [
    {
      src: "/images/five-training-center/gallery-1.svg",
      alt: "Five Training Center. Marcador de posición — aquí se necesita el sistema de logotipo.",
      aspect: "square",
    },
    {
      src: "/images/five-training-center/gallery-2.svg",
      alt: "Five Training Center. Marcador de posición — aquí se necesita color y tipografía.",
      aspect: "square",
    },
    {
      src: "/images/five-training-center/gallery-3.svg",
      alt: "Five Training Center. Marcador de posición — aquí se necesita foto de aplicación principal.",
      aspect: "portrait",
    },
    {
      src: "/images/five-training-center/gallery-4.svg",
      alt: "Five Training Center. Marcador de posición — aquí se necesita foto de entorno o estilo de vida.",
      aspect: "wide",
    },
  ],
};

export default project;
