import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { getServiceBySlug } from "@/lib/content/services";
import { getGalleryImages } from "@/lib/gallery-server";
import { createBreadcrumbSchema } from "@/lib/schema";
import { kaltwintergaertenMetadata } from "@/lib/seo";

export const metadata: Metadata = kaltwintergaertenMetadata;

export default function KaltwintergaertenPage() {
  const service = getServiceBySlug("kaltwintergaerten")!;
  const galleryImages = getGalleryImages();

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Leistungen", path: "/leistungen" },
          { name: "Kaltwintergärten", path: "/kaltwintergaerten" },
        ])}
      />
      <ServicePageLayout service={service} galleryImages={galleryImages} />
    </>
  );
}
