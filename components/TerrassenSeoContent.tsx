import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import {
  TERRASSEN_BENEFITS,
  TERRASSEN_PROCESS,
  TERRASSEN_SECTIONS,
} from "@/lib/content/terrassen";
import { REGION_PAGES } from "@/lib/content/regions";
import { SITE } from "@/lib/constants";

export function TerrassenSeoContent() {
  return (
    <article className="space-y-12">
      <div className="max-w-3xl">
        <p className="text-lg leading-relaxed text-muted-foreground">
          Remmert Montagebau plant und montiert{" "}
          <strong className="font-semibold text-foreground">
            Aluminium-Terrassenüberdachungen
          </strong>{" "}
          in Hessisch Oldendorf, Hameln, Rinteln und der Region Weserbergland –
          individuell, hochwertig und schlüsselfertig.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {TERRASSEN_BENEFITS.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-border bg-card p-5"
          >
            <h2 className="font-semibold text-foreground">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-10">
        {TERRASSEN_SECTIONS.map((section) => (
          <section key={section.id} aria-labelledby={`terrassen-${section.id}`}>
            <h2
              id={`terrassen-${section.id}`}
              className="text-2xl font-bold text-foreground"
            >
              {section.title}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 max-w-3xl leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
            {"link" in section && section.link && (
              <p className="mt-3">
                <Link
                  href={section.link.href}
                  className="font-medium text-primary hover:underline"
                >
                  {section.link.label}
                </Link>
              </p>
            )}
          </section>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Ihr Weg zur neuen Überdachung
          </h2>
          <ol className="mt-4 space-y-3">
            {TERRASSEN_PROCESS.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <span className="pt-0.5 text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-2xl bg-muted/60 px-6 py-8">
          <h2 className="text-xl font-bold text-foreground">
            Terrassenüberdachung in Ihrer Region
          </h2>
          <p className="mt-4 text-muted-foreground">
            Persönlich betreut durch {SITE.owner}. Referenzen in der{" "}
            <Link href="/galerie" className="font-medium text-primary hover:underline">
              Galerie
            </Link>
            .
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {REGION_PAGES.map((region) => (
              <li key={region.slug}>
                <Link
                  href={`/regionen/${region.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1 text-sm text-muted-foreground ring-1 ring-border transition-colors hover:text-primary"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  {region.city}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold text-foreground">
          Terrassendach Angebot anfragen
        </h2>
        <p className="mt-4 text-muted-foreground">
          Kostenlose Erstberatung per{" "}
          <a href={`tel:${SITE.phoneRaw}`} className="text-primary hover:underline">
            Telefon
          </a>
          ,{" "}
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            WhatsApp
          </a>{" "}
          oder{" "}
          <Link href="/kontakt" className="text-primary hover:underline">
            Kontaktformular
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
