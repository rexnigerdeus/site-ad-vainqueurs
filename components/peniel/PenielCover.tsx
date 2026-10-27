"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { PENIEL } from "@/lib/peniel";

/**
 * En-tête de l'accueil pendant PENIEL : la couverture officielle, en entier,
 * cliquable vers la page PENIEL. Entrée en zoom doux, puis léger parallaxe au défilement.
 */
export function PenielCover() {
  const ref = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-cover]", { scale: 1.12, opacity: 0, duration: 1.6, ease: "expo.out" });
        gsap.from("[data-cta]", { y: 20, opacity: 0, duration: 0.8, delay: 0.9, ease: "back.out(2)" });
        gsap.to("[data-cover]", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="hero" className="relative overflow-hidden bg-peniel-deep">
      <h1 className="sr-only">
        {PENIEL.name} — {PENIEL.theme} ({PENIEL.verse.reference}). {PENIEL.tagline}, {PENIEL.dates.toLowerCase()}, au Temple des Vainqueurs.
      </h1>
      <Link href="/peniel" aria-label={`Découvrir ${PENIEL.name}`} className="group relative block">
        <div data-cover className="relative">
          <Image
            src={PENIEL.cover.src}
            alt=""
            width={PENIEL.cover.width}
            height={PENIEL.cover.height}
            priority
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
        <span data-cta className="absolute bottom-[6%] right-[3%]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-peniel-deep shadow-xl transition-transform group-hover:scale-105 sm:px-5 sm:py-2.5 sm:text-sm">
            Découvrir <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
          </span>
        </span>
      </Link>
    </section>
  );
}
