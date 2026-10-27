import { Quote } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import type { Testimonial as TestimonialType } from "@/lib/sanity/queries";

const FALLBACK: TestimonialType[] = [
  {
    _id: "t1",
    text: "Le Temple des Vainqueurs a changé ma vie. J'y ai trouvé une famille spirituelle et un berger fidèle.",
    author: "Sœur Mariam",
    role: "Membre depuis 2018",
  },
  {
    _id: "t2",
    text: "Les enseignements bibliques m'ont donné des fondations solides pour ma foi et mon quotidien.",
    author: "Frère Jean-Luc",
    role: "Jeune vainqueur",
  },
  {
    _id: "t3",
    text: "Même depuis la diaspora, je suis les prédications en ligne et je reste connecté à mon église.",
    author: "Frère David",
    role: "Diaspora — France",
  },
];

export function Testimonials({ testimonials }: { testimonials?: TestimonialType[] }) {
  const data = testimonials?.length ? testimonials : FALLBACK;
  return (
    <section className="bg-ivory py-20 text-night lg:py-28">
      <div className="container-section">
        <div className="mb-12 text-center">
          <p className="eyebrow mb-4 justify-center text-gold-600">Témoignages</p>
          <SplitReveal className="font-display text-4xl uppercase leading-[0.95] md:text-6xl">
            Ce que disent nos fidèles
          </SplitReveal>
        </div>

        {/* Carrousel tactile sur téléphone, 3 colonnes au-delà */}
        <div className="snap-carousel -mx-4 px-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
          {data.map((t, i) => (
            <Reveal
              key={t.author}
              delay={i * 0.1}
              className="flex w-[82vw] max-w-sm flex-col rounded-3xl border border-night/10 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl sm:p-8 md:w-auto md:max-w-none"
            >
              <Quote className="h-8 w-8 text-gold" />
              <p className="mt-4 flex-1 font-sans text-lg italic leading-relaxed text-night">
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