import { SITE } from "@/lib/constants";

export const TERRASSEN_BENEFITS = [
  {
    title: "Maßanfertigung statt Standard",
    text: "Jede Überdachung wird individuell geplant – passend zu Haus, Terrasse und Nutzung.",
  },
  {
    title: "Aluminium, Glas & Lamellendach",
    text: "Robuste Materialien, klare Beratung und eine Lösung, die optisch und technisch überzeugt.",
  },
  {
    title: "Montage aus einer Hand",
    text: `Schlüsselfertig umgesetzt von ${SITE.owner} – von der Besichtigung bis zur fertigen Übergabe.`,
  },
] as const;

export const TERRASSEN_PROCESS = [
  "Anfrage per Telefon, WhatsApp oder Kontaktformular",
  "Besichtigung vor Ort und ehrliche Einschätzung",
  "Individuelles Angebot mit Material- und Dachform-Empfehlung",
  "Professionelle Montage – termingerecht und sauber",
] as const;

export const TERRASSEN_SECTIONS = [
  {
    id: "aluminium",
    title: "Terrassenüberdachung aus Aluminium",
    paragraphs: [
      "Eine Aluminium-Terrassenüberdachung verbindet filigrane Optik mit hoher Stabilität. Remmert Montagebau plant und montiert Ihre Überdachung in Maßanfertigung – persönlich beraten, ohne anonymen Konfigurator, dafür mit echtem Blick auf Ihr Objekt vor Ort.",
      "Ob Wandanschluss, Seitenwand, Sichtschutz oder Sonnensegel: Wir stimmen Details gemeinsam ab. Sie entscheiden, ob wir die komplette Montage übernehmen – empfehlenswert für Statik, Entwässerung und langlebige Ergebnisse.",
    ],
  },
  {
    id: "dachformen",
    title: "Dachformen, die zum Haus passen",
    paragraphs: [
      "Flachdach oder Pultdach eignen sich ideal für wandgebundene Überdachungen – sauber angebunden, wetterfest und architektonisch stimmig. Freistehende Lösungen setzen wir mit Sattel- oder Pyramidendach um, wenn Statik und Optik es erfordern.",
      "So entsteht keine Lösung von der Stange, sondern eine Terrassenüberdachung, die Ihr Haus wirklich ergänzt.",
    ],
  },
  {
    id: "langlebigkeit",
    title: "Langlebig und wartungsarm",
    paragraphs: [
      "Aluminium ist leicht, robust und pflegeleicht – ideal für das norddeutsche Klima. Im Vergleich zu Holz wirkt es modern, verzieht sich nicht und braucht keine aufwendige Pflege. Die Investition zahlt sich über Jahre aus: stabil, wetterbeständig und optisch dauerhaft ansprechend.",
    ],
  },
  {
    id: "glas",
    title: "Mehr Licht mit Glas-Elementen",
    paragraphs: [
      "Die Kombination aus Aluminium und Glas bringt Helligkeit auf Ihre Terrasse – bei jedem Wetter. Glasdach Terrassen wirken edel, passen zu moderner Architektur und steigern den Wohnwert spürbar. Wir beraten, welche Verglasung zu Nutzung, Statik und Budget passt.",
    ],
  },
  {
    id: "genehmigung",
    title: "Baugenehmigung in Niedersachsen",
    paragraphs: [
      "Ob eine Genehmigung nötig ist, hängt von Größe, Abstand, Bebauungsplan und Anbindung ab – in Niedersachsen gelten eigene Regeln. Wir prüfen Ihre Situation und sagen Ihnen klar, was sinnvoll und erforderlich ist.",
    ],
    link: { href: "/faq", label: "Antworten in den FAQ" },
  },
  {
    id: "planung",
    title: "Individuelle Planung – kein Kompromiss",
    paragraphs: [
      "Größe, Form, Material und Ausstattung richten wir exakt auf Ihren Bedarf aus – auch bei ungewöhnlichen Grundrissen. So entsteht eine Lösung, die technisch passt, optisch überzeugt und transparent kalkuliert ist. Qualität, die man sieht und der man vertrauen kann.",
    ],
  },
] as const;

export { TERRASSEN_FAQ } from "./faq";
