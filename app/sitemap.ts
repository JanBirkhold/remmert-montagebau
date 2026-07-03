import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/terrassenueberdachungen",
    "/galerie",
    "/ueber-uns",
    "/kontakt",
    "/impressum",
    "/datenschutz",
  ];

  return routes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/terrassenueberdachungen" ? 0.9 : 0.7,
  }));
}
