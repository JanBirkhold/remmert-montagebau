import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { getServiceBySlug } from "@/lib/content/services";
import { getGalleryImages } from "@/lib/gallery-server";
import { createBreadcrumbSchema } from "@/lib/schema";
import { wpcTerrassenMetadata } from "@/lib/seo";

export const metadata: Metadata = wpcTerrassenMetadata;

export default function WpcTerrassenPage() {
  const service = getServiceBySlug("wpc-terrassen")!;
  const galleryImages = getGalleryImages();

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Leistungen", path: "/leistungen" },
          { name: "WPC Terrassen", path: "/wpc-terrassen" },
        ])}
      />
      <ServicePageLayout service={service} galleryImages={galleryImages} />
    </>
  );
}
