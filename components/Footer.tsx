import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Phone, Mail } from "lucide-react";
import { LEGAL_ITEMS, NAV_ITEMS, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="container-narrow section-padding grid gap-12 lg:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" aria-label="Remmert Montagebau – Startseite">
            <Image
              src="/images/Logo.jpg"
              alt="Remmert Montagebau Logo"
              width={180}
              height={54}
              className="h-11 w-auto object-contain"
            />
          </Link>
          <p className="text-sm leading-relaxed text-background/70">
            Handwerk mit Herz – Terrassenüberdachungen, Montagebau und
            Innenausbau in Hessisch Oldendorf und Umgebung.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/50">
            Navigation
          </h2>
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-background/80 transition-colors hover:text-background"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/50">
            Kontakt
          </h2>
          <address className="space-y-3 not-italic">
            <p className="text-sm text-background/80">
              {SITE.address.street}
              <br />
              {SITE.address.postalCode} {SITE.address.city}
            </p>
            <p>
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="inline-flex items-center gap-2 text-sm text-background/80 transition-colors hover:text-background"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {SITE.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 text-sm text-background/80 transition-colors hover:text-background"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                E-Mail senden
              </a>
            </p>
          </address>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/50">
            Rechtliches & Social
          </h2>
          <ul className="mb-6 space-y-2">
            {LEGAL_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-background/80 transition-colors hover:text-background"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-4">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-background/80 transition-colors hover:bg-background/10 hover:text-background"
              aria-label="Remmert Montagebau auf Instagram"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-background/80 transition-colors hover:bg-background/10 hover:text-background"
              aria-label="Remmert Montagebau auf Facebook"
            >
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container-narrow flex flex-col items-center justify-between gap-2 px-4 py-6 text-center text-xs text-background/50 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Alle Rechte vorbehalten.
          </p>
          <p>Inhaber: {SITE.owner}</p>
        </div>
      </div>
    </footer>
  );
}
