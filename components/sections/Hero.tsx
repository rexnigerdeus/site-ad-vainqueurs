import { Calendar, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { formatDateFr } from "@/lib/utils";
import type { Event } from "@/lib/sanity/queries";

export function Hero({ nextEvent }: { nextEvent?: Event | null }) {
  return (
    <section id="hero" className="relative overflow-hidden bg-night-gradient">
      {/* Décor lumineux */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gold/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-bordeaux/20 blur-[100px]" />

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
              Bienvenue au Temple des Vainqueurs
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display text-4xl leading-[1.05] tracking-tight-56 text-ivory sm:text-5xl md:text-6xl lg:text-7xl 2.5xl:text-8xl">
              Une communauté qui{" "}
              <span className="bg-gold-gradient bg-clip-text text-transparent">
                vainc
              </span>{" "}
              par la foi
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-ivory/70 md:text-xl">
              Temple des Assemblées de Dieu — Abidjan, Port-Bouët (Vridi).
              Cultes, prédications, enseignements et vie communautaire
              au nom de Christ.
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