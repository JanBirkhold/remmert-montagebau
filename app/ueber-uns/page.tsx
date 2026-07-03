import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { OwnerSection } from "@/components/OwnerSection";
import { ContactCTA } from "@/components/ContactCTA";
import { createBreadcrumbSchema } from "@/lib/schema";
import { ueberUnsMetadata } from "@/lib/seo";

export const metadata: Metadata = ueberUnsMetadata;

export default function UeberUnsPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Über Uns", path: "/ueber-uns" },
        ])}
      />

      <div className="pt-20">
        <OwnerSection variant="full" headingLevel="h1" />
      </div>

      <ContactCTA />
    </>
  );
}
