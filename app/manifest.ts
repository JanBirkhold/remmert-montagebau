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
        src: "/images/gallery/Logo.jpg",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
  };
}
