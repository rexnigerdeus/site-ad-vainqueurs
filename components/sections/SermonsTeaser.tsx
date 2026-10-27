"use client";

import { Play, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import type { Sermon } from "@/lib/sanity/queries";
import { formatDateFr } from "@/lib/utils";

function SermonCard({ sermon }: { sermon: Sermon }) {
  return (
    <Card className="group h-full overflow-hidden rounded-3xl border-night/10 bg-night p-0 text-ivory transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-night/30">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-night/60">
        {sermon.thumbnail || sermon.youtubeId ? (
          <img
            src={sermon.thumbnail || `https://img.youtube.com/vi/${sermon.youtubeId}/hqdefault.jpg`}
            alt={sermon.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-night-gradient">
            <Play className="h-12 w-12 text-gold/50" />
          </div>
        )}
        <div className="absolute inset-0 grid place-items-center bg-night/30 transition-colors group-hover:bg-night/50">
          <span className="grid h-14 w-14 scale-90 place-items-center rounded-full bg-gold-gradient text-night shadow-xl transition-transform duration-300 group-hover:scale-110">
            <Play className="h-6 w-6" />
          </span>
        </div>
        {sermon.duration && (
          <span className="absolute bottom-3 right-3 rounded-full bg-night/80 px-2.5 py-1 text-xs text-ivory backdrop-blur">
            {sermon.duration}
          </span>
        )}
      </div>

      <div className="p-5">
        {sermon.theme && (
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gold">
            {sermon.theme}
          </span>
        )}
        <h3 className="line-clamp-3 font-sans text-base font-bold leading-snug">
          {sermon.title}
        </h3>
        <p className="mt-2 text-sm text-ivory/60">
          {[sermon.preacher, formatDateFr(sermon.date)].filter(Boolean).join(" · ")}
        </p>
      </div>
    </Card>
  );
}

export function SermonsTeaser({ sermons }: { sermons: Sermon[] }) {
  if (!sermons || sermons.length === 0) return null;

  return (
    <section className="bg-ivory py-20 text-night lg:py-28">
      <div className="container-section">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4 text-gold-600">Cultes en direct & rediffusions</p>
            <SplitReveal className="font-display text-4xl uppercase leading-[0.95] md:text-6xl">
              Nourrissez votre âme
            </SplitReveal>
          </div>
          <Reveal>
          <Link
            href="/messages"
            className="inline-flex items-center gap-2 text-sm font-semibold text-night hover:text-gold-600"
          >
            Toutes les prédications <ArrowRight className="h-4 w-4" />
          </Link>
          </Reveal>
        </div>

        {/* Carrousel tactile sur téléphone, grille au-delà */}
        <StaggerGroup className="snap-carousel -mx-4 px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {sermons.map((s) => (
            <StaggerItem key={s._id} className="w-[80vw] max-w-sm sm:w-auto sm:max-w-none">
              <Link href={`/messages/${s.slug.current}`} className="block h-full">
                <SermonCard sermon={s} />
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}