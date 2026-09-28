import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";
import { getAllProjects } from "@/content/projects";

// sitemap.xml: the list of pages handed to search engines. English only
// (the Spanish routes are parked and redirect), and in-progress case
// studies are left out until they're published. New projects appear here
// automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/work`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/studio`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const caseStudies: MetadataRoute.Sitemap = getAllProjects()
    .filter((p) => !p.inProgress)
    .map((p) => ({
      url: `${SITE_URL}/work/${p.slug}`,
      changeFrequency: "yearly",
      priority: 0.8,
    }));

  return [...pages, ...caseStudies];
}
