import { SITE } from "./constants";
import { getFullAddress } from "./gallery";

type SchemaGraph = Record<string, unknown>[];

function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/images/Logo.jpg`,
    },
    sameAs: [SITE.instagram, SITE.facebook],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phoneRaw,
      contactType: "customer service",
      email: SITE.email,
      areaServed: "DE",
      availableLanguage: "German",
    },
  };
}

function localBusinessSchema() {
  return {
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${SITE.url}/#localbusiness`,
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phoneRaw,
    email: SITE.email,
    image: `${SITE.url}/images/Jan_Remmert_028-1920w.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.1725,
      longitude: 9.2494,
    },
    areaServed: SITE.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    priceRange: "$$",
    sameAs: [SITE.instagram, SITE.facebook],
    founder: {
      "@type": "Person",
      name: SITE.owner,
    },
  };
}

export function createWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        publisher: { "@id": `${SITE.url}/#organization` },
        inLanguage: "de-DE",
      },
      organizationSchema(),
      localBusinessSchema(),
    ] satisfies SchemaGraph,
  };
}

export function createBreadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

export function createFaqSchema(
  faqs: readonly { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function createImageObjectSchema(
  images: { src: string; alt: string; width: number; height: number }[],
) {
  return {
    "@context": "https://schema.org",
    "@graph": images.map((image, index) => ({
      "@type": "ImageObject",
      "@id": `${SITE.url}${image.src}#image-${index}`,
      contentUrl: `${SITE.url}${image.src}`,
      name: image.alt,
      width: image.width,
      height: image.height,
      creator: {
        "@type": "Organization",
        name: SITE.name,
      },
    })),
  };
}

export function createContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Kontakt – ${SITE.name}`,
    url: `${SITE.url}/kontakt`,
    description: `Kontaktieren Sie ${SITE.name} in ${getFullAddress()}.`,
    mainEntity: { "@id": `${SITE.url}/#localbusiness` },
  };
}
