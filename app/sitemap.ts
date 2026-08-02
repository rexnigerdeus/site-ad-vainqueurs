import type { MetadataRoute } from "next";
import { NAV_LINKS } from "@/lib/church";
import { sermons, albums } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = NAV_LINKS.map((l) => ({
    url: `${siteConfig.url}${l.href === "/" ? "" : l.href}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: l.href === "/" ? 1 : 0.8,
  }));
  // Routes additionnelles non présentes dans la nav principale
  const extraRoutes = [
    { href: "/dons", priority: 0.7 },
    { href: "/galerie", priority: 0.6 },
  ].map((r) => ({
    url: `${siteConfig.url}${r.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
  const sermonRoutes = sermons.map((s) => ({
    url: `${siteConfig.url}/messages/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const albumRoutes = albums.map((a) => ({
    url: `${siteConfig.url}/galerie/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));
  return [...staticRoutes, ...extraRoutes, ...sermonRoutes, ...albumRoutes];
}