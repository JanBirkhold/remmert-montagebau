import nodemailer from "nodemailer";
import { SITE } from "@/lib/constants";
import { formatCurrency, type QuoteBreakdown } from "./calculate";
import type { QuoteCustomer } from "./pdf";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function getOwnerEmail() {
  return process.env.QUOTE_NOTIFY_EMAIL ?? SITE.email;
}

function getFromAddress() {
  return process.env.SMTP_FROM ?? `${SITE.name} <${SITE.email}>`;
}

export async function sendQuoteEmails(
  quote: QuoteBreakdown,
  customer: QuoteCustomer,
  pdfBuffer: Uint8Array,
  imageAttachments: { filename: string; content: Buffer }[] = [],
) {
  const transporter = getTransporter();
  const pdfAttachment = {
    filename: `${quote.quoteNumber}.pdf`,
    content: Buffer.from(pdfBuffer),
    contentType: "application/pdf",
  };

  if (!transporter) {
    console.info("[Quote] SMTP nicht konfiguriert – E-Mail-Versand übersprungen", {
      quoteNumber: quote.quoteNumber,
      customer: customer.email,
      owner: getOwnerEmail(),
      total: quote.grossTotal,
    });
    return { sent: false, reason: "smtp_not_configured" as const };
  }

  const customerHtml = `
    <p>Guten Tag ${customer.name},</p>
    <p>vielen Dank für Ihre Anfrage bei ${SITE.name}.</p>
    <p>Anbei erhalten Sie Ihr unverbindliches Angebot <strong>${quote.quoteNumber}</strong> für eine <strong>${quote.roofTypeLabel}</strong>.</p>
    <p><strong>Gesamtbetrag (brutto):</strong> ${formatCurrency(quote.grossTotal)}<br/>
    <strong>Gültig bis:</strong> ${quote.validUntil}</p>
    <p>Wir melden uns schnellstmöglich bei Ihnen, um Details zu besprechen und ggf. einen Besichtigungstermin zu vereinbaren.</p>
    <p>Mit freundlichen Grüßen<br/>${SITE.owner}<br/>${SITE.name}</p>
  `;

  const ownerHtml = `
    <p>Neue Angebotsanfrage über den Konfigurator:</p>
    <ul>
      <li><strong>Angebots-Nr.:</strong> ${quote.quoteNumber}</li>
      <li><strong>Kunde:</strong> ${customer.name}</li>
      <li><strong>E-Mail:</strong> ${customer.email}</li>
      <li><strong>Telefon:</strong> ${customer.phone}</li>
      <li><strong>Ort:</strong> ${customer.location}</li>
      <li><strong>Typ:</strong> ${quote.roofTypeLabel}</li>
      <li><strong>Maße:</strong> ${quote.widthM} m × ${quote.depthM} m</li>
      <li><strong>Brutto:</strong> ${formatCurrency(quote.grossTotal)}</li>
    </ul>
    ${customer.message ? `<p><strong>Anmerkung:</strong> ${customer.message}</p>` : ""}
  `;

  await transporter.sendMail({
    from: getFromAddress(),
    to: customer.email,
    subject: `Ihr unverbindliches Angebot ${quote.quoteNumber} – ${SITE.name}`,
    html: customerHtml,
    attachments: [pdfAttachment],
  });

  await transporter.sendMail({
    from: getFromAddress(),
    to: getOwnerEmail(),
    replyTo: customer.email,
    subject: `Neue Angebotsanfrage ${quote.quoteNumber} – ${customer.name}`,
    html: ownerHtml,
    attachments: [pdfAttachment, ...imageAttachments],
  });

  return { sent: true as const };
}
