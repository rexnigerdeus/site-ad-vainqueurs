"use client";

import * as React from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Flame } from "lucide-react";

/**
 * Section "Événement spécial" — PENIEL 2026.
 * Mois de jeûne et de prière : novembre 2026.
 * Compte à rebours avant le 1er novembre 2026.
 * La date cible peut être passée en props depuis un événement Sanity.
 */

const DEFAULT_DATE = new Date("2026-11-01T00:00:00+00:00");

function getTimeLeft(target: Date) {
  const total = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { total, days, hours, minutes, seconds };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="grid h-20 w-20 place-items-center rounded-6 border border-gold/30 bg-night/40 backdrop-blur-md md:h-28 md:w-28">
        <span className="font-display text-3xl tabular-nums text-gold md:text-5xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 text-xs font-medium uppercase tracking-wider text-ivory/60 md:text-sm">
        {label}
      </span>
    </div>
  );
}

export function PenielCountdown({ targetDate }: { targetDate?: string }) {
  const PENIEL_DATE = targetDate ? new Date(targetDate) : DEFAULT_DATE;
  const [timeLeft, setTimeLeft] = React.useState(() => getTimeLeft(PENIEL_DATE));
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTimeLeft(getTimeLeft(PENIEL_DATE)), 1000);
    return () => clearInterval(id);
  }, [PENIEL_DATE]);

  return (
    <section className="relative overflow-hidden bg-night py-20 lg:py-28">
      <div className="pointer-events-none absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-bordeaux/30 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-[400px] w-[400px] rounded-full bg-gold/15 blur-[120px]" />

      <div className="container-section relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
            <Flame className="h-3.5 w-3.5" />
            Événement spécial
          </span>
          <h2 className="mt-6 font-display text-4xl leading-none tracking-tight-56 md:text-7xl">
            PENIEL 2026
          </h2>
          <p className="mt-4 text-lg text-ivory/80 md:text-xl">
            Mois de jeûne et de prière — Novembre
          </p>
          <p className="mt-3 text-sm text-ivory/60">
            « J'ai vu Dieu face à face, et mon âme a été délivrée. » — Genèse 32:30
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={0.15}>
          <p className="text-center text-sm font-medium uppercase tracking-wider text-ivory/60">
            Plus que
          </p>
          <div className="mt-5 flex items-center justify-center gap-3 md:gap-5">
            <Unit value={mounted ? timeLeft.days : 0} label="Jours" />
            <span className="font-display text-3xl text-gold/60 md:text-5xl">:</span>
            <Unit value={mounted ? timeLeft.hours : 0} label="Heures" />
            <span className="font-display text-3xl text-gold/60 md:text-5xl">:</span>
            <Unit value={mounted ? timeLeft.minutes : 0} label="Min" />
            <span className="font-display text-3xl text-gold/60 md:text-5xl">:</span>
            <Unit value={mounted ? timeLeft.seconds : 0} label="Sec" />
          </div>
        </Reveal>

        {timeLeft.total === 0 && (
          <Reveal className="mt-10 text-center">
            <p className="font-display text-2xl text-gold md:text-3xl">
              C'est l'heure du combat spirituel ! 🙏
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}