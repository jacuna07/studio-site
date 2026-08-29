export type GalleryImage = {
  src: string;
  alt: string;
  aspect: "square" | "portrait" | "wide";
};

export type Credit = {
  role: string;
  names: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  client: string;
  year: string;
  type: string;
  services: string[];
  summary: string;
  brief: string;
  overview: string[];
  credits: Credit[];
  hero: { src: string; alt: string };
  gallery: GalleryImage[];
  quote?: { text: string; author: string };
};
