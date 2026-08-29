export type GalleryImage = {
  src: string;
  alt: string;
  aspect: "square" | "portrait" | "wide";
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  client: string;
  year: string;
  industry: string;
  summary: string;
  brief: string;
  overview: string[];
  hero: { src: string; alt: string };
  gallery: GalleryImage[];
  quote?: { text: string; author: string };
  featured?: boolean;
};
