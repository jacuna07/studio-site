import type { Project } from "../projects/types";

const project: Project = {
  slug: "datasys-group",
  title: "Datasys Group",
  tagline: "[MARCADOR DE ESLOGAN] Una línea breve que capture la esencia de la marca.",
  client: "Datasys Group",
  year: "2020",
  industry: "Tech",
  summary:
    "[MARCADOR DE RESUMEN] Reemplazar con una descripción de una línea del proyecto Datasys Group.",
  brief:
    "[MARCADOR DE BRIEF] Reemplazar con el reto o la pregunta de una línea que enmarcó este proyecto.",
  overview: [
    "[MARCADOR] Reemplazar con el brief real del proyecto: qué necesitaba el cliente y por qué.",
    "[MARCADOR] Reemplazar con un párrafo breve sobre el enfoque y el resultado.",
  ],
  hero: {
    src: "/images/datasys-group/cover.svg",
    alt: "Datasys Group. Imagen de portada",
  },
  gallery: [
    {
      src: "/images/datasys-group/gallery-1.svg",
      alt: "Datasys Group. Marcador de posición — aquí se necesita el sistema de logotipo.",
      aspect: "square",
    },
    {
      src: "/images/datasys-group/gallery-2.svg",
      alt: "Datasys Group. Marcador de posición — aquí se necesita color y tipografía.",
      aspect: "square",
    },
    {
      src: "/images/datasys-group/gallery-3.svg",
      alt: "Datasys Group. Marcador de posición — aquí se necesita foto de aplicación principal.",
      aspect: "portrait",
    },
    {
      src: "/images/datasys-group/gallery-4.svg",
      alt: "Datasys Group. Marcador de posición — aquí se necesita foto de entorno o estilo de vida.",
      aspect: "wide",
    },
  ],
};

export default project;
