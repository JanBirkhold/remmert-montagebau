import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GalleryGrid } from "@/components/GalleryGrid";
import { ContactCTA } from "@/components/ContactCTA";
import type { GalleryCategory, GalleryImage } from "@/lib/gallery";
import type { ServicePage } from "@/lib/content/services";

type ServicePageLayoutProps = {
  service: ServicePage;
  galleryImages: GalleryImage[];
};

export function ServicePageLayout({
  service,
  galleryImages,
}: ServicePageLayoutProps) {
  const filteredImages = service.galleryCategory
    ? galleryImages.filter((image) => image.category === service.galleryCategory)
    : galleryImages;

  return (
    <>
      <section className="section-padding pt-32">
        <div className="container-narrow">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Remmert Montagebau · Fachbetrieb
            </p>
            <h1 className="mt-3 text-4xl font-bold text-foreground sm:text-5xl">
              {service.headline}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {service.intro}
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/kontakt">
                  Kostenlose Beratung anfragen
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {service.benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl border border-border bg-card p-5"
              >
                <h2 className="font-semibold text-foreground">{benefit.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-muted/50 px-6 py-8">
            <h2 className="text-xl font-bold text-foreground">
              Leistungsschwerpunkte
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {service.keywords.map((keyword) => (
                <li
                  key={keyword}
                  className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 text-sm text-muted-foreground ring-1 ring-border"
                >
                  <CheckCircle2
                    className="h-3.5 w-3.5 text-primary"
                    aria-hidden="true"
                  />
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {filteredImages.length > 0 && (
        <section className="section-padding bg-muted/40">
          <div className="container-narrow">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
              Referenzprojekte
            </h2>
            <GalleryGrid
              images={filteredImages}
              initialCategory={service.galleryCategory as GalleryCategory}
              showFilters={false}
              limit={6}
            />
          </div>
        </section>
      )}

      <ContactCTA
        title={`${service.title} planen?`}
        description="Kontaktieren Sie uns für ein unverbindliches Terrassendach Angebot – persönlich, transparent und termingerecht."
      />
    </>
  );
}
