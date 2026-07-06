export const ROOF_TYPES = [
  {
    id: "aluminium-flach",
    label: "Aluminium – Flachdach",
    description: "Modern, wandgebunden, pflegeleicht",
    pricePerSqm: 850,
    montageFee: 4800,
  },
  {
    id: "aluminium-pult",
    label: "Aluminium – Pultdach",
    description: "Optimal für Entwässerung",
    pricePerSqm: 920,
    montageFee: 5200,
  },
  {
    id: "glasdach",
    label: "Terrassenüberdachung mit Glas",
    description: "Maximale Helligkeit, edle Optik",
    pricePerSqm: 1180,
    montageFee: 5900,
  },
  {
    id: "lamellendach",
    label: "Lamellendach",
    description: "Flexible Beschattung",
    pricePerSqm: 1050,
    montageFee: 5500,
  },
  {
    id: "kaltwintergarten",
    label: "Kaltwintergarten",
    description: "Terrassenerweiterung mit Glas",
    pricePerSqm: 1450,
    montageFee: 7200,
  },
] as const;

export type RoofTypeId = (typeof ROOF_TYPES)[number]["id"];

export const MOUNTING_TYPES = [
  {
    id: "wandgebunden",
    label: "Am Haus montiert",
    description: "Anbindung an die Fassade",
    surcharge: 0,
  },
  {
    id: "freistehend",
    label: "Freistehend",
    description: "Eigenständige Konstruktion auf der Terrasse",
    surcharge: 2200,
  },
  {
    id: "teilweise",
    label: "Teilweise wandgebunden",
    description: "Kombination aus Haus- und Stützenmontage",
    surcharge: 1100,
  },
] as const;

export type MountingTypeId = (typeof MOUNTING_TYPES)[number]["id"];

export const ROOF_SHAPES = [
  { id: "flach", label: "Flachdach", surcharge: 0 },
  { id: "pult", label: "Pultdach", surcharge: 450 },
  { id: "sattel", label: "Satteldach", surcharge: 950 },
  { id: "pyramide", label: "Pyramidendach", surcharge: 1350 },
] as const;

export type RoofShapeId = (typeof ROOF_SHAPES)[number]["id"];

export const GLAZING_OPTIONS = [
  { id: "standard", label: "Standard ( ohne Vollverglasung )", surchargePerSqm: 0 },
  { id: "klar", label: "Klarglas", surchargePerSqm: 195 },
  { id: "milch", label: "Milchglas / satiniert", surchargePerSqm: 240 },
  { id: "vsg", label: "VSG-Sicherheitsglas", surchargePerSqm: 310 },
] as const;

export type GlazingId = (typeof GLAZING_OPTIONS)[number]["id"];

export const FLOOR_LEVELS = [
  { id: "erdgeschoss", label: "Erdgeschoss" },
  { id: "obergeschoss", label: "Obergeschoss / Balkon" },
  { id: "unterkellert", label: "Unterkellert / Hanglage" },
] as const;

export type FloorLevelId = (typeof FLOOR_LEVELS)[number]["id"];

export const QUOTE_EXTRAS = [
  { id: "seitenwand", label: "Seitenwand / Sichtschutz", price: 1650 },
  { id: "seitenrollo", label: "Seitenrollo / Textilscreen", price: 2400 },
  { id: "led", label: "LED-Beleuchtung integriert", price: 950 },
  { id: "fundament", label: "Fundament / Bodenplatte", price: 3200 },
  { id: "regenrinne", label: "Regenrinne & Entwässerung erweitert", price: 780 },
] as const;

export type QuoteExtraId = (typeof QUOTE_EXTRAS)[number]["id"];

export const FRAME_COLORS = [
  {
    id: "anthrazit",
    label: "Anthrazit",
    description: "Klassisch & pflegeleicht",
    hex: "#3D4348",
    surcharge: 0,
  },
  {
    id: "weiss",
    label: "Weiß",
    description: "Hell & zeitlos",
    hex: "#F2F2F2",
    surcharge: 0,
  },
  {
    id: "grau-metallic",
    label: "Grau metallic",
    description: "Modern mit Metallic-Effekt",
    hex: "#8A9098",
    surcharge: 120,
  },
  {
    id: "schwarz",
    label: "Schwarz",
    description: "Edel & kontrastreich",
    hex: "#1C1C1C",
    surcharge: 180,
  },
  {
    id: "braun",
    label: "Holzdekor Braun",
    description: "Warme Holzoptik",
    hex: "#6B4A32",
    surcharge: 240,
  },
  {
    id: "beige",
    label: "Sand / Beige",
    description: "Dezent & freundlich",
    hex: "#C8B89A",
    surcharge: 120,
  },
] as const;

export type FrameColorId = (typeof FRAME_COLORS)[number]["id"];

export const MIN_AREA_SQM = 9;
export const VAT_RATE = 0.19;

export function getRoofType(id: string) {
  return ROOF_TYPES.find((type) => type.id === id);
}

export function getMountingType(id: string) {
  return MOUNTING_TYPES.find((type) => type.id === id);
}

export function getRoofShape(id: string) {
  return ROOF_SHAPES.find((shape) => shape.id === id);
}

export function getGlazingOption(id: string) {
  return GLAZING_OPTIONS.find((option) => option.id === id);
}

export function getFloorLevel(id: string) {
  return FLOOR_LEVELS.find((level) => level.id === id);
}

export function getQuoteExtra(id: string) {
  return QUOTE_EXTRAS.find((extra) => extra.id === id);
}

export function getFrameColor(id: string) {
  return FRAME_COLORS.find((color) => color.id === id);
}
