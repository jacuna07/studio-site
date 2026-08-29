import type { Project } from "../projects/types";

const project: Project = {
  slug: "susana-mendez",
  title: "Susana Méndez",
  client: "Susana Méndez",
  year: "[AÑO]",
  type: "[TIPO DE PROYECTO]",
  services: ["[SERVICIOS POR DEFINIR]"],
  summary:
    "[MARCADOR DE RESUMEN] Reemplazar con una descripción de una línea del proyecto Susana Méndez.",
  hero: {
    src: "/images/susana-mendez/cover.jpg",
    alt: "Susana Méndez. Imagen de portada",
  },
  overview: [
    "[MARCADOR] Reemplazar con el brief real del proyecto: qué necesitaba el cliente y por qué.",
    "[MARCADOR] Reemplazar con un párrafo breve sobre el enfoque y el resultado.",
  ],
  gallery: [
    {
      src: "/images/susana-mendez/gallery-1.svg",
      alt: "Susana Méndez. Marcador de posición — aquí se necesita el sistema de logotipo.",
      aspect: "square",
    },
    {
      src: "/images/susana-mendez/gallery-2.svg",
      alt: "Susana Méndez. Marcador de posición — aquí se necesita color y tipografía.",
      aspect: "square",
    },
    {
      src: "/images/susana-mendez/gallery-3.svg",
      alt: "Susana Méndez. Marcador de posición — aquí se necesita foto de aplicación principal.",
      aspect: "portrait",
    },
    {
      src: "/images/susana-mendez/gallery-4.svg",
      alt: "Susana Méndez. Marcador de posición — aquí se necesita foto de entorno o estilo de vida.",
      aspect: "wide",
    },
  ],
};

export default project;
