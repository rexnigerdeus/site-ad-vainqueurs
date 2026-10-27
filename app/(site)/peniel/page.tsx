import Image from "next/image";
import { ArrowDown, Calendar, Download, MapPin, MessageCircle, Navigation, Users } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { PenielCountdown } from "@/components/sections/PenielCountdown";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { ThemeTitle } from "@/components/peniel/ThemeTitle";
import { SubThemes } from "@/components/peniel/SubThemes";
import { PenielSchedule } from "@/components/peniel/PenielSchedule";
import { PenielMarquee } from "@/components/peniel/PenielMarquee";
import { DatesMark } from "@/components/peniel/DatesMark";
import { ShareButton } from "@/components/peniel/ShareButton";
import { PosterFloat } from "@/components/peniel/PosterFloat";
import { getSettings } from "@/lib/sanity/settings";
import { getPageContent, type PageContent } from "@/lib/sanity/queries";
import { buildMetadata, jsonLdPeniel, penielShare } from "@/lib/site";
import { PENIEL, penielPhase } from "@/lib/peniel";

// L'aperçu de partage est toujours celui de PENIEL (image « lancement » jusqu'au 31 octobre).
export async function generateMetadata() {
  const content = await getPageContent("peniel").catch(() => null);
  return buildMetadata({
    title: content?.seo?.title || "PENIEL 2026 — Marche devant ma face et sois intègre",
    description:
      content?.seo?.description ||
      "PENIEL 2026 — 4 semaines de jeûne et de prière au Temple des Vainqueurs, du 1er au 29 novembre 2026. Thème : « Marche devant ma face et sois intègre » (Genèse 17:1).",
    path: "/peniel",
    share: penielShare(),
    image: penielShare().image,
  });
}

const AFFICHES = [
  {
    src: "/peniel/peniel-2026-affiche-principale.jpg",
    title: "L'affiche officielle",
    alt: "Affiche PENIEL 2026 : « Marche devant ma face et sois intègre » (Genèse 17:1), 4 semaines de jeûne et de prière du 1er au 29 novembre 2026",
  },
  {
    src: "/peniel/peniel-2026-sous-themes.jpg",
    title: "Les sous-thèmes",
    alt: "Affiche des quatre sous-thèmes de PENIEL 2026",
  },
  {
    src: "/peniel/peniel-2026-programme.jpg",
    title: "Le programme",
    alt: "Affiche du programme hebdomadaire de PENIEL 2026 : horaires de prière du lundi au dimanche et veillée de prière du 27 novembre 2026",
  },
];

const FALLBACK_VERSES = [
  { reference: "Genèse 32:30", text: "Jacob appela ce lieu du nom de Peniel : J'ai vu Dieu face à face, et mon âme a été délivrée." },
  { reference: "Matthieu 17:21", text: "Cette sorte de démon ne sort que par la prière et le jeûne." },
  { reference: "Ésaïe 58:6", text: "Voici le jeûne que je préfère : dénouer les chaînes de la méchanceté, détacher les liens du joug." },
];

export default async function PenielPage() {
  const [settings, content] = await Promise.all([
    getSettings(),
    getPageContent("peniel").catch(() => null as PageContent | null),
  ]);

  const verses = content?.verses?.length ? content.verses : FALLBACK_VERSES;
  const dates = content?.eventInfo?.dates || "Du 1er au 29 novembre 2026";
  const audience = content?.eventInfo?.audience || "Toute la communauté, et les visiteurs sont les bienvenus";
  const intro =
    content?.header?.description ||
    "Quatre semaines pour marcher devant la face de Dieu : jeûne, prière et Parole, chaque jour au temple, du 1er au 29 novembre.";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.mapQuery)}`;
  const shareText = `${PENIEL.name} — « ${PENIEL.theme} » (${PENIEL.verse.reference}). ${PENIEL.tagline}, ${PENIEL.dates.toLowerCase()}.`;

  return (
    <div className="bg-peniel-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPeniel) }} />
      {/* En-tête : le thème, composé comme l'affiche */}
      <section className="grain relative overflow-hidden bg-peniel-sky pb-24 pt-10 text-white sm:pb-28 lg:pb-32 lg:pt-16">
        <Image
          src="/peniel/peniel-2026-affiche-principale.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover opacity-20 blur-2xl"
        />
        <div className="orb -right-20 -top-10 h-96 w-96 bg-peniel-cyan/50" />
        <div className="orb -bottom-20 left-1/4 h-80 w-80 bg-peniel-orange/30 [animation-delay:-8s]" />

        <div className="container-section relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80 sm:text-xs">
              Église des AD de Vridi-Cité / Petit Bassam · Temple des Vainqueurs
            </p>
            <p aria-hidden="true" className="mt-2 text-xs font-medium uppercase tracking-[1em] text-white/60">
              Présente
            </p>

            <h1 className="mt-6 flex items-end gap-3 leading-none">
              <span className="relative inline-flex items-center">
                <span aria-hidden="true" className="absolute -left-3 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-peniel-fire sm:h-24 sm:w-24" />
                <span className="relative font-script text-7xl text-white drop-shadow-lg sm:text-8xl">Peniel</span>
              </span>
              <span className="text-fire pb-2 font-sans text-3xl font-black italic sm:text-4xl">2026</span>
              <span className="sr-only"> — {PENIEL.theme}</span>
            </h1>

            <ThemeTitle className="mt-10 text-[22vw] sm:text-[8.5rem] lg:text-[7.5rem] xl:text-[8.5rem] 2.5xl:text-[10rem]" />

            <p className="mt-8 max-w-xl text-lg text-white/85 sm:text-xl">{intro}</p>

            <DatesMark className="mt-8" />

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#programme"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-peniel-fire px-7 py-4 font-bold text-white shadow-xl shadow-peniel-orange/30 transition-transform hover:scale-[1.03] active:scale-95"
              >
                Voir le programme <ArrowDown className="h-4 w-4" />
              </a>
              <ShareButton
                title={PENIEL.name}
                text={shareText}
                path="/peniel"
                className="rounded-full border border-white/30 px-7 py-4 font-semibold text-white transition-colors hover:bg-white/10"
              />
            </div>
          </div>

          <PosterFloat
            src="/peniel/peniel-2026-affiche-principale.jpg"
            alt={AFFICHES[0].alt}
            className="mx-auto hidden w-full max-w-sm lg:block"
          />
        </div>
      </section>

      {/* « Coming soon » réduit : disparaît au lancement, le samedi 31 octobre */}
      {penielPhase() === "teaser" && <PenielCountdown variant="compact" />}

      {/* Bandeau légèrement incliné ; le conteneur coupe ce qui dépasse sur les côtés */}
      <div className="overflow-hidden pb-2 pt-10 sm:pt-14">
        <PenielMarquee className="-mx-2 -rotate-1" />
      </div>

      {/* Vision */}
      <section className="relative bg-white py-20 text-peniel-ink lg:py-28">
        <div className="container-section grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-peniel-orange">Pourquoi PENIEL ?</p>
            <SplitReveal className="mt-4 font-condensed text-5xl uppercase leading-[0.95] tracking-wide sm:text-6xl">
              {content?.heroTitle || "Face à face avec Dieu"}
            </SplitReveal>
            <Reveal>
              {content?.body?.length ? (
                <div className="mt-6 space-y-4 text-lg text-peniel-ink/75">
                  <PortableText value={content.body} />
                </div>
              ) : (
                <div className="mt-6 space-y-4 text-lg text-peniel-ink/75">
                  <p>
                    Peniel, c&apos;est le lieu où Jacob a lutté jusqu&apos;à l&apos;aube et
                    où il a vu Dieu face à face. Il en est reparti transformé, avec un
                    nouveau nom et une nouvelle marche.
                  </p>
                  <p>
                    Pendant 4 semaines, le Temple des Vainqueurs se met à part dans le
                    jeûne et la prière autour d&apos;un appel : « {PENIEL.theme} ». Chaque
                    jour, des temps de prière sont organisés au temple, et le vendredi
                    27 novembre, une veillée réunit toute l&apos;assemblée.
                  </p>
                </div>
              )}
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <figure className="relative overflow-hidden rounded-[2rem] bg-peniel-sky p-8 text-white shadow-2xl shadow-peniel-indigo/30 sm:p-12">
              <div className="orb -right-10 -top-10 h-48 w-48 bg-peniel-orange/40" />
              <span aria-hidden="true" className="absolute -top-4 left-4 font-condensed text-[10rem] leading-none text-white/15">
                “
              </span>
              <blockquote className="relative font-sans text-2xl font-bold italic leading-snug sm:text-3xl">
                {PENIEL.verse.text}
              </blockquote>
              <figcaption className="relative mt-6">
                <span className="peniel-tag text-sm">{PENIEL.verse.reference}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Sous-thèmes */}
      <section className="grain relative overflow-hidden bg-peniel-sky py-20 text-white lg:py-28">
        <div className="orb -left-24 top-1/3 h-96 w-96 bg-peniel-cyan/30" />
        <div className="container-section relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow text-peniel-amber">Une semaine, un message</p>
            <SplitReveal className="mt-4 font-condensed text-6xl uppercase leading-[0.9] tracking-wide sm:text-7xl">
              Les sous-thèmes
            </SplitReveal>
            <p className="mt-6 max-w-md text-lg text-white/80">
              Chaque semaine de PENIEL porte une parole. Notez-la, méditez-la, priez-la
              avec toute l&apos;église.
            </p>
          </div>
          <SubThemes />
        </div>
      </section>

      {/* Programme */}
      <section id="programme" className="relative scroll-mt-20 overflow-hidden bg-peniel-ink py-20 text-white lg:py-28">
        <div className="orb right-0 top-0 h-96 w-96 bg-peniel-royal/50" />
        <div className="container-section relative">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="inline-block -rotate-2 bg-white px-6 py-3 font-condensed text-5xl uppercase italic leading-[0.9] text-peniel-red shadow-2xl sm:px-10 sm:text-7xl">
                Programme
                <br />
                hebdomadaire
              </h2>
              <p className="mx-auto mt-8 max-w-xl text-lg text-white/80">
                {dates}, ce programme remplace les rendez-vous habituels de l&apos;église.
                Venez à l&apos;heure qui vous convient : chaque temps de prière compte.
              </p>
            </div>
            <PenielSchedule className="mt-12" />
          </div>
        </div>
      </section>

      {/* Infos pratiques */}
      <section className="relative bg-peniel-fire py-16 text-peniel-ink">
        <StaggerGroup className="container-section grid gap-4 sm:grid-cols-3">
          <StaggerItem className="rounded-3xl bg-white/90 p-6 shadow-xl shadow-peniel-ink/10">
            <Calendar className="h-8 w-8 text-peniel-orange" />
            <h3 className="mt-3 font-condensed text-3xl tracking-wide">Dates</h3>
            <p className="text-peniel-ink/75">{dates}</p>
            <p className="text-sm text-peniel-ink/60">Lancement le samedi 31 octobre</p>
          </StaggerItem>
          <StaggerItem className="rounded-3xl bg-white/90 p-6 shadow-xl shadow-peniel-ink/10">
            <MapPin className="h-8 w-8 text-peniel-orange" />
            <h3 className="mt-3 font-condensed text-3xl tracking-wide">Lieu</h3>
            <p className="text-peniel-ink/75">{PENIEL.location}</p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-peniel-royal hover:underline"
            >
              <Navigation className="h-4 w-4" /> Itinéraire
            </a>
          </StaggerItem>
          <StaggerItem className="rounded-3xl bg-white/90 p-6 shadow-xl shadow-peniel-ink/10">
            <Users className="h-8 w-8 text-peniel-orange" />
            <h3 className="mt-3 font-condensed text-3xl tracking-wide">Pour qui ?</h3>
            <p className="text-peniel-ink/75">{audience}</p>
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-peniel-royal hover:underline"
            >
              <MessageCircle className="h-4 w-4" /> Une question ? WhatsApp
            </a>
          </StaggerItem>
        </StaggerGroup>
      </section>

      {/* Affiches */}
      <section className="relative overflow-hidden bg-peniel-deep py-20 text-white lg:py-28">
        <div className="container-section">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-peniel-amber">À partager sans modération</p>
              <SplitReveal className="mt-4 font-condensed text-5xl uppercase leading-[0.9] tracking-wide sm:text-6xl">
                Les affiches
              </SplitReveal>
            </div>
            <ShareButton
              title={PENIEL.name}
              text={shareText}
              path="/peniel"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-peniel-deep transition-transform hover:scale-105"
            />
          </div>
        </div>
        {/* Défilement horizontal sur téléphone, 3 colonnes au-delà */}
        <StaggerGroup className="snap-carousel mt-10 px-4 sm:container-section sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible">
          {AFFICHES.map((a) => (
            <StaggerItem key={a.src} className="w-[78vw] max-w-xs sm:w-auto sm:max-w-none">
              <a
                href={a.src}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-3xl border border-white/10 bg-peniel-ink shadow-2xl transition-transform duration-500 hover:-translate-y-2 hover:rotate-1"
              >
                <ParallaxImage className="aspect-[1131/1600]" amount={8}>
                  <Image
                    src={a.src}
                    alt={a.alt}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 33vw, 78vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </ParallaxImage>
                <span className="flex items-center justify-between px-5 py-4 text-sm font-semibold">
                  {a.title}
                  <Download className="h-4 w-4 text-peniel-amber" />
                </span>
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Préparez votre cœur */}
      <section className="bg-white py-20 text-peniel-ink lg:py-28">
        <div className="container-section">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center text-peniel-orange">Préparez votre cœur</p>
            <SplitReveal className="mt-4 font-condensed text-5xl uppercase leading-[0.95] tracking-wide sm:text-6xl">
              Entrer dans le jeûne
            </SplitReveal>
            <p className="mt-5 text-lg text-peniel-ink/70">
              Le jeûne et la prière sont des armes spirituelles puissantes. Préparez votre
              esprit, votre corps et votre agenda pour vivre 4 semaines d&apos;intimité
              profonde avec le Seigneur.
            </p>
          </div>
          <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-3">
            {verses.map((v) => (
              <StaggerItem
                key={v.reference}
                className="flex flex-col justify-between rounded-3xl border border-peniel-indigo/10 bg-gradient-to-br from-white to-[#F1F0FF] p-7 transition-shadow hover:shadow-xl hover:shadow-peniel-indigo/10"
              >
                <p className="font-sans text-lg italic leading-relaxed">« {v.text} »</p>
                <span className="mt-5 text-sm font-bold uppercase tracking-wider text-peniel-orange">{v.reference}</span>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal className="mx-auto mt-12 max-w-2xl text-center">
            <p className="font-sans text-2xl font-bold italic leading-snug sm:text-3xl">
              « {content?.quote?.text || "Cherchez l'Éternel pendant qu'il se trouve ; invoquez-le pendant qu'il est près."} »
            </p>
            <span className="peniel-tag mt-5 text-sm">{content?.quote?.reference || "Ésaïe 55:6"}</span>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
