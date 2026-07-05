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

export const GALLERY_PUBLIC_PATH = "/images/gallery";

export const GALLERY_CATEGORY_PREFIXES: GalleryCategory[] = [
  "terrassenueberdachungen",
  "carports",
  "innenausbau",
  "montagebau",
];

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

const DEFAULT_DIMENSIONS = { width: 1920, height: 1280 };

export const GALLERY_IMAGE_ALT: Record<string, string> = {
  "terrassenueberdachungen-terra-hx-1920w.webp":
    "Terrassenüberdachung in Hessisch Oldendorf von Remmert Montagebau",
  "terrassenueberdachungen-glasdach-1920w.webp":
    "Terrassenüberdachung mit Glasdach von Remmert Montagebau in Hameln-Pyrmont",
  "terrassenueberdachungen-aluminium-glas-1920w.jpg":
    "Individuelle Terrassenüberdachung aus Aluminium und Glas",
  "terrassenueberdachungen-aussenbereich-1920w.webp":
    "Terrassenüberdachung und Außenbereich – Referenzprojekt von Remmert Montagebau",
  "terrassenueberdachungen-jan-remmert-059-1920w.webp":
    "Terrassenüberdachung in Hessisch Oldendorf – Referenzprojekt von Remmert Montagebau",
  "montagebau-jan-remmert-028-1920w.webp":
    "Montagebau Projekt von Remmert Montagebau in der Region Hameln-Pyrmont",
  "montagebau-jan-remmert-042-1920w.webp":
    "Präzise Montagearbeiten von Remmert Montagebau in Hessisch Oldendorf",
  "montagebau-gartenhaus-holzfassade-1920w.webp":
    "Individueller Gartenbau mit Holzfassade und Rundfenstern – Remmert Montagebau",
  "montagebau-holzdeck-naturteich-1920w.webp":
    "Holzterrassendeck am Naturteich – Außenprojekt von Remmert Montagebau",
  "innenausbau-jan-remmert-061-1920w.webp":
    "Moderner Innenausbau – Remmert Montagebau Referenzprojekt",
  "innenausbau-badausbau-waschtisch-1920w.webp":
    "Hochwertiger Badausbau mit modernem Waschtisch und Beleuchtung von Remmert Montagebau",
  "carports-zaunanlage-1920w.jpg":
    "Carport und Zaunanlage von Remmert Montagebau in Rinteln",
  "carports-carport-aussenanlage-1920w.webp":
    "Carport-Lösung und Außenanlage von Remmert Montagebau",
};

export const GALLERY_EXCLUDED_FILES = new Set(["Logo.jpg", ".DS_Store"]);

export const TERRASSEN_HERO_IMAGE = {
  src: `${GALLERY_PUBLIC_PATH}/terrassenueberdachungen-jan-remmert-059-1920w.webp`,
  alt: GALLERY_IMAGE_ALT["terrassenueberdachungen-jan-remmert-059-1920w.webp"],
};

export function parseCategoryFromFilename(
  filename: string,
): GalleryCategory | null {
  return (
    GALLERY_CATEGORY_PREFIXES.find((category) =>
      filename.startsWith(`${category}-`),
    ) ?? null
  );
}

export function getGalleryByCategory(
  images: GalleryImage[],
  category: GalleryCategory | "all",
) {
  if (category === "all") return images;
  return images.filter((img) => img.category === category);
}

export const heroImage = {
  src: `${GALLERY_PUBLIC_PATH}/montagebau-jan-remmert-028-1920w.webp`,
  alt: "Terrassenüberdachung und Montagebau von Remmert Montagebau in Hessisch Oldendorf",
};

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
    image: `${GALLERY_PUBLIC_PATH}/terrassenueberdachungen-jan-remmert-059-1920w.webp`,
  },
  {
    title: "Carports",
    description:
      "Stabile, langlebige und optisch passende Carport-Lösungen für Ihr Zuhause.",
    href: "/galerie?kategorie=carports",
    image: `${GALLERY_PUBLIC_PATH}/carports-carport-aussenanlage-1920w.webp`,
  },
  {
    title: "Montagebau",
    description:
      "Präzise Montagearbeiten mit Erfahrung, sauberer Ausführung und zuverlässiger Projektabwicklung.",
    href: "/galerie?kategorie=montagebau",
    image: `${GALLERY_PUBLIC_PATH}/montagebau-jan-remmert-042-1920w.webp`,
  },
  {
    title: "Moderner Innenausbau",
    description:
      "Funktionale und hochwertige Innenraumlösungen für private und gewerbliche Anforderungen.",
    href: "/galerie?kategorie=innenausbau",
    image: `${GALLERY_PUBLIC_PATH}/innenausbau-jan-remmert-061-1920w.webp`,
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

function buildFallbackAlt(filename: string): string {
  const withoutSize = filename.replace(/-1920w\.(webp|jpe?g|png)$/i, "");
  const withoutCategory =
    GALLERY_CATEGORY_PREFIXES.reduce(
      (name, category) =>
        name.startsWith(`${category}-`)
          ? name.slice(category.length + 1)
          : name,
      withoutSize,
    ) ?? withoutSize;

  return `Referenzprojekt von Remmert Montagebau – ${withoutCategory.replace(/-/g, " ")}`;
}

export function resolveGalleryImageMeta(filename: string): GalleryImage {
  const category = parseCategoryFromFilename(filename) ?? "montagebau";

  return {
    src: `${GALLERY_PUBLIC_PATH}/${filename}`,
    alt: GALLERY_IMAGE_ALT[filename] ?? buildFallbackAlt(filename),
    category,
    width: DEFAULT_DIMENSIONS.width,
    height: DEFAULT_DIMENSIONS.height,
  };
}
