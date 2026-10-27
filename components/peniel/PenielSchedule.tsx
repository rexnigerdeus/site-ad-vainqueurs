"use client";

import * as React from "react";
import { Moon, Sun, Sunrise } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { PENIEL_WEEK, type PenielSlot } from "@/lib/peniel";
import { usePenielToday } from "./usePenielToday";

const momentIcon: Record<PenielSlot["moment"], typeof Sun> = { aube: Sunrise, midi: Sun, soir: Moon };

/**
 * Programme hebdomadaire de PENIEL, mis en page comme l'affiche :
 * bandeaux inclinés indigo/orange, puis la veillée en rouge.
 * Le jour en cours est signalé pendant PENIEL.
 */
export function PenielSchedule({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const today = usePenielToday();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-block]", {
          y: 50,
          opacity: 0,
          rotateX: -25,
          transformOrigin: "50% 0%",
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("space-y-4 [perspective:900px]", className)}>
      {PENIEL_WEEK.map((d) => {
        const current = today ? d.weekdays.includes(today.weekday) : false;
        return (
          <div
            key={d.day}
            data-block
            className={cn(
              "relative grid gap-4 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-peniel-royal/70 via-peniel-indigo/70 to-peniel-orange/80 p-5 sm:grid-cols-[minmax(0,13rem)_1fr] sm:items-center sm:p-6",
              current && "ring-4 ring-peniel-amber"
            )}
          >
            <div>
              {current && (
                <span className="mb-2 inline-block rounded-full bg-peniel-red px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                  Aujourd&apos;hui
                </span>
              )}
              <h3 className="font-sans text-2xl font-extrabold italic leading-tight text-white sm:text-[1.7rem]">{d.day}</h3>
              <p className="mt-1 text-sm font-medium text-white/75">{d.title}</p>
            </div>
            <ul className="flex flex-wrap gap-2 sm:justify-end">
              {d.slots.map((s) => {
                const Icon = momentIcon[s.moment];
                return (
                  <li
                    key={s.time}
                    className="flex items-center gap-2 rounded-2xl bg-peniel-ink/40 px-3.5 py-2 backdrop-blur"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-peniel-amber" aria-hidden="true" />
                    <span className="flex flex-col leading-tight">
                      {s.label && <span className="text-[11px] font-semibold uppercase tracking-wide text-white/70">{s.label}</span>}
                      <span className="font-sans text-base font-bold tabular-nums text-white sm:text-lg">{s.time}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      <div
        data-block
        className="relative flex flex-col items-start gap-1 overflow-hidden rounded-3xl bg-peniel-red p-5 text-white shadow-2xl shadow-peniel-red/30 sm:flex-row sm:items-center sm:justify-between sm:p-7"
      >
        <h3 className="flex items-end gap-2 leading-none">
          <span className="font-script text-5xl text-peniel-amber sm:text-6xl">Veillée</span>
          <span className="font-condensed text-3xl tracking-wide sm:text-4xl">de prière</span>
        </h3>
        <p className="flex items-end gap-2 font-condensed leading-none">
          <span className="text-6xl sm:text-7xl">27</span>
          <span className="flex flex-col pb-1 text-2xl tracking-[0.15em] sm:text-3xl">
            <span>Novembre</span>
            <span className="tracking-[0.5em]">2026</span>
          </span>
        </p>
      </div>
    </div>
  );
}
