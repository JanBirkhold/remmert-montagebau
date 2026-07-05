"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          isOpen
            ? "border-b border-border bg-background shadow-sm"
            : isScrolled
              ? "border-b border-border/60 bg-background/95 shadow-sm backdrop-blur-md"
              : "bg-background/95 backdrop-blur-md",
        )}
      >
        <div className="container-narrow flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="relative z-10 flex shrink-0 items-center"
            aria-label="Remmert Montagebau – Startseite"
          >
            <Image
              src="/images/gallery/Logo.jpg"
              alt="Remmert Montagebau Logo"
              width={160}
              height={48}
              className="h-10 w-auto object-contain sm:h-12"
              priority
            />
          </Link>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Hauptnavigation"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button asChild size="lg">
              <Link href="/kontakt">Kostenlose Beratung</Link>
            </Button>
          </div>

          <button
            type="button"
            className="relative z-10 inline-flex items-center justify-center rounded-lg border border-border bg-background p-2.5 text-foreground shadow-sm lg:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
          >
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 top-20 z-[60] bg-foreground/60 lg:hidden"
          aria-label="Menü schließen"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-y-0 right-0 top-20 z-[70] flex w-full flex-col bg-background shadow-2xl transition-transform duration-300 sm:max-w-sm lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full pointer-events-none",
        )}
        aria-hidden={!isOpen}
      >
        <nav
          className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6"
          aria-label="Mobile Navigation"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-transparent px-4 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-border hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-6 border-t border-border pt-6">
            <Button asChild size="lg" className="w-full text-base">
              <Link href="/kontakt" onClick={() => setIsOpen(false)}>
                Kostenlose Beratung
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
