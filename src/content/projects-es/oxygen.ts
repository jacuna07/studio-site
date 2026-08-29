import type { Project } from "../projects/types";

const project: Project = {
  slug: "oxygen",
  title: "Oxygen",
  client: "Oxygen",
  year: "[AÑO]",
  type: "[TIPO DE PROYECTO]",
  services: ["[SERVICIOS POR DEFINIR]"],
  summary:
    "[MARCADOR DE RESUMEN] Reemplazar con una descripción de una línea del proyecto Oxygen.",
  hero: {
    src: "/images/oxygen/cover.jpg",
    alt: "Oxygen. Imagen de portada",
  },
  overview: [
    "[MARCADOR] Reemplazar con el brief real del proyecto: qué necesitaba el cliente y por qué.",
    "[MARCADOR] Reemplazar con un párrafo breve sobre el enfoque y el resultado.",
  ],
  gallery: [
    {
      src: "/images/oxygen/gallery-1.svg",
      alt: "Oxygen. Marcador de posición — aquí se necesita el sistema de logotipo.",
      aspect: "square",
    },
    {
      src: "/images/oxygen/gallery-2.svg",
      alt: "Oxygen. Marcador de posición — aquí se necesita color y tipografía.",
      aspect: "square",
    },
    {
      src: "/images/oxygen/gallery-3.svg",
      alt: "Oxygen. Marcador de posición — aquí se necesita foto de aplicación principal.",
      aspect: "portrait",
    },
    {
      src: "/images/oxygen/gallery-4.svg",
      alt: "Oxygen. Marcador de posición — aquí se necesita foto de entorno o estilo de vida.",
      aspect: "wide",
    },
  ],
};

export default project;
