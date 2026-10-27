"use client";

import * as React from "react";
import { gsap, MOTION_OK, useGSAP } from "./gsap";

/**
 * Affiche une valeur saisie librement (« 500+ », « 10 ans », « 100% ») et fait
 * monter le premier nombre depuis 0 quand elle entre dans l'écran.
 * Le texte final est rendu côté serveur : rien ne manque sans JavaScript.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !match) return;
      const [, prefix, raw, suffix] = match;
      const target = Number(raw.replace(",", "."));
      const decimals = raw.includes(".") || raw.includes(",") ? 1 : 0;
      const counter = { n: 0 };
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.to(counter, {
          n: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate() {
            el.textContent = `${prefix}${counter.n.toFixed(decimals)}${suffix}`;
          },
        });
        return () => {
          el.textContent = value;
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [value] }
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
