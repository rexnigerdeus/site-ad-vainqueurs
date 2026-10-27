"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "./gsap";

type Props = {
  items: readonly string[];
  className?: string;
  itemClassName?: string;
  /** Séparateur entre deux éléments. */
  separator?: React.ReactNode;
  /** Secondes pour un tour complet à vitesse normale. */
  duration?: number;
  reverse?: boolean;
};

/**
 * Bandeau de texte qui défile en boucle et accélère quand on fait défiler la page.
 * Le contenu est dupliqué : translater de -50 % retombe pile sur la copie.
 */
export function Marquee({
  items,
  className,
  itemClassName,
  separator = <span aria-hidden="true">✦</span>,
  duration = 28,
  reverse = false,
}: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const loop = gsap.fromTo(
          trackRef.current,
          { xPercent: reverse ? -50 : 0 },
          { xPercent: reverse ? 0 : -50, ease: "none", duration, repeat: -1 }
        );
        const boost = ScrollTrigger.create({
          onUpdate(self) {
            const speed = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 5);
            gsap.to(loop, { timeScale: speed, duration: 0.2, overwrite: true });
            gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.2, ease: "power2.out" });
          },
        });
        return () => {
          loop.kill();
          boost.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  const group = (copy: number) => (
    <div
      key={copy}
      aria-hidden={copy === 1 || undefined}
      className="flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10"
    >
      {items.map((item, i) => (
        <React.Fragment key={`${copy}-${i}`}>
          <span className={cn("whitespace-nowrap", itemClassName)}>{item}</span>
          {separator}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {group(0)}
        {group(1)}
      </div>
    </div>
  );
}
