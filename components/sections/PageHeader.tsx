import { Reveal } from "@/components/motion/Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

/** En-tête de page interne — bandeau night avec halo doré. */
export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <section className="relative overflow-hidden bg-night-gradient py-20 lg:py-28">
      <div className="pointer-events-none absolute -top-32 right-1/4 h-[400px] w-[400px] rounded-full bg-gold/15 blur-[120px]" />
      <div className="container-section relative">
        <Reveal className="max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-4xl leading-tight tracking-tight-56 md:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 text-lg text-ivory/70 md:text-xl">{description}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}