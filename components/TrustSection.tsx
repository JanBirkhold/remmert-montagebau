"use client";

import { motion } from "framer-motion";
import { Award, CalendarCheck, Headset } from "lucide-react";

const PROMISE_ITEMS = [
  {
    icon: Headset,
    title: "Fortlaufender Kundendienst",
    description:
      "Vom ersten Gespräch bis zur finalen Abnahme sind wir für Sie da – mit festem Ansprechpartner, kurzen Wegen und Rückmeldungen, auf die Sie sich verlassen können.",
  },
  {
    icon: CalendarCheck,
    title: "Termingerechte Fertigstellung",
    description:
      "Wir planen realistisch, kommunizieren klare Meilensteine und halten unsere Zusagen ein – damit Ihr Projekt pünktlich und ohne unnötige Verzögerungen fertig wird.",
  },
  {
    icon: Award,
    title: "Beste Qualität",
    description:
      "Erstklassige Materialien, präzise Handwerksarbeit und ein Ergebnis, das in Form, Funktion und Langlebigkeit überzeugt – gebaut, um Jahrzehnte zu bestehen.",
  },
] as const;

export function TrustSection() {
  return (
    <section
      className="section-padding bg-muted/40"
      aria-labelledby="promise-heading"
    >
      <div className="container-narrow">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Unser Versprechen
          </p>
          <h2
            id="promise-heading"
            className="mt-3 text-3xl font-bold text-foreground sm:text-4xl"
          >
            Unser Versprechen an Sie
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Was wir Ihnen zusagen, setzen wir auch um – verbindlich, transparent
            und mit dem Anspruch, den wir an unsere eigene Arbeit stellen.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {PROMISE_ITEMS.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-border bg-card p-8 shadow-sm"
            >
              <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
