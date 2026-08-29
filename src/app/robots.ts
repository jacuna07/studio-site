import type { MetadataRoute } from "next";
import { SITE_IS_LIVE } from "@/lib/site-config";

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
  };
}
