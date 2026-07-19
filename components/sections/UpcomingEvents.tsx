"use client";

import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { upcomingEvents } from "@/lib/data";
import { formatDateFr } from "@/lib/utils";

const categoryColor: Record<string, string> = {
  culte: "bg-gold/20 text-gold border-gold/30",
  conference: "bg-bordeaux/20 text-bordeaux-400 border-bordeaux/30",
  jeunesse: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  special: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

const categoryLabel: Record<string, string> = {
  culte: "Culte",
  conference: "Conférence",
  jeunesse: "Jeunesse",
  femmes: "Femmes",
  hommes: "Hommes",
  special: "Événement",
};

export function UpcomingEvents() {
  return (
    <section className="bg-ivory py-20 text-night lg:py-28">
      <div className="container-section">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-600">
              <Calendar className="h-4 w-4" /> Prochains événements
            </p>
            <h2 className="font-display text-3xl tracking-tight-48 md:text-5xl">
              Réservez vos dates
            </h2>
          </div>
          <Link
            href="/activites"
            className="inline-flex items-center gap-2 text-sm font-semibold text-night hover:text-gold-600"
          >
            Tout le calendrier <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        {/* Carrousel scroll-snap natif (façon Artlist) */}
        <StaggerGroup className="snap-carousel">
          {upcomingEvents.map((event) => (
            <StaggerItem key={event.id}>
              <Card className="group w-[300px] border-night/10 bg-white p-6 transition-all hover:shadow-xl md:w-[360px]">
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${categoryColor[event.category]}`}
                  >
                    {categoryLabel[event.category]}
                  </span>
                  <time className="text-sm font-medium text-night/50">
                    {formatDateFr(event.date)}
                  </time>
                </div>

                <h3 className="mt-5 font-display text-2xl tracking-tight-48">
                  {event.title}
                </h3>
                <p className="mt-3 text-sm text-night/70">{event.description}</p>

                <div className="mt-5 flex items-center justify-between border-t border-night/5 pt-4 text-sm">
                  <span className="font-semibold text-gold-600">{event.time}</span>
                  <span className="text-night/60">{event.location}</span>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}