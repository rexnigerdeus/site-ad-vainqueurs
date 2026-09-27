/**
 * Helper : récupère les réglages du site depuis Sanity avec fallback
 * sur les constantes codées en dur de lib/church.ts.
 *
 * Ainsi le site fonctionne immédiatement même si aucun document
 * siteSettings n'a encore été créé dans le Studio.
 */
import { getSiteSettings, type SiteSettings } from "@/lib/sanity/queries";
import { CHURCH } from "@/lib/church";

export type ResolvedSettings = {
  name: string;
  fullName: string;
  denomination: string;
  quartier: string;
  commune: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  social: { youtube: string; facebook: string };
  donations: { wave: string; orangeMoney: string };
  serviceHours: string;
};

const FALLBACK: ResolvedSettings = {
  name: CHURCH.name,
  fullName: CHURCH.fullName,
  denomination: CHURCH.denomination,
  quartier: CHURCH.quartier,
  commune: CHURCH.commune,
  city: CHURCH.city,
  country: CHURCH.country,
  address: CHURCH.address,
  phone: CHURCH.phone,
  whatsapp: CHURCH.whatsapp,
  email: CHURCH.email,
  social: { ...CHURCH.social },
  donations: { ...CHURCH.donations },
  serviceHours: "Dimanche 9h00 · Mercredi 18h00 · Vendredi 18h00",
};

export async function getSettings(): Promise<ResolvedSettings> {
  try {
    const s = await getSiteSettings();
    if (!s) return FALLBACK;
    return {
      name: s.name || FALLBACK.name,
      fullName: s.fullName || FALLBACK.fullName,
      denomination: s.denomination || FALLBACK.denomination,
      quartier: s.quartier || FALLBACK.quartier,
      commune: s.commune || FALLBACK.commune,
      city: s.city || FALLBACK.city,
      country: s.country || FALLBACK.country,
      address: s.address || FALLBACK.address,
      phone: s.phone || FALLBACK.phone,
      whatsapp: s.whatsapp || FALLBACK.whatsapp,
      email: s.email || FALLBACK.email,
      social: {
        youtube: s.social?.youtube || FALLBACK.social.youtube,
        facebook: s.social?.facebook || FALLBACK.social.facebook,
      },
      donations: {
        wave: s.donations?.wave || FALLBACK.donations.wave,
        orangeMoney: s.donations?.orangeMoney || FALLBACK.donations.orangeMoney,
      },
      serviceHours: s.serviceHours || FALLBACK.serviceHours,
    };
  } catch (e) {
    console.error("[getSettings] Sanity fetch failed:", e);
    return FALLBACK;
  }
}