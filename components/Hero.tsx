"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroImage } from "@/lib/gallery";
import { SITE } from "@/lib/constants";

type HeroProps = {
  trustBadges: ReactNode;
};

export function Hero({ trustBadges }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] overflow-hidden pt-20">
      <div className="absolute inset-0">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      <div className="container-narrow relative z-10 flex min-h-[calc(90vh-5rem)] flex-col justify-center px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            <span className="text-primary">Remmert Montagebau</span>
            <span className="text-white/95"> · Hessisch Oldendorf</span>
          </p>
          <h1 className="text-4xl font-bold leading-tight text-background sm:text-5xl lg:text-6xl">
            Handwerk mit Herz.
            <span className="mt-2 block text-background/90">
              Terrassenüberdachungen und Montagebau auf höchstem Niveau.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-background/80">
            {SITE.tagline} Präzise Arbeit, ehrliche Beratung und hochwertige
            Lösungen aus Aluminium, Glas und modernen Materialien – von der
            ersten Idee bis zur schlüsselfertigen Montage.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="text-base">
              <Link href="/kontakt">
                Kostenlose Beratung anfragen
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-background/30 bg-background/10 text-background hover:border-background hover:bg-background/20 hover:text-background"
            >
              <Link href="/galerie">Projekte ansehen</Link>
            </Button>
          </div>
        </motion.div>

        {trustBadges}
      </div>
    </section>
  );
}
