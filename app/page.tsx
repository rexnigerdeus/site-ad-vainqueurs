import { Hero } from "@/components/sections/Hero";
import { UpcomingEvents } from "@/components/sections/UpcomingEvents";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { Stats } from "@/components/sections/Stats";
import { SermonsTeaser } from "@/components/sections/SermonsTeaser";
import { GalleryTeaser } from "@/components/sections/GalleryTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaVisit } from "@/components/sections/CtaVisit";
import { Faq } from "@/components/sections/Faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <UpcomingEvents />
      <AboutTeaser />
      <Stats />
      <SermonsTeaser />
      <GalleryTeaser />
      <Testimonials />
      <CtaVisit />
      <Faq />
    </>
  );
}