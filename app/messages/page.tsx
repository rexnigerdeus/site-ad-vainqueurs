import type { Metadata } from "next";
import Link from "next/link";
import { Play, Headphones, FileText, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { sermons } from "@/lib/data";
import { formatDateFr } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Messages & Prédications",
  description:
    "Bibliothèque de prédications et enseignements du Temple des Vainqueurs — audio, vidéo et texte.",
};

const themes = ["Tous", "Foi", "Prière", "Amour", "Promesses", "Salut", "Combat"];

export default function MessagesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Prédications & enseignements"
        title="Nourrissez votre âme"
        description="Retrouvez les prédications du Temple des Vainqueurs en audio, vidéo et texte. Filtrez par thème ou par date."
      />

      {/* Filtres (mock statique pour l'instant) */}
      <section className="bg-ivory py-12 text-night">
        <div className="container-section flex flex-wrap gap-2">
          {themes.map((t, i) => (
            <span
              key={t}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                i === 0
                  ? "bg-gold text-night"
                  : "border border-night/15 text-night/70 hover:border-gold hover:text-gold-600"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Liste */}
      <section className="bg-ivory pb-20 text-night lg:pb-28">
        <div className="container-section">
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sermons.map((s) => {
              const Icon = s.type === "video" ? Play : s.type === "audio" ? Headphones : FileText;
              return (
                <StaggerItem key={s.id}>
                  <Link
                    href={`/messages/${s.slug}`}
                    className="group block overflow-hidden rounded-6 border border-night/10 bg-white transition-all hover:shadow-xl"
                  >
                    <div className="relative aspect-video overflow-hidden bg-night/10">
                      {s.youtubeId ? (
                        <img
                          src={`https://img.youtube.com/vi/${s.youtubeId}/hqdefault.jpg`}
                          alt={s.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="grid h-full w-full place-items-center bg-night-gradient">
                          <Icon className="h-12 w-12 text-gold/50" />
                        </div>
                      )}
                      <span className="absolute bottom-3 right-3 rounded-full bg-night/80 px-2.5 py-1 text-xs text-ivory">
                        {s.duration}
                      </span>
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                        {s.theme} · {s.type}
                      </span>
                      <h3 className="mt-2 font-display text-xl leading-snug tracking-tight-48">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm text-night/60">
                        {s.preacher} · {formatDateFr(s.date)}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-600">
                        Écouter <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}