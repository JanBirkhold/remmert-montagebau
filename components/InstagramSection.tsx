"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { instagramImages } from "@/lib/gallery";
import { SITE } from "@/lib/constants";

export function InstagramSection() {
  return (
    <section
      className="section-padding bg-muted/50"
      aria-labelledby="instagram-heading"
    >
      <div className="container-narrow">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            id="instagram-heading"
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            Aktuelle Projekte und Einblicke
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Auf Instagram zeigen wir regelmäßig Einblicke in laufende und
            abgeschlossene Projekte.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
          {instagramImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/30" />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram aria-hidden="true" />
              Remmert Montagebau auf Instagram folgen
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
