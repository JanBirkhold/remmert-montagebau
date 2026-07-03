import { SITE } from "./constants";

export type GalleryCategory =
  | "terrassenueberdachungen"
  | "carports"
  | "innenausbau"
  | "montagebau";

export type GalleryImage = {
  src: string;
  alt: string;
  category: GalleryCategory;
  width: number;
  height: number;
};

export const GALLERY_CATEGORIES: {
  id: GalleryCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "Alle" },
  { id: "terrassenueberdachungen", label: "Terrassenüberdachungen" },
  { id: "carports", label: "Carports" },
  { id: "innenausbau", label: "Innenausbau" },
  { id: "montagebau", label: "Montagebau" },
];

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/terra+hx-1920w.webp",
    alt: "Terrassenüberdachung in Hessisch Oldendorf von Remmert Montagebau",
    category: "terrassenueberdachungen",
    width: 1920,
    height: 1280,
  },
  {
    src: "/images/terrrrraaaa-1920w.webp",
    alt: "Terrassenüberdachung mit Glasdach von Remmert Montagebau in Hameln-Pyrmont",
    category: "terrassenueberdachungen",
    width: 1920,
    height: 1280,
  },
  {
    src: "/images/terrrrrrr-1920w.jpg",
    alt: "Individuelle Terrassenüberdachung aus Aluminium und Glas",
    category: "terrassenueberdachungen",
    width: 1920,
    height: 1280,
  },
  {
    src: "/images/Jan_Remmert_028-1920w.webp",
    alt: "Montagebau Projekt von Remmert Montagebau in der Region Hameln-Pyrmont",
    category: "montagebau",
    width: 1920,
    height: 1280,
  },
  {
    src: "/images/Jan_Remmert_042-1920w.webp",
    alt: "Präzise Montagearbeiten von Remmert Montagebau in Hessisch Oldendorf",
    category: "montagebau",
    width: 1920,
    height: 1280,
  },
  {
    src: "/images/Jan_Remmert_059-1920w.webp",
    alt: "Hochwertiger Innenausbau von Remmert Montagebau",
    category: "innenausbau",
    width: 1920,
    height: 1280,
  },
  {
    src: "/images/Jan_Remmert_061-1920w.webp",
    alt: "Moderner Innenausbau – Remmert Montagebau Referenzprojekt",
    category: "innenausbau",
    width: 1920,
    height: 1280,
  },
  {
    src: "/images/zaun+kl-1920w.jpg",
    alt: "Carport und Zaunanlage von Remmert Montagebau in Rinteln",
    category: "carports",
    width: 1920,
    height: 1280,
  },
  {
    src: "/images/zaun-1920w.webp",
    alt: "Carport-Lösung und Außenanlage von Remmert Montagebau",
    category: "carports",
    width: 1920,
    height: 1280,
  },
];

export function getGalleryByCategory(category: GalleryCategory | "all") {
  if (category === "all") return galleryImages;
  return galleryImages.filter((img) => img.category === category);
}

export const heroImage = {
  src: "/images/Jan_Remmert_028-1920w.webp",
  alt: "Terrassenüberdachung und Montagebau von Remmert Montagebau in Hessisch Oldendorf",
};

export const instagramImages = galleryImages.slice(0, 6);

export const PLACEHOLDER_REVIEWS = [
  {
    id: "placeholder-1",
    text: "Saubere Arbeit, zuverlässige Umsetzung und ein sehr gutes Ergebnis.",
    isPlaceholder: true as const,
  },
  {
    id: "placeholder-2",
    text: "Kompetente Beratung und hochwertige Ausführung.",
    isPlaceholder: true as const,
  },
  {
    id: "placeholder-3",
    text: "Unsere Terrassenüberdachung wurde sauber und professionell umgesetzt.",
    isPlaceholder: true as const,
  },
];

export const TRUST_BADGES = [
  "Individuelle Lösungen",
  "Saubere Montage",
  "Regionale Betreuung",
  "Hochwertige Materialien",
  "Persönlicher Ansprechpartner",
] as const;

export const SERVICES = [
  {
    title: "Terrassenüberdachungen",
    description:
      "Maßgeschneiderte Überdachungen aus Aluminium, Stahl und Glas für mehr Wohnqualität im Außenbereich.",
    href: "/terrassenueberdachungen",
    image: "/images/terra+hx-1920w.webp",
  },
  {
    title: "Carports",
    description:
      "Stabile, langlebige und optisch passende Carport-Lösungen für Ihr Zuhause.",
    href: "/galerie?kategorie=carports",
    image: "/images/zaun-1920w.webp",
  },
  {
    title: "Montagebau",
    description:
      "Präzise Montagearbeiten mit Erfahrung, sauberer Ausführung und zuverlässiger Projektabwicklung.",
    href: "/galerie?kategorie=montagebau",
    image: "/images/Jan_Remmert_042-1920w.webp",
  },
  {
    title: "Moderner Innenausbau",
    description:
      "Funktionale und hochwertige Innenraumlösungen für private und gewerbliche Anforderungen.",
    href: "/galerie?kategorie=innenausbau",
    image: "/images/Jan_Remmert_059-1920w.webp",
  },
] as const;

export const WHY_US = [
  "Persönliche Beratung durch den Inhaber",
  "Regionale Nähe in Hessisch Oldendorf und Umgebung",
  "Maßgeschneiderte Lösungen statt Standardware",
  "Saubere Montage und hochwertige Materialien",
  "Transparente Kommunikation vom ersten Kontakt bis zur Umsetzung",
] as const;

export function getFullAddress() {
  return `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}, ${SITE.address.country}`;
}
