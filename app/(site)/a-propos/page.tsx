import Image from "next/image";
import { PageHeader } from "@/components/sections/PageHeader";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Cross } from "lucide-react";
import { getTeam, getPageContent, type TeamMember, type PageContent } from "@/lib/sanity/queries";
import { pageMetadata } from "@/lib/sanity/metadata";
import { valueIcons } from "@/lib/icons";
import { PortableText } from "@portabletext/react";

export function generateMetadata() {
  return pageMetadata("about", {
    title: "À propos",
    description:
      "Histoire, vision, mission et équipe pastorale du Temple des Vainqueurs — Assemblées de Dieu, Abidjan Port-Bouët.",
  });
}

const FALLBACK_PILLARS = [
  { icon: "Cross", title: "Notre foi", text: "Nous croyons en la Bible, parole inspirée de Dieu, en Jésus-Christ seul sauveur, et en l'action du Saint-Esprit." },
  { icon: "Eye", title: "Notre vision", text: "Édifier une communauté de vainqueurs qui rayonne dans Port-Bouët, à Abidjan et au-delà des frontières." },
  { icon: "Heart", title: "Notre mission", text: "Évangéliser, faire des disciples, équiper les saints pour l'œuvre du ministère et servir la communauté." },
  { icon: "Users", title: "Nos valeurs", text: "Amour, prière, fidélité à la Parole, communion fraternelle et engagement au service." },
];

export default async function AboutPage() {
  const [team, pageContent] = await Promise.all([
    getTeam().catch(() => [] as TeamMember[]),
    getPageContent("about").catch(() => null as PageContent | null),
  ]);

  const pillars = pageContent?.values?.length ? pageContent.values : FALLBACK_PILLARS;
  const quote = pageContent?.quote;
  const header = pageContent?.header;
  return (
    <>
      <PageHeader
        eyebrow={header?.eyebrow || "À propos"}
        title={header?.title || "Une église. Une famille. Une mission."}
        description={header?.description || "Le Temple des Vainqueurs est une assemblée des Assemblées de Dieu implantée à Abidjan, Port-Bouët (Vridi). Découvrez notre histoire, notre vision et l'équipe pastorale qui sert la communauté."}
      />

      {/* Histoire */}
      <section className="bg-ivory py-20 text-night lg:py-28">
        <div className="container-section grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-600">
              Notre histoire
            </p>
            <h2 className="font-display text-3xl tracking-tight-48 md:text-4xl">
              {pageContent?.heroTitle || "Née de la foi, grandie dans la communion"}
            </h2>
            <div className="mt-6 space-y-4 text-lg text-night/70">
              {pageContent?.body && pageContent.body.length > 0 ? (
                <PortableText value={pageContent.body} />
              ) : (
                <>
                  <p>
                    Le Temple des Vainqueurs a été fondé pour répondre au besoin
                    spirituel croissant des habitants de Port-Bouët et du Vridi.
                    Depuis ses débuts, l'église s'est attachée à annoncer l'Évangile
                    et à accompagner les fidèles dans leur marche avec le Christ.
                  </p>
                  <p>
                    Au fil des années, l'assemblée s'est agrandie, des ministères
                    se sont développés (jeunesse, femmes, hommes, enfants), et
                    l'église est devenue un pilier communautaire reconnu dans la
                    commune.
                  </p>
                  <p>
                    Aujourd'hui, le Temple des Vainqueurs rayonne au-delà des
                    frontières ivoiriennes grâce à sa diaspora fidèle qui suit
                    les cultes et prédications en ligne.
                  </p>
                </>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="rounded-6 bg-night-gradient p-10 text-ivory">
            <Cross className="h-10 w-10 text-gold" />
            <blockquote className="mt-4 font-display text-2xl leading-relaxed">
              « {quote?.text || "Je puis tout par Christ qui me fortifie."} »
            </blockquote>
            <p className="mt-3 text-sm text-ivory/60">{quote?.reference || "Philippiens 4:13"} — verset fondateur</p>
          </Reveal>
        </div>
      </section>

      {/* Piliers */}
      <section className="bg-night py-20 lg:py-28">
        <div className="container-section">
          <Reveal className="mb-12 text-center">
            <h2 className="font-display text-3xl tracking-tight-48 md:text-5xl">
              Ce qui nous porte
            </h2>
          </Reveal>
          <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => {
            const Icon = valueIcons[p.icon] || Cross;
            return (
            <StaggerItem key={p.title} className="glass-card rounded-6 p-6">
              <Icon className="h-8 w-8 text-gold" />
                <h3 className="mt-4 font-display text-xl tracking-tight-48">{p.title}</h3>
                <p className="mt-2 text-sm text-ivory/70">{p.text}</p>
              </StaggerItem>
            );
          })}
          </StaggerGroup>
        </div>
      </section>

      {/* Équipe pastorale */}
      <section className="bg-ivory py-20 text-night lg:py-28">
        <div className="container-section">
          <Reveal className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-600">
              Équipe pastorale
            </p>
            <h2 className="font-display text-3xl tracking-tight-48 md:text-5xl">
              Les bergers de l'assemblée
            </h2>
          </Reveal>

          {team.length === 0 ? (
            <p className="text-center text-night/60">
              L'équipe pastorale sera publiée prochainement.
            </p>
          ) : (
            <StaggerGroup className="grid gap-6 sm:grid-cols-2">
              {team.map((m) => (
                <StaggerItem
                  key={m._id}
                  className="flex items-start gap-5 rounded-6 border border-night/10 bg-white p-6"
                >
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt={m.name}
                      width={80}
                      height={80}
                      className="h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-gold/30"
                    />
                  ) : (
                    <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gold-gradient font-display text-3xl font-bold text-night">
                      {m.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-display text-xl tracking-tight-48">{m.name}</h3>
                    <p className="text-sm font-semibold text-gold-600">{m.role}</p>
                    <p className="mt-2 text-sm text-night/70">{m.bio}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>
    </>
  );
}