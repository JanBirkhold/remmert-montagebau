export function base64ToPdfBlob(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: "application/pdf" });
}

export function createPdfObjectUrl(base64: string) {
  return URL.createObjectURL(base64ToPdfBlob(base64));
}

export function isMobilePdfDevice() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isIos =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return isIos || /Android/i.test(ua);
}

export function openPdfBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  if (!isMobilePdfDevice()) {
    link.download = filename;
  }
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 120_000);
  return url;
}

export async function fetchAndOpenQuotePdf(
  endpoint: string,
  formData: FormData,
  fallbackFilename: string,
) {
  const popup =
    typeof window !== "undefined" && isMobilePdfDevice() ? window.open("", "_blank") : null;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      popup?.close();
      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;
      throw new Error(payload?.message ?? "PDF konnte nicht erstellt werden.");
    }

    const blob = await response.blob();
    const filename =
      response.headers.get("Content-Disposition")?.match(/filename="([^"]+)"/)?.[1] ??
      fallbackFilename;
    const url = URL.createObjectURL(blob);

    if (popup) {
      popup.location.href = url;
    } else {
      openPdfBlob(blob, filename);
    }

    window.setTimeout(() => URL.revokeObjectURL(url), 120_000);
    return filename;
  } catch (error) {
    popup?.close();
    throw error;
  }
}
