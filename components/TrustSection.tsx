"use client";

import { motion } from "framer-motion";
import { Shield, Clock, MessageSquare, MapPin } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Shield,
    title: "Qualität & Sicherheit",
    description:
      "Hochwertige Materialien und präzise Ausführung für langlebige Ergebnisse.",
  },
  {
    icon: MapPin,
    title: "Regional verwurzelt",
    description:
      "Persönliche Betreuung in Hessisch Oldendorf, Hameln, Rinteln und Umgebung.",
  },
  {
    icon: Clock,
    title: "Zuverlässige Umsetzung",
    description:
      "Termintreue Planung und saubere Montage – vom Erstkontakt bis zur Fertigstellung.",
  },
  {
    icon: MessageSquare,
    title: "Ehrliche Beratung",
    description:
      "Transparente Kommunikation und realistische Einschätzungen für Ihr Projekt.",
  },
];

export function TrustSection() {
  return (
    <section
      className="section-padding"
      aria-labelledby="trust-heading"
    >
      <div className="container-narrow">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            id="trust-heading"
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            Warum Kunden uns vertrauen
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Handwerk, das überzeugt – durch Qualität, Nähe und verlässliche
            Zusammenarbeit.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_ITEMS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
