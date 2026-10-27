"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { gsap, MOTION_OK, useGSAP } from "./gsap";

/**
 * Conteneur dont le contenu glisse plus lentement que la page (effet de profondeur).
 * `amount` : décalage total en pourcentage de la hauteur du contenu.
 */
export function ParallaxImage({
  children,
  className,
  amount = 12,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-parallax]",
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div data-parallax className="absolute inset-[-8%_0] will-change-transform">
        {children}
      </div>
    </div>
  );
}
