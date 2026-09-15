import type { Project } from "../projects/types";

const project: Project = {
  slug: "totoppo",
  title: "Totoppo",
  tagline: "Un espacio, una necesidad, y la pieza construida para llenar ambas.",
  client: "Totoppo",
  year: "2026",
  industry: "Muebles",
  featured: true,
  featuredOrder: 4,
  summary:
    "Un rebranding para Totoppo, un taller de muebles a medida que diseña cada pieza en torno al espacio y la necesidad del cliente, y que marca su paso de taller de una persona a un pequeño estudio.",
  brief:
    "¿Cómo se rediseña la marca de un taller de una persona para convertirlo en un pequeño estudio, sin perder el espíritu artesanal y a medida que lo hizo conocido desde el principio?",
  overview: [
    "Totoppo construye muebles como siempre lo ha hecho: en torno a un espacio real y una necesidad real, pieza por pieza, nada de catálogo. Lo que empezó como una sola persona a cargo del diseño, la construcción y la entrega hoy es un equipo de cuatro. La identidad tenía que crecer con ellos.",
    "La nueva marca conserva ese espíritu artesanal: un logotipo con el peso de algo hecho a mano, y un símbolo con forma de casa que remite a los espacios para los que se construyen los muebles. Es un sistema pensado para llevar a Totoppo a su siguiente etapa como estudio, sin perder al artesano detrás.",
  ],
  hero: {
    src: "/images/totoppo/cover.jpg",
    alt: "Totoppo. Imagen de portada",
  },
  gallery: [
    {
      src: "/images/totoppo/gallery-1.jpg",
      alt: "Totoppo. Marca gráfica sobre fondo vino.",
      aspect: "square",
    },
    {
      src: "/images/totoppo/gallery-2.jpg",
      alt: "Totoppo. Silla en un interior ambientado.",
      aspect: "square",
    },
    {
      src: "/images/totoppo/gallery-3.jpg",
      alt: "Totoppo. Detalle de construcción del logotipo.",
      aspect: "wide",
    },
  ],
};

export default project;
