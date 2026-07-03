import Link from "next/link";
import { SITE } from "@/lib/constants";

export const TERRASSEN_BENEFITS = [
  {
    title: "Mehr Nutzung",
    text: "Terrasse ganzjährig nutzen – unabhängig von Regen, Wind und Sonne.",
  },
  {
    title: "Individuelle Planung",
    text: "Maßgeschneidert aus Aluminium, Stahl und Glas – passend zu Ihrem Haus.",
  },
  {
    title: "Regional & persönlich",
    text: "Beratung und Montage durch Jan Remmert in Hessisch Oldendorf und Umgebung.",
  },
] as const;

export const TERRASSEN_PROCESS = [
  "Anfrage per Telefon, WhatsApp oder Formular",
  "Besichtigung vor Ort",
  "Planung mit realistischer Einschätzung",
  "Saubere Montage zum vereinbarten Termin",
] as const;

export const TERRASSEN_FAQ = [
  {
    question: "Was kostet eine Terrassenüberdachung?",
    answer:
      "Die Kosten hängen von Größe, Material und baulicher Situation ab. Nach einer kurzen Abstimmung erhalten Sie eine realistische Einschätzung – unverbindlich und transparent.",
  },
  {
    question: "In welcher Region arbeitet Remmert Montagebau?",
    answer:
      "Wir sind in Hessisch Oldendorf ansässig und betreuen Kunden in Hameln, Rinteln, Bad Münder, Bückeburg, Stadthagen und der umliegenden Region.",
  },
  {
    question: "Wird jede Überdachung individuell geplant?",
    answer:
      "Ja. Jede Lösung wird passend zur Immobilie, Nutzung und Optik geplant – keine Standardlösung von der Stange.",
  },
  {
    question: "Welche Materialien kommen zum Einsatz?",
    answer:
      "Je nach Projekt setzen wir auf Aluminium, Stahl und Glas – oder sinnvolle Kombinationen. Wir beraten ehrlich zu Vor- und Nachteilen.",
  },
  {
    question: "Kann ich Fotos meiner Terrasse schicken?",
    answer:
      "Ja. Erste Informationen und Bilder können Sie bequem per WhatsApp oder über das Kontaktformular senden.",
  },
  {
    question: "Wie läuft die Montage ab?",
    answer:
      "Nach Ihrer Zusage organisieren wir Material und Termin. Die Montage erfolgt sauber, termingerecht und mit minimalem Aufwand für Sie.",
  },
] as const;
