import type { Project } from "../projects/types";

const project: Project = {
  slug: "puralma",
  title: "Puralma",
  tagline: "Una identidad tan audaz como su comida.",
  client: "Puralma",
  year: "2026",
  industry: "Alimentos y Restaurantes",
  featured: true,
  featuredOrder: 2,
  summary:
    "Un rebranding para uno de los restaurantes veganos más conocidos de Costa Rica, construido en torno al lema: Revolucionaria pero amable.",
  brief:
    "Una actualización de marca para la cocina vegana de referencia en Barrio Escalante, pensada para una etapa más madura.",
  overview: [
    "Puralma abrió en Barrio Escalante y dejó que la cocina hablara primero. Sin rodeos, solo comida lo suficientemente buena como para convertirse en una parada habitual en uno de los barrios más visitados de Costa Rica, celebridades de paso por el país incluidas.",
    "Ese alcance pedía una marca capaz de sostenerlo. Construimos la identidad en torno a \"Revolucionaria pero amable\", la misma convicción que construyó la reputación de la cocina desde el principio, ahora con un rostro que corresponde a dónde está Puralma hoy.",
    "El resultado es una marca que se lee tan segura como sabe la comida: lista para un escenario más grande, sin perder la amabilidad que la construyó.",
  ],
  hero: {
    src: "/images/puralma/cover.jpg",
    alt: "Puralma. Imagen de portada",
  },
  gallery: [
    {
      src: "/images/puralma/gallery-1.jpg",
      alt: "Puralma. El símbolo de flor y el lema, \"With love, from the tropics.\"",
      aspect: "square",
    },
    {
      src: "/images/puralma/gallery-2.jpg",
      alt: "Puralma. Afiches de marca: \"100% Plant Based\" y \"Kind but revolutionary.\"",
      aspect: "wide",
    },
    {
      src: "/images/puralma/gallery-3.jpg",
      alt: "Puralma. Una corcholata abierta que revela la frase \"Kind never tasted this good.\"",
      aspect: "square",
    },
    {
      src: "/images/puralma/gallery-4.jpg",
      alt: "Puralma. Vasos de papel de la marca apilados sobre una mesa.",
      aspect: "portrait",
    },
    {
      src: "/images/puralma/gallery-5.jpg",
      alt: "Puralma. Empaques para llevar con el símbolo de flor, repetidos en cuadrícula.",
      aspect: "portrait",
    },
    {
      src: "/images/puralma/gallery-6.jpg",
      alt: "Puralma. Papel de regalo con el patrón de flor y logotipo de la marca.",
      aspect: "portrait",
    },
    {
      src: "/images/puralma/gallery-7.jpg",
      alt: "Puralma. Una tela con el patrón de la marca, capturada en movimiento.",
      aspect: "wide",
    },
    {
      src: "/images/puralma/gallery-8.jpg",
      alt: "Puralma. Un afiche del Run Club junto a una agua fresca de sandía.",
      aspect: "wide",
    },
    {
      src: "/images/puralma/gallery-9.jpg",
      alt: "Puralma. Una bolsa de tela con la frase \"Kind but revolutionary\" y el manifiesto de la marca.",
      aspect: "portrait",
    },
    {
      src: "/images/puralma/gallery-10.jpg",
      alt: "Puralma. Señalización exterior con el logotipo y el símbolo de flor.",
      aspect: "portrait",
    },
    {
      src: "/images/puralma/gallery-11.jpg",
      alt: "Puralma. Un taco en tortilla de maíz azul, sobre una servilleta con el patrón de la marca.",
      aspect: "wide",
    },
  ],
  theme: { bodyColor: "#F9B4ED" },
};

export default project;
