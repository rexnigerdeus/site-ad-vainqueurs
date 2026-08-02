import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { sermons } from "@/lib/data";
import { formatDateFr } from "@/lib/utils";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return sermons.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sermon = sermons.find((s) => s.slug === slug);
  if (!sermon) return { title: "Prédication introuvable" };
  return {
    title: sermon.title,
    description: `Prédication du ${formatDateFr(sermon.date)} par ${sermon.preacher} — ${sermon.theme}.`,
  };
}

export default async function SermonDetailPage({ params }: Props) {
  const { slug } = await params;
  const sermon = sermons.find((s) => s.slug === slug);
  if (!sermon) notFound();

  const related = sermons.filter((s) => s.id !== sermon.id).slice(0, 3);

  return (
    <article className="bg-ivory text-night">
      {/* Header */}
      <section className="bg-night-gradient py-16 text-ivory lg:py-20">
        <div className="container-section max-w-4xl">
          <Reveal>
            <Link
              href="/messages"
              className="inline-flex items-center gap-2 text-sm text-ivory/60 hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" /> Retour aux prédications
            </Link>
            <span className="mt-6 block text-xs font-semibold uppercase tracking-wider text-gold">
              {sermon.theme} · {sermon.type}
            </span>
            <h1 className="mt-2 font-display text-3xl leading-tight tracking-tight-48 md:text-5xl">
              {sermon.title}
            </h1>
            <p className="mt-4 text-ivory/70">
              {sermon.preacher} · {formatDateFr(sermon.date)} · {sermon.duration}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Player */}
      <section className="py-12 lg:py-16">
        <div className="container-section max-w-4xl">
          {sermon.youtubeId ? (
            <div className="aspect-video overflow-hidden rounded-6 bg-night">
              <iframe
                src={`https://www.youtube.com/embed/${sermon.youtubeId}`}
                title={sermon.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : sermon.type === "audio" ? (
            <div className="rounded-6 bg-night p-8 text-ivory">
              <p className="mb-4 text-ivory/70">Lecteur audio — fichier à venir.</p>
              <div className="h-16 rounded-xl bg-white/5" />
            </div>
          ) : (
            <div className="prose rounded-6 bg-white p-8">
              <p className="text-night/70">
                Contenu texte de la prédication — à intégrer depuis le CMS.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Related */}
      <section className="pb-20 lg:pb-28">
        <div className="container-section max-w-4xl">
          <h2 className="mb-6 font-display text-2xl tracking-tight-48">
            Continuer à écouter
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/messages/${r.slug}`}
                className="group rounded-6 border border-night/10 bg-white p-4 transition-all hover:shadow-lg"
              >
                <Play className="h-6 w-6 text-gold-600" />
                <h3 className="mt-3 font-display text-base leading-snug tracking-tight-48">
                  {r.title}
                </h3>
                <p className="mt-1 text-xs text-night/60">{formatDateFr(r.date)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}