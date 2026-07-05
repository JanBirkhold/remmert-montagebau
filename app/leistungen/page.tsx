import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { ContactCTA } from "@/components/ContactCTA";
import { REGION_PAGES } from "@/lib/content/regions";
import { SERVICE_PAGES } from "@/lib/content/services";
import { createBreadcrumbSchema } from "@/lib/schema";
import { leistungenMetadata } from "@/lib/seo";

export const metadata: Metadata = leistungenMetadata;

export default function LeistungenPage() {
  const additionalServices = [
    "Vordach Montage",
    "Montagebau",
    "Metallbau Montage",
    "Zaunbau",
    "Sichtschutz Montage",
    "Pergola",
    "Markisen Montage",
    "Terrassensanierung",
  ];

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Leistungen", path: "/leistungen" },
        ])}
      />

      <section className="section-padding pt-32">
        <div className="container-narrow">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              Leistungen von Remmert Montagebau
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Terrassenüberdachung montieren lassen, Carport Montage, WPC Terrasse
              oder Kaltwintergarten – als Fachbetrieb mit persönlicher Beratung und
              schlüsselfertiger Ausführung.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {SERVICE_PAGES.filter((service) => service.path !== "/terrassenueberdachungen").map(
              (service) => (
                <article
                  key={service.slug}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <h2 className="text-xl font-semibold text-foreground">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.intro}
                  </p>
                  <Button asChild variant="link" className="mt-4 px-0">
                    <Link href={service.path}>
                      Mehr erfahren
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                </article>
              ),
            )}
          </div>

          <div className="mt-12 rounded-2xl bg-muted/50 px-6 py-8">
            <h2 className="text-xl font-bold text-foreground">
              Weitere Montageleistungen
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {additionalServices.map((service) => (
                <li
                  key={service}
                  className="rounded-full bg-background px-3 py-1.5 text-sm text-muted-foreground ring-1 ring-border"
                >
                  {service}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6">
              <Link href="/terrassenueberdachungen">
                Terrassenüberdachungen im Detail
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground">
              Regionen & Einsatzgebiet
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Montagebau Weserbergland und Terrassenüberdachung Handwerker
              Niedersachsen – lokale Landingpages für Ihre Stadt:
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
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
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
