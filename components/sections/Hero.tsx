import { Calendar, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { formatDateFr } from "@/lib/utils";
import type { Event, PageContent } from "@/lib/sanity/queries";

export function Hero({
  nextEvent,
  header,
}: {
  nextEvent?: Event | null;
  header?: PageContent["header"];
}) {
  return (
    <section id="hero" className="grain relative overflow-hidden bg-night-gradient">
      {/* Décor lumineux */}
      <div className="orb -top-32 left-[calc(50%-300px)] h-[600px] w-[600px] bg-gold/20" />
      <div className="orb bottom-0 right-0 h-[400px] w-[400px] bg-bordeaux/25 [animation-delay:-9s]" />

      <div className="container-section relative grid min-h-[80vh] place-items-center py-20 text-center lg:py-28">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold">
              <Image
                src="/logo.png"
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px] rounded-full object-cover"
              />
              {header?.eyebrow || "Bienvenue au Temple des Vainqueurs"}
            </p>
          </Reveal>

          <SplitReveal
            as="h1"
            on="load"
            delay={0.1}
            className="font-display text-[2.9rem] uppercase leading-[0.95] text-ivory sm:text-6xl md:text-7xl lg:text-8xl 2.5xl:text-9xl"
          >
            {header?.title || (
              <>
                Une communauté qui <span className="text-gold">vainc</span> par la foi
              </>
            )}
          </SplitReveal>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-ivory/70 md:text-xl">
              {header?.description ||
                "Temple des Assemblées de Dieu — Abidjan, Port-Bouët (Vridi). Cultes, prédications, enseignements et vie communautaire au nom de Christ."}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/messages">
                  <Play className="h-4 w-4" /> Écouter les prédications
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="/contact">
                  <Calendar className="h-4 w-4" /> Nous visiter
                </Link>
              </Button>
            </div>
          </Reveal>

          {nextEvent && (
            <Reveal delay={0.4}>
              <div className="mx-auto mt-12 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-ivory/80 backdrop-blur-md">
                <Calendar className="h-4 w-4 text-gold" />
                <span>Prochain culte — {formatDateFr(nextEvent.date)} à {nextEvent.time}</span>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}