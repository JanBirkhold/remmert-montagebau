"use server";

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get("name")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const projectType = formData.get("projectType")?.toString().trim();
  const location = formData.get("location")?.toString().trim();
  const message = formData.get("message")?.toString().trim();
  const privacy = formData.get("privacy");

  const errors: Record<string, string[]> = {};

  if (!name || name.length < 2) {
    errors.name = ["Bitte geben Sie Ihren Namen an."];
  }
  if (!phone || phone.length < 6) {
    errors.phone = ["Bitte geben Sie eine gültige Telefonnummer an."];
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = ["Bitte geben Sie eine gültige E-Mail-Adresse an."];
  }
  if (!projectType) {
    errors.projectType = ["Bitte wählen Sie eine Projektart."];
  }
  if (!location || location.length < 2) {
    errors.location = ["Bitte geben Sie Ihren Ort an."];
  }
  if (!message || message.length < 10) {
    errors.message = ["Bitte beschreiben Sie Ihr Anliegen (mind. 10 Zeichen)."];
  }
  if (!privacy) {
    errors.privacy = ["Bitte akzeptieren Sie die Datenschutzerklärung."];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Bitte prüfen Sie Ihre Eingaben.",
      errors,
    };
  }

  // In production: integrate email service (Resend, Nodemailer, etc.)
  // For now, log server-side and return success
  console.info("[Contact Form]", {
    name,
    phone,
    email,
    projectType,
    location,
    message,
    hasAttachment: formData.get("attachment") instanceof File,
  });

  return {
    success: true,
    message:
      "Vielen Dank für Ihre Anfrage. Wir melden uns schnellstmöglich bei Ihnen zurück.",
  };
}
