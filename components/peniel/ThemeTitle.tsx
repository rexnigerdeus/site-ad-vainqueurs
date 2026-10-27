"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { PENIEL } from "@/lib/peniel";

/**
 * Le thème de PENIEL composé comme sur l'affiche :
 * « MARCHE » et « INTÈGRE » en grand dégradé orange, le reste en blanc,
 * étiquettes rouges « Thème » et « Genèse 17v1 », mots manuscrits en filigrane.
 * La taille se règle avec une classe text-* sur `className` : tout est en em.
 */
export function ThemeTitle({
  className,
  as: Tag = "p",
  on = "load",
}: {
  className?: string;
  as?: "h1" | "h2" | "p";
  on?: "load" | "scroll";
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          delay: on === "load" ? 0.15 : 0,
          scrollTrigger: on === "scroll" ? { trigger: ref.current, start: "top 80%", once: true } : undefined,
        });
        tl.from("[data-word]", { yPercent: 60, opacity: 0, skewY: 7, duration: 0.9, ease: "expo.out", stagger: 0.09 })
          .from("[data-tag]", { scale: 0, rotate: -12, duration: 0.6, ease: "back.out(2.5)", stagger: 0.1 }, "-=0.55")
          .from("[data-script]", { opacity: 0, x: -30, duration: 1.4, ease: "power2.out", stagger: 0.2 }, "-=0.6");
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("relative inline-block font-condensed uppercase", className)}>
      <span data-tag className="peniel-tag absolute -top-[0.08em] left-0 z-10 origin-bottom-left text-[0.11em] leading-tight tracking-wide">
        Thème
      </span>
      <span
        aria-hidden="true"
        data-script
        className="pointer-events-none absolute left-[-0.12em] top-[0.32em] z-0 font-script text-[0.62em] normal-case leading-none text-white/25"
      >
        Marche
      </span>
      <span
        aria-hidden="true"
        data-script
        className="pointer-events-none absolute bottom-[-0.04em] right-[-0.06em] z-0 font-script text-[0.5em] normal-case leading-none text-white/25"
      >
        Intègre
      </span>

      <Tag aria-label={`Thème : ${PENIEL.theme} (${PENIEL.verse.reference})`} className="relative z-[1] leading-[0.84]">
        <span aria-hidden="true" className="flex items-end gap-[0.06em] pt-[0.16em]">
          <span data-word className="text-fire -mt-[0.14em] block pr-[0.02em] pt-[0.14em]">Marche</span>
          <span data-word className="mb-[0.06em] flex flex-col text-[0.47em] leading-[0.9] text-white">
            <span>Devant</span>
            <span>ma face</span>
          </span>
        </span>
        <span aria-hidden="true" className="flex items-start gap-[0.06em]">
          <span data-word className="mt-[0.05em] flex flex-col items-end text-[0.47em] leading-[0.9] text-white">
            <span>Et sois</span>
            <span data-tag className="peniel-tag mt-[0.12em] font-sans text-[0.32em] normal-case leading-tight">
              Genèse 17v1
            </span>
          </span>
          {/* Marge haute dans la zone du dégradé : sinon l'accent de « È » sort du fond et disparaît. */}
          <span data-word className="text-fire -mt-[0.14em] block pr-[0.02em] pt-[0.14em]">Intègre</span>
        </span>
      </Tag>
    </div>
  );
}
