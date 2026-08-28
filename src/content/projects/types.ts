export type GalleryImage = {
  src: string;
  alt: string;
  aspect: "square" | "portrait" | "wide";
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  type: string;
  services: string[];
  summary: string;
  hero: { src: string; alt: string };
  overview: string[];
  gallery: GalleryImage[];
  quote?: { text: string; author: string };
};
