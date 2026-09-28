import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

/**
 * Titles, descriptions and share previews ("metadata") for every page, in
 * one place so they stay consistent. Formats agreed with Javier:
 *
 * - Home tab / share title: "Tresunotres | Brand Design Studio"
 * - Other pages:            "[Page] | Tresunotres.co"  (Work, Studio, Contact)
 * - Case studies:           "[Project] | Tresunotres.co"
 *
 * Share image: the circular wordmark (public/images/og-cover.jpg) for
 * general pages; each case study uses its own cover, via a 1200x630
 * "share cut" at public/images/<slug>/og.jpg (light enough for WhatsApp
 * previews). A new project without an og.jpg falls back to its full cover.
 */

export const SITE_NAME = "Tresunotres";
export const HOME_TITLE = "Tresunotres | Brand Design Studio";
export const SITE_DESCRIPTION =
  "Brand design studio based in Costa Rica. We design the foundations. Your brand enjoys the spotlight.";

type ShareImage = { url: string; width?: number; height?: number; alt: string };

export const DEFAULT_SHARE_IMAGE: ShareImage = {
  url: "/images/og-cover.jpg",
  width: 1200,
  height: 630,
  alt: "Tresunotres",
};

export function pageTitle(page: string) {
  return `${page} | Tresunotres.co`;
}

/** A project's share image: its og.jpg share cut if there is one, else its cover. */
export function projectShareImage(slug: string, hero: { src: string; alt: string }): ShareImage {
  const shareCut = `/images/${slug}/og.jpg`;
  if (fs.existsSync(path.join(process.cwd(), "public", shareCut))) {
    return { url: shareCut, width: 1200, height: 630, alt: hero.alt };
  }
  return { url: hero.src, alt: hero.alt };
}

/**
 * Metadata for a page other than Home. `title` is set as "absolute" so no
 * parent template can alter it, and Open Graph (Facebook, WhatsApp,
 * LinkedIn, iMessage...) and Twitter/X get the same title, description and
 * image. `path` becomes the canonical URL (resolved against SITE_URL by
 * metadataBase in the root layout).
 */
export function pageMetadata({
  page,
  description,
  path: urlPath,
  image = DEFAULT_SHARE_IMAGE,
  noindex = false,
}: {
  page: string;
  description: string;
  path: string;
  image?: ShareImage;
  noindex?: boolean;
}): Metadata {
  const title = pageTitle(page);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: urlPath },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      url: urlPath,
      siteName: SITE_NAME,
      images: [image],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
