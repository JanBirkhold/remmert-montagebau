import { Hero } from "@/components/Hero";
import { ServiceCards } from "@/components/ServiceCards";
import { CommunicationSection } from "@/components/CommunicationSection";
import { ReviewSection } from "@/components/ReviewSection";
import { AboutPreview } from "@/components/AboutPreview";
import { GalleryPreview } from "@/components/GalleryGrid";
import { InstagramSection } from "@/components/InstagramSection";
import { ContactCTA } from "@/components/ContactCTA";
import { TrustSection } from "@/components/TrustSection";
import { getGalleryImages } from "@/lib/gallery-server";

export default function HomePage() {
  const galleryImages = getGalleryImages();

  return (
    <>
      <Hero />
      <ServiceCards />
      <CommunicationSection />
      <ReviewSection />
      <AboutPreview />
      <GalleryPreview images={galleryImages} />
      <TrustSection />
      <InstagramSection images={galleryImages.slice(0, 6)} />
      <ContactCTA />
    </>
  );
}
