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

/**
 * Rendez-vous réguliers de l'église (hors PENIEL).
 * Pendant PENIEL, c'est le programme de lib/peniel.ts qui s'affiche à la place.
 */
export const REGULAR_PROGRAM = [
  { _id: "w1", day: "Dimanche", time: "07h00 – 10h00", title: "Culte dominical", description: "Louange, adoration et prédication." },
  { _id: "w2", day: "Dimanche", time: "À partir de 15h00", title: "Rencontre des jeunes", description: "Rassemblement des jeunes de l'église." },
  { _id: "w3", day: "Premier dimanche du mois", time: "À partir de 07h00", title: "Jeûne et prière", description: "Toute l'assemblée se consacre au jeûne et à la prière." },
  { _id: "w4", day: "Dernier vendredi du mois", time: "21h00", title: "Veillée", description: "Nuit de prière de l'assemblée." },
];

export const REGULAR_SERVICE_HOURS =
  "Culte : dimanche 07h00 – 10h00 · Jeunes : dimanche dès 15h00 · Jeûne et prière : 1er dimanche du mois dès 07h00 · Veillée : dernier vendredi du mois à 21h00";

/** Navigation principale (mapping CDC §5) */
export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/peniel", label: "Peniel" },
  { href: "/activites", label: "Activités" },
  { href: "/messages", label: "Messages" },
  { href: "/contact", label: "Contact" },
] as const;