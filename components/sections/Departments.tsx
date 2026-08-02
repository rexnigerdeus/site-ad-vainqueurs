import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

const DEPARTEMENTS = [
  { slug: "departement-01" },
  { slug: "departement-02" },
  { slug: "departement-03" },
  { slug: "departement-04" },
  { slug: "departement-05" },
  { slug: "departement-06" },
];

// Doublé pour une boucle d'animation fluide (translateX -50%)
const LOOP = [...DEPARTEMENTS, ...DEPARTEMENTS];

export function Departments() {
  return (
    <section className="bg-night py-20 lg:py-28">
      <div className="container-section">
        <Reveal className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold">
            Nos départements
          </p>
          <h2 className="font-display text-3xl tracking-tight-48 md:text-4xl">
            Une église organisée pour servir
          </h2>
        </Reveal>
      </div>

      <Reveal className="relative">
        <div className="flex items-center gap-5 overflow-hidden px-4 md:gap-6 md:px-6 lg:px-4 xl:px-0">
          <div className="auto-scroll flex shrink-0 items-center gap-5 md:gap-6">
            {LOOP.map((d, i) => (
              <div
                key={`${d.slug}-${i}`}
                className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5 transition-transform duration-300 hover:scale-110 sm:h-28 sm:w-28 md:h-32 md:w-32"
              >
                <Image
                  src={`/${d.slug}.png`}
                  alt={d.slug}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}