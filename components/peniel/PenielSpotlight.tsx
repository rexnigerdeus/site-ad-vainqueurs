import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PENIEL } from "@/lib/peniel";
import { ThemeTitle } from "./ThemeTitle";
import { SubThemes } from "./SubThemes";
import { PenielSchedule } from "./PenielSchedule";
import { DatesMark } from "./DatesMark";
import { ShareButton } from "./ShareButton";
import { Reveal } from "@/components/motion/Reveal";

/** Bloc PENIEL de l'accueil : thème, sous-thèmes et programme du mois. */
export function PenielSpotlight() {
  return (
    <section aria-labelledby="peniel-spotlight" className="grain relative overflow-hidden bg-peniel-sky py-20 text-white lg:py-28">
      <div className="orb -right-24 top-10 h-80 w-80 bg-peniel-cyan/40" />
      <div className="orb -left-32 bottom-0 h-96 w-96 bg-peniel-orange/25 [animation-delay:-6s]" />

      <div className="container-section relative grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Sur grand écran, le thème reste visible pendant qu'on parcourt sous-thèmes et programme */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-peniel-amber">PENIEL 2026 · ce mois-ci au temple</p>
          <h2 id="peniel-spotlight" className="sr-only">
            Le thème de PENIEL 2026
          </h2>
          <ThemeTitle on="scroll" className="mt-10 text-[22vw] sm:text-[8.5rem] lg:text-[7rem] xl:text-[8.5rem]" />
          <Reveal>
            <blockquote className="mt-8 max-w-xl border-l-4 border-peniel-amber pl-5">
              <p className="font-sans text-lg italic text-white/90 sm:text-xl">« {PENIEL.verse.text} »</p>
              <footer className="mt-2 text-sm font-bold uppercase tracking-wider text-peniel-amber">{PENIEL.verse.reference}</footer>
            </blockquote>
            <DatesMark className="mt-10" />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/peniel"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-peniel-fire px-7 py-4 font-bold text-white shadow-xl shadow-peniel-orange/30 transition-transform hover:scale-[1.03] active:scale-95"
              >
                Tout savoir sur PENIEL <ArrowRight className="h-4 w-4" />
              </Link>
              <ShareButton
                title={PENIEL.name}
                text={`${PENIEL.name} — « ${PENIEL.theme} ». ${PENIEL.tagline}, ${PENIEL.dates.toLowerCase()}.`}
                path="/peniel"
                className="rounded-full border border-white/30 px-7 py-4 font-semibold text-white transition-colors hover:bg-white/10"
              />
            </div>
          </Reveal>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="font-condensed text-4xl tracking-wide sm:text-5xl">Les sous-thèmes</h3>
            <SubThemes className="mt-6" />
          </div>
          <div>
            <h3 className="font-condensed text-4xl tracking-wide sm:text-5xl">Le programme du mois</h3>
            <p className="mt-2 text-white/75">Du 1er au 29 novembre, toute l&apos;église suit ce programme.</p>
            <PenielSchedule className="mt-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
