import Link from "next/link";
import { ArrowRight, Heart, Users, BookOpen, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

const values = [
  { icon: Heart, title: "Amour", text: "Aimer Dieu et son prochain, à l'image du Christ." },
  { icon: HandHeart, title: "Prière", text: "Une vie de prière fervente et communautaire." },
  { icon: BookOpen, title: "Parole", text: "Enseigner la Bible avec fidélité et profondeur." },
  { icon: Users, title: "Communion", text: "Vivre l'unité et la solidarité entre fidèles." },
];

export function AboutTeaser() {
  return (
    <section className="bg-night py-20 lg:py-28">
      <div className="container-section grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold">
            À propos de nous
          </p>
          <h2 className="font-display text-3xl leading-tight tracking-tight-48 md:text-5xl">
            Une église née de la foi,<br />ancrée dans la communauté
          </h2>
          <p className="mt-6 text-lg text-ivory/70">
            Le Temple des Vainqueurs est une assemblée évangélique des
            Assemblées de Dieu, implantée à Abidjan, Port-Bouët (Vridi).
            Notre mission : annoncer l'Évangile, former des disciples et
            servir notre communauté dans l'amour du Christ.
          </p>
          <p className="mt-4 text-lg text-ivory/70">
            « Je puis tout par Christ qui me fortifie. » — Philippiens 4:13
          </p>
          <Button asChild variant="outline" className="mt-8">
            <Link href="/a-propos">
              Découvrir notre histoire <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>

        <StaggerGroup className="grid gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <StaggerItem
              key={v.title}
              className="glass-card rounded-6 p-6 transition-transform hover:-translate-y-1"
            >
              <v.icon className="h-8 w-8 text-gold" />
              <h3 className="mt-4 font-display text-xl tracking-tight-48">{v.title}</h3>
              <p className="mt-2 text-sm text-ivory/70">{v.text}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}