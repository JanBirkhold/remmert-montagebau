import { Hero } from "@/components/Hero";
import { ServiceCards } from "@/components/ServiceCards";
import { CommunicationSection } from "@/components/CommunicationSection";
import { ReviewSection } from "@/components/ReviewSection";
import { AboutPreview } from "@/components/AboutPreview";
import { GalleryPreview } from "@/components/GalleryGrid";
import { InstagramSection } from "@/components/InstagramSection";
import { ContactCTA } from "@/components/ContactCTA";
import { TrustSection } from "@/components/TrustSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <CommunicationSection />
      <ReviewSection />
      <AboutPreview />
      <GalleryPreview />
      <TrustSection />
      <InstagramSection />
      <ContactCTA />
    </>
  );
}
