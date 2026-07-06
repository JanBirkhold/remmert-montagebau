"use server";

import { calculateQuote, type QuoteBreakdown } from "@/lib/quote/calculate";
import {
  FLOOR_LEVELS,
  FRAME_COLORS,
  GLAZING_OPTIONS,
  MOUNTING_TYPES,
  QUOTE_EXTRAS,
  ROOF_SHAPES,
  ROOF_TYPES,
  type FloorLevelId,
  type FrameColorId,
  type GlazingId,
  type MountingTypeId,
  type QuoteExtraId,
  type RoofShapeId,
  type RoofTypeId,
} from "@/lib/quote/config";
import { sendQuoteEmails } from "@/lib/quote/email";
import { generateQuotePdf, type QuoteCustomer } from "@/lib/quote/pdf";
import { formatQuoteInputErrors } from "@/lib/quote/validation";

export type QuoteFormState = {
  success: boolean;
  message: string;
  pdfBase64?: string;
  pdfFilename?: string;
  emailSent?: boolean;
  quote?: QuoteBreakdown;
  errors?: Record<string, string[]>;
};

function parseNumber(value: FormDataEntryValue | null, field: string) {
  const raw = value?.toString().trim().replace(",", ".");
  if (!raw) {
    return { error: `${field} ist erforderlich.` };
  }
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return { error: `${field} muss größer als 0 sein.` };
  }
  return { value: parsed };
}

function parseOptionalNumber(value: FormDataEntryValue | null) {
  const raw = value?.toString().trim();
  if (!raw) return { value: undefined };
  const parsed = Number(raw.replace(",", "."));
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return { error: "Firsthöhe muss größer als 0 sein." };
  }
  return { value: parsed };
}

function parseQuoteInput(formData: FormData, options?: { preview?: boolean }) {
  const errors: Record<string, string[]> = {};
  const preview = options?.preview ?? false;

  const roofTypeId = formData.get("roofTypeId")?.toString() as RoofTypeId;
  const mountingTypeId = formData.get("mountingTypeId")?.toString() as MountingTypeId;
  const roofShapeId = formData.get("roofShapeId")?.toString() as RoofShapeId;
  const glazingIdRaw = formData.get("glazingId")?.toString() as GlazingId;
  const floorLevelIdRaw = formData.get("floorLevelId")?.toString() as FloorLevelId;
  const frameColorIdRaw = formData.get("frameColorId")?.toString() as FrameColorId;

  if (!ROOF_TYPES.some((type) => type.id === roofTypeId)) {
    errors.roofTypeId = ["Bitte wählen Sie einen Terrassentyp."];
  }
  if (!MOUNTING_TYPES.some((type) => type.id === mountingTypeId)) {
    errors.mountingTypeId = ["Bitte wählen Sie die Montageart."];
  }
  if (!ROOF_SHAPES.some((shape) => shape.id === roofShapeId)) {
    errors.roofShapeId = ["Bitte wählen Sie eine Dachform."];
  }

  const glazingId = GLAZING_OPTIONS.some((option) => option.id === glazingIdRaw)
    ? glazingIdRaw
    : "standard";

  const frameColorId = FRAME_COLORS.some((color) => color.id === frameColorIdRaw)
    ? frameColorIdRaw
    : preview
      ? "anthrazit"
      : ("" as FrameColorId);

  if (!preview && !FRAME_COLORS.some((color) => color.id === frameColorId)) {
    errors.frameColorId = ["Bitte wählen Sie eine Farbe."];
  }

  const floorLevelId = FLOOR_LEVELS.some((level) => level.id === floorLevelIdRaw)
    ? floorLevelIdRaw
    : preview
      ? "erdgeschoss"
      : ("" as FloorLevelId);

  if (!preview && !FLOOR_LEVELS.some((level) => level.id === floorLevelId)) {
    errors.floorLevelId = ["Bitte wählen Sie das Geschoss."];
  }

  const width = parseNumber(formData.get("widthM"), "Breite");
  if ("error" in width && width.error) errors.widthM = [width.error];
  const depth = parseNumber(formData.get("depthM"), "Tiefe");
  if ("error" in depth && depth.error) errors.depthM = [depth.error];
  const height = parseOptionalNumber(formData.get("heightM"));
  if ("error" in height && height.error) errors.heightM = [height.error];

  const extras = formData
    .getAll("extras")
    .map((value) => value.toString())
    .filter((id): id is QuoteExtraId =>
      QUOTE_EXTRAS.some((extra) => extra.id === id),
    );

  const hasMeasureErrors =
    "error" in width || "error" in depth || "error" in height;

  return {
    errors,
    input:
      Object.keys(errors).length === 0 && !hasMeasureErrors && "value" in width && "value" in depth
        ? {
            roofTypeId,
            mountingTypeId,
            roofShapeId,
            glazingId,
            floorLevelId,
            frameColorId,
            widthM: width.value!,
            depthM: depth.value!,
            heightM: "value" in height ? height.value : undefined,
            extras,
          }
        : null,
  };
}

function validateQuoteForm(formData: FormData, requireConsent: boolean) {
  const errors: Record<string, string[]> = {};
  const parsed = parseQuoteInput(formData);
  Object.assign(errors, parsed.errors);

  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const location = formData.get("location")?.toString().trim();
  const message = formData.get("message")?.toString().trim();
  const consent = formData.get("consent")?.toString();

  if (!name || name.length < 2) errors.name = ["Bitte geben Sie Ihren Namen an."];
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = ["Bitte geben Sie eine gültige E-Mail-Adresse an."];
  }
  if (!phone || phone.length < 6) errors.phone = ["Bitte geben Sie eine Telefonnummer an."];
  if (!location || location.length < 2) errors.location = ["Bitte geben Sie Ihren Ort an."];
  if (requireConsent && consent !== "accepted") {
    errors.consent = ["Bitte bestätigen Sie die Einwilligung zur Angebotserstellung."];
  }

  if (Object.keys(errors).length > 0 || !parsed.input) {
    return { errors };
  }

  const quote = calculateQuote(parsed.input);
  if (!quote) return { errors: { roofTypeId: ["Ungültige Projektdaten."] } };

  const customer: QuoteCustomer = {
    name: name!,
    email: email!,
    phone: phone!,
    location: location!,
    message: message || undefined,
  };

  return { quote, customer };
}

async function collectImageAttachments(formData: FormData) {
  const files = formData.getAll("images").filter((entry) => entry instanceof File);
  const attachments: { filename: string; content: Buffer }[] = [];

  for (const file of files) {
    if (!(file instanceof File) || file.size === 0) continue;
    if (!file.type.startsWith("image/")) continue;
    if (file.size > 5 * 1024 * 1024) continue;

    attachments.push({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
    });
  }

  return attachments;
}

export async function submitTerrassenQuote(
  _prevState: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  const validated = validateQuoteForm(formData, true);
  if (!("quote" in validated) || !validated.quote || !validated.customer) {
    return {
      success: false,
      message: formatQuoteInputErrors(validated.errors ?? {}),
      errors: validated.errors,
    };
  }

  const { quote, customer } = validated;

  try {
    const pdfBuffer = await generateQuotePdf(quote, customer);
    const emailResult = await sendQuoteEmails(
      quote,
      customer,
      pdfBuffer,
      await collectImageAttachments(formData),
    );

    return {
      success: true,
      message: emailResult.sent
        ? "Vielen Dank! Ihr unverbindliches Angebot wurde erstellt und per E-Mail an Sie gesendet. Sie können es zusätzlich hier herunterladen."
        : "Vielen Dank! Ihr unverbindliches Angebot wurde erstellt. Laden Sie es hier herunter – der E-Mail-Versand wird nach SMTP-Konfiguration aktiviert.",
      pdfBase64: Buffer.from(pdfBuffer).toString("base64"),
      pdfFilename: `${quote.quoteNumber}.pdf`,
      emailSent: emailResult.sent,
      quote,
    };
  } catch (error) {
    console.error("[Quote] PDF-Erstellung fehlgeschlagen", error);
    return {
      success: false,
      message:
        "Das Angebot konnte nicht erstellt werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.",
    };
  }
}

export async function previewTerrassenQuotePdf(
  formData: FormData,
): Promise<QuoteFormState> {
  const parsed = parseQuoteInput(formData, { preview: true });
  if (Object.keys(parsed.errors).length > 0 || !parsed.input) {
    return {
      success: false,
      message: formatQuoteInputErrors(parsed.errors, true),
      errors: parsed.errors,
    };
  }

  try {
    const quote = calculateQuote(parsed.input);
    if (!quote) {
      return { success: false, message: "Angebot konnte nicht berechnet werden." };
    }

    const customer: QuoteCustomer = {
      name: formData.get("name")?.toString().trim() || "Musterkunde (Vorschau)",
      email: formData.get("email")?.toString().trim() || "vorschau@example.com",
      phone: formData.get("phone")?.toString().trim() || "—",
      location: formData.get("location")?.toString().trim() || "—",
      message: "Test-Vorschau – unverbindlich",
    };

    const pdfBuffer = await generateQuotePdf(quote, customer);

    return {
      success: true,
      message:
        "Test-PDF erstellt. Das finale Angebot erhalten Sie nach Absenden per E-Mail.",
      pdfBase64: Buffer.from(pdfBuffer).toString("base64"),
      pdfFilename: `Test-${quote.quoteNumber}.pdf`,
      quote,
    };
  } catch (error) {
    console.error("[Quote] Test-PDF fehlgeschlagen", error);
    return {
      success: false,
      message: "Test-PDF konnte nicht erstellt werden. Bitte prüfen Sie Ihre Angaben.",
    };
  }
}
