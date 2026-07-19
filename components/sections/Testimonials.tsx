import { Quote } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const testimonials = [
  {
    text: "Le Temple des Vainqueurs a changé ma vie. J'y ai trouvé une famille spirituelle et un berger fidèle.",
    author: "Sœur Mariam",
    role: "Membre depuis 2018",
  },
  {
    text: "Les enseignements bibliques m'ont donné des fondations solides pour ma foi et mon quotidien.",
    author: "Frère Jean-Luc",
    role: "Jeune vainqueur",
  },
  {
    text: "Même depuis la diaspora, je suis les prédications en ligne et je reste connecté à mon église.",
    author: "Frère David",
    role: "Diaspora — France",
  },
];

export function Testimonials() {
  return (
    <section className="bg-ivory py-20 text-night lg:py-28">
      <div className="container-section">
        <Reveal className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-600">
            Témoignages
          </p>
          <h2 className="font-display text-3xl tracking-tight-48 md:text-5xl">
            Ce que disent nos fidèles
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.author}
              delay={i * 0.1}
              className="rounded-6 border border-night/10 bg-white p-8 shadow-sm"
            >
              <Quote className="h-8 w-8 text-gold" />
              <p className="mt-4 font-display text-lg leading-relaxed text-night">
                « {t.text} »
              </p>
              <div className="mt-6 border-t border-night/5 pt-4">
                <p className="font-semibold">{t.author}</p>
                <p className="text-sm text-night/60">{t.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}