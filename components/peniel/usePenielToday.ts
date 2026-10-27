"use client";

import * as React from "react";
import { PENIEL } from "@/lib/peniel";

/**
 * Où en est-on dans PENIEL, calculé dans le navigateur (heure d'Abidjan = UTC) :
 * semaine en cours (0 à 3) et jour de la semaine (0 = dimanche).
 * Null hors de la période du 1er au 29 novembre, ou avant l'hydratation.
 */
export function usePenielToday() {
  const [today, setToday] = React.useState<{ week: number; weekday: number } | null>(null);

  React.useEffect(() => {
    const now = Date.now();
    if (now < Date.parse(PENIEL.start) || now >= Date.parse(PENIEL.end)) return;
    const date = new Date(now);
    const day = date.getUTCDate();
    setToday({ week: day <= 7 ? 0 : day <= 14 ? 1 : day <= 21 ? 2 : 3, weekday: date.getUTCDay() });
  }, []);

  return today;
}
