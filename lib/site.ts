import type { Metadata } from "next";
import { CHURCH } from "./church";
import { PENIEL, penielPhase } from "./peniel";

/** Métadonnées SEO globales — App Router */
export const siteConfig = {
  name: CHURCH.name,
  url: `https://${CHURCH.domain}`,
  description:
    "Temple des Assemblées de Dieu — Temple des Vainqueurs, Abidjan Port-Bouët (Vridi). " +
    "Cultes, prédications, enseignements et vie communautaire d'une église évangélique.",
  locale: "fr_FR",
} as const;

/**
 * Images de partage (1200 x 630, source : scripts/og/og.html).
 * Changer le nom du fichier à chaque nouvelle version : WhatsApp et Facebook gardent l'ancienne en cache.
 */
const OG_IMAGES = {
  church: { url: "/og/temple-des-vainqueurs.jpg", alt: "Temple des Vainqueurs — Assemblées de Dieu, Vridi, Port-Bouët, Abidjan" },
  penielLaunch: { url: "/og/peniel-2026-lancement.jpg", alt: `${PENIEL.name} — « ${PENIEL.theme} ». Lancement samedi 31 octobre, ${PENIEL.dates.toLowerCase()}.` },
  peniel: { url: "/og/peniel-2026.jpg", alt: `${PENIEL.name} — « ${PENIEL.theme} » (${PENIEL.verse.reference}), ${PENIEL.dates.toLowerCase()}.` },
} as const;

type OgImage = { url: string; alt?: string; width?: number; height?: number };

/** Aperçu PENIEL : « lancement samedi 31 octobre » d'abord, puis le mois de jeûne. */
export function penielShare(now: Date = new Date()) {
  const teaser = penielPhase(now) === "teaser";
  return {
    title: `${PENIEL.name} · « ${PENIEL.theme} »`,
    description: teaser
      ? `Lancement samedi 31 octobre au Temple des Vainqueurs. ${PENIEL.tagline} ${PENIEL.dates.toLowerCase()} — ${PENIEL.verse.reference}. Thème, sous-thèmes et programme.`
      : `${PENIEL.tagline} au Temple des Vainqueurs, ${PENIEL.dates.toLowerCase()} — ${PENIEL.verse.reference}. Thème, sous-thèmes et programme de chaque jour.`,
    image: teaser ? OG_IMAGES.penielLaunch : OG_IMAGES.peniel,
  };
}

/** Image de partage par défaut : celle de PENIEL pendant la période, celle de l'église le reste de l'année. */
export function defaultShareImage(now: Date = new Date()): OgImage {
  return penielPhase(now) === "over" ? OG_IMAGES.church : penielShare(now).image;
}

/**
 * Métadonnées complètes d'une page : titre, description, lien canonique et aperçu de partage.
 * Next remplace l'objet openGraph du layout au lieu de le fusionner : chaque page doit donc le fournir en entier.
 *  - `title` / `description` : pour Google et l'onglet ;
 *  - `share` : titre et description de l'aperçu (WhatsApp, Facebook…), s'ils diffèrent ;
 *  - `image` : sinon l'image de partage par défaut ;
 *  - `path` : chemin de la page, qui devient son lien canonique (absent pour le layout racine, dont héritent toutes les pages).
 */
export function buildMetadata({
  title,
  description,
  path,
  share,
  image,
  type = "website",
}: {
  title?: Metadata["title"];
  description: string;
  path?: string;
  share?: { title: string; description: string };
  image?: OgImage;
  type?: "website" | "article";
}): Metadata {
  const shareTitle =
    share?.title ??
    (typeof title === "string" ? `${title} — ${siteConfig.name}` : `${siteConfig.name} — Assemblées de Dieu, Abidjan Port-Bouët`);
  const shareDescription = share?.description ?? description;
  const img = image ?? defaultShareImage();
  const images = [{ width: 1200, height: 630, ...img }];
  return {
    ...(title && { title }),
    description,
    ...(path && { alternates: { canonical: path } }),
    openGraph: {
      title: shareTitle,
      description: shareDescription,
      ...(path && { url: path }),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDescription,
      images,
    },
  };
}

export const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "ReligiousOrganization",
  "@id": `${siteConfig.url}/#eglise`,
  name: CHURCH.fullName,
  alternateName: [CHURCH.name, "AD Vainqueurs", "AD Temple des Vainqueurs"],
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  image: `${siteConfig.url}${OG_IMAGES.church.url}`,
  // Téléphone et e-mail à ajouter ici quand les vrais seront dans lib/church.ts (encore provisoires).
  address: {
    "@type": "PostalAddress",
    streetAddress: CHURCH.quartier,
    addressLocality: CHURCH.commune,
    addressRegion: CHURCH.city,
    addressCountry: "CI",
  },
  sameAs: [CHURCH.social.youtube, CHURCH.social.facebook],
} as const;

export const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: CHURCH.name,
  url: siteConfig.url,
  inLanguage: "fr",
  publisher: { "@id": jsonLdOrganization["@id"] },
} as const;

/** Événement PENIEL pour Google (résultats enrichis « événement »). */
export const jsonLdPeniel = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `${PENIEL.name} — ${PENIEL.theme}`,
  description: `${PENIEL.tagline} au Temple des Vainqueurs. Thème : « ${PENIEL.theme} » (${PENIEL.verse.reference}).`,
  startDate: "2026-11-01",
  endDate: "2026-11-29",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  isAccessibleForFree: true,
  inLanguage: "fr",
  url: `${siteConfig.url}/peniel`,
  image: [`${siteConfig.url}${OG_IMAGES.peniel.url}`, `${siteConfig.url}/peniel/peniel-2026-affiche-principale.jpg`],
  location: {
    "@type": "Place",
    name: "AD Temple des Vainqueurs",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Vridi Cité, Petit Bassam",
      addressLocality: CHURCH.commune,
      addressRegion: CHURCH.city,
      addressCountry: "CI",
    },
  },
  organizer: { "@type": "Organization", "@id": jsonLdOrganization["@id"], name: CHURCH.fullName, url: siteConfig.url },
} as const;
