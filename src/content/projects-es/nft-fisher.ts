import type { Project } from "../projects/types";

const project: Project = {
  slug: "nft-fisher",
  title: "NFT Fisher",
  tagline: "[MARCADOR DE ESLOGAN] Una línea breve que capture la esencia de la marca.",
  client: "NFT Fisher",
  year: "2020",
  industry: "Tech",
  summary:
    "[MARCADOR DE RESUMEN] Reemplazar con una descripción de una línea del proyecto NFT Fisher.",
  brief:
    "[MARCADOR DE BRIEF] Reemplazar con el reto o la pregunta de una línea que enmarcó este proyecto.",
  overview: [
    "[MARCADOR] Reemplazar con el brief real del proyecto: qué necesitaba el cliente y por qué.",
    "[MARCADOR] Reemplazar con un párrafo breve sobre el enfoque y el resultado.",
  ],
  hero: {
    src: "/images/nft-fisher/cover.svg",
    alt: "NFT Fisher. Imagen de portada",
  },
  gallery: [
    {
      src: "/images/nft-fisher/gallery-1.svg",
      alt: "NFT Fisher. Marcador de posición — aquí se necesita el sistema de logotipo.",
      aspect: "square",
    },
    {
      src: "/images/nft-fisher/gallery-2.svg",
      alt: "NFT Fisher. Marcador de posición — aquí se necesita color y tipografía.",
      aspect: "square",
    },
    {
      src: "/images/nft-fisher/gallery-3.svg",
      alt: "NFT Fisher. Marcador de posición — aquí se necesita foto de aplicación principal.",
      aspect: "portrait",
    },
    {
      src: "/images/nft-fisher/gallery-4.svg",
      alt: "NFT Fisher. Marcador de posición — aquí se necesita foto de entorno o estilo de vida.",
      aspect: "wide",
    },
  ],
};

export default project;
