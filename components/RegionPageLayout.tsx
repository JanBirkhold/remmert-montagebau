import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactCTA } from "@/components/ContactCTA";
import { REGION_PAGES, type RegionPage } from "@/lib/content/regions";
import { SITE } from "@/lib/constants";

type RegionPageLayoutProps = {
  region: RegionPage;
};

export function RegionPageLayout({ region }: RegionPageLayoutProps) {
  const otherRegions = REGION_PAGES.filter((item) => item.slug !== region.slug);

  return (
    <>
      <section className="section-padding pt-32">
        <div className="container-narrow">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Region · {region.city}
            </p>
            <h1 className="mt-3 text-4xl font-bold text-foreground sm:text-5xl">
              {region.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {region.intro}
            </p>

            <ul className="mt-8 space-y-3">
              {region.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-muted-foreground"
                >
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/kontakt">
                  Terrassendach Angebot anfragen
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/terrassenueberdachungen">
                  Alle Leistungen ansehen
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-16 rounded-2xl bg-muted/50 px-6 py-8">
            <h2 className="text-xl font-bold text-foreground">
              Terrassenüberdachung {region.city} – Ihr Fachbetrieb
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
              Remmert Montagebau ist Ihr Terrassenüberdachung Anbieter für{" "}
              {region.city} und Umgebung. Wir montieren Aluminium-Terrassenüberdachungen,
              Glasdach Terrassen, Kaltwintergärten, Carports und übernehmen
              Montagebau sowie Terrassensanierung – persönlich betreut durch{" "}
              {SITE.owner}.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-bold text-foreground">
              Weitere Regionen
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {otherRegions.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/regionen/${item.slug}`}
                    className="inline-flex rounded-full bg-background px-3 py-1.5 text-sm text-muted-foreground ring-1 ring-border transition-colors hover:text-primary"
                  >
                    Terrassenüberdachung {item.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ContactCTA
        title={`Terrassenüberdachung in ${region.city}?`}
        description="Kostenlose Erstberatung vor Ort – realistische Einschätzung zu Kosten, Material und Montage."
      />
    </>
  );
}
