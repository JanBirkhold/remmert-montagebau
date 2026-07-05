import type { Metadata } from "next";
import { SITE } from "./constants";
import { GALLERY_PUBLIC_PATH } from "./gallery";

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
  ogImage = `${GALLERY_PUBLIC_PATH}/montagebau-jan-remmert-028-1920w.webp`,
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
  title:
    "Remmert Montagebau | Terrassenüberdachung & Montagebau in Niedersachsen",
  description:
    "Ihr regionaler Fachbetrieb für Terrassenüberdachungen, Kaltwintergärten und Montagebau im Raum Hessisch Oldendorf, Hameln, Schaumburg, Rinteln und Minden. Aluminium, Glas, Carport Montage – schlüsselfertig.",
  path: "/",
});

export const terrassenMetadata = createMetadata({
  title:
    "Terrassenüberdachung montieren lassen | Fachbetrieb Remmert Montagebau",
  description:
    "Terrassenüberdachung Fachbetrieb in Hessisch Oldendorf: Aluminium-Terrassenüberdachung, Glasdach Terrasse, Lamellendach und Kaltwintergarten. Terrassendach Angebot mit Montage – transparent und termingerecht.",
  path: "/terrassenueberdachungen",
  ogImage: `${GALLERY_PUBLIC_PATH}/terrassenueberdachungen-jan-remmert-059-1920w.webp`,
});

export const galerieMetadata = createMetadata({
  title: "Referenzen & Galerie | Terrassenüberdachung Projekte",
  description:
    "Referenzprojekte von Remmert Montagebau: Terrassenüberdachungen, Carports, Kaltwintergärten, WPC Terrassen und Montagebau in Hessisch Oldendorf, Hameln und Schaumburg.",
  path: "/galerie",
});

export const faqMetadata = createMetadata({
  title: "FAQ | Terrassenüberdachung Kosten, Genehmigung & Montage",
  description:
    "Antworten zu Terrassenüberdachung Kosten, Baugenehmigung Niedersachsen, Lamellendach vs. Glasdach, Aluminium oder Holz – FAQ von Remmert Montagebau für KI-Suche und Kunden.",
  path: "/faq",
});

export const leistungenMetadata = createMetadata({
  title: "Leistungen | Terrassenüberdachung, Carport, WPC Terrasse",
  description:
    "Alle Leistungen von Remmert Montagebau: Terrassenüberdachung, Kaltwintergarten, Carport Montage, Vordach, Zaunbau, WPC Terrasse, Holzterrasse und Montagebau im Weserbergland.",
  path: "/leistungen",
});

export const kaltwintergaertenMetadata = createMetadata({
  title: "Kaltwintergarten & Sommergarten montieren lassen",
  description:
    "Kaltwintergarten und Sommergarten vom Handwerker Remmert Montagebau. Glasüberdachungen, Terrassenerweiterung und schlüsselfertige Montage in Niedersachsen.",
  path: "/kaltwintergaerten",
  ogImage: `${GALLERY_PUBLIC_PATH}/terrassenueberdachungen-glasdach-1920w.webp`,
});

export const carportsMetadata = createMetadata({
  title: "Carport Montage & Vordach Montage",
  description:
    "Carport Montage und Vordach Montage von Remmert Montagebau. Metallbau Montage, individuelle Planung und saubere Ausführung in Hameln, Rinteln und Schaumburg.",
  path: "/carports",
  ogImage: `${GALLERY_PUBLIC_PATH}/carports-carport-aussenanlage-1920w.webp`,
});

export const wpcTerrassenMetadata = createMetadata({
  title: "WPC Terrasse & Holzterrasse | Terrassensanierung",
  description:
    "WPC Terrasse, Holzterrasse und Terrassensanierung vom Fachbetrieb Remmert Montagebau. Unterkonstruktion, Verlegung und Montage im Raum Weserbergland.",
  path: "/wpc-terrassen",
  ogImage: `${GALLERY_PUBLIC_PATH}/montagebau-holzdeck-naturteich-1920w.webp`,
});

export function createRegionMetadata(
  slug: string,
  title: string,
  description: string,
) {
  return createMetadata({
    title,
    description,
    path: `/regionen/${slug}`,
    ogImage: `${GALLERY_PUBLIC_PATH}/terrassenueberdachungen-jan-remmert-059-1920w.webp`,
  });
}

export const ueberUnsMetadata = createMetadata({
  title: "Über Uns | Terrassenüberdachung Handwerker Jan Remmert",
  description:
    "Remmert Montagebau – Terrassenüberdachung Fachbetrieb mit persönlicher Beratung durch Inhaber Jan Remmert. Maßanfertigung, saubere Montage und regionale Nähe.",
  path: "/ueber-uns",
  ogImage: "/images/inhaber-jan-remmert.webp",
});

export const kontaktMetadata = createMetadata({
  title: "Kontakt | Terrassenüberdachung Angebot anfragen",
  description:
    "Terrassenüberdachung Angebot anfragen bei Remmert Montagebau. Telefon, WhatsApp, E-Mail – kostenlose Erstberatung für Hessisch Oldendorf, Hameln, Rinteln und Umgebung.",
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
