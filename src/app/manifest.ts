import type { MetadataRoute } from "next";
import { HOME_TITLE, SITE_DESCRIPTION } from "@/lib/metadata";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: HOME_TITLE,
    short_name: "Tresunotres",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0B0C10",
    theme_color: "#0B0C10",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
