import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { valueIcons } from "@/lib/icons";

type Value = { icon: string; title: string; text: string };


const FALLBACK_VALUES: Value[] = [
  { icon: "Heart", title: "Amour", text: "Aimer Dieu et son prochain, à l'image du Christ." },
  { icon: "HandHeart", title: "Prière", text: "Une vie de prière fervente et communautaire." },
  { icon: "BookOpen", title: "Parole", text: "Enseigner la Bible avec fidélité et profondeur." },
  { icon: "Users", title: "Communion", text: "Vivre l'unité et la solidarité entre fidèles." },
];

export function AboutTeaser({
  values,
  heroTitle,
  heroDescription,
  quote,
}: {
  values?: Value[];
  heroTitle?: string;
  heroDescription?: string;
  quote?: { text: string; reference: string };
}) {
  const vals = values?.length ? values : FALLBACK_VALUES;
  return (
    <section className="bg-night py-20 lg:py-28">
      <div className="container-section grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow mb-5 text-gold">À propos de nous</p>
          <SplitReveal className="font-display text-4xl uppercase leading-[0.95] md:text-6xl">
            {heroTitle || "Une église née de la foi, ancrée dans la communauté"}
          </SplitReveal>
          <Reveal>
          <p className="mt-6 text-lg text-ivory/70">
            {heroDescription ||
              "Le Temple des Vainqueurs est une assemblée évangélique des Assemblées de Dieu, implantée à Abidjan, Port-Bouët (Vridi). Notre mission : annoncer l'Évangile, former des disciples et servir notre communauté dans l'amour du Christ."}
          </p>
          <p className="mt-4 text-lg text-ivory/70">
            {quote ? `« ${quote.text} » — ${quote.reference}` : "« Je puis tout par Christ qui me fortifie. » — Philippiens 4:13"}
          </p>
          <Button asChild variant="outline" className="mt-8">
            <Link href="/a-propos">
              Découvrir notre histoire <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          </Reveal>
        </div>

        <StaggerGroup className="grid gap-4 sm:grid-cols-2">
          {vals.map((v) => {
            const Icon = valueIcons[v.icon] || Heart;
            return (
            <StaggerItem
              key={v.title}
              className="glass-card group relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/0 blur-2xl transition-colors duration-500 group-hover:bg-gold/25" />
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/10 ring-1 ring-gold/30 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                <Icon className="h-6 w-6 text-gold" />
              </span>
              <h3 className="mt-5 font-display text-2xl uppercase">{v.title}</h3>
              <p className="mt-2 text-sm text-ivory/70">{v.text}</p>
            </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}