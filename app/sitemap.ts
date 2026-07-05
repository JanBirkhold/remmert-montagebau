import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { REGION_PAGES } from "@/lib/content/regions";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/terrassenueberdachungen",
    "/kaltwintergaerten",
    "/carports",
    "/wpc-terrassen",
    "/leistungen",
    "/galerie",
    "/faq",
    "/ueber-uns",
    "/kontakt",
    "/impressum",
    "/datenschutz",
    ...REGION_PAGES.map((region) => `/regionen/${region.slug}`),
  ];

  return routes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route.startsWith("/regionen") || route === "/terrassenueberdachungen"
          ? 0.9
          : 0.7,
  }));
}
