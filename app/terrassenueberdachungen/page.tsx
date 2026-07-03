import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { TerrassenSeoContent } from "@/components/TerrassenSeoContent";
import { FaqSection } from "@/components/FaqSection";
import { ContactCTA } from "@/components/ContactCTA";
import { GalleryGrid } from "@/components/GalleryGrid";
import { createBreadcrumbSchema, createFaqSchema } from "@/lib/schema";
import { TERRASSEN_FAQ } from "@/lib/content/terrassen";
import { terrassenMetadata } from "@/lib/seo";

export const metadata: Metadata = terrassenMetadata;

export default function TerrassenPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terrassenüberdachungen", path: "/terrassenueberdachungen" },
        ])}
      />
      <JsonLd data={createFaqSchema(TERRASSEN_FAQ)} />

      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src="/images/terra+hx-1920w.webp"
            alt="Terrassenüberdachung in Hessisch Oldendorf von Remmert Montagebau"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 to-foreground/60" />
        </div>
        <div className="container-narrow relative z-10 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <h1 className="max-w-3xl text-4xl font-bold text-background sm:text-5xl">
            Terrassenüberdachungen in Hessisch Oldendorf und Umgebung
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-background/80">
            Individuelle Lösungen aus Aluminium, Stahl und Glas – geplant und
            montiert von Remmert Montagebau.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <TerrassenSeoContent />
        </div>
      </section>

      <section className="section-padding bg-muted/50">
        <div className="container-narrow">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Referenzprojekte
          </h2>
          <GalleryGrid
            initialCategory="terrassenueberdachungen"
            showFilters={false}
          />
        </div>
      </section>

      <FaqSection
        items={TERRASSEN_FAQ}
        description="Antworten auf die wichtigsten Fragen zu Terrassenüberdachungen."
      />

      <ContactCTA
        title="Terrassenüberdachung planen?"
        description="Kontaktieren Sie uns für eine kostenlose Beratung in Hessisch Oldendorf, Hameln, Rinteln und Umgebung."
      />
    </>
  );
}
