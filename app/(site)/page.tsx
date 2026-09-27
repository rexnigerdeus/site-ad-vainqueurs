import { Hero } from "@/components/sections/Hero";
import { UpcomingEvents } from "@/components/sections/UpcomingEvents";
import { PenielCountdown } from "@/components/sections/PenielCountdown";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { Stats } from "@/components/sections/Stats";
import { Departments } from "@/components/sections/Departments";
import { SermonsTeaser } from "@/components/sections/SermonsTeaser";
import { GalleryTeaser } from "@/components/sections/GalleryTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaVisit } from "@/components/sections/CtaVisit";
import { Faq } from "@/components/sections/Faq";
import {
  getUpcomingEvents,
  getFeaturedSermons,
  getAlbums,
  getFaqs,
  getStats,
  getDepartments,
  getTestimonials,
  getPageContent,
  getPenielEvent,
} from "@/lib/sanity/queries";
import { getSettings } from "@/lib/sanity/settings";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const seo = (await getPageContent("home").catch(() => null))?.seo;
  return {
    ...(seo?.title && { title: { absolute: seo.title } }),
    ...(seo?.description && { description: seo.description }),
    ...(seo?.ogImage && { openGraph: { images: [{ url: seo.ogImage }] } }),
  };
}

export default async function HomePage() {
  // Fetch parallèle — toutes les sections avec fallback gracieux
  const [
    events,
    sermons,
    albums,
    faqs,
    stats,
    departments,
    testimonials,
    homeContent,
    settings,
    penielEvent,
  ] = await Promise.all([
    getUpcomingEvents(8).catch(() => []),
    getFeaturedSermons(4).catch(() => []),
    getAlbums().catch(() => []),
    getFaqs().catch(() => []),
    getStats().catch(() => []),
    getDepartments().catch(() => []),
    getTestimonials().catch(() => []),
    getPageContent("home").catch(() => null),
    getSettings(),
    getPenielEvent().catch(() => null),
  ]);

  return (
    <>
      <Hero nextEvent={events[0]} header={homeContent?.header} />
      <UpcomingEvents events={events} />
      <PenielCountdown targetDate={penielEvent?.date} />
      <AboutTeaser
        values={homeContent?.values}
        heroTitle={homeContent?.heroTitle}
        heroDescription={homeContent?.heroDescription}
        quote={homeContent?.quote}
      />
      <Stats stats={stats} />
      <Departments departments={departments} />
      <SermonsTeaser sermons={sermons} />
      <GalleryTeaser albums={albums} />
      <Testimonials testimonials={testimonials} />
      <CtaVisit settings={settings} />
      <Faq faqs={faqs} />
    </>
  );
}