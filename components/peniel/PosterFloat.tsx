"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";

/** Affiche qui flotte doucement et s'incline sous la souris (grand écran). */
export function PosterFloat({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const card = ref.current?.querySelector<HTMLElement>("[data-card]");
        if (!card) return;
        gsap.from(card, { y: 80, rotate: 8, opacity: 0, duration: 1.4, ease: "expo.out", delay: 0.3 });
        gsap.to(card, { y: -14, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.7 });

        const rotX = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3" });
        const rotY = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3" });
        const onMove = (e: PointerEvent) => {
          const r = ref.current!.getBoundingClientRect();
          rotY(((e.clientX - r.left) / r.width - 0.5) * 14);
          rotX(-((e.clientY - r.top) / r.height - 0.5) * 14);
        };
        const onLeave = () => {
          rotX(0);
          rotY(0);
        };
        ref.current!.addEventListener("pointermove", onMove);
        ref.current!.addEventListener("pointerleave", onLeave);
        return () => {
          ref.current?.removeEventListener("pointermove", onMove);
          ref.current?.removeEventListener("pointerleave", onLeave);
        };
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("[perspective:1200px]", className)}>
      <div data-card className="relative rotate-2 overflow-hidden rounded-[1.75rem] border border-white/20 shadow-[0_40px_80px_-20px_rgba(18,15,77,0.8)]">
        <Image src={src} alt={alt} width={1131} height={1600} priority sizes="384px" className="h-auto w-full" />
      </div>
    </div>
  );
}
