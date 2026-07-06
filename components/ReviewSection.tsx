"use client";

import { motion } from "framer-motion";
import { ExternalLink, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLACEHOLDER_REVIEWS } from "@/lib/gallery";
import { SITE } from "@/lib/constants";

export function ReviewSection() {
  return (
    <section
      className="section-padding bg-muted/50"
      aria-labelledby="reviews-heading"
    >
      <div className="container-narrow">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            id="reviews-heading"
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            Das sagen unsere Kunden
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Zufrieden mit unserer Arbeit? Wir freuen uns über Ihre ehrliche
            Google-Bewertung – das hilft anderen bei der Entscheidung.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PLACEHOLDER_REVIEWS.map((review, index) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <Quote
                className="mb-4 h-8 w-8 text-primary/30"
                aria-hidden="true"
              />
              <div
                className="mb-4 flex gap-1"
                aria-label="5 von 5 Sternen (Beispiel)"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-foreground/80">
                &bdquo;{review.text}&ldquo;
              </blockquote>
              <p className="mt-4 text-xs text-muted-foreground">
                Beispiel-Feedback · Platzhalter für zukünftige Google-Bewertungen
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-lg rounded-2xl border-2 border-primary/20 bg-card px-6 py-8 shadow-sm sm:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Zufrieden? Bewertung abgeben
            </h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Ihre Erfahrung mit Remmert Montagebau – in wenigen Klicks bei Google.
            </p>
            <div className="mt-6 flex w-full flex-col gap-3 sm:max-w-md">
              <Button
                asChild
                size="lg"
                className="h-auto min-h-12 w-full whitespace-normal px-4 py-3 text-center"
              >
                <a
                  href={SITE.googleReviewWrite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Star aria-hidden="true" className="shrink-0" />
                  Google-Bewertung abgeben
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-auto min-h-12 w-full whitespace-normal px-4 py-3 text-center"
              >
                <a
                  href={SITE.googleReviews}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bewertungen ansehen
                  <ExternalLink aria-hidden="true" className="shrink-0" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
