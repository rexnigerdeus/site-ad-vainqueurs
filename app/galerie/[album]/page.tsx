import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { albums } from "@/lib/data";
import { formatDateFr } from "@/lib/utils";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ album: string }> };

export async function generateStaticParams() {
  return albums.map((a) => ({ album: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { album: slug } = await params;
  const album = albums.find((a) => a.slug === slug);
  if (!album) return { title: "Album introuvable" };
  return { title: album.title, description: `Album du ${formatDateFr(album.date)}` };
}

export default async function AlbumPage({ params }: Props) {
  const { album: slug } = await params;
  const album = albums.find((a) => a.slug === slug);
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
            <p className="mt-3 text-ivory/70">{formatDateFr(album.date)} · {album.count} médias</p>
          </Reveal>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-section">
          {/* Placeholder grille masonry */}
          <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="mb-4 break-inside-avoid rounded-6 bg-night/10"
                style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "1/1" : "4/3" }}
              >
                <div className="grid h-full place-items-center text-night/30 text-sm">
                  Photo {i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}