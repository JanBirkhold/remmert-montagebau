import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/ContactForm";
import { createBreadcrumbSchema, createContactPageSchema } from "@/lib/schema";
import { kontaktMetadata } from "@/lib/seo";

export const metadata: Metadata = kontaktMetadata;

export default function KontaktPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Kontakt", path: "/kontakt" },
        ])}
      />
      <JsonLd data={createContactPageSchema()} />

      <section className="section-padding pt-32">
        <div className="container-narrow">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              Haben Sie Fragen zu unseren Produkten oder Dienstleistungen?
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Unser kompetentes Team ist gerne für Sie da. Wir freuen uns auf
              Ihre Anfrage und setzen uns zeitnah mit Ihnen in Verbindung.
              Selbstverständlich können Sie uns während der Geschäftszeiten
              auch telefonisch erreichen.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
