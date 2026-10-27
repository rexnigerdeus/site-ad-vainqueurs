import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

/** En-tête de page interne — grand titre révélé mot à mot, halos qui dérivent. */
export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <section className="grain relative overflow-hidden bg-night-gradient pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-24">
      <div className="orb -top-32 right-[10%] h-[420px] w-[420px] bg-gold/20" />
      <div className="orb -bottom-40 -left-20 h-[360px] w-[360px] bg-bordeaux/30 [animation-delay:-7s]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:calc(100%/6)_100%]"
      />
      <div className="container-section relative">
        <div className="max-w-4xl">
          {eyebrow && (
            <Reveal>
              <p className="eyebrow mb-5 text-gold">{eyebrow}</p>
            </Reveal>
          )}
          <SplitReveal
            as="h1"
            on="load"
            className="font-display text-[2.9rem] uppercase leading-[0.95] sm:text-6xl lg:text-7xl 2.5xl:text-8xl"
          >
            {title}
          </SplitReveal>
          {description && (
            <Reveal delay={0.25}>
              <p className="mt-6 max-w-2xl text-lg text-ivory/75 md:text-xl">{description}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
