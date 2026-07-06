import Link from "next/link";
import { ArrowRight, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

type ContactCTAProps = {
  title?: string;
  description?: string;
  className?: string;
};

export function ContactCTA({
  title = "Bereit für Ihr nächstes Projekt?",
  description = "Kontaktieren Sie uns für eine kostenlose und unverbindliche Beratung. Wir freuen uns auf Ihre Anfrage.",
  className = "",
}: ContactCTAProps) {
  return (
    <section
      className={`section-padding ${className}`}
      aria-labelledby="contact-cta-heading"
    >
      <div className="container-narrow">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-12 text-center text-primary-foreground sm:px-12 sm:py-16">
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2
              id="contact-cta-heading"
              className="text-3xl font-bold sm:text-4xl"
            >
              {title}
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/90">
              {description}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="text-base"
              >
                <Link href="/kontakt">
                  Kostenlose Beratung anfragen
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <a href={`tel:${SITE.phoneRaw}`}>
                  <Phone aria-hidden="true" />
                  {SITE.phone}
                </a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-primary-foreground/85">
              <Star
                className="mr-1.5 inline h-4 w-4 align-text-bottom text-primary-foreground"
                aria-hidden="true"
              />
              Zufrieden mit unserem Service?{" "}
              <a
                href={SITE.googleReviewWrite}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-4 hover:text-primary-foreground"
              >
                Google-Bewertung abgeben
              </a>
            </p>
          </div>
          <div
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/5"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
