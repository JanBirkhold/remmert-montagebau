import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { FaqSection } from "@/components/FaqSection";
import { ContactCTA } from "@/components/ContactCTA";
import { FAQ_ITEMS } from "@/lib/content/faq";
import { SERVICE_PAGES } from "@/lib/content/services";
import { REGION_PAGES } from "@/lib/content/regions";
import { createBreadcrumbSchema, createFaqSchema } from "@/lib/schema";
import { faqMetadata } from "@/lib/seo";

export const metadata: Metadata = faqMetadata;

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <JsonLd data={createFaqSchema(FAQ_ITEMS)} />

      <section className="section-padding pt-32">
        <div className="container-narrow mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
            Häufige Fragen zu Terrassenüberdachungen
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Antworten zu Kosten, Genehmigung, Materialien und Montage – optimiert
            für Kunden und KI-Suche im Raum Weserbergland und Niedersachsen.
          </p>
        </div>
      </section>

      <FaqSection
        title="FAQ – Terrassenüberdachung & Montagebau"
        description="Transparente Antworten von Remmert Montagebau – Ihr Fachbetrieb in Hessisch Oldendorf."
        items={FAQ_ITEMS}
        id="faq-page-heading"
      />

      <section className="section-padding">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold text-foreground">
            Regionale Terrassenüberdachung
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {REGION_PAGES.map((region) => (
              <li key={region.slug}>
                <Link
                  href={`/regionen/${region.slug}`}
                  className="inline-flex rounded-full bg-muted px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {region.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
