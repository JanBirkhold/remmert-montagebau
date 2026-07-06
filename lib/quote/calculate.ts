import {
  getGlazingOption,
  getMountingType,
  getQuoteExtra,
  getRoofShape,
  getRoofType,
  getFloorLevel,
  getFrameColor,
  MIN_AREA_SQM,
  VAT_RATE,
  type FloorLevelId,
  type FrameColorId,
  type GlazingId,
  type MountingTypeId,
  type QuoteExtraId,
  type RoofShapeId,
  type RoofTypeId,
} from "./config";

export type QuoteInput = {
  roofTypeId: RoofTypeId;
  mountingTypeId: MountingTypeId;
  roofShapeId: RoofShapeId;
  glazingId: GlazingId;
  floorLevelId: FloorLevelId;
  frameColorId: FrameColorId;
  widthM: number;
  depthM: number;
  heightM?: number;
  extras: QuoteExtraId[];
};

export type QuoteLineItem = {
  label: string;
  amount: number;
};

export type QuoteBreakdown = {
  quoteNumber: string;
  roofTypeId: RoofTypeId;
  roofTypeLabel: string;
  mountingLabel: string;
  roofShapeLabel: string;
  glazingLabel: string;
  floorLevelLabel: string;
  frameColorLabel: string;
  extrasLabels: string[];
  widthM: number;
  depthM: number;
  heightM?: number;
  areaSqm: number;
  pricePerSqm: number;
  lineItems: QuoteLineItem[];
  netTotal: number;
  vatAmount: number;
  grossTotal: number;
  validUntil: string;
};

export function createQuoteNumber() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `RM-${date}-${suffix}`;
}

export function calculateQuote(input: QuoteInput): QuoteBreakdown | null {
  const roofType = getRoofType(input.roofTypeId);
  const mounting = getMountingType(input.mountingTypeId);
  const roofShape = getRoofShape(input.roofShapeId);
  const glazing = getGlazingOption(input.glazingId);
  const floorLevel = getFloorLevel(input.floorLevelId);
  const frameColor = getFrameColor(input.frameColorId);

  if (!roofType || !mounting || !roofShape || !glazing || !floorLevel || !frameColor) {
    return null;
  }

  const rawArea = input.widthM * input.depthM;
  const areaSqm = Math.max(rawArea, MIN_AREA_SQM);
  const materialCost = Math.round(areaSqm * roofType.pricePerSqm);
  const glazingCost = Math.round(areaSqm * glazing.surchargePerSqm);
  const montageFee = roofType.montageFee + mounting.surcharge + roofShape.surcharge;
  const extrasCost = input.extras.reduce((sum, extraId) => {
    const extra = getQuoteExtra(extraId);
    return sum + (extra?.price ?? 0);
  }, 0);

  const lineItems: QuoteLineItem[] = [
    {
      label: `Konstruktion & Material (${areaSqm} m²)`,
      amount: materialCost,
    },
    {
      label: `Montage & Aufbau (${mounting.label})`,
      amount: montageFee,
    },
  ];

  if (glazingCost > 0) {
    lineItems.push({
      label: `Verglasung: ${glazing.label}`,
      amount: glazingCost,
    });
  }

  if (frameColor.surcharge > 0) {
    lineItems.push({
      label: `Farbe: ${frameColor.label}`,
      amount: frameColor.surcharge,
    });
  }

  if (extrasCost > 0) {
    for (const extraId of input.extras) {
      const extra = getQuoteExtra(extraId);
      if (extra) {
        lineItems.push({ label: extra.label, amount: extra.price });
      }
    }
  }

  const netTotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
  const vatAmount = Math.round(netTotal * VAT_RATE);
  const grossTotal = netTotal + vatAmount;

  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 30);

  return {
    quoteNumber: createQuoteNumber(),
    roofTypeId: input.roofTypeId,
    roofTypeLabel: roofType.label,
    mountingLabel: mounting.label,
    roofShapeLabel: roofShape.label,
    glazingLabel: glazing.label,
    floorLevelLabel: floorLevel.label,
    frameColorLabel: frameColor.label,
    extrasLabels: input.extras.flatMap((id) => {
      const label = getQuoteExtra(id)?.label;
      return label ? [label] : [];
    }),
    widthM: input.widthM,
    depthM: input.depthM,
    heightM: input.heightM,
    areaSqm: Math.round(areaSqm * 100) / 100,
    pricePerSqm: roofType.pricePerSqm,
    lineItems,
    netTotal,
    vatAmount,
    grossTotal,
    validUntil: validUntil.toLocaleDateString("de-DE"),
  };
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}
