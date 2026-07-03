import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { impressumMetadata } from "@/lib/seo";

export const metadata: Metadata = impressumMetadata;

export default function ImpressumPage() {
  return (
    <section className="section-padding pt-32">
      <div className="container-prose px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground">Impressum</h1>

        <div className="mt-8 space-y-6 text-muted-foreground">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Angaben gemäß § 5 TMG
            </h2>
            <p className="mt-2">
              {SITE.name}
              <br />
              Inhaber: {SITE.owner}
              <br />
              {SITE.address.street}
              <br />
              {SITE.address.postalCode} {SITE.address.city}
              <br />
              {SITE.address.country}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">Kontakt</h2>
            <p className="mt-2">
              Telefon:{" "}
              <a href={`tel:${SITE.phoneRaw}`} className="text-primary hover:underline">
                {SITE.phone}
              </a>
              <br />
              E-Mail:{" "}
              <a href={`mailto:${SITE.email}`} className="text-primary hover:underline">
                E-Mail senden
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Umsatzsteuer-ID
            </h2>
            <p className="mt-2">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              <br />
              {SITE.vatId}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Steuernummer
            </h2>
            <p className="mt-2">{SITE.taxNumber}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p className="mt-2">
              {SITE.owner}
              <br />
              {SITE.address.street}
              <br />
              {SITE.address.postalCode} {SITE.address.city}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Streitschlichtung
            </h2>
            <p className="mt-2">
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </div>

          <p className="text-sm">
            <Link href="/" className="text-primary hover:underline">
              ← Zurück zur Startseite
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
