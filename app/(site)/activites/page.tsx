import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { PenielSchedule } from "@/components/peniel/PenielSchedule";
import { ArrowRight, Clock, MapPin, Images } from "lucide-react";
import { getUpcomingEvents, getAlbums, getWeeklyProgram, getPageContent, type Event, type Album, type WeeklyProgramItem } from "@/lib/sanity/queries";
import { pageMetadata } from "@/lib/sanity/metadata";
import { formatDateFr } from "@/lib/utils";
import { REGULAR_PROGRAM } from "@/lib/church";
import { isPenielSeason, PENIEL } from "@/lib/peniel";

export function generateMetadata() {
  return pageMetadata("activities", "/activites", {
    title: "Activités & Galerie",
    description:
      "Cultes du dimanche, jeûne et prière, veillées, rencontres des jeunes, événements spéciaux et albums photos du Temple des Vainqueurs.",
  });
}

const WEEK_DAYS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

/** Minuscules, sans accents ni espaces en trop (pour comparer et trier). */
function normalize(text = "") {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’‘]/g, "'")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Rang dans la semaine (lundi = 0) ; « Premier dimanche du mois » compte comme dimanche. */
function dayRank(day: string) {
  const words = normalize(day).split(/[^a-z]+/);
  const index = WEEK_DAYS.findIndex((d) => words.includes(d));
  return index === -1 ? WEEK_DAYS.length : index;
}

/** Première heure trouvée, en minutes : « 7h00 », « 07h00 », « 07:00 » ou « 7h ». */
function timeRank(time: string) {
  const match = normalize(time).match(/(\d{1,2})\s*[h:]\s*(\d{2})?/);
  return match ? Number(match[1]) * 60 + Number(match[2] ?? 0) : Number.POSITIVE_INFINITY;
}

function mergeProgram(base: WeeklyProgramItem[], fromSanity: WeeklyProgramItem[]) {
  const byKey = new Map<string, WeeklyProgramItem>();
  for (const item of [...base, ...fromSanity]) {
    byKey.set(`${normalize(item.day)}|${normalize(item.title)}`, item);
  }
  return [...byKey.values()].sort(
    (a, b) => dayRank(a.day) - dayRank(b.day) || timeRank(a.time) - timeRank(b.time)
  );
}

export default async function ActivitesPage() {
  const [events, albums, weeklyProgram, content] = await Promise.all([
    getUpcomingEvents(6).catch(() => [] as Event[]),
    getAlbums().catch(() => [] as Album[]),
    getWeeklyProgram().catch(() => [] as WeeklyProgramItem[]),
    getPageContent("activities").catch(() => null),
  ]);

  // Pendant PENIEL, tout le mois suit le programme PENIEL ; ensuite, retour au programme habituel.
  const peniel = isPenielSeason();
  const program = mergeProgram(REGULAR_PROGRAM, weeklyProgram ?? []);
  const header = content?.header;
  return (
    <>
      <PageHeader
        eyebrow={header?.eyebrow || "Activités & Galerie"}
        title={header?.title || "Nos cultes et rendez-vous"}
        description={header?.description || "Retrouvez les programmes hebdomadaires, le calendrier des événements, les prochaines conventions et les albums photos de l'église."}
      />

      {peniel ? (
        <section className="grain relative overflow-hidden bg-peniel-sky py-20 text-white lg:py-28">
          <div className="orb -right-24 top-0 h-96 w-96 bg-peniel-cyan/40" />
          <div className="container-section relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="eyebrow text-peniel-amber">Novembre 2026 · PENIEL</p>
              <SplitReveal className="mt-4 font-condensed text-5xl uppercase leading-[0.92] tracking-wide sm:text-6xl">
                Le programme du mois
              </SplitReveal>
              <p className="mt-6 max-w-md text-lg text-white/85">
                {PENIEL.dates}, toute l&apos;église vit {PENIEL.name} : {PENIEL.tagline.toLowerCase()} autour
                du thème « {PENIEL.theme} » ({PENIEL.verse.reference}). Ce programme remplace les
                rendez-vous habituels.
              </p>
              <Link
                href="/peniel"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-peniel-fire px-7 py-4 font-bold text-white shadow-xl shadow-peniel-orange/30 transition-transform hover:scale-[1.03] active:scale-95"
              >
                Thème et sous-thèmes <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <PenielSchedule />
          </div>
        </section>
      ) : (
        <section className="bg-ivory py-20 text-night lg:py-28">
          <div className="container-section">
            <SplitReveal className="mb-12 font-display text-4xl uppercase md:text-5xl">
              Programme hebdomadaire
            </SplitReveal>
            <StaggerGroup className="grid gap-4 md:grid-cols-2">
              {program.map((p) => (
                <StaggerItem
                  key={p._id}
                  className="group flex flex-col gap-3 rounded-3xl border border-night/10 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl sm:flex-row sm:items-center"
                >
                  <div className="flex shrink-0 flex-col sm:w-36">
                    <span className="font-display text-xl uppercase text-gold-600">{p.day}</span>
                    <span className="flex items-center gap-1 text-sm text-night/60">
                      <Clock className="h-3.5 w-3.5" /> {p.time}
                    </span>
                  </div>
                  <div className="border-l-2 border-gold/40 pl-4 transition-colors group-hover:border-gold">
                    <h3 className="font-sans text-lg font-bold">{p.title}</h3>
                    <p className="text-sm text-night/70">{p.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      {/* Prochains événements (masqué s'il n'y en a aucun) */}
      {events.length > 0 && (
        <section className="bg-night py-20 lg:py-28">
          <div className="container-section">
            <SplitReveal className="mb-12 font-display text-4xl uppercase md:text-5xl">
              Prochains événements
            </SplitReveal>
            <StaggerGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {events.map((e) => (
                <StaggerItem key={e._id} className="glass-card rounded-3xl p-6 transition-colors hover:border-gold/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                      {e.category}
                    </span>
                    <time className="text-sm text-ivory/60">{formatDateFr(e.date)}</time>
                  </div>
                  <h3 className="mt-4 font-display text-2xl uppercase">{e.title}</h3>
                  <p className="mt-2 text-sm text-ivory/70">{e.description}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-ivory/70">
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
      )}

      {/* Galerie photos (masquée s'il n'y a aucun album) */}
      {albums.length > 0 && (
        <section className="bg-ivory py-20 text-night lg:py-28">
          <div className="container-section">
            <div className="mb-12">
              <SplitReveal className="font-display text-4xl uppercase md:text-5xl">
                Galerie — Moments de vie
              </SplitReveal>
              <p className="mt-3 text-night/60">
                Revivez les temps forts de l&apos;église : cultes, baptêmes, conventions, camps de jeunes et événements communautaires.
              </p>
            </div>
            <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {albums.map((album) => (
                <StaggerItem key={album._id}>
                  <Link
                    href={`/galerie/${album.slug.current}`}
                    className="group relative block overflow-hidden rounded-3xl"
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
                      <h3 className="mt-1 font-display text-xl uppercase leading-tight">
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
      )}
    </>
  );
}

