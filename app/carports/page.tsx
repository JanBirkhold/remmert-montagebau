import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { getServiceBySlug } from "@/lib/content/services";
import { getGalleryImages } from "@/lib/gallery-server";
import { createBreadcrumbSchema } from "@/lib/schema";
import { carportsMetadata } from "@/lib/seo";

export const metadata: Metadata = carportsMetadata;

export default function CarportsPage() {
  const service = getServiceBySlug("carports")!;
  const galleryImages = getGalleryImages();

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Leistungen", path: "/leistungen" },
          { name: "Carports", path: "/carports" },
        ])}
      />
      <ServicePageLayout service={service} galleryImages={galleryImages} />
    </>
  );
}
