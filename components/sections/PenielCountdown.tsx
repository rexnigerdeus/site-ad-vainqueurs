"use client";

import * as React from "react";
import Image from "next/image";
import { PENIEL } from "@/lib/peniel";
import { cn } from "@/lib/utils";

/**
 * Compte à rebours jusqu'au lancement de PENIEL (samedi 31 octobre).
 * Il se retire de lui-même à l'heure du lancement, même sur une page déjà ouverte ;
 * les pages serveur ne l'affichent plus non plus une fois la date passée.
 *  - "banner"  : bandeau aux couleurs PENIEL, sous la couverture de l'accueil ;
 *  - "compact" : « coming soon » réduit, en tête de la page PENIEL.
 */

const LAUNCH = Date.parse(PENIEL.launch);

function timeLeft() {
  const total = Math.max(0, LAUNCH - Date.now());
  return {
    total,
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

function useCountdown() {
  const [state, setState] = React.useState<ReturnType<typeof timeLeft> | null>(null);
  React.useEffect(() => {
    setState(timeLeft());
    const id = setInterval(() => setState(timeLeft()), 1000);
    return () => clearInterval(id);
  }, []);
  return state;
}

function Digits({ value, label, size }: { value?: number; label: string; size: "lg" | "sm" }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-white/15 bg-peniel-ink/60 backdrop-blur",
        size === "lg" ? "h-[4.25rem] w-[4.25rem] sm:h-20 sm:w-20 lg:h-24 lg:w-24" : "h-14 w-14 sm:h-16 sm:w-16"
      )}
    >
      <span
        className={cn(
          "font-condensed tabular-nums leading-none text-peniel-amber",
          size === "lg" ? "text-[2.1rem] sm:text-4xl lg:text-5xl" : "text-[1.7rem] sm:text-3xl"
        )}
      >
        {value === undefined ? "--" : String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/80">{label}</span>
    </div>
  );
}

function Timer({ t, size }: { t: ReturnType<typeof timeLeft> | null; size: "lg" | "sm" }) {
  return (
    <div
      role="timer"
      aria-label={t ? `Lancement dans ${t.days} jours, ${t.hours} heures et ${t.minutes} minutes` : "Compte à rebours"}
      className="flex items-center gap-1.5 sm:gap-2.5"
    >
      <Digits value={t?.days} label="Jours" size={size} />
      <Digits value={t?.hours} label="Heures" size={size} />
      <Digits value={t?.minutes} label="Min" size={size} />
      <Digits value={t?.seconds} label="Sec" size={size} />
    </div>
  );
}

export function PenielCountdown({ variant = "banner" }: { variant?: "banner" | "compact" }) {
  const t = useCountdown();
  // Tout le bloc se retire à l'heure du lancement.
  if (t && t.total === 0) return null;

  if (variant === "compact") {
    return (
      <section aria-labelledby="peniel-soon" className="relative z-10 -mt-10 px-4 sm:-mt-14">
        <div className="mx-auto grid max-w-4xl grid-cols-[96px_1fr] items-center gap-x-4 gap-y-4 overflow-hidden rounded-3xl border border-white/15 bg-peniel-deep/90 p-4 shadow-2xl shadow-peniel-ink/50 backdrop-blur-xl sm:grid-cols-[200px_1fr] sm:p-5">
          <div className="relative aspect-[2/1] overflow-hidden rounded-xl sm:row-span-2 sm:rounded-2xl">
            <Image src="/peniel-coming-soon.jpg" alt="" fill sizes="(min-width: 640px) 200px, 96px" className="object-cover" />
          </div>
          <h2 id="peniel-soon" className="font-condensed text-xl leading-none tracking-wide text-white sm:self-end sm:text-3xl">
            Coming soon · <span className="text-peniel-amber">lancement samedi 31 octobre</span>
          </h2>
          <div className="col-span-2 flex justify-center sm:col-span-1 sm:col-start-2 sm:justify-start sm:self-start">
            <Timer t={t} size="sm" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="peniel-countdown" className="relative overflow-hidden bg-peniel-sky text-white">
      <div className="orb -left-20 top-0 h-56 w-56 bg-peniel-orange/30" />
      <div className="container-section relative flex flex-col items-center gap-5 py-7 text-center lg:flex-row lg:justify-between lg:py-8 lg:text-left">
        <div>
          <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-peniel-amber">Coming soon</p>
          <h2 id="peniel-countdown" className="mt-1 font-condensed text-3xl leading-none tracking-wide sm:text-4xl lg:text-5xl">
            Lancement de PENIEL <span className="text-fire">samedi 31 octobre</span>
          </h2>
        </div>
        <Timer t={t} size="lg" />
      </div>
    </section>
  );
}
