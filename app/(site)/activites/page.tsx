import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Calendar, Clock, MapPin, Images } from "lucide-react";
import { getUpcomingEvents, getAlbums, getWeeklyProgram, type Event, type Album, type WeeklyProgramItem } from "@/lib/sanity/queries";
import { formatDateFr } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Activités & Galerie",
  description:
    "Cultes hebdomadaires, étude biblique, veillées d'intercession, événements spéciaux et albums photos du Temple des Vainqueurs.",
};

const FALLBACK_PROGRAM: WeeklyProgramItem[] = [
  { _id: "w1", day: "Dimanche", time: "09h00", title: "Culte dominical", description: "Louange, adoration et prédication." },
  { _id: "w2", day: "Mercredi", time: "18h00", title: "Étude biblique", description: "Enseignement approfondi de la Parole." },
  { _id: "w3", day: "Vendredi", time: "18h00", title: "Veillée d'intercession", description: "Nuit de prière (dernier vendredi du mois)." },
  { _id: "w4", day: "Samedi", time: "15h00", title: "Jeunes vainqueurs", description: "Rassemblement des jeunes de l'église." },
];

export default async function ActivitesPage() {
  const [events, albums, weeklyProgram] = await Promise.all([
    getUpcomingEvents(6).catch(() => [] as Event[]),
    getAlbums().catch(() => [] as Album[]),
    getWeeklyProgram().catch(() => [] as WeeklyProgramItem[]),
  ]);

  const program = weeklyProgram.length ? weeklyProgram : FALLBACK_PROGRAM;
  return (
    <>
      <PageHeader
        eyebrow="Activités & Galerie"
        title="Nos cultes et rendez-vous"
        description="Retrouvez les programmes hebdomadaires, le calendrier des événements, les prochaines conventions et les albums photos de l'église."
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
                  <p className="text-sm text-night/70">{p.description}</p>
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
            {events.map((e) => (
              <StaggerItem key={e._id} className="glass-card rounded-6 p-6">
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

      {/* Galerie photos */}
      <section className="bg-ivory py-20 text-night lg:py-28">
        <div className="container-section">
          <Reveal className="mb-12">
            <h2 className="font-display text-3xl tracking-tight-48 md:text-4xl">
              Galerie — Moments de vie
            </h2>
            <p className="mt-3 text-night/60">
              Revivez les temps forts de l'église : cultes, baptêmes, conventions, camps de jeunes et événements communautaires.
            </p>
          </Reveal>
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <StaggerItem key={album._id}>
                <Link
                  href={`/galerie/${album.slug.current}`}
                  className="group relative block overflow-hidden rounded-6"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-night/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={album.cover}
                      alt={album.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-gold">
                      <Images className="h-3.5 w-3.5" /> {album.count} médias
                    </span>
                    <h3 className="mt-1 font-display text-xl leading-tight tracking-tight-48">
                      {album.title}
                    </h3>
                    <p className="mt-1 text-xs text-ivory/60">
                      {formatDateFr(album.date)}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}