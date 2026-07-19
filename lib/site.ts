import { CHURCH } from "./church";

/** Métadonnées SEO globales — App Router */
export const siteConfig = {
  name: CHURCH.name,
  url: `https://${CHURCH.domain}`,
  ogImage: "/logo.png",
  description:
    "Temple des Assemblées de Dieu — Temple des Vainqueurs, Abidjan Port-Bouët (Vridi). " +
    "Cultes, prédications, enseignements et vie communautaire d'une église évangélique.",
  locale: "fr_FR",
} as const;

export const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "ReligiousOrganization",
  name: CHURCH.fullName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  image: `${siteConfig.url}/logo.png`,
  telephone: CHURCH.phone,
  email: CHURCH.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: CHURCH.quartier,
    addressLocality: CHURCH.commune,
    addressRegion: CHURCH.city,
    addressCountry: "CI",
  },
  sameAs: [CHURCH.social.youtube, CHURCH.social.facebook],
} as const;