import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import type { Department } from "@/lib/sanity/queries";

const FALLBACK_DEPARTMENTS = [
  { _id: "d1", slug: "departement-01" },
  { _id: "d2", slug: "departement-02" },
  { _id: "d3", slug: "departement-03" },
  { _id: "d4", slug: "departement-04" },
  { _id: "d5", slug: "departement-05" },
  { _id: "d6", slug: "departement-06" },
];

export function Departments({ departments }: { departments?: Department[] }) {
  // Départements Sanity s'il y en a ; sinon fallback images locales
  const items = departments?.length
    ? departments.map((d) => ({ _id: d._id, logo: d.logo, name: d.name, description: d.description }))
    : FALLBACK_DEPARTMENTS;

  // Un groupe = logos répétés jusqu'à dépasser la largeur des plus grands écrans
  // (MIN_PER_GROUP × ~150px). Deux groupes identiques côte à côte, chacun terminé
  // par un espacement (pr = gap) : translateX(-50%) retombe pile sur le début
  // du 2e groupe → boucle continue, sans vide ni saut.
  const MIN_PER_GROUP = 18;
  const repeat = Math.max(1, Math.ceil(MIN_PER_GROUP / items.length));
  const group = Array.from({ length: repeat }, () => items).flat();
  // Vitesse constante quel que soit le nombre de logos (~4s par logo)
  const duration = `${group.length * 4}s`;

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
        <div className="overflow-hidden">
          <div className="auto-scroll flex w-max" style={{ animationDuration: duration }}>
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1 || undefined}
                className="flex shrink-0 items-center gap-5 pr-5 md:gap-6 md:pr-6"
              >
                {group.map((d: any, i) => (
                  <div
                    key={`${d._id}-${i}`}
                    title={d.name ? [d.name, d.description].filter(Boolean).join(" — ") : undefined}
                    className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5 transition-transform duration-300 hover:scale-110 sm:h-28 sm:w-28 md:h-32 md:w-32"
                  >
                    {d.logo || d.slug ? (
                      <Image
                        src={d.logo || `/${d.slug}.png`}
                        alt={copy === 1 ? "" : d.name || d.slug}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="grid h-full w-full place-items-center p-3 text-center font-display text-sm leading-tight text-gold">
                        {d.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}