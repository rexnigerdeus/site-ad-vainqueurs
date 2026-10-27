import { cn } from "@/lib/utils";

/** « 4 Semaines de jeûne et de prière | 01er au 29 novembre 2026 », comme sur les affiches. */
export function DatesMark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 sm:gap-6", className)}>
      <p className="flex items-center leading-none">
        <span className="text-fire pr-1 font-sans text-[4.2rem] font-black italic leading-[0.8] sm:text-[5.5rem]">4</span>
        <span className="flex flex-col">
          <span className="font-sans text-2xl font-black leading-none text-white sm:text-[2rem]">Semaines</span>
          <span className="mt-1 font-sans text-sm font-medium leading-none text-white/90 sm:text-base">de jeûne et de prière</span>
        </span>
      </p>
      <span aria-hidden="true" className="h-16 w-px bg-white/50 sm:h-20" />
      <p className="flex flex-col items-start leading-none">
        <span className="flex items-baseline font-sans font-black italic">
          <span className="text-fire text-[2.6rem] leading-none sm:text-6xl">01</span>
          <span className="mx-1 text-sm text-white sm:text-lg">au</span>
          <span className="text-fire text-[2.6rem] leading-none sm:text-6xl">29</span>
        </span>
        <span className="peniel-tag mt-1.5 text-[11px] tracking-[0.18em] sm:text-xs">Novembre 2026</span>
      </p>
    </div>
  );
}
