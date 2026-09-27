"use client";

import Link from "next/link";
import { ArrowRight, Images } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import type { Album } from "@/lib/sanity/queries";
import { formatDateFr } from "@/lib/utils";

export function GalleryTeaser({ albums }: { albums: Album[] }) {
  if (!albums || albums.length === 0) return null;
  return (
    <section className="bg-night py-20 lg:py-28">
      <div className="container-section">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold">
              <Images className="h-4 w-4" /> Galerie
            </p>
            <h2 className="font-display text-3xl tracking-tight-48 md:text-5xl">
              Moments de vie
            </h2>
          </div>
          <Link
            href="/activites"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ivory hover:text-gold"
          >
            Voir tous les albums <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <StaggerItem key={album._id}>
              <Link
                href={`/galerie/${album.slug.current}`}
                className="group relative block overflow-hidden rounded-6"
              >
                <div className="aspect-[4/3] overflow-hidden bg-night/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={album.cover}
                    alt={album.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="text-xs font-medium text-gold">
                    {album.count} photos
                  </span>
                  <h3 className="mt-1 font-display text-xl leading-tight tracking-tight-48 text-ivory">
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
  );
}