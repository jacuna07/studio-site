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
  gallery: [],
  theme: { bodyColor: "#F9B4ED" },
};

export default project;
