import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { GalleryGrid } from "@/components/GalleryGrid";
import { InstagramSection } from "@/components/InstagramSection";
import { ContactCTA } from "@/components/ContactCTA";
import {
  createBreadcrumbSchema,
  createImageObjectSchema,
} from "@/lib/schema";
import { type GalleryCategory } from "@/lib/gallery";
import { getGalleryImages } from "@/lib/gallery-server";
import { galerieMetadata } from "@/lib/seo";

export const metadata: Metadata = galerieMetadata;

const VALID_CATEGORIES: GalleryCategory[] = [
  "terrassenueberdachungen",
  "carports",
  "innenausbau",
  "montagebau",
];

type GaleriePageProps = {
  searchParams: { kategorie?: string };
};

export default function GaleriePage({ searchParams }: GaleriePageProps) {
  const galleryImages = getGalleryImages();
  const kategorie = searchParams.kategorie;
  const initialCategory =
    kategorie && VALID_CATEGORIES.includes(kategorie as GalleryCategory)
      ? (kategorie as GalleryCategory)
      : "all";
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Galerie", path: "/galerie" },
        ])}
      />
      <JsonLd data={createImageObjectSchema(galleryImages)} />

      <section className="section-padding pt-32">
        <div className="container-narrow">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              Galerie & Referenzen
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Entdecken Sie unsere Projekte: Terrassenüberdachungen, Carports,
              Montagebau und Innenausbau in Hessisch Oldendorf und Umgebung.
            </p>
          </div>
          <GalleryGrid images={galleryImages} initialCategory={initialCategory} />
        </div>
      </section>

      <InstagramSection images={galleryImages.slice(0, 6)} />
      <ContactCTA />
    </>
  );
}
