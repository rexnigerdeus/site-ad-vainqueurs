"use client";

import { Play, Headphones, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { sermons, type Sermon } from "@/lib/data";
import { formatDateFr } from "@/lib/utils";

const iconForType = {
  video: Play,
  audio: Headphones,
  texte: FileText,
};

function SermonCard({ sermon }: { sermon: Sermon }) {
  const Icon = iconForType[sermon.type];
  return (
    <Card className="group overflow-hidden border-white/10 bg-night/40 p-0 transition-all hover:border-gold/40 hover:bg-night/60">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-night/60">
        {sermon.youtubeId ? (
          <img
            src={`https://img.youtube.com/vi/${sermon.youtubeId}/hqdefault.jpg`}
            alt={sermon.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-night-gradient">
            <Icon className="h-12 w-12 text-gold/50" />
          </div>
        )}
        <div className="absolute inset-0 grid place-items-center bg-night/40 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-gradient text-night">
            <Icon className="h-6 w-6" />
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

export function SermonsTeaser() {
  const videoSermons = sermons.filter((s) => s.type === "video").slice(0, 2);
  const audioSermons = sermons.filter((s) => s.type === "audio").slice(0, 2);
  const textSermons = sermons.filter((s) => s.type === "texte").slice(0, 2);

  return (
    <section className="bg-ivory py-20 text-night lg:py-28">
      <div className="container-section">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-600">
              Prédications & enseignements
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

        <Tabs defaultValue="video">
          <TabsList>
            <TabsTrigger value="video">
              <Play className="mr-1.5 h-4 w-4" /> Vidéos
            </TabsTrigger>
            <TabsTrigger value="audio">
              <Headphones className="mr-1.5 h-4 w-4" /> Audio
            </TabsTrigger>
            <TabsTrigger value="texte">
              <FileText className="mr-1.5 h-4 w-4" /> Textes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="video">
            <StaggerGroup className="grid gap-6 sm:grid-cols-2">
              {videoSermons.map((s) => (
                <StaggerItem key={s.id}>
                  <SermonCard sermon={s} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </TabsContent>

          <TabsContent value="audio">
            <StaggerGroup className="grid gap-6 sm:grid-cols-2">
              {audioSermons.map((s) => (
                <StaggerItem key={s.id}>
                  <SermonCard sermon={s} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </TabsContent>

          <TabsContent value="texte">
            <StaggerGroup className="grid gap-6 sm:grid-cols-2">
              {textSermons.map((s) => (
                <StaggerItem key={s.id}>
                  <SermonCard sermon={s} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}