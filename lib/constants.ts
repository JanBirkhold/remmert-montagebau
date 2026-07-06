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
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Remmert+Montagebau,Röthstraße+8,31840+Hessisch+Oldendorf",
  /** Direktlink zum Bewertungsformular – Place-ID in Google Business ersetzen, falls vorhanden */
  googleReviewWrite:
    "https://www.google.com/maps/search/?api=1&query=Remmert+Montagebau,Röthstraße+8,31840+Hessisch+Oldendorf",
  googleReviews:
    "https://www.google.com/maps/search/?api=1&query=Remmert+Montagebau,Röthstraße+8,31840+Hessisch+Oldendorf",
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
    "Minden",
    "Lemgo",
    "Bad Oeynhausen",
    "Schaumburg",
    "Weserbergland",
  ],
  tagline:
    "Ihr regionaler Fachbetrieb für Terrassenüberdachungen, Kaltwintergärten und Montagebau im Raum Hessisch Oldendorf, Hameln, Schaumburg, Rinteln und Minden.",
  openingHours: [
    { label: "Montag – Freitag", value: "07:30 – 18:00 Uhr" },
    { label: "Samstag", value: "Nach Vereinbarung" },
    { label: "Sonntag", value: "Geschlossen" },
  ],
  footerHighlights: [
    "Persönliche Beratung durch den Inhaber",
    "Kostenlose Erstberatung vor Ort",
    "Termingerechte Projektabwicklung",
    "Hochwertige Materialien & saubere Montage",
  ],
} as const;

export const COMPANY_STATS = [
  {
    value: 548,
    label: "Erfolgreich abgeschlossene Projekte",
    decimals: 0,
    suffix: "+",
    featured: true,
  },
  {
    value: 18,
    label: "Jahre Erfahrung",
    decimals: 0,
    suffix: "",
  },
  {
    value: 2016,
    label: "Gründung seit",
    decimals: 0,
    suffix: "",
  },
  {
    value: 4.6,
    label: "Sterne bei Google",
    detail: "aus 10 Bewertungen",
    decimals: 1,
    suffix: "",
    showStars: true,
  },
] as const;

export const SITE_LOGO = {
  src: "/images/logo-black.png",
  width: 480,
  height: 155,
} as const;

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/terrassenueberdachungen", label: "Terrassenüberdachungen" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/galerie", label: "Referenzen" },
  { href: "/faq", label: "FAQ" },
  { href: "/ueber-uns", label: "Über Uns" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const LEGAL_ITEMS = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
] as const;
