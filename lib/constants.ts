export const SITE = {
  name: "Remmert Montagebau",
  url: "https://www.remmert-montagebau.de",
  locale: "de_DE",
  owner: "Jan Remmert",
  phone: "+49 175 5993374",
  phoneRaw: "+491755993374",
  email: "info@remmert-montagebau.de",
  whatsapp: "https://wa.me/491755993374",
  instagram: "https://www.instagram.com/remmert_montagebau/",
  facebook:
    "https://www.facebook.com/people/Remmert-Montagebau/100063594130194/",
  googleReviews:
    "https://www.google.com/search?q=Remmert+Montagebau+Rezensionen",
  address: {
    street: "Röthstraße 8",
    city: "Hessisch Oldendorf",
    postalCode: "31840",
    country: "Deutschland",
    countryCode: "DE",
  },
  vatId: "DE306320031",
  taxNumber: "326/5150/1747",
  serviceAreas: [
    "Hessisch Oldendorf",
    "Hameln",
    "Rinteln",
    "Bad Münder",
    "Bückeburg",
    "Stadthagen",
  ],
} as const;

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/terrassenueberdachungen", label: "Terrassenüberdachungen" },
  { href: "/galerie", label: "Galerie" },
  { href: "/ueber-uns", label: "Über Uns" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const LEGAL_ITEMS = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
] as const;
