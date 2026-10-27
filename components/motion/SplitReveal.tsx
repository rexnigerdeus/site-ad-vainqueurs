"use client";

import * as React from "react";
import { gsap, MOTION_OK, SplitText, useGSAP } from "./gsap";

type Props = {
  as?: "h1" | "h2" | "h3" | "p" | "span";
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** "load" : anime dès l'affichage (en-têtes) ; "scroll" : à l'entrée dans l'écran. */
  on?: "load" | "scroll";
  id?: string;
};

/**
 * Titre révélé mot à mot (chaque ligne sert de masque).
 * Le texte est masqué par CSS tant que GSAP n'a pas pris la main (voir globals.css),
 * puis reste lisible si le mouvement réduit est demandé.
 * Éviter les dégradés en bg-clip-text à l'intérieur : préférer une couleur pleine.
 */
export function SplitReveal({ as: Tag = "h2", children, className, delay = 0, on = "scroll", id }: Props) {
  const ref = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(el, {
          type: "lines,words",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            el.dataset.split = "ready";
            return gsap.from(self.words, {
              yPercent: 115,
              rotate: 4,
              duration: 1,
              ease: "expo.out",
              stagger: 0.05,
              delay,
              scrollTrigger: on === "scroll" ? { trigger: el, start: "top 88%", once: true } : undefined,
            });
          },
        });
        return () => split.revert();
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        el.dataset.split = "ready";
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref as React.Ref<never>} id={id} data-split="" className={className}>
      {children}
    </Tag>
  );
}
