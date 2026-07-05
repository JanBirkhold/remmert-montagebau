"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  GALLERY_CATEGORIES,
  type GalleryCategory,
  type GalleryImage,
} from "@/lib/gallery";
import { cn } from "@/lib/utils";

type GalleryGridProps = {
  images: GalleryImage[];
  initialCategory?: GalleryCategory | "all";
  showFilters?: boolean;
  limit?: number;
};

export function GalleryGrid({
  images,
  initialCategory = "all",
  showFilters = true,
  limit,
}: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<
    GalleryCategory | "all"
  >(initialCategory);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filtered =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const displayed = limit ? filtered.slice(0, limit) : filtered;

  const closeLightbox = useCallback(() => setSelectedImage(null), []);

  return (
    <div>
      {showFilters && (
        <div
          className="mb-8 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Galerie-Filter"
        >
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {displayed.map((image, index) => (
            <motion.button
              key={image.src}
              type="button"
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => setSelectedImage(image)}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`${image.alt} – vergrößern`}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/20" />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none">
          {selectedImage && (
            <>
              <DialogTitle>{selectedImage.alt}</DialogTitle>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-contain"
                  priority
                />
              </div>
              <p className="rounded-lg bg-background/95 px-4 py-3 text-center text-sm text-muted-foreground">
                {selectedImage.alt}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

type GalleryPreviewProps = {
  images: GalleryImage[];
};

export function GalleryPreview({ images }: GalleryPreviewProps) {
  return (
    <section className="section-padding" aria-labelledby="gallery-preview-heading">
      <div className="container-narrow">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2
              id="gallery-preview-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Unsere Projekte
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Einblicke in abgeschlossene Terrassenüberdachungen, Carports und
              Montageprojekte in der Region.
            </p>
          </div>
          <Link
            href="/galerie"
            className="text-sm font-semibold text-primary hover:text-primary/80"
          >
            Alle Projekte ansehen →
          </Link>
        </div>
        <GalleryGrid images={images} showFilters={false} limit={6} />
      </div>
    </section>
  );
}
