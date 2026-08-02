/**
 * Données mock en attendant l'intégration Sanity.
 * Sert de contrat de données pour les composants.
 */

export type Event = {
  id: string;
  title: string;
  date: string; // ISO
  time: string;
  location: string;
  category: "culte" | "conference" | "jeunesse" | "femmes" | "hommes" | "special";
  description: string;
};

export type Sermon = {
  id: string;
  slug: string;
  title: string;
  date: string;
  preacher: string;
  type: "audio" | "video" | "texte";
  duration: string;
  theme: string;
  thumbnail?: string;
  youtubeId?: string;
};

export type Album = {
  id: string;
  slug: string;
  title: string;
  date: string;
  cover: string;
  count: number;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export const upcomingEvents: Event[] = [
  {
    id: "e1",
    title: "Culte de louange",
    date: "2026-07-19",
    time: "09h00",
    location: "Temple — Vridi",
    category: "culte",
    description: "Culte dominical de louange et adoration.",
  },
  {
    id: "e2",
    title: "Étude biblique du mercredi",
    date: "2026-07-22",
    time: "18h00",
    location: "Temple — Vridi",
    category: "culte",
    description: "Enseignement biblique approfondi.",
  },
  {
    id: "e3",
    title: "Veillée d'intercession",
    date: "2026-07-25",
    time: "20h00",
    location: "Temple — Vridi",
    category: "special",
    description: "Nuit de prière et d'intercession communautaire.",
  },
  {
    id: "e4",
    title: "Convention des jeunes vainqueurs",
    date: "2026-08-02",
    time: "15h00",
    location: "Temple — Vridi",
    category: "jeunesse",
    description: "Rassemblement des jeunes de l'église.",
  },
];

export const sermons: Sermon[] = [
  {
    id: "s1",
    slug: "culte-louange-02-08-2026",
    title: "Culte de louange et d'adoration du dimanche 02/08/2026",
    date: "2026-08-02",
    preacher: "Temple des Vainqueurs",
    type: "video",
    duration: "Live",
    theme: "Culte",
    youtubeId: "NRlfAp4B3LU",
  },
  {
    id: "s2",
    slug: "culte-louange-26-07-2026",
    title: "Culte de louange et d'adoration du dimanche 26/07/2026",
    date: "2026-07-26",
    preacher: "Temple des Vainqueurs",
    type: "video",
    duration: "4h27",
    theme: "Culte",
    youtubeId: "X20dOkeKCto",
  },
  {
    id: "s3",
    slug: "culte-louange-19-07-2026",
    title: "Culte de louange et d'adoration du dimanche 19/07/2026",
    date: "2026-07-19",
    preacher: "Temple des Vainqueurs",
    type: "video",
    duration: "3h11",
    theme: "Culte",
    youtubeId: "gHhpcyKi164",
  },
  {
    id: "s4",
    slug: "culte-louange-12-07-2026",
    title: "Culte de louange et d'adoration du dimanche 12/07/2026",
    date: "2026-07-12",
    preacher: "Temple des Vainqueurs",
    type: "video",
    duration: "2h47",
    theme: "Culte",
    youtubeId: "dpMut8a3O3I",
  },
  {
    id: "s5",
    slug: "culte-louange-05-07-2026",
    title: "Culte de louange et d'adoration du dimanche 05/07/2026",
    date: "2026-07-05",
    preacher: "Temple des Vainqueurs",
    type: "video",
    duration: "5h24",
    theme: "Culte",
    youtubeId: "Xrxv71YWXhc",
  },
];

export const albums: Album[] = [
  {
    id: "a1",
    slug: "bapteme-2026",
    title: "Cérémonie de baptême 2026",
    date: "2026-06-15",
    cover: "https://images.unsplash.com/photo-1604534720003-ead7e9d3e3a1?w=800&q=80",
    count: 32,
  },
  {
    id: "a2",
    slug: "convention-annuelle",
    title: "Convention annuelle des vainqueurs",
    date: "2026-05-20",
    cover: "https://images.unsplash.com/photo-1507692049790-de5829024332?w=800&q=80",
    count: 54,
  },
  {
    id: "a3",
    slug: "jeunes-vainqueurs",
    title: "Camp des jeunes vainqueurs",
    date: "2026-04-10",
    cover: "https://images.unsplash.com/photo-1518568814500-cb67a4d1f8f1?w=800&q=80",
    count: 41,
  },
];

export const team: TeamMember[] = [
  {
    id: "t1",
    name: "Pasteur principal",
    role: "Pasteur principal",
    bio: "Berger de l'assemblée depuis sa fondation.",
  },
  {
    id: "t2",
    name: "Pasteur adjoint",
    role: "Pasteur adjoint",
    bio: "Responsable de l'enseignement biblique.",
  },
];

export const faqs: FaqItem[] = [
  {
    q: "Quels sont les horaires des cultes ?",
    a: "Le culte dominical se tient chaque dimanche à 9h00. L'étude biblique a lieu le mercredi à 18h00, et la veillée d'intercession le dernier vendredi du mois à 20h00.",
  },
  {
    q: "Comment puis-je devenir membre ?",
    a: "Vous êtes le bienvenu ! Après quelques visites, vous pourrez rencontrer le pasteur qui vous présentera le parcours de membre et le baptême.",
  },
  {
    q: "Proposez-vous des activités pour les jeunes ?",
    a: "Oui, le groupe des jeunes vainqueurs se réunit chaque samedi à 15h00. Des camps et conventions sont organisés régulièrement.",
  },
  {
    q: "Comment accéder aux prédications en ligne ?",
    a: "Toutes les prédications sont disponibles sur la page Messages, et notre chaîne YouTube publie les vidéos chaque semaine.",
  },
  {
    q: "Puis-je faire un don en ligne ?",
    a: "Oui, par Wave ou Orange Money aux numéros affichés en bas de page. Un module de don sécurisé en ligne sera bientôt disponible.",
  },
  {
    q: "Où se trouve l'église ?",
    a: "Le temple est situé à Vridi, dans la commune de Port-Bouët à Abidjan. La carte est disponible sur la page Contact.",
  },
];