export function formatQuoteInputErrors(
  errors: Record<string, string[]>,
  preview = false,
) {
  const hints: string[] = [];
  if (errors.roofTypeId) hints.push("Typ");
  if (errors.mountingTypeId || errors.roofShapeId) hints.push("Montage");
  if (errors.widthM || errors.depthM) hints.push("Maße");
  if (errors.frameColorId) hints.push("Farbe");
  if (!preview && errors.floorLevelId) hints.push("Ausstattung");
  if (errors.name) hints.push("Name");
  if (errors.email) hints.push("E-Mail");
  if (errors.phone) hints.push("Telefon");
  if (errors.location) hints.push("Ort");
  if (errors.consent) hints.push("Einwilligung");

  if (hints.length > 0) {
    return `Bitte prüfen Sie: ${hints.join(", ")}.`;
  }

  const firstError = Object.values(errors)[0]?.[0];
  return firstError ?? "Bitte prüfen Sie Ihre Eingaben.";
}
