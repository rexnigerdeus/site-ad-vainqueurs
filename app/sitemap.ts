import type { MetadataRoute } from "next";
import { NAV_LINKS } from "@/lib/church";
import { sermons } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = NAV_LINKS.map((l) => ({
    url: `${siteConfig.url}${l.href === "/" ? "" : l.href}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: l.href === "/" ? 1 : 0.8,
  }));
  const sermonRoutes = sermons.map((s) => ({
    url: `${siteConfig.url}/messages/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticRoutes, ...sermonRoutes];
}