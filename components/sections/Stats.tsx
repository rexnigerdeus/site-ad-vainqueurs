import { Heart, Users, Calendar, Globe } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

const stats = [
  { icon: Users, value: "500+", label: "Fidèles" },
  { icon: Calendar, value: "10 ans", label: "de ministère" },
  { icon: Globe, value: "4", label: "continents touchés" },
  { icon: Heart, value: "100%", label: "don de soi" },
];

export function Stats() {
  return (
    <section className="bg-gold-gradient py-16 text-night">
      <div className="container-section">
        <Reveal className="mb-10 text-center">
          <h2 className="font-display text-3xl tracking-tight-48 md:text-4xl">
            Une communauté vivante et engagée
          </h2>
        </Reveal>
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="text-center">
              <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-night/10">
                <s.icon className="h-6 w-6" />
              </div>
              <div className="font-display text-4xl tracking-tight-48 md:text-5xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm font-medium text-night/70">{s.label}</div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}