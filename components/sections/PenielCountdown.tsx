"use client";

import * as React from "react";
import { Reveal } from "@/components/motion/Reveal";
import Image from "next/image";

/**
 * Section "Événement spécial" — PENIEL 2026.
 * Visuel « Coming soon » en fond (public/peniel-coming-soon.jpg), sans texte HTML visible :
 * le compteur est posé sous « COMING SOON » (grand écran) ou sous le visuel (mobile/tablette).
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
    <div className="flex h-16 w-16 flex-col items-center justify-center rounded-6 bg-night shadow-lg shadow-night/30 md:h-20 md:w-20 xl:h-24 xl:w-24">
      <span className="font-display text-2xl tabular-nums leading-none text-gold md:text-3xl xl:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-ivory md:text-xs">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span aria-hidden="true" className="font-display text-2xl text-night md:text-3xl xl:text-4xl">
      :
    </span>
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

  const t = mounted ? timeLeft : { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <section aria-labelledby="peniel-title" className="relative overflow-hidden bg-[#F3F1FF]">
      {/* Le visuel porte tout le texte : on le redonne aux lecteurs d'écran. */}
      <h2 id="peniel-title" className="sr-only">
        PENIEL 2026 — Bientôt : mois de jeûne et de prière, novembre 2026
      </h2>

      {/* Visuel au ratio 2:1 ; sur grand écran le compteur se pose dessus, sous « COMING SOON ». */}
      <div className="relative aspect-[2/1] w-full">
        <Image
          src="/peniel-coming-soon.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="py-6 lg:absolute lg:inset-x-0 lg:top-[55%] lg:py-0">
        <Reveal delay={0.15}>
          {timeLeft.total === 0 ? (
            <p className="mx-auto w-fit rounded-6 bg-night px-6 py-3 text-center font-display text-2xl text-gold md:text-3xl">
              C&apos;est l&apos;heure du combat spirituel ! 🙏
            </p>
          ) : (
            <div
              role="timer"
              aria-label={`Début dans ${t.days} jours, ${t.hours} heures et ${t.minutes} minutes`}
              className="flex items-center justify-center gap-2 md:gap-3"
            >
              <Unit value={t.days} label="Jours" />
              <Separator />
              <Unit value={t.hours} label="Heures" />
              <Separator />
              <Unit value={t.minutes} label="Min" />
              <Separator />
              <Unit value={t.seconds} label="Sec" />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
