import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DEPARTEMENTS = [
  { slug: "departement-01", name: "Département 01" },
  { slug: "departement-02", name: "Département 02" },
  { slug: "departement-03", name: "Département 03" },
  { slug: "departement-04", name: "Département 04" },
  { slug: "departement-05", name: "Département 05" },
  { slug: "departement-06", name: "Département 06" },
];

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
        <div className="snap-carousel px-4 md:px-6 lg:px-4 xl:px-0">
          {DEPARTEMENTS.map((d) => (
            <div
              key={d.slug}
              className="group relative w-[80vw] shrink-0 snap-start sm:w-[320px]"
            >
              <div className="relative aspect-square overflow-hidden rounded-6 border border-white/10 bg-white/5">
                <Image
                  src={`/${d.slug}.png`}
                  alt={d.name}
                  fill
                  sizes="(max-width: 640px) 80vw, 320px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-center">
                  <h3 className="font-display text-lg tracking-tight-48 text-ivory">
                    {d.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicateurs de défilement */}
        <div className="container-section mt-6 flex items-center justify-center gap-2 text-ivory/40">
          <ChevronLeft className="h-5 w-5" />
          <span className="text-xs font-medium uppercase tracking-wider">
            Faites glisser pour explorer
          </span>
          <ChevronRight className="h-5 w-5" />
        </div>
      </Reveal>
    </section>
  );
}