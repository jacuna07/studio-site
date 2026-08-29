import type { Project } from "../projects/types";

const project: Project = {
  slug: "nahara-pilates",
  title: "Nahara Pilates",
  tagline: "[MARCADOR DE ESLOGAN] Una línea breve que capture la esencia de la marca.",
  client: "Nahara Pilates",
  year: "2025",
  industry: "Fitness",
  featured: true,
  featuredOrder: 4,
  summary:
    "[MARCADOR DE RESUMEN] Reemplazar con una descripción de una línea del proyecto Nahara Pilates.",
  brief:
    "[MARCADOR DE BRIEF] Reemplazar con el reto o la pregunta de una línea que enmarcó este proyecto.",
  overview: [
    "[MARCADOR] Reemplazar con el brief real del proyecto: qué necesitaba el cliente y por qué.",
    "[MARCADOR] Reemplazar con un párrafo breve sobre el enfoque y el resultado.",
  ],
  hero: {
    src: "/images/nahara-pilates/cover.jpg",
    alt: "Nahara Pilates. Imagen de portada",
  },
  gallery: [
    {
      src: "/images/nahara-pilates/gallery-1.svg",
      alt: "Nahara Pilates. Marcador de posición — aquí se necesita el sistema de logotipo.",
      aspect: "square",
    },
    {
      src: "/images/nahara-pilates/gallery-2.svg",
      alt: "Nahara Pilates. Marcador de posición — aquí se necesita color y tipografía.",
      aspect: "square",
    },
    {
      src: "/images/nahara-pilates/gallery-3.svg",
      alt: "Nahara Pilates. Marcador de posición — aquí se necesita foto de aplicación principal.",
      aspect: "portrait",
    },
    {
      src: "/images/nahara-pilates/gallery-4.svg",
      alt: "Nahara Pilates. Marcador de posición — aquí se necesita foto de entorno o estilo de vida.",
      aspect: "wide",
    },
  ],
};

export default project;
