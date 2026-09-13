export type GalleryImage = {
  src: string;
  alt: string;
  aspect: "square" | "portrait" | "wide";
  /** Defaults to "image". "video" renders `src` as a looping, muted clip. */
  type?: "image" | "video";
  /** Poster frame shown before a video loads. Video items only. */
  poster?: string;
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
  hero: {
    src: string;
    alt: string;
    /**
     * Optional short looping clip shown on the project detail page's
     * hero banner in place of `src`. `src` is still required — it's
     * used as the video's poster frame and everywhere else the hero
     * appears (Work grid cards, Home featured grid, page metadata),
     * none of which render video.
     */
    video?: string;
  };
  gallery: GalleryImage[];
  quote?: { text: string; author: string };
  featured?: boolean;
  /** Lower numbers appear first in the Home page's Featured module. */
  featuredOrder?: number;
};
