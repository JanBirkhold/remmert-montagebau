"use client";

import Link from "next/link";
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
            Bewertungen geben Interessenten einen ehrlichen Eindruck unserer
            Arbeit. Weitere Rezensionen finden Sie direkt bei Google.
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

        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <a
              href={SITE.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google-Bewertungen ansehen
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
