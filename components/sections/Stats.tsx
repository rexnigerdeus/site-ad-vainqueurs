import { Heart, Users, Calendar, Globe } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
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
    <section className="bg-gold-gradient py-16 text-night">
      <div className="container-section">
        <Reveal className="mb-10 text-center">
          <h2 className="font-display text-3xl tracking-tight-48 md:text-4xl">
            Une communauté vivante et engagée
          </h2>
        </Reveal>
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((s) => {
            const Icon = iconMap[s.icon] || Heart;
            return (
            <StaggerItem key={s._id} className="text-center">
              <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-night/10">
                <Icon className="h-6 w-6" />
              </div>
              <div className="font-display text-4xl tracking-tight-48 md:text-5xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm font-medium text-night/70">{s.label}</div>
            </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}