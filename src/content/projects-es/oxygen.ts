import type { Project } from "../projects/types";

const project: Project = {
  slug: "oxygen",
  title: "Oxygen",
  tagline: "Una marca que creció junto al box.",
  client: "Oxygen",
  year: "2022",
  industry: "Fitness",
  featured: true,
  featuredOrder: 1,
  summary:
    "Una identidad para una comunidad de fitness a la que se le quedó pequeña su propia bodega.",
  brief: "Un box de fitness construido por tres hermanos que se jugaron todo desde el principio.",
  overview: [
    "Los fundadores de Oxygen, tres hermanos, alquilaron una bodega y construyeron su box antes de que existiera cualquier otra cosa. Llegaron a nosotros por la marca desde el principio, con una idea clara de en qué se convertiría el proyecto.",
    "Construimos una identidad en torno a lo que realmente mantiene unida a su comunidad: las personas, no solo los entrenamientos. Eso le da a Oxygen espacio para seguir evolucionando.",
    "Esa comunidad sigue siendo el centro. Oxygen se mudó desde entonces a un espacio construido enteramente para ellos.",
  ],
  hero: {
    src: "/images/oxygen/cover.jpg",
    alt: "Oxygen. Imagen de portada",
  },
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
  theme: { bodyColor: "#80ffd8" },
};

export default project;
