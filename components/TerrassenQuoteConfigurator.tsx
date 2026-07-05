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
  GLAZING_OPTIONS,
  MOUNTING_TYPES,
  QUOTE_EXTRAS,
  ROOF_SHAPES,
  ROOF_TYPES,
  type FloorLevelId,
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
  { title: "Typ", hint: "Welche Überdachung?" },
  { title: "Montage", hint: "Am Haus oder freistehend?" },
  { title: "Maße", hint: "Abmessungen" },
  { title: "Ausstattung", hint: "Details & Extras" },
  { title: "Kontakt", hint: "Angebot erhalten" },
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
      <span>
        <span className="block font-semibold">{title}</span>
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

  const [roofTypeId, setRoofTypeId] = useState<RoofTypeId | "">("");
  const [mountingTypeId, setMountingTypeId] = useState<MountingTypeId | "">("");
  const [roofShapeId, setRoofShapeId] = useState<RoofShapeId | "">("");
  const [glazingId, setGlazingId] = useState<GlazingId>("standard");
  const [floorLevelId, setFloorLevelId] = useState<FloorLevelId | "">("");
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
    if (index === 3 && !floorLevelId) {
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

  const handlePreview = () => {
    if (!formRef.current) return;
    if (!validateStep(0) || !validateStep(1) || !validateStep(2)) return;
    const formData = new FormData(formRef.current);
    startPreview(async () => {
      const result = await previewTerrassenQuotePdf(formData);
      setPreviewMessage(result.message);
      if (result.success && result.pdfBase64 && result.pdfFilename) {
        downloadPdf(result.pdfBase64, result.pdfFilename);
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
    <div className="overflow-hidden rounded-2xl border-2 border-foreground shadow-xl">
      <div className="bg-foreground px-4 py-5 text-background sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          Angebots-Konfigurator
        </p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
          Ein unverbindliches Angebot anfordern
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-background/75 sm:text-base">
          Bitte geben Sie die Ihnen bekannten Informationen ein – wir melden uns
          schnellstmöglich bei Ihnen. Der Preis wird ausschließlich im PDF ausgewiesen.
        </p>

        <ol className="mt-6 flex gap-2 overflow-x-auto pb-1" aria-label="Fortschritt">
          {STEPS.map((item, index) => (
            <li
              key={item.title}
              className={cn(
                "min-w-[88px] flex-1 rounded-lg px-3 py-2 text-center text-xs font-semibold sm:text-sm",
                index === step
                  ? "bg-primary text-primary-foreground"
                  : index < step
                    ? "bg-background/15 text-background"
                    : "bg-background/5 text-background/50",
              )}
            >
              <span className="block">{index + 1}. {item.title}</span>
            </li>
          ))}
        </ol>
      </div>

      <form ref={formRef} action={formAction} className="bg-background">
        <input type="hidden" name="roofTypeId" value={roofTypeId} />
        <input type="hidden" name="mountingTypeId" value={mountingTypeId} />
        <input type="hidden" name="roofShapeId" value={roofShapeId} />
        <input type="hidden" name="glazingId" value={glazingId} />
        <input type="hidden" name="floorLevelId" value={floorLevelId} />
        {extras.map((extra) => (
          <input key={extra} type="hidden" name="extras" value={extra} />
        ))}

        <div className="px-4 py-8 sm:px-8">
          <p className="text-sm font-medium text-primary">
            Schritt {step + 1} von {STEPS.length}
          </p>
          <h3 className="mt-1 text-xl font-bold text-foreground">{STEPS[step].hint}</h3>

          {(stepError || (state.message && !state.success)) && (
            <p className="mt-4 rounded-lg bg-primary/10 px-4 py-3 text-sm font-medium text-primary" role="alert">
              {stepError || state.message}
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
                  name="widthM"
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
                  name="depthM"
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
                  name="heightM"
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

          {step === 4 && (
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
                <div className="relative">
                  <Input
                    id="quote-images"
                    name="images"
                    type="file"
                    accept="image/*"
                    multiple
                    className="h-11 cursor-pointer border-2 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground"
                  />
                  <Upload className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border-2 border-border bg-muted/40 p-4">
                <Checkbox id="quote-consent" name="consent" value="accepted" />
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
            className="border-2"
          >
            <ArrowLeft aria-hidden="true" />
            Zurück
          </Button>

          <div className="flex flex-col gap-3 sm:flex-row">
            {step === STEPS.length - 1 && (
              <Button
                type="button"
                variant="outline"
                size="lg"
                disabled={previewPending || isPending}
                onClick={handlePreview}
                className="border-2"
              >
                <FileText aria-hidden="true" />
                {previewPending ? "PDF wird erstellt…" : "Test-PDF (Vorschau)"}
              </Button>
            )}
            {step < STEPS.length - 1 ? (
              <Button type="button" size="lg" onClick={goNext} className="min-w-[140px] font-semibold">
                Weiter
                <ArrowRight aria-hidden="true" />
              </Button>
            ) : (
              <Button type="submit" size="lg" disabled={isPending} className="min-w-[200px] font-semibold">
                {isPending ? "Wird erstellt…" : "Angebot anfordern"}
              </Button>
            )}
          </div>
        </div>

        {previewMessage && !state.success && step === STEPS.length - 1 && (
          <p className="px-8 pb-4 text-sm text-muted-foreground">{previewMessage}</p>
        )}
      </form>
    </div>
  );
}
