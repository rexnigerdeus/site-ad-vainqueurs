import type { Metadata } from "next";
import Link from "next/link";
import { Images } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { getAlbums, type Album } from "@/lib/sanity/queries";
import { formatDateFr } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Galerie multimédia",
  description:
    "Albums photos et vidéos des activités, cultes et moments forts du Temple des Vainqueurs.",
};

export default async function GaleriePage() {
  const albums = await getAlbums().catch(() => [] as Album[]);
  return (
    <>
      <PageHeader
        eyebrow="Galerie"
        title="Moments de vie"
        description="Revivez les temps forts de l'église : cultes, baptêmes, conventions, camps de jeunes et événements communautaires."
      />

      <section className="bg-ivory py-20 text-night lg:py-28">
        <div className="container-section">
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