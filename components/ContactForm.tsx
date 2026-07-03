"use client";

import { useActionState, useRef } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Mail, Upload, CheckCircle2 } from "lucide-react";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SITE } from "@/lib/constants";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

const PROJECT_TYPES = [
  "Terrassenüberdachung",
  "Carport",
  "Montagebau",
  "Innenausbau",
  "Sonstiges",
];

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  if (state.success) {
    return (
      <div
        className="rounded-2xl border border-border bg-muted/50 p-8 text-center"
        role="status"
      >
        <CheckCircle2
          className="mx-auto h-12 w-12 text-primary"
          aria-hidden="true"
        />
        <p className="mt-4 text-lg font-medium text-foreground">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-5">
      <div className="space-y-6 lg:col-span-2">
        <h2 className="text-xl font-semibold">Direkter Kontakt</h2>
        <div className="space-y-4">
          <Button asChild variant="outline" className="w-full justify-start">
            <a href={`tel:${SITE.phoneRaw}`}>
              <Phone aria-hidden="true" />
              {SITE.phone}
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full justify-start">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle aria-hidden="true" />
              WhatsApp schreiben
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full justify-start">
            <a href={`mailto:${SITE.email}`}>
              <Mail aria-hidden="true" />
              E-Mail senden
            </a>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}
        </p>
      </div>

      <form
        ref={formRef}
        action={formAction}
        className="space-y-6 lg:col-span-3"
        noValidate
      >
        {state.message && !state.success && (
          <p className="rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary" role="alert">
            {state.message}
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              required
              autoComplete="name"
              aria-invalid={!!state.errors?.name}
              aria-describedby={state.errors?.name ? "name-error" : undefined}
            />
            {state.errors?.name && (
              <p id="name-error" className="text-xs text-primary">
                {state.errors.name[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefon *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              aria-invalid={!!state.errors?.phone}
            />
            {state.errors?.phone && (
              <p className="text-xs text-primary">{state.errors.phone[0]}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-Mail *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={!!state.errors?.email}
          />
          {state.errors?.email && (
            <p className="text-xs text-primary">{state.errors.email[0]}</p>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="projectType">Projektart *</Label>
            <select
              id="projectType"
              name="projectType"
              required
              defaultValue=""
              className="flex h-11 w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-invalid={!!state.errors?.projectType}
            >
              <option value="" disabled>
                Bitte wählen
              </option>
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {state.errors?.projectType && (
              <p className="text-xs text-primary">
                {state.errors.projectType[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Ort *</Label>
            <Input
              id="location"
              name="location"
              required
              placeholder="z. B. Hessisch Oldendorf"
              aria-invalid={!!state.errors?.location}
            />
            {state.errors?.location && (
              <p className="text-xs text-primary">
                {state.errors.location[0]}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Nachricht *</Label>
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Beschreiben Sie Ihr Projekt..."
            aria-invalid={!!state.errors?.message}
          />
          {state.errors?.message && (
            <p className="text-xs text-primary">{state.errors.message[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="attachment">Bilder hochladen (optional)</Label>
          <div className="relative">
            <Input
              id="attachment"
              name="attachment"
              type="file"
              accept="image/*,.pdf"
              multiple
              className="cursor-pointer file:mr-4 file:rounded-md file:border-0 file:bg-muted file:px-4 file:py-2 file:text-sm file:font-medium"
            />
            <Upload
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Fotos Ihrer Terrasse oder des Projektbereichs helfen uns bei der
            ersten Einschätzung.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox id="privacy" name="privacy" value="accepted" required />
          <Label htmlFor="privacy" className="text-sm leading-relaxed text-muted-foreground">
            Ich habe die{" "}
            <Link href="/datenschutz" className="text-primary hover:underline">
              Datenschutzerklärung
            </Link>{" "}
            gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung
            meiner Anfrage zu. *
          </Label>
        </div>
        {state.errors?.privacy && (
          <p className="text-xs text-primary">{state.errors.privacy[0]}</p>
        )}

        <Button type="submit" size="lg" disabled={isPending} className="w-full sm:w-auto">
          {isPending ? "Wird gesendet…" : "Anfrage senden"}
        </Button>
      </form>
    </div>
  );
}
