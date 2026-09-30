export type GalleryImage = {
  src: string;
  alt: string;
  aspect: "square" | "portrait" | "wide";
  /** Defaults to "image". "video" renders `src` as a looping, muted clip. */
  type?: "image" | "video";
  /** Poster frame shown before a video loads. Video items only. */
  poster?: string;
  /**
   * Desktop only: "right" puts a square or portrait item in the right
   * column, leaving the left half of its row blank. Phones are unchanged.
   */
  align?: "right";
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
  /**
   * Optional per-project brand accent for the case study page's "The
   * brief" line. Falls back to the site's default white when omitted.
   */
  theme?: { bodyColor: string };
  /**
   * The "in progress" toggle. Set to true while a case study isn't ready:
   * the project keeps its card (and cover) on the Work grid, but its page
   * shows the "still in the works" screen (InProgressCaseStudy) instead of
   * the case study, it's left out of the Home page's Featured module, and
   * search engines are asked not to index it. Delete the line (or set it
   * to false) once the case study is ready to go live.
   */
  inProgress?: boolean;
};
