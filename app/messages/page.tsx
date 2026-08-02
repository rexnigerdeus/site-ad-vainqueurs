import type { Metadata } from "next";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { sermons } from "@/lib/data";
import { formatDateFr } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Messages & Prédications",
  description:
    "Cultes en direct et rediffusions du Temple des Vainqueurs — depuis notre chaîne YouTube.",
};

export default function MessagesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cultes en direct & rediffusions"
        title="Nourrissez votre âme"
        description="Retrouvez les derniers cultes en direct et en rediffusion du Temple des Vainqueurs, depuis notre chaîne YouTube."
      />

      {/* Liste des derniers lives */}
      <section className="bg-ivory py-12 text-night lg:py-20">
        <div className="container-section">
          <Reveal className="mb-8">
            <h2 className="font-display text-2xl tracking-tight-48 md:text-3xl">
              Derniers cultes
            </h2>
            <p className="mt-2 text-night/60">
              Les 5 dernières rediffusions depuis{" "}
              <a
                href="https://www.youtube.com/@advainqueurs/streams"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-gold-600 hover:underline"
              >
                notre chaîne YouTube
              </a>
            </p>
          </Reveal>
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sermons.map((s) => (
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
                        <Play className="h-12 w-12 text-gold/50" />
                      </div>
                    )}
                    <span className="absolute bottom-3 right-3 rounded-full bg-night/80 px-2.5 py-1 text-xs text-ivory">
                      {s.duration}
                    </span>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                      {s.theme}
                    </span>
                    <h3 className="mt-2 font-display text-xl leading-snug tracking-tight-48">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-night/60">
                      {formatDateFr(s.date)}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-600">
                      Regarder <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
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