import { CheckCircle2 } from "lucide-react";
import { TRUST_BADGES } from "@/lib/gallery";

export function HeroTrustBadges() {
  return (
    <ul
      className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
      aria-label="Unsere Stärken"
    >
      {TRUST_BADGES.map((badge) => (
        <li
          key={badge}
          className="flex items-center gap-2 rounded-lg border border-white/35 bg-black/65 px-4 py-3 text-sm font-semibold text-white shadow-sm backdrop-blur-sm"
        >
          <CheckCircle2
            className="h-4 w-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          {badge}
        </li>
      ))}
    </ul>
  );
}
