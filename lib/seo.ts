import type { Metadata } from "next";
import { SITE } from "./constants";

type PageSEO = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description,
  path,
  ogImage = "/images/Jan_Remmert_028-1920w.webp",
  noIndex = false,
}: PageSEO): Metadata {
  const url = `${SITE.url}${path}`;
  const fullTitle =
    path === "/" ? title : `${title} | ${SITE.name}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1920,
          height: 1080,
          alt: `${SITE.name} – Handwerk mit Herz`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export const homeMetadata = createMetadata({
  title: "Remmert Montagebau | Terrassenüberdachungen & Montagebau",
  description:
    "Remmert Montagebau in Hessisch Oldendorf: Terrassenüberdachungen, Carports, Montagebau und Innenausbau. Persönliche Beratung, saubere Montage, regionale Betreuung.",
  path: "/",
});

export const terrassenMetadata = createMetadata({
  title: "Terrassenüberdachung Hessisch Oldendorf | Remmert Montagebau",
  description:
    "Hochwertige Terrassenüberdachungen in Hessisch Oldendorf, Hameln und Umgebung. Remmert Montagebau plant und montiert individuelle Lösungen aus Aluminium, Stahl und Glas.",
  path: "/terrassenueberdachungen",
  ogImage: "/images/terra+hx-1920w.webp",
});

export const galerieMetadata = createMetadata({
  title: "Galerie | Projekte & Referenzen",
  description:
    "Referenzprojekte von Remmert Montagebau: Terrassenüberdachungen, Carports, Montagebau und Innenausbau in Hessisch Oldendorf und Umgebung.",
  path: "/galerie",
});

export const ueberUnsMetadata = createMetadata({
  title: "Über Uns | Handwerk mit Herz",
  description:
    "Remmert Montagebau – persönliche Beratung durch den Inhaber Jan Remmert. Maßgeschneiderte Lösungen, saubere Montage und regionale Nähe in Hessisch Oldendorf.",
  path: "/ueber-uns",
  ogImage: "/images/inhaber-jan-remmert.webp",
});

export const kontaktMetadata = createMetadata({
  title: "Kontakt | Anfrage & Beratung",
  description:
    "Kontaktieren Sie Remmert Montagebau für Terrassenüberdachungen und Montagebau. Telefon, WhatsApp, E-Mail oder Kontaktformular – wir melden uns schnellstmöglich.",
  path: "/kontakt",
});

export const impressumMetadata = createMetadata({
  title: "Impressum",
  description: "Impressum und rechtliche Angaben von Remmert Montagebau in Hessisch Oldendorf.",
  path: "/impressum",
  noIndex: true,
});

export const datenschutzMetadata = createMetadata({
  title: "Datenschutz",
  description:
    "Datenschutzerklärung von Remmert Montagebau – Informationen zur Verarbeitung personenbezogener Daten.",
  path: "/datenschutz",
  noIndex: true,
});
