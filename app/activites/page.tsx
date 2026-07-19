import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Calendar, Clock, MapPin } from "lucide-react";
import { upcomingEvents } from "@/lib/data";
import { formatDateFr } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Activités & Programmes",
  description:
    "Cultes hebdomadaires, étude biblique, veillées d'intercession et événements spéciaux du Temple des Vainqueurs.",
};

const weeklyProgram = [
  { day: "Dimanche", time: "09h00", title: "Culte dominical", desc: "Louange, adoration et prédication." },
  { day: "Mercredi", time: "18h00", title: "Étude biblique", desc: "Enseignement approfondi de la Parole." },
  { day: "Vendredi", time: "18h00", title: "Veillée d'intercession", desc: "Nuit de prière (dernier vendredi du mois)." },
  { day: "Samedi", time: "15h00", title: "Jeunes vainqueurs", desc: "Rassemblement des jeunes de l'église." },
];

export default function ActivitesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Activités & Programmes"
        title="Nos cultes et rendez-vous"
        description="Retrouvez les programmes hebdomadaires, le calendrier des événements et les prochaines conventions de l'église."
      />

      {/* Programme hebdo */}
      <section className="bg-ivory py-20 text-night lg:py-28">
        <div className="container-section">
          <Reveal className="mb-12">
            <h2 className="font-display text-3xl tracking-tight-48 md:text-4xl">
              Programme hebdomadaire
            </h2>
          </Reveal>
          <StaggerGroup className="grid gap-4 md:grid-cols-2">
            {weeklyProgram.map((p) => (
              <StaggerItem
                key={p.title}
                className="flex flex-col gap-3 rounded-6 border border-night/10 bg-white p-6 sm:flex-row sm:items-center"
              >
                <div className="flex w-32 shrink-0 flex-col">
                  <span className="font-display text-xl text-gold-600">{p.day}</span>
                  <span className="flex items-center gap-1 text-sm text-night/60">
                    <Clock className="h-3.5 w-3.5" /> {p.time}
                  </span>
                </div>
                <div className="border-l-2 border-gold/40 pl-4">
                  <h3 className="font-display text-lg tracking-tight-48">{p.title}</h3>
                  <p className="text-sm text-night/70">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Prochains événements */}
      <section className="bg-night py-20 lg:py-28">
        <div className="container-section">
          <Reveal className="mb-12">
            <h2 className="font-display text-3xl tracking-tight-48 md:text-4xl">
              Prochains événements
            </h2>
          </Reveal>
          <StaggerGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((e) => (
              <StaggerItem key={e.id} className="glass-card rounded-6 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                    {e.category}
                  </span>
                  <time className="text-sm text-ivory/60">{formatDateFr(e.date)}</time>
                </div>
                <h3 className="mt-4 font-display text-2xl tracking-tight-48">{e.title}</h3>
                <p className="mt-2 text-sm text-ivory/70">{e.description}</p>
                <div className="mt-5 flex items-center gap-3 text-sm text-ivory/70">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gold" /> {e.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gold" /> {e.location}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}