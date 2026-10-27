import { Heart, Users, Calendar, Globe } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { CountUp } from "@/components/motion/CountUp";
import type { StatItem } from "@/lib/sanity/queries";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Calendar,
  Globe,
  Heart,
};

const FALLBACK_STATS: StatItem[] = [
  { _id: "s1", icon: "Users", value: "500+", label: "Fidèles" },
  { _id: "s2", icon: "Calendar", value: "10 ans", label: "de ministère" },
  { _id: "s3", icon: "Globe", value: "4", label: "continents touchés" },
  { _id: "s4", icon: "Heart", value: "100%", label: "don de soi" },
];

export function Stats({ stats }: { stats?: StatItem[] }) {
  const data = stats?.length ? stats : FALLBACK_STATS;
  return (
    <section className="relative overflow-hidden bg-gold-gradient py-16 text-night lg:py-20">
      <div className="container-section relative">
        <SplitReveal className="mb-12 text-center font-display text-4xl uppercase leading-[0.95] md:text-5xl">
          Une communauté vivante et engagée
        </SplitReveal>
        <StaggerGroup className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {data.map((s) => {
            const Icon = iconMap[s.icon] || Heart;
            return (
              <StaggerItem key={s._id} className="text-center">
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-night/10 sm:h-14 sm:w-14">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <CountUp value={s.value} className="block font-display text-5xl tabular-nums leading-none md:text-6xl lg:text-7xl" />
                <div className="mt-2 text-sm font-semibold text-night/70">{s.label}</div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
