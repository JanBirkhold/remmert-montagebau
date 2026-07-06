"use server";

import {
  buildPreviewQuotePdf,
  submitQuoteRequest,
} from "@/lib/quote/service";
import type { QuoteFormState } from "@/lib/quote/types";

export type { QuoteFormState };

export async function submitTerrassenQuote(
  _prevState: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  return submitQuoteRequest(formData);
}

export async function previewTerrassenQuotePdf(
  formData: FormData,
): Promise<QuoteFormState> {
  try {
    const result = await buildPreviewQuotePdf(formData);
    if (!result.ok) {
      return {
        success: false,
        message: result.message,
        errors: result.errors,
      };
    }

    return {
      success: true,
      message:
        "Test-PDF erstellt. Das finale Angebot erhalten Sie nach Absenden per E-Mail.",
      pdfBase64: Buffer.from(result.buffer).toString("base64"),
      pdfFilename: result.filename,
      quote: result.quote,
    };
  } catch (error) {
    console.error("[Quote] Test-PDF fehlgeschlagen", error);
    return {
      success: false,
      message: "Test-PDF konnte nicht erstellt werden. Bitte prüfen Sie Ihre Angaben.",
    };
  }
}
