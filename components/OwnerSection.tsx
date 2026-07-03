"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import { OWNER } from "@/lib/owner";
import { WHY_US } from "@/lib/gallery";

type OwnerSectionProps = {
  variant?: "preview" | "full";
  headingLevel?: "h1" | "h2";
};

export function OwnerSection({
  variant = "preview",
  headingLevel = "h2",
}: OwnerSectionProps) {
  const Heading = headingLevel;
  const headingId =
    variant === "full" ? "about-heading" : "about-preview-heading";

  return (
    <section
      className="section-padding"
      aria-labelledby={headingId}
    >
      <div className="container-narrow">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl shadow-lg ring-1 ring-border/60 lg:max-w-none"
          >
            <Image
              src={OWNER.image}
              alt={OWNER.imageAlt}
              fill
              priority={variant === "full"}
              sizes="(max-width: 1024px) 80vw, 40vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/90 to-transparent px-6 pb-6 pt-16">
              <p className="text-lg font-bold text-background">{OWNER.name}</p>
              <p className="text-sm text-background/75">
                {OWNER.role} · {SITE.name}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Heading
              id={headingId}
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Handwerk mit Herz und klarer Haltung
            </Heading>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Gutes Handwerk beginnt mit Zuhören. Wir nehmen uns Zeit für Ihr
              Projekt, prüfen die baulichen Möglichkeiten und entwickeln eine
              Lösung, die optisch, technisch und wirtschaftlich überzeugt.
              Remmert Montagebau steht für ehrliche Beratung, hochwertige
              Materialien und eine Ausführung, auf die Sie sich verlassen
              können.
            </p>

            {variant === "full" && (
              <p className="mt-4 text-muted-foreground">
                {OWNER.name} begleitet jedes Projekt persönlich – von der
                Anfrage bis zur Montage, regional in {SITE.address.city} und
                Umgebung.
              </p>
            )}

            <h3 className="mt-8 text-lg font-semibold">
              Warum Remmert Montagebau?
            </h3>
            <ul className="mt-4 space-y-2.5">
              {WHY_US.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              {variant === "preview" ? (
                <Button asChild variant="outline">
                  <Link href="/ueber-uns">Mehr erfahren</Link>
                </Button>
              ) : (
                <Button asChild>
                  <Link href="/kontakt">Beratung anfragen</Link>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
