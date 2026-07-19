import type { Metadata } from "next";
import { Heart, Smartphone } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { CHURCH } from "@/lib/church";

export const metadata: Metadata = {
  title: "Dons",
  description:
    "Soutenez le ministère du Temple des Vainqueurs par Wave ou Orange Money.",
};

export default function DonsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dons en ligne"
        title="Soutenez le ministère"
        description="Votre générosité permet à l'église de poursuivre son œuvre d'évangélisation, d'enseignement et d'entraide communautaire."
      />

      <section className="bg-night py-20 lg:py-28">
        <div className="container-prose space-y-8">
          <Reveal>
            <div className="rounded-6 border border-gold/20 bg-gold/5 p-8 text-center">
              <Heart className="mx-auto h-12 w-12 text-gold" />
              <p className="mt-4 font-display text-2xl tracking-tight-48 text-ivory">
                « Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte ; car Dieu aime celui qui donne avec joie. »
              </p>
              <p className="mt-3 text-sm text-ivory/60">2 Corinthiens 9:7</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl tracking-tight-48">Par Mobile Money</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-6 border border-white/10 bg-white/5 p-6">
                <Smartphone className="h-8 w-8 text-gold" />
                <h3 className="mt-4 font-display text-xl">Wave</h3>
                <p className="mt-2 text-2xl font-semibold tracking-tight-48 text-gold">
                  {CHURCH.donations.wave}
                </p>
              </div>
              <div className="rounded-6 border border-white/10 bg-white/5 p-6">
                <Smartphone className="h-8 w-8 text-gold" />
                <h3 className="mt-4 font-display text-xl">Orange Money</h3>
                <p className="mt-2 text-2xl font-semibold tracking-tight-48 text-gold">
                  {CHURCH.donations.orangeMoney}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-sm text-ivory/60">
              Un module de don en ligne sécurisé (carte bancaire + Mobile Money) sera bientôt disponible.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}