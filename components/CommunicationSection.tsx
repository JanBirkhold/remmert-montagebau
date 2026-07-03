"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Send, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export function CommunicationSection() {
  return (
    <section
      className="section-padding bg-foreground text-background"
      aria-labelledby="communication-heading"
    >
      <div className="container-narrow">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex rounded-full bg-primary/20 p-3 text-primary">
              <Phone className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2
              id="communication-heading"
              className="text-3xl font-bold sm:text-4xl"
            >
              Direkte Kommunikation statt Warteschleife
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-background/80">
              Uns ist bewusst: Bei Handwerksprojekten zählen nicht nur Qualität
              und saubere Arbeit, sondern auch Erreichbarkeit, klare
              Rückmeldungen und verlässliche Kommunikation. Deshalb legen wir
              besonderen Wert darauf, Anfragen strukturiert aufzunehmen,
              Rückmeldungen nachvollziehbar zu machen und Projekte transparent
              zu begleiten.
            </p>
            <p className="mt-4 text-base leading-relaxed text-background/60">
              Sollten wir telefonisch gerade nicht erreichbar sein, können Sie
              uns jederzeit per WhatsApp oder Kontaktformular schreiben. Wir
              melden uns schnellstmöglich zurück und geben Ihnen eine
              realistische Einschätzung zum nächsten Schritt.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="text-base">
                <Link href="/kontakt">
                  <Send aria-hidden="true" />
                  Jetzt Anfrage senden
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
              >
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle aria-hidden="true" />
                  Per WhatsApp schreiben
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
