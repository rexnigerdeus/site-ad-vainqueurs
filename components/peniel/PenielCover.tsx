"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
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
      <Link href="/peniel" aria-label={`Découvrir ${PENIEL.name}`} className="relative block">
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
      </Link>
    </section>
  );
}
