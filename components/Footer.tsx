import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react";
import { LEGAL_ITEMS, NAV_ITEMS, SITE, SITE_LOGO } from "@/lib/constants";

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className =
    "inline-flex items-center gap-2.5 text-sm text-background/80 transition-colors hover:text-background";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="container-narrow section-padding grid gap-10 md:grid-cols-2 xl:grid-cols-12 xl:gap-8">
        <div className="space-y-5 xl:col-span-4">
          <Link
            href="/"
            aria-label="Remmert Montagebau – Startseite"
            className="inline-flex rounded-xl bg-white px-5 py-3 shadow-sm"
          >
            <Image
              src={SITE_LOGO.src}
              alt="Remmert Montagebau Logo"
              width={SITE_LOGO.width}
              height={SITE_LOGO.height}
              className="h-[4.75rem] w-auto max-w-[280px] object-contain sm:h-24 sm:max-w-[320px]"
            />
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-background/70">
            Ihr regionaler Fachbetrieb für Terrassenüberdachungen, Montagebau
            und Innenausbau – mit persönlicher Beratung, präziser Ausführung
            und dem Anspruch echter Handwerksqualität.
          </p>
          <ul className="space-y-2" aria-label="Unsere Stärken">
            {SITE.footerHighlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-background/75"
              >
                <Star
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="xl:col-span-2">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/50">
            Navigation
          </h2>
          <ul className="space-y-2.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <FooterLink href={item.href}>{item.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="xl:col-span-3">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/50">
            Kontakt
          </h2>
          <address className="space-y-3.5 not-italic">
            <p className="inline-flex items-start gap-2.5 text-sm text-background/80">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span>
                {SITE.address.street}
                <br />
                {SITE.address.postalCode} {SITE.address.city}
              </span>
            </p>
            <p>
              <FooterLink href={`tel:${SITE.phoneRaw}`}>
                <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {SITE.phone}
              </FooterLink>
            </p>
            <p>
              <FooterLink href={`mailto:${SITE.email}`}>
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {SITE.email}
              </FooterLink>
            </p>
            <p>
              <FooterLink href={SITE.whatsapp} external>
                <MessageCircle
                  className="h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                WhatsApp schreiben
              </FooterLink>
            </p>
          </address>
        </div>

        <div className="space-y-8 xl:col-span-3">
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/50">
              Öffnungszeiten
            </h2>
            <ul className="space-y-3">
              {SITE.openingHours.map((entry) => (
                <li
                  key={entry.label}
                  className="flex items-start gap-2.5 text-sm text-background/80"
                >
                  <Clock
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-medium text-background">{entry.label}</span>
                    <br />
                    <span className="text-background/70">{entry.value}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-background/55">
              Termine außerhalb der regulären Zeiten nach Absprache – wir
              finden gemeinsam einen passenden Zeitpunkt für Ihre Beratung.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/50">
              Einzugsgebiet
            </h2>
            <p className="inline-flex items-start gap-2.5 text-sm leading-relaxed text-background/80">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span>{SITE.serviceAreas.join(" · ")} und Umgebung</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container-narrow flex flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {LEGAL_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-background/70 transition-colors hover:text-background"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-background/70 transition-colors hover:text-background"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/leistungen"
                  className="text-sm text-background/70 transition-colors hover:text-background"
                >
                  Leistungen
                </Link>
              </li>
              <li>
                <a
                  href={SITE.googleReviewWrite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-background/70 transition-colors hover:text-background"
                >
                  <Star className="h-4 w-4 text-primary" aria-hidden="true" />
                  Google-Bewertung abgeben
                </a>
              </li>
            </ul>

            <div className="flex gap-3">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-background/15 p-2.5 text-background/80 transition-colors hover:border-background/30 hover:bg-background/10 hover:text-background"
                aria-label="Remmert Montagebau auf Instagram"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-background/15 p-2.5 text-background/80 transition-colors hover:border-background/30 hover:bg-background/10 hover:text-background"
                aria-label="Remmert Montagebau auf Facebook"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-2 border-t border-background/10 pt-6 text-xs text-background/50 sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} {SITE.name}. Alle Rechte vorbehalten.
            </p>
            <p>
              Inhaber: {SITE.owner} · Terrassenüberdachungen · Montagebau ·
              Innenausbau
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
