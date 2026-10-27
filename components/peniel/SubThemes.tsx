"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { PENIEL_SUB_THEMES } from "@/lib/peniel";
import { usePenielToday } from "./usePenielToday";

/** Les 4 sous-thèmes, en bandeaux comme sur l'affiche ; la semaine en cours ressort. */
export function SubThemes({ className }: { className?: string }) {
  const ref = React.useRef<HTMLOListElement>(null);
  const today = usePenielToday();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("li", {
          x: (i) => (i % 2 ? 80 : -80),
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <ol ref={ref} className={cn("space-y-3 sm:space-y-4", className)}>
      {PENIEL_SUB_THEMES.map((s, i) => {
        const current = today?.week === i;
        return (
          // Pas de transition CSS sur le <li> : GSAP anime sa position (les deux se gêneraient).
          <li key={s.title}>
            <div
              className={cn(
                "flex items-stretch overflow-hidden rounded-2xl bg-white shadow-xl shadow-peniel-ink/30 transition-transform duration-300 hover:-translate-y-1",
                current && "ring-4 ring-peniel-amber ring-offset-4 ring-offset-peniel-indigo"
              )}
            >
            <div className="relative flex w-[6.5rem] shrink-0 flex-col justify-center bg-peniel-fire py-3 pl-4 pr-6 text-white [clip-path:polygon(0_0,100%_0,82%_100%,0_100%)] sm:w-36 sm:pl-5">
              <span className="font-sans text-[0.8rem] font-extrabold italic leading-none sm:text-base">Sous-thème</span>
              <span className="font-sans text-4xl font-black italic leading-none sm:text-5xl">{i + 1}</span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center py-3 pr-4 sm:py-4 sm:pr-6">
              <span className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-peniel-royal sm:text-xs">
                Semaine {i + 1} · {s.week}
                {current && (
                  <span className="rounded-full bg-peniel-red px-2 py-0.5 text-[10px] text-white">Cette semaine</span>
                )}
              </span>
              <span className="mt-1 font-sans text-lg font-bold italic leading-snug text-peniel-ink sm:text-2xl">
                {s.title}
              </span>
            </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
