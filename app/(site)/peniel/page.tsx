import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { PenielCountdown } from "@/components/sections/PenielCountdown";
import { Reveal } from "@/components/motion/Reveal";
import { Flame, Calendar, Clock, MapPin, BookOpen, Users } from "lucide-react";
import { CHURCH } from "@/lib/church";

export const metadata: Metadata = {
  title: "PENIEL 2026",
  description:
    "PENIEL 2026 — Mois de jeûne et de prière du Temple des Vainqueurs. Du 1er au 30 novembre 2026.",
};

const programme = [
  { day: "1er Nov.", title: "Culte d'ouverture", desc: "Lancement du mois de jeûne et d'intercession.", time: "18h00" },
  { day: "Chaque jour", title: "Temps de prière", desc: "Intercession personnelle et communautaire.", time: "05h30 & 18h00" },
  { day: "Tous les vendredis", title: "Veillée d'intercession", desc: "Nuit de prière communautaire.", time: "18h00" },
  { day: "30 Nov.", title: "Culte d'action de grâces", desc: "Clôture du mois de jeûne et de prière.", time: "18h00" },
];

const versements = [
  {
    ref: "Genèse 32:30",
    text: "« Jacob appela ce lieu du nom de Peniel : J'ai vu Dieu face à face, et mon âme a été délivrée. »",
  },
  {
    ref: "Matthieu 17:21",
    text: "« Cette sorte de démon ne sort que par la prière et le jeûne. »",
  },
  {
    ref: "Ésaïe 58:6",
    text: "« Voici le jeûne que je préfère : dénouer les chaînes de la méchanceté, détacher les liens du joug. »",
  },
];

export default function PenielPage() {
  return (
    <>
      <PageHeader
        eyebrow="Événement spécial"
        title="PENIEL 2026"
        description="Maison de Dieu, porte du ciel. Un mois entier consacré au jeûne et à la prière, du 1er au 30 novembre 2026."
      />

      {/* Compte à rebours */}
      <PenielCountdown />

      {/* Présentation */}
      <section className="bg-ivory py-20 text-night lg:py-28">
        <div className="container-section grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-600">
              <Flame className="h-3.5 w-3.5" />
              Vision
            </span>
            <h2 className="mt-5 font-display text-3xl leading-tight tracking-tight-48 md:text-4xl">
              Le combat spirituel d'un peuple en prière
            </h2>
            <p className="mt-6 text-lg text-night/70">
              PENIEL 2026 est un appel à la communauté du Temple des Vainqueurs à
              s'engager dans un mois complet de jeûne et de prière. À l'image de
              Jacob qui lutta avec l'ange et vit Dieu face à face, nous voulons
              entrer dans une dimension de communion et de percée spirituelle.
            </p>
            <p className="mt-4 text-lg text-night/70">
              Chaque jour, des temps de prière sont organisés. Chaque vendredi,
              une veillée d'intercession réunit toute l'assemblée pour un combat
              spirituel commun.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="grid gap-4">
            {versements.map((v) => (
              <div
                key={v.ref}
                className="rounded-6 border border-gold/20 bg-white p-6"
              >
                <p className="font-display text-lg italic leading-relaxed text-night">
                  {v.text}
                </p>
                <span className="mt-3 block text-sm font-semibold uppercase tracking-wider text-gold-600">
                  {v.ref}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Programme */}
      <section className="bg-night py-20 lg:py-28">
        <div className="container-section">
          <Reveal className="mb-12 text-center">
            <h2 className="font-display text-3xl tracking-tight-48 md:text-4xl">
              Programme du mois
            </h2>
            <p className="mt-3 text-ivory/60">
              Du 1er au 30 novembre 2026 — {CHURCH.address}
            </p>
          </Reveal>

          <div className="mx-auto max-w-3xl space-y-4">
            {programme.map((p) => (
              <Reveal key={p.day}>
                <div className="flex flex-col gap-3 rounded-6 border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-center">
                  <div className="flex w-40 shrink-0 flex-col">
                    <span className="font-display text-xl text-gold">{p.day}</span>
                    <span className="flex items-center gap-1 text-sm text-ivory/60">
                      <Clock className="h-3.5 w-3.5" /> {p.time}
                    </span>
                  </div>
                  <div className="border-l-2 border-gold/40 pl-4">
                    <h3 className="font-display text-lg tracking-tight-48">{p.title}</h3>
                    <p className="text-sm text-ivory/70">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Infos pratiques */}
      <section className="bg-gold-gradient py-16 text-night">
        <div className="container-section grid gap-6 sm:grid-cols-3">
          <Reveal className="text-center">
            <Calendar className="mx-auto h-8 w-8" />
            <h3 className="mt-3 font-display text-xl tracking-tight-48">Dates</h3>
            <p className="text-sm text-night/70">1er — 30 Novembre 2026</p>
          </Reveal>
          <Reveal className="text-center" delay={0.1}>
            <MapPin className="mx-auto h-8 w-8" />
            <h3 className="mt-3 font-display text-xl tracking-tight-48">Lieu</h3>
            <p className="text-sm text-night/70">{CHURCH.address}</p>
          </Reveal>
          <Reveal className="text-center" delay={0.2}>
            <Users className="mx-auto h-8 w-8" />
            <h3 className="mt-3 font-display text-xl tracking-tight-48">Pour qui ?</h3>
            <p className="text-sm text-night/70">Toute la communauté</p>
          </Reveal>
        </div>
      </section>

      {/* Versets & ressources */}
      <section className="bg-ivory py-20 text-night lg:py-28">
        <div className="container-section">
          <Reveal className="mb-10 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-gold-600" />
            <h2 className="mt-3 font-display text-3xl tracking-tight-48 md:text-4xl">
              Préparez votre cœur
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-night/70">
              Le jeûne et la prière sont des armes spirituelles puissantes.
              Préparez votre esprit, votre corps et votre agenda pour vivre un mois
              d'intimité profonde avec le Seigneur.
            </p>
          </Reveal>
          <div className="mx-auto max-w-2xl rounded-6 border border-night/10 bg-white p-8 text-center">
            <p className="font-display text-2xl italic leading-relaxed">
              « Cherchez l'Éternel pendant qu'il se trouve ; invoquez-le pendant
              qu'il est près. »
            </p>
            <span className="mt-4 block text-sm font-semibold uppercase tracking-wider text-gold-600">
              Ésaïe 55:6
            </span>
          </div>
        </div>
      </section>
    </>
  );
}