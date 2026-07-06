import type { QuoteBreakdown } from "./calculate";

export type QuoteFormState = {
  success: boolean;
  message: string;
  pdfBase64?: string;
  pdfFilename?: string;
  emailSent?: boolean;
  quote?: QuoteBreakdown;
  errors?: Record<string, string[]>;
};
