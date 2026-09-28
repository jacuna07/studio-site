import type { MetadataRoute } from "next";
import { SITE_IS_LIVE, SITE_URL } from "@/lib/site-config";

// robots.txt: while the site is live, crawlers may visit everything and
// are pointed at the sitemap. In-progress case studies are still kept out
// of search by their own "noindex" tag (and left out of the sitemap).
// With SITE_IS_LIVE off, the whole site is closed to crawlers.
export default function robots(): MetadataRoute.Robots {
  if (!SITE_IS_LIVE) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
