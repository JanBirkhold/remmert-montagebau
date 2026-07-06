import { NextResponse } from "next/server";
import { buildPreviewQuotePdf } from "@/lib/quote/service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = await buildPreviewQuotePdf(formData);

    if (!result.ok) {
      return NextResponse.json(
        { success: false, message: result.message, errors: result.errors },
        { status: 400 },
      );
    }

    return new NextResponse(Buffer.from(result.buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${result.filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[Quote API] Preview fehlgeschlagen", error);
    return NextResponse.json(
      { success: false, message: "Test-PDF konnte nicht erstellt werden." },
      { status: 500 },
    );
  }
}
