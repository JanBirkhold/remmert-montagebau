import { readFileSync } from "node:fs";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { SITE } from "@/lib/constants";
import { formatCurrency, type QuoteBreakdown } from "./calculate";

export type QuoteCustomer = {
  name: string;
  email: string;
  phone: string;
  location: string;
  message?: string;
};

export async function generateQuotePdf(
  quote: QuoteBreakdown,
  customer: QuoteCustomer,
): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const { width, height } = page.getSize();

  const logoPath = path.join(process.cwd(), "public", "images", "logo-black.png");
  const logoBytes = readFileSync(logoPath);
  const logo = await pdf.embedPng(logoBytes);
  const logoDims = logo.scale(0.35);
  page.drawImage(logo, {
    x: width - logoDims.width - 40,
    y: height - logoDims.height - 36,
    width: logoDims.width,
    height: logoDims.height,
  });

  let y = height - 80;

  page.drawText("Unverbindliches Angebot", {
    x: 40,
    y,
    size: 20,
    font: fontBold,
    color: rgb(0.1, 0.1, 0.1),
  });
  y -= 24;
  for (const line of [
    `Angebots-Nr.: ${quote.quoteNumber}`,
    `Datum: ${new Date().toLocaleDateString("de-DE")}`,
    `Gültig bis: ${quote.validUntil}`,
  ]) {
    page.drawText(line, { x: 40, y, size: 10, font, color: rgb(0.35, 0.35, 0.35) });
    y -= 14;
  }

  y -= 18;
  page.drawText("Kunde", { x: 40, y, size: 12, font: fontBold });
  y -= 18;
  for (const line of [customer.name, customer.email, customer.phone, customer.location]) {
    page.drawText(line, { x: 40, y, size: 10, font });
    y -= 14;
  }

  y -= 16;
  page.drawText("Projekt", { x: 40, y, size: 12, font: fontBold });
  y -= 18;
  const projectLines = [
    quote.roofTypeLabel,
    `Montage: ${quote.mountingLabel}`,
    `Dachform: ${quote.roofShapeLabel}`,
    `Verglasung: ${quote.glazingLabel}`,
    `Farbe: ${quote.frameColorLabel}`,
    `Geschoss: ${quote.floorLevelLabel}`,
    `Abmessungen: ${quote.widthM} m × ${quote.depthM} m (${quote.areaSqm} m²)`,
    ...(quote.heightM ? [`Firsthöhe: ca. ${quote.heightM} m`] : []),
    ...(quote.extrasLabels.length
      ? [`Zusatzausstattung: ${quote.extrasLabels.join(", ")}`]
      : []),
  ];
  for (const line of projectLines) {
    page.drawText(line, { x: 40, y, size: 10, font });
    y -= 14;
  }

  if (customer.message) {
    y -= 8;
    page.drawText("Anmerkung:", { x: 40, y, size: 10, font: fontBold });
    y -= 14;
    page.drawText(customer.message.slice(0, 140), { x: 40, y, size: 10, font });
    y -= 28;
  }

  y -= 12;
  page.drawLine({
    start: { x: 40, y },
    end: { x: width - 40, y },
    thickness: 1,
    color: rgb(0.85, 0.85, 0.85),
  });
  y -= 24;

  for (const item of quote.lineItems) {
    page.drawText(item.label, { x: 40, y, size: 10, font });
    const value = formatCurrency(item.amount);
    page.drawText(value, {
      x: width - 40 - font.widthOfTextAtSize(value, 10),
      y,
      size: 10,
      font,
    });
    y -= 18;
  }

  y -= 8;
  page.drawLine({
    start: { x: 40, y },
    end: { x: width - 40, y },
    thickness: 1,
    color: rgb(0.85, 0.85, 0.85),
  });
  y -= 20;

  for (const [label, amount, bold] of [
    ["Nettosumme", quote.netTotal, false],
    [`MwSt. (${Math.round(19)} %)`, quote.vatAmount, false],
    ["Gesamtbetrag (brutto)", quote.grossTotal, true],
  ] as const) {
    const size = bold ? 12 : 10;
    const activeFont = bold ? fontBold : font;
    const value = formatCurrency(amount);
    page.drawText(label, { x: 40, y, size, font: activeFont });
    page.drawText(value, {
      x: width - 40 - activeFont.widthOfTextAtSize(value, size),
      y,
      size,
      font: activeFont,
    });
    y -= bold ? 22 : 18;
  }

  y -= 16;
  for (const line of [
    "Dieses Angebot ist unverbindlich und basiert auf Ihren Angaben.",
    "Nach Besichtigung vor Ort erstellen wir eine verbindliche Kalkulation.",
    "Preise können je nach Statik, Material und baulicher Situation abweichen.",
  ]) {
    page.drawText(line, { x: 40, y, size: 9, font, color: rgb(0.4, 0.4, 0.4) });
    y -= 12;
  }

  y -= 40;
  page.drawText(SITE.name, { x: 40, y, size: 10, font: fontBold });
  y -= 14;
  page.drawText(`${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}`, {
    x: 40,
    y,
    size: 9,
    font,
  });
  y -= 12;
  page.drawText(`${SITE.phone} · ${SITE.email}`, { x: 40, y, size: 9, font });

  return pdf.save();
}
