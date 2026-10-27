import { Marquee } from "@/components/motion/Marquee";
import { PENIEL } from "@/lib/peniel";
import { cn } from "@/lib/utils";

const ITEMS = [
  PENIEL.theme,
  PENIEL.verse.reference,
  PENIEL.tagline,
  "Du 1er au 29 novembre 2026",
] as const;

/** Bandeau « feu » qui défile, avec le thème et les dates de PENIEL. */
export function PenielMarquee({ className, reverse }: { className?: string; reverse?: boolean }) {
  return (
    <div className={cn("relative z-10 bg-peniel-fire py-3 text-peniel-ink sm:py-4", className)}>
      <Marquee
        items={ITEMS}
        reverse={reverse}
        itemClassName="font-condensed text-2xl uppercase leading-none tracking-wide sm:text-4xl"
        separator={<span aria-hidden="true" className="text-xl text-white sm:text-3xl">✦</span>}
      />
    </div>
  );
}
