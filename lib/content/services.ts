import type { GalleryCategory } from "@/lib/gallery";

export type ServicePage = {
  slug: string;
  path: string;
  title: string;
  metaDescription: string;
  headline: string;
  intro: string;
  benefits: { title: string; text: string }[];
  keywords: string[];
  galleryCategory?: GalleryCategory;
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "terrassenueberdachungen",
    path: "/terrassenueberdachungen",
    title: "Terrassenüberdachung & Terrassendach",
    metaDescription:
      "Terrassenüberdachung montieren lassen vom Fachbetrieb Remmert Montagebau. Aluminium-Terrassenüberdachung, Glasdach Terrasse, Lamellendach – schlüsselfertig in Niedersachsen.",
    headline: "Terrassenüberdachungen – individuell geplant und montiert",
    intro:
      "Als Terrassenüberdachung Fachbetrieb planen wir Aluminium-Terrassenüberdachungen, Glasdach Terrassen und Lamellendächer passend zu Ihrem Haus – inklusive Statik, Entwässerung und professioneller Montage.",
    benefits: [
      {
        title: "Terrassendach Komplettpaket",
        text: "Beratung, Planung, Material und Terrassenüberdachung mit Montage aus einer Hand.",
      },
      {
        title: "Materialberatung",
        text: "Aluminium, Glas, Lamellendach oder Kaltwintergarten – wir finden die passende Lösung.",
      },
      {
        title: "Transparente Preise",
        text: "Realistische Terrassenüberdachung Kosten nach Besichtigung – ohne versteckte Posten.",
      },
    ],
    keywords: [
      "Terrassenüberdachung",
      "Terrassendach",
      "Aluminium Terrassenüberdachung",
      "Terrassenüberdachung mit Glas",
      "Glasdach Terrasse",
      "Lamellendach",
    ],
    galleryCategory: "terrassenueberdachungen",
  },
  {
    slug: "kaltwintergaerten",
    path: "/kaltwintergaerten",
    title: "Kaltwintergarten & Sommergarten",
    metaDescription:
      "Kaltwintergarten und Sommergarten vom Handwerker Remmert Montagebau. Glasüberdachungen, Terrassenerweiterung und Montage im Weserbergland.",
    headline: "Kaltwintergärten & Sommergärten – mehr Wohnraum im Grünen",
    intro:
      "Wir planen und montieren Kaltwintergärten und Sommergärten als wettergeschützte Terrassenerweiterung – mit Glas, sicherer Statik und sauberer Anbindung an Ihr Gebäude.",
    benefits: [
      {
        title: "Ganzjährig nutzbar",
        text: "Mehr Licht und Schutz – ideal als Erweiterung des Wohnbereichs.",
      },
      {
        title: "Individuelle Planung",
        text: "Maßanfertigung passend zu Fassade, Grundriss und Nutzung.",
      },
      {
        title: "Schlüsselfertige Montage",
        text: "Vom Terrassendach Angebot bis zur fertigen Übergabe.",
      },
    ],
    keywords: ["Kaltwintergarten", "Sommergarten", "Glasüberdachung", "Terrassenerweiterung"],
    galleryCategory: "terrassenueberdachungen",
  },
  {
    slug: "carports",
    path: "/carports",
    title: "Carport Montage & Vordach",
    metaDescription:
      "Carport Montage und Vordach Montage von Remmert Montagebau. Stabile Metallkonstruktionen, individuelle Planung und saubere Ausführung in der Region.",
    headline: "Carports & Vordächer – Schutz für Fahrzeug und Eingang",
    intro:
      "Remmert Montagebau montiert Carports und Vordächer in Aluminium und Stahl – stabil, optisch passend und langlebig. Inklusive Statik, Fundamentberatung und termingerechter Montage.",
    benefits: [
      {
        title: "Individuelle Abmessungen",
        text: "Carport Montage passend zu Fahrzeug, Grundstück und Architektur.",
      },
      {
        title: "Metallbau Montage",
        text: "Präzise Verarbeitung mit hochwertigen Materialien und sauberer Ausführung.",
      },
      {
        title: "Regional vor Ort",
        text: "Betreuung in Hessisch Oldendorf, Hameln, Rinteln und Schaumburg.",
      },
    ],
    keywords: ["Carport Montage", "Vordach Montage", "Metallbau Montage"],
    galleryCategory: "carports",
  },
  {
    slug: "wpc-terrassen",
    path: "/wpc-terrassen",
    title: "WPC Terrasse & Holzterrasse",
    metaDescription:
      "WPC Terrasse, Holzterrasse und Terrassensanierung von Remmert Montagebau. Unterkonstruktion, Montage und hochwertige Außenboden-Lösungen.",
    headline: "WPC Terrassen & Holzterrassen – langlebig und gepflegt",
    intro:
      "Wir realisieren WPC Terrassen, Holzterrassen und Terrassensanierungen mit stabiler Unterkonstruktion, präziser Verlegung und sauberer Ausführung – ideal in Kombination mit Terrassenüberdachungen.",
    benefits: [
      {
        title: "WPC & Holz",
        text: "Beratung zu Material, Pflege und Langlebigkeit im Außenbereich.",
      },
      {
        title: "Terrassensanierung",
        text: "Bestehende Flächen erneuern oder erweitern – fachgerecht und termingerecht.",
      },
      {
        title: "Komplettlösung",
        text: "Terrassendach und Boden aus einer Hand – abgestimmt auf Nutzung und Optik.",
      },
    ],
    keywords: ["WPC Terrasse", "Holzterrasse", "Terrassensanierung", "Pergola"],
    galleryCategory: "montagebau",
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICE_PAGES.find((service) => service.slug === slug);
}
