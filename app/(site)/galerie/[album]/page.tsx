import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { getAlbums, getAlbumBySlug, type Album } from "@/lib/sanity/queries";
import { formatDateFr } from "@/lib/utils";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ album: string }> };

export async function generateStaticParams() {
  const albums = await getAlbums().catch(() => [] as Album[]);
  return albums.map((a) => ({ album: a.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { album: slug } = await params;
  const album = await getAlbumBySlug(slug).catch(() => null);
  if (!album) return { title: "Album introuvable" };
  return { title: album.title, description: `Album du ${formatDateFr(album.date)}` };
}

export default async function AlbumPage({ params }: Props) {
  const { album: slug } = await params;
  const album = await getAlbumBySlug(slug).catch(() => null);
  if (!album) notFound();

  return (
    <article className="bg-ivory text-night">
      <section className="bg-night-gradient py-16 text-ivory lg:py-20">
        <div className="container-section">
          <Reveal>
            <Link
              href="/activites"
              className="inline-flex items-center gap-2 text-sm text-ivory/60 hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" /> Retour aux activités
            </Link>
            <h1 className="mt-6 font-display text-3xl leading-tight tracking-tight-48 md:text-5xl">
              {album.title}
            </h1>
            <p className="mt-3 text-ivory/70">{formatDateFr(album.date)} · {album.count || album.photos?.length || 0} médias</p>
          </Reveal>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-section">
          {album.photos && album.photos.length > 0 ? (
            <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
              {album.photos.map((photo, i) => (
                <div
                  key={i}
                  className="mb-4 break-inside-avoid overflow-hidden rounded-6 bg-night/10"
                  style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "1/1" : "4/3" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={photo.caption || `${album.title} — photo ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-night/60">
              Les photos de cet album seront publiées prochainement.
            </p>
          )}
        </div>
      </section>
    </article>
  );
}