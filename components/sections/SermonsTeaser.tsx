"use client";

import { Play, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import type { Sermon } from "@/lib/sanity/queries";
import { formatDateFr } from "@/lib/utils";

function SermonCard({ sermon }: { sermon: Sermon }) {
  return (
    <Card className="group overflow-hidden border-white/10 bg-night/40 p-0 transition-all hover:border-gold/40 hover:bg-night/60">
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
        <div className="absolute inset-0 grid place-items-center bg-night/40 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-gradient text-night">
            <Play className="h-6 w-6" />
          </span>
        </div>
        <span className="absolute bottom-3 right-3 rounded-full bg-night/80 px-2.5 py-1 text-xs text-ivory backdrop-blur">
          {sermon.duration}
        </span>
      </div>

      <div className="p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-gold">
          {sermon.theme}
        </span>
        <h3 className="mt-2 font-display text-xl leading-snug tracking-tight-48">
          {sermon.title}
        </h3>
        <p className="mt-2 text-sm text-ivory/60">
          {sermon.preacher} · {formatDateFr(sermon.date)}
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
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-600">
              Cultes en direct & rediffusions
            </p>
            <h2 className="font-display text-3xl tracking-tight-48 md:text-5xl">
              Nourrissez votre âme
            </h2>
          </div>
          <Link
            href="/messages"
            className="inline-flex items-center gap-2 text-sm font-semibold text-night hover:text-gold-600"
          >
            Toutes les prédications <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sermons.map((s) => (
            <StaggerItem key={s._id}>
              <Link href={`/messages/${s.slug.current}`}>
                <SermonCard sermon={s} />
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}