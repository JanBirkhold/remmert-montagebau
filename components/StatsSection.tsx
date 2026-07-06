"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { COMPANY_STATS } from "@/lib/constants";

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function CountUp({
  value,
  decimals = 0,
  suffix = "",
  duration = 1800,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = easeOutCubic(Math.min((now - start) / duration, 1));
      setDisplay(value * progress);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value, duration]);

  const formatted =
    decimals > 0
      ? display.toFixed(decimals).replace(".", ",")
      : String(Math.round(display));

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}

function StatCard({
  stat,
  index,
  featured = false,
}: {
  stat: (typeof COMPANY_STATS)[number];
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={
        featured
          ? "flex flex-col items-center justify-center gap-4 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 px-6 py-8 text-center sm:flex-row sm:items-center sm:text-left lg:col-span-5"
          : "flex flex-col items-center justify-center rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 px-5 py-6 text-center lg:col-span-2"
      }
    >
      <p
        className={
          featured
            ? "shrink-0 text-5xl font-bold tabular-nums sm:text-6xl"
            : "text-4xl font-bold tabular-nums sm:text-5xl"
        }
      >
        {"showStars" in stat && stat.showStars ? (
          <span className="inline-flex items-center justify-center gap-1.5">
            <CountUp
              value={stat.value}
              decimals={stat.decimals}
              suffix={stat.suffix}
            />
            <Star className="h-7 w-7 fill-primary-foreground text-primary-foreground sm:h-8 sm:w-8" aria-hidden="true" />
          </span>
        ) : (
          <CountUp
            value={stat.value}
            decimals={stat.decimals}
            suffix={stat.suffix}
          />
        )}
      </p>
      <div className={featured ? "sm:max-w-[14rem]" : undefined}>
        <p className="text-sm font-semibold leading-snug sm:text-base">
          {stat.label}
        </p>
        {"detail" in stat && stat.detail && (
          <p className="mt-1 text-xs text-primary-foreground/80 sm:text-sm">
            {stat.detail}
          </p>
        )}
      </div>
    </motion.li>
  );
}

export function StatsSection() {
  const [featured, ...rest] = COMPANY_STATS;

  return (
    <section
      className="bg-primary text-primary-foreground"
      aria-label="Unternehmenskennzahlen"
    >
      <div className="container-narrow px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          <StatCard stat={featured} index={0} featured />
          {rest.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index + 1} />
          ))}
        </ul>
      </div>
    </section>
  );
}
