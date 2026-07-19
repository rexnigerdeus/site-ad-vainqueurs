import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { CHURCH } from "@/lib/church";

export function CtaVisit() {
  return (
    <section className="relative overflow-hidden bg-night-gradient py-20 lg:py-28">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[120px]" />
      <div className="container-section relative text-center">
        <Reveal>
          <MapPin className="mx-auto h-12 w-12 text-gold" />
          <h2 className="mt-6 font-display text-3xl tracking-tight-48 md:text-5xl lg:text-6xl">
            Venez nous rendre visite
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ivory/70">
            Le temple vous accueille à {CHURCH.quartier}, {CHURCH.commune}, {CHURCH.city}.
            Le dimanche à 9h00 pour le culte dominical.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">
                Nous contacter <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="whatsapp">
              <a href={`https://wa.me/${CHURCH.whatsapp}`} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}