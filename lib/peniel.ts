/**
 * PENIEL 2026 — source unique de vérité (affiches officielles : public/peniel/).
 *
 * Toutes les dates sont exprimées en heure d'Abidjan (UTC+0, sans heure d'été).
 * Le site bascule tout seul selon la date :
 *  - avant le lancement (samedi 31 octobre) : compte à rebours + « coming soon » ;
 *  - du lancement à la fin du 29 novembre : programme PENIEL partout sur le site ;
 *  - ensuite : retour au programme habituel de l'église.
 */

export const PENIEL = {
  name: "PENIEL 2026",
  theme: "Marche devant ma face et sois intègre",
  verse: {
    reference: "Genèse 17:1",
    text: "Je suis le Dieu tout-puissant. Marche devant ma face, et sois intègre.",
  },
  tagline: "4 semaines de jeûne et de prière",
  dates: "Du 1er au 29 novembre 2026",
  location: "AD Temple des Vainqueurs — Vridi Cité, Petit Bassam",
  /** Lancement : les comptes à rebours disparaissent à cette heure. */
  launch: "2026-10-31T00:00:00Z",
  start: "2026-11-01T00:00:00Z",
  /** Fin du dernier jour (29 novembre inclus). */
  end: "2026-11-30T00:00:00Z",
  cover: { src: "/peniel/peniel-2026-cover.jpeg", width: 1387, height: 693 },
} as const;

export const PENIEL_SUB_THEMES = [
  { title: "Ton Dieu ne t'a pas oublié.", week: "1er – 7 nov." },
  { title: "Ne t'arrête pas.", week: "8 – 14 nov." },
  { title: "Sois intègre.", week: "15 – 21 nov." },
  { title: "Ton Dieu t'annonce quelque chose de grand.", week: "22 – 29 nov." },
] as const;

export type PenielSlot = {
  time: string;
  moment: "aube" | "midi" | "soir";
  label?: string;
};

export type PenielDay = {
  /** Jours JS (0 = dimanche) couverts par ce bloc. */
  weekdays: number[];
  day: string;
  title: string;
  slots: PenielSlot[];
};

/** Programme hebdomadaire de PENIEL (affiche « Programme hebdomadaire »). */
export const PENIEL_WEEK: PenielDay[] = [
  {
    weekdays: [1, 2, 3, 4, 5],
    day: "Du lundi au vendredi",
    title: "Temps de prière",
    slots: [
      { time: "05h30 – 06h30", moment: "aube" },
      { time: "12h30 – 13h30", moment: "midi" },
      { time: "18h30 – 19h30", moment: "soir" },
    ],
  },
  {
    weekdays: [6],
    day: "Samedi",
    title: "Temps de prière",
    slots: [
      { time: "05h30 – 06h30", moment: "aube" },
      { time: "16h30 – 18h00", moment: "midi" },
    ],
  },
  {
    weekdays: [0],
    day: "Dimanche",
    title: "Culte de louange et de célébration",
    slots: [
      { time: "07h00 – 10h30", moment: "aube", label: "Culte de louange et de célébration" },
      { time: "16h30 – 18h30", moment: "soir", label: "Soir" },
    ],
  },
];

// TODO PENIEL : l'affiche ne donne pas l'heure de la veillée.
export const PENIEL_VIGIL = {
  date: "2026-11-27",
  label: "Vendredi 27 novembre 2026",
  title: "Veillée de prière",
} as const;

export type PenielPhase = "teaser" | "live" | "over";

export function penielPhase(now: Date = new Date()): PenielPhase {
  const t = now.getTime();
  if (t < Date.parse(PENIEL.launch)) return "teaser";
  if (t < Date.parse(PENIEL.end)) return "live";
  return "over";
}

/** Vrai tant que le programme PENIEL doit remplacer le programme habituel. */
export function isPenielSeason(now: Date = new Date()) {
  return penielPhase(now) !== "over";
}

/** Programme PENIEL à plat, au format des listes « jour / heure / titre » du site. */
export const PENIEL_PROGRAM_ITEMS = [
  { _id: "p1", day: "Lundi → Vendredi", time: "05h30 · 12h30 · 18h30", title: "Temps de prière", description: "Trois rendez-vous par jour : 05h30 – 06h30, 12h30 – 13h30 et 18h30 – 19h30." },
  { _id: "p2", day: "Samedi", time: "05h30 · 16h30", title: "Temps de prière", description: "Deux rendez-vous : 05h30 – 06h30, puis 16h30 – 18h00." },
  { _id: "p3", day: "Dimanche", time: "07h00 – 10h30", title: "Culte de louange et de célébration", description: "Le grand rassemblement du dimanche matin." },
  { _id: "p4", day: "Dimanche", time: "16h30 – 18h30", title: "Rencontre du soir", description: "Temps de prière du dimanche soir." },
  { _id: "p5", day: "Vendredi 27 novembre", time: "Veillée", title: "Veillée de prière", description: "Nuit de prière avec toute l'assemblée." },
];

export const PENIEL_SERVICE_HOURS =
  "PENIEL (1er – 29 novembre) : prière du lundi au vendredi à 05h30, 12h30 et 18h30 · samedi à 05h30 et 16h30 · dimanche : culte de louange et de célébration 07h00 – 10h30, rencontre du soir 16h30 – 18h30 · veillée de prière le vendredi 27 novembre";
