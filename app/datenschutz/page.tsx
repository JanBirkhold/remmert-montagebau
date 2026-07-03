import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { datenschutzMetadata } from "@/lib/seo";

export const metadata: Metadata = datenschutzMetadata;

export default function DatenschutzPage() {
  return (
    <section className="section-padding pt-32">
      <div className="container-prose px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground">
          Datenschutzerklärung
        </h1>

        <div className="mt-8 space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">
              1. Verantwortlicher
            </h2>
            <p className="mt-2">
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO)
              ist:
              <br />
              <br />
              {SITE.name}
              <br />
              {SITE.owner}
              <br />
              {SITE.address.street}
              <br />
              {SITE.address.postalCode} {SITE.address.city}
              <br />
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
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              2. Kontaktaufnahme
            </h2>
            <p className="mt-2">
              Wenn Sie uns per Kontaktformular, Telefon, E-Mail oder WhatsApp
              kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten
              (z. B. Name, Telefonnummer, E-Mail-Adresse, Nachricht, ggf.
              hochgeladene Bilder) zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage
              ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6
              Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung
              von Anfragen).
            </p>
            <p className="mt-2">
              Die Daten werden gelöscht, sobald die Anfrage abschließend
              bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten
              entgegenstehen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Hosting</h2>
            <p className="mt-2">
              Diese Website wird bei einem externen Hosting-Anbieter betrieben.
              Personenbezogene Daten, die auf dieser Website erfasst werden,
              werden auf den Servern des Hosters gespeichert. Rechtsgrundlage
              ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer
              sicheren und effizienten Bereitstellung der Website).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              4. Server-Logfiles
            </h2>
            <p className="mt-2">
              Beim Besuch dieser Website erhebt der Hosting-Anbieter automatisch
              Informationen in sogenannten Server-Logfiles (z. B. IP-Adresse,
              Browsertyp, Betriebssystem, Referrer-URL, Uhrzeit der
              Serveranfrage). Diese Daten dienen der Sicherheit und
              technischen Stabilität der Website. Rechtsgrundlage ist Art. 6
              Abs. 1 lit. f DSGVO.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Cookies</h2>
            <p className="mt-2">
              Diese Website verwendet nur technisch notwendige Cookies, soweit
              erforderlich. Es werden keine Tracking- oder Marketing-Cookies ohne
              Ihre Einwilligung gesetzt. Sollten künftig Analyse-Tools
              eingesetzt werden, informieren wir Sie hierüber und holen ggf.
              eine Einwilligung ein.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              6. Social Media Links
            </h2>
            <p className="mt-2">
              Auf unserer Website befinden sich Links zu unseren Profilen auf{" "}
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Instagram
              </a>{" "}
              und{" "}
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Facebook
              </a>
              . Beim Anklicken verlassen Sie unsere Website. Es gelten die
              Datenschutzbestimmungen der jeweiligen Plattform. Es findet keine
              automatische Datenübertragung statt, solange Sie die Links nicht
              aktiv anklicken.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              7. Google Maps
            </h2>
            <p className="mt-2">
              Wir binden Google Maps nicht direkt ein. Unser Standort wird als
              Textadresse angegeben. Sollten Sie eine Kartenansicht nutzen
              möchten, können Sie den Standort über{" "}
              <a
                href="https://maps.google.com/?q=Röthstraße+8,+31840+Hessisch+Oldendorf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Maps (externer Link)
              </a>{" "}
              aufrufen. Dabei gelten die Datenschutzbestimmungen von Google.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              8. Ihre Rechte
            </h2>
            <p className="mt-2">Sie haben folgende Rechte:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li>
                Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)
              </li>
            </ul>
            <p className="mt-2">
              Wenden Sie sich für die Ausübung Ihrer Rechte an die oben
              genannten Kontaktdaten.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              9. Änderungen dieser Datenschutzerklärung
            </h2>
            <p className="mt-2">
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um
              sie an geänderte Rechtslagen oder bei Änderungen des
              Dienstes anzupassen. Es gilt die jeweils aktuelle Fassung.
            </p>
            <p className="mt-2 text-sm">Stand: Juli 2026</p>
          </section>

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
