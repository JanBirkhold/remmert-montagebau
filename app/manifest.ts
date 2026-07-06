import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Remmert Montagebau",
    short_name: "Remmert",
    description:
      "Terrassenüberdachungen, Montagebau und Innenausbau in Hessisch Oldendorf",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#B5121B",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
