import { NextResponse } from "next/server";
import { submitQuoteRequest } from "@/lib/quote/service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = await submitQuoteRequest(formData);
    return NextResponse.json(result, {
      status: result.success ? 200 : 400,
    });
  } catch (error) {
    console.error("[Quote API] Submit fehlgeschlagen", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Das Angebot konnte nicht erstellt werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.",
      },
      { status: 500 },
    );
  }
}
