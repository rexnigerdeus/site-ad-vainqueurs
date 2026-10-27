import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Marquee } from "@/components/motion/Marquee";
import { isPenielSeason } from "@/lib/peniel";

type Settings = {
  quartier?: string;
  commune?: string;
  city?: string;
  whatsapp?: string;
};

const WELCOME = ["Bienvenue", "Akwaba", "Welcome", "Bienvenue", "Akwaba", "Welcome"];

export function CtaVisit({ settings }: { settings?: Settings }) {
  const quartier = settings?.quartier || "Vridi";
  const commune = settings?.commune || "Port-Bouët";
  const city = settings?.city || "Abidjan";
  const whatsapp = settings?.whatsapp || "22500000000";
  const when = isPenielSeason()
    ? "En novembre, c'est PENIEL : prière chaque jour au temple, et le dimanche, culte de louange et de célébration de 07h00 à 10h30."
    : "Le dimanche de 07h00 à 10h00 pour le culte dominical.";
  return (
    <section className="grain relative overflow-hidden bg-night-gradient py-20 lg:py-28">
      <div className="orb left-[calc(50%-250px)] top-[calc(50%-250px)] h-[500px] w-[500px] bg-gold/20" />

      <Marquee
        items={WELCOME}
        duration={40}
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-[0.06]"
        itemClassName="font-display text-[22vw] uppercase leading-none text-ivory lg:text-[14rem]"
        separator={<span aria-hidden="true" />}
      />

      <div className="container-section relative text-center">
        <Reveal>
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/15 ring-1 ring-gold/40">
            <MapPin className="h-8 w-8 text-gold" />
          </span>
        </Reveal>
        <SplitReveal className="mt-6 font-display text-5xl uppercase leading-[0.95] md:text-6xl lg:text-7xl">
          Venez nous rendre visite
        </SplitReveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ivory/75">
            Le temple vous accueille à {quartier}, {commune}, {city}. {when}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/contact">
                Nous contacter <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="whatsapp" className="w-full sm:w-auto">
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
