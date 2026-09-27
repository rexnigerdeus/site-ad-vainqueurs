/**
 * Coordonnées et informations de l'église — source unique de vérité.
 * À synchroniser avec le CMS (Sanity) une fois en place.
 */
export const CHURCH = {
  name: "Temple des Vainqueurs",
  fullName: "Temple des Assemblées de Dieu — Temple des Vainqueurs",
  denomination: "Assemblées de Dieu",
  city: "Abidjan",
  commune: "Port-Bouët",
  quartier: "Vridi",
  country: "Côte d'Ivoire",
  address: "Vridi, Port-Bouët, Abidjan, Côte d'Ivoire",
  phone: "+225 00 00 00 00", // À compléter
  whatsapp: "22500000000", // numéro sans + ni espaces
  email: "contact@templedesvainqueurs.com",
  domain: "templedesvainqueurs.com",
  social: {
    youtube: "https://www.youtube.com/@advainqueurs",
    facebook: "https://www.facebook.com/Templevainqueurs7",
  },
  // Chaîne @advainqueurs — utilisé pour le flux des dernières vidéos
  youtubeChannelId: "UCuLufASGYOAd09T5QhW61DA",
  // Dons : numéro Wave / Orange Money affiché pour l'instant
  donations: {
    wave: "01 00 00 00 00",
    orangeMoney: "07 00 00 00 00",
  },
} as const;

/** Navigation principale (mapping CDC §5) */
export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/peniel", label: "Peniel" },
  { href: "/activites", label: "Activités" },
  { href: "/messages", label: "Messages" },
  { href: "/contact", label: "Contact" },
] as const;