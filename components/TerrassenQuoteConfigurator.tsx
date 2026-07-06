"use client";

import { useActionState, useRef, useState, useTransition } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  Mail,
  Upload,
} from "lucide-react";
import {
  previewTerrassenQuotePdf,
  submitTerrassenQuote,
  type QuoteFormState,
} from "@/lib/actions/terrassen-quote";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const STEPS = [
  { title: "Typ", shortTitle: "Typ", hint: "Welche Überdachung?" },
  { title: "Montage", shortTitle: "Montage", hint: "Am Haus oder freistehend?" },
  { title: "Maße", shortTitle: "Maße", hint: "Abmessungen" },
  { title: "Farbe", shortTitle: "Farbe", hint: "Farbe der Konstruktion" },
  { title: "Ausstattung", shortTitle: "Extras", hint: "Details & Extras" },
  { title: "Kontakt", shortTitle: "Kontakt", hint: "Angebot erhalten" },
] as const;

const initialState: QuoteFormState = {
  success: false,
  message: "",
};

function downloadPdf(base64: string, filename: string) {
  const link = document.createElement("a");
  link.href = `data:application/pdf;base64,${base64}`;
  link.download = filename;
  link.click();
}

function OptionCard({
  selected,
  onSelect,
  title,
  description,
  name,
  value,
  type = "radio",
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  description?: string;
  name: string;
  value: string;
  type?: "radio" | "checkbox";
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-all",
        selected
          ? "border-primary bg-primary text-primary-foreground shadow-md"
          : "border-border bg-background text-foreground hover:border-primary/50",
      )}
    >
      <input
        type={type}
        name={name}
        value={value}
        className="mt-1 h-4 w-4 shrink-0 accent-primary"
        checked={selected}
        onChange={onSelect}
      />
      <span className="min-w-0 flex-1">
        <span className="block break-words font-semibold">{title}</span>
        {description && (
          <span
            className={cn(
              "mt-1 block text-sm",
              selected ? "text-primary-foreground/85" : "text-muted-foreground",
            )}
          >
            {description}
          </span>
        )}
      </span>
    </label>
  );
}

function ColorOptionCard({
  selected,
  onSelect,
  label,
  description,
  hex,
  value,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  description?: string;
  hex: string;
  value: string;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all",
        selected
          ? "border-primary bg-primary text-primary-foreground shadow-md"
          : "border-border bg-background text-foreground hover:border-primary/50",
      )}
    >
      <input
        type="radio"
        name="frameColorIdDisplay"
        value={value}
        className="sr-only"
        checked={selected}
        onChange={onSelect}
      />
      <span
        className="h-10 w-10 shrink-0 rounded-full border-2 border-white/80 shadow-inner"
        style={{ backgroundColor: hex }}
        aria-hidden="true"
      />
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{label}</span>
        {description && (
          <span
            className={cn(
              "mt-1 block text-sm",
              selected ? "text-primary-foreground/85" : "text-muted-foreground",
            )}
          >
            {description}
          </span>
        )}
      </span>
    </label>
  );
}

export function TerrassenQuoteConfigurator() {
  const [state, formAction, isPending] = useActionState(
    submitTerrassenQuote,
    initialState,
  );
  const [previewPending, startPreview] = useTransition();
  const [previewMessage, setPreviewMessage] = useState("");
  const [step, setStep] = useState(0);
  const [stepError, setStepError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageCount, setImageCount] = useState(0);

  const [roofTypeId, setRoofTypeId] = useState<RoofTypeId | "">("");
  const [mountingTypeId, setMountingTypeId] = useState<MountingTypeId | "">("");
  const [roofShapeId, setRoofShapeId] = useState<RoofShapeId | "">("");
  const [glazingId, setGlazingId] = useState<GlazingId>("standard");
  const [floorLevelId, setFloorLevelId] = useState<FloorLevelId | "">("");
  const [frameColorId, setFrameColorId] = useState<FrameColorId | "">("");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [widthM, setWidthM] = useState("");
  const [depthM, setDepthM] = useState("");
  const [heightM, setHeightM] = useState("");
  const [extras, setExtras] = useState<QuoteExtraId[]>([]);

  const toggleExtra = (id: QuoteExtraId) => {
    setExtras((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const validateStep = (index: number) => {
    setStepError("");
    if (index === 0 && !roofTypeId) {
      setStepError("Bitte wählen Sie einen Terrassentyp.");
      return false;
    }
    if (index === 1) {
      if (!mountingTypeId) {
        setStepError("Bitte wählen Sie, ob die Überdachung am Haus oder freistehend montiert wird.");
        return false;
      }
      if (!roofShapeId) {
        setStepError("Bitte wählen Sie eine Dachform.");
        return false;
      }
    }
    if (index === 2) {
      const width = Number(widthM.replace(",", "."));
      const depth = Number(depthM.replace(",", "."));
      if (!Number.isFinite(width) || width <= 0) {
        setStepError("Bitte geben Sie eine gültige Breite ein.");
        return false;
      }
      if (!Number.isFinite(depth) || depth <= 0) {
        setStepError("Bitte geben Sie eine gültige Tiefe ein.");
        return false;
      }
    }
    if (index === 3 && !frameColorId) {
      setStepError("Bitte wählen Sie eine Farbe.");
      return false;
    }
    if (index === 4 && !floorLevelId) {
      setStepError("Bitte wählen Sie das Geschoss / die Lage.");
      return false;
    }
    return true;
  };

  const goNext = () => {
    if (validateStep(step)) setStep((current) => Math.min(current + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setStepError("");
    setStep((current) => Math.max(current - 1, 0));
  };

  const goToStep = (target: number) => {
    if (target === step) return;

    if (target < step) {
      setStepError("");
      setStep(target);
      return;
    }

    for (let i = step; i < target; i++) {
      if (!validateStep(i)) {
        setStep(i);
        return;
      }
    }

    setStepError("");
    setStep(target);
  };

  const validatePreviewFields = () => {
    for (let i = 0; i <= 3; i++) {
      if (!validateStep(i)) {
        setStep(i);
        return false;
      }
    }
    return true;
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    for (let i = 0; i <= 4; i++) {
      if (!validateStep(i)) {
        event.preventDefault();
        setStep(i);
        return;
      }
    }
    if (!consentAccepted) {
      event.preventDefault();
      setStep(5);
      setStepError("Bitte bestätigen Sie die Einwilligung zur Angebotserstellung.");
    }
  };

  const handlePreview = () => {
    if (!formRef.current) return;
    setPreviewMessage("");
    if (!validatePreviewFields()) return;

    const formData = new FormData(formRef.current);
    startPreview(async () => {
      const result = await previewTerrassenQuotePdf(formData);
      setPreviewMessage(result.message);
      if (result.success && result.pdfBase64 && result.pdfFilename) {
        setStepError("");
        downloadPdf(result.pdfBase64, result.pdfFilename);
      } else {
        setStepError(result.message);
      }
    });
  };

  if (state.success && state.pdfBase64 && state.pdfFilename) {
    return (
      <div className="overflow-hidden rounded-2xl border-2 border-foreground shadow-xl">
        <div className="bg-primary px-6 py-5 text-primary-foreground">
          <h3 className="text-2xl font-bold">Angebot erstellt</h3>
        </div>
        <div className="bg-background px-6 py-10 text-center sm:px-10">
          <CheckCircle2 className="mx-auto h-14 w-14 text-primary" aria-hidden="true" />
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">{state.message}</p>
          <Button
            type="button"
            size="lg"
            className="mt-8"
            onClick={() => downloadPdf(state.pdfBase64!, state.pdfFilename!)}
          >
            <Download aria-hidden="true" />
            Angebot als PDF herunterladen
          </Button>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
            {state.emailSent
              ? "Das Angebot wurde zusätzlich an Ihre E-Mail gesendet."
              : "E-Mail-Versand wird nach SMTP-Konfiguration aktiviert."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full overflow-hidden rounded-2xl border-2 border-foreground shadow-xl">
      <div className="bg-foreground px-4 py-5 text-background sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:tracking-[0.25em]">
          Angebots-Konfigurator
        </p>
        <h2 className="mt-2 text-xl font-bold sm:text-3xl">
          Ein unverbindliches Angebot anfordern
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-background/75 sm:text-base">
          Bitte geben Sie die Ihnen bekannten Informationen ein – wir melden uns
          schnellstmöglich bei Ihnen. Der Preis wird ausschließlich im PDF ausgewiesen.
        </p>

        <ol
          className="mt-6 grid grid-cols-3 gap-1 sm:grid-cols-6 sm:gap-2"
          aria-label="Fortschritt"
        >
          {STEPS.map((item, index) => (
            <li key={item.title}>
              <button
                type="button"
                onClick={() => goToStep(index)}
                aria-current={index === step ? "step" : undefined}
                aria-label={`Schritt ${index + 1}: ${item.title}`}
                className={cn(
                  "w-full rounded-lg px-1 py-2 text-center text-[10px] font-semibold leading-tight transition-colors sm:px-3 sm:py-2.5 sm:text-sm",
                  index === step
                    ? "bg-primary text-primary-foreground"
                    : index < step
                      ? "bg-background/15 text-background hover:bg-background/25"
                      : "bg-background/5 text-background/50 hover:bg-background/10 hover:text-background/70",
                )}
              >
                <span className="block sm:hidden">{item.shortTitle}</span>
                <span className="hidden sm:block">
                  {index + 1}. {item.title}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <form ref={formRef} action={formAction} onSubmit={handleFormSubmit} className="bg-background">
        <input type="hidden" name="roofTypeId" value={roofTypeId} />
        <input type="hidden" name="mountingTypeId" value={mountingTypeId} />
        <input type="hidden" name="roofShapeId" value={roofShapeId} />
        <input type="hidden" name="glazingId" value={glazingId} />
        <input type="hidden" name="floorLevelId" value={floorLevelId} />
        <input type="hidden" name="frameColorId" value={frameColorId} />
        <input type="hidden" name="consent" value={consentAccepted ? "accepted" : ""} />
        <input type="hidden" name="widthM" value={widthM} />
        <input type="hidden" name="depthM" value={depthM} />
        <input type="hidden" name="heightM" value={heightM} />
        {extras.map((extra) => (
          <input key={extra} type="hidden" name="extras" value={extra} />
        ))}
        <input
          ref={imageInputRef}
          id="quote-images"
          name="images"
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(event) => setImageCount(event.target.files?.length ?? 0)}
        />

        <div className="px-4 py-8 sm:px-8">
          <p className="text-sm font-medium text-primary">
            Schritt {step + 1} von {STEPS.length}
          </p>
          <h3 className="mt-1 text-xl font-bold text-foreground">{STEPS[step].hint}</h3>

          {(stepError || previewMessage || (state.message && !state.success)) && (
            <p
              className={cn(
                "mt-4 rounded-lg px-4 py-3 text-sm font-medium",
                stepError || (state.message && !state.success)
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground",
              )}
              role="alert"
            >
              {stepError ||
                (state.message && !state.success ? state.message : "") ||
                previewMessage}
            </p>
          )}

          {step === 0 && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {ROOF_TYPES.map((type) => (
                <OptionCard
                  key={type.id}
                  name="roofTypeIdDisplay"
                  value={type.id}
                  selected={roofTypeId === type.id}
                  onSelect={() => setRoofTypeId(type.id)}
                  title={type.label}
                  description={type.description}
                />
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="mt-6 space-y-8">
              <div>
                <p className="mb-3 font-semibold text-foreground">Montageart *</p>
                <div className="grid gap-3">
                  {MOUNTING_TYPES.map((type) => (
                    <OptionCard
                      key={type.id}
                      name="mountingTypeIdDisplay"
                      value={type.id}
                      selected={mountingTypeId === type.id}
                      onSelect={() => setMountingTypeId(type.id)}
                      title={type.label}
                      description={type.description}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 font-semibold text-foreground">Dachform *</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {ROOF_SHAPES.map((shape) => (
                    <OptionCard
                      key={shape.id}
                      name="roofShapeIdDisplay"
                      value={shape.id}
                      selected={roofShapeId === shape.id}
                      onSelect={() => setRoofShapeId(shape.id)}
                      title={shape.label}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="widthM" className="font-semibold">Breite (m) *</Label>
                <Input
                  id="widthM"
                  inputMode="decimal"
                  placeholder="z. B. 4,5"
                  value={widthM}
                  onChange={(e) => setWidthM(e.target.value)}
                  className="h-12 border-2 text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="depthM" className="font-semibold">Tiefe (m) *</Label>
                <Input
                  id="depthM"
                  inputMode="decimal"
                  placeholder="z. B. 3,0"
                  value={depthM}
                  onChange={(e) => setDepthM(e.target.value)}
                  className="h-12 border-2 text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heightM" className="font-semibold">Firsthöhe (m)</Label>
                <Input
                  id="heightM"
                  inputMode="decimal"
                  placeholder="optional"
                  value={heightM}
                  onChange={(e) => setHeightM(e.target.value)}
                  className="h-12 border-2 text-lg"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {FRAME_COLORS.map((color) => (
                <ColorOptionCard
                  key={color.id}
                  value={color.id}
                  selected={frameColorId === color.id}
                  onSelect={() => setFrameColorId(color.id)}
                  label={color.label}
                  description={color.description}
                  hex={color.hex}
                />
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="mt-6 space-y-8">
              <div>
                <p className="mb-3 font-semibold text-foreground">Geschoss / Lage *</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {FLOOR_LEVELS.map((level) => (
                    <OptionCard
                      key={level.id}
                      name="floorLevelIdDisplay"
                      value={level.id}
                      selected={floorLevelId === level.id}
                      onSelect={() => setFloorLevelId(level.id)}
                      title={level.label}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 font-semibold text-foreground">Verglasung</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {GLAZING_OPTIONS.map((option) => (
                    <OptionCard
                      key={option.id}
                      name="glazingIdDisplay"
                      value={option.id}
                      selected={glazingId === option.id}
                      onSelect={() => setGlazingId(option.id)}
                      title={option.label}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 font-semibold text-foreground">Zusatzausstattung (optional)</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {QUOTE_EXTRAS.map((extra) => (
                    <OptionCard
                      key={extra.id}
                      name="extrasDisplay"
                      value={extra.id}
                      type="checkbox"
                      selected={extras.includes(extra.id)}
                      onSelect={() => toggleExtra(extra.id)}
                      title={extra.label}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="mt-6 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="quote-name">Name *</Label>
                  <Input id="quote-name" name="name" autoComplete="name" className="h-11 border-2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quote-phone">Telefon *</Label>
                  <Input id="quote-phone" name="phone" type="tel" autoComplete="tel" className="h-11 border-2" />
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="quote-email">E-Mail *</Label>
                  <Input id="quote-email" name="email" type="email" autoComplete="email" className="h-11 border-2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quote-location">Ort *</Label>
                  <Input id="quote-location" name="location" placeholder="z. B. Hameln" className="h-11 border-2" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote-message">Anmerkungen (optional)</Label>
                <Textarea id="quote-message" name="message" rows={3} className="border-2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote-images">Bilder hochladen (optional)</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="h-12 w-full border-2 text-base sm:w-auto sm:min-w-[260px]"
                  onClick={() => imageInputRef.current?.click()}
                >
                  <Upload aria-hidden="true" />
                  {imageCount > 0
                    ? `${imageCount} Bild${imageCount === 1 ? "" : "er"} ausgewählt`
                    : "Bilder auswählen"}
                </Button>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG oder WebP – max. 5 MB pro Bild
                </p>
              </div>
              <div className="flex items-start gap-3 rounded-xl border-2 border-border bg-muted/40 p-4">
                <Checkbox
                  id="quote-consent"
                  checked={consentAccepted}
                  onCheckedChange={(checked) => setConsentAccepted(checked === true)}
                  aria-required="true"
                />
                <Label htmlFor="quote-consent" className="text-sm leading-relaxed text-muted-foreground">
                  Ich möchte ein unverbindliches Angebot erhalten und willige ein, dass
                  meine Daten zur Erstellung und Zusendung verarbeitet werden.{" "}
                  <Link href="/datenschutz" className="font-medium text-primary hover:underline">
                    Datenschutzerklärung
                  </Link>{" "}
                  gelesen. *
                </Label>
              </div>
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                Nach dem Absenden erhalten Sie das Angebot als PDF per E-Mail und können
                es hier herunterladen.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t-2 border-border bg-muted/30 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={goBack}
            disabled={step === 0 || isPending}
            className="w-full border-2 sm:w-auto"
          >
            <ArrowLeft aria-hidden="true" />
            Zurück
          </Button>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            {step === STEPS.length - 1 && (
              <Button
                type="button"
                variant="outline"
                size="lg"
                disabled={previewPending || isPending}
                onClick={handlePreview}
                className="w-full border-2 whitespace-normal sm:w-auto sm:whitespace-nowrap"
              >
                <FileText aria-hidden="true" />
                {previewPending ? "PDF wird erstellt…" : "Test-PDF (Vorschau)"}
              </Button>
            )}
            {step < STEPS.length - 1 ? (
              <Button
                type="button"
                size="lg"
                onClick={goNext}
                className="w-full font-semibold sm:w-auto sm:min-w-[140px]"
              >
                Weiter
                <ArrowRight aria-hidden="true" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="lg"
                disabled={isPending}
                className="w-full font-semibold sm:w-auto sm:min-w-[200px]"
              >
                {isPending ? "Wird erstellt…" : "Angebot anfordern"}
              </Button>
            )}
          </div>
        </div>

      </form>
    </div>
  );
}
