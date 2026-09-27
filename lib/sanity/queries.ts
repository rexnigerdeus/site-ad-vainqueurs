import { sanityClient } from "./client";

/**
 * Requêtes GROQ — une fonction par type de contenu.
 * Toutes fetchées côté serveur avec cache ISR (revalidate 60s en dev, 1h en prod).
 */

// ---------- Événements ----------
export async function getUpcomingEvents(limit = 6) {
  const nowISO = new Date().toISOString();
  return sanityClient.fetch<Event[]>(
    `*[_type == "event" && date >= $now] | order(date asc) [0...$limit] {
      _id, title, slug, date, time, location, category, description, featured
    }`,
    { now: nowISO, limit },
    { next: { revalidate: 60 } }
  );
}

export async function getPenielEvent() {
  return sanityClient.fetch<Event | null>(
    `*[_type == "event" && category == "special" && title match "PENIEL*"] | order(date asc) [0] {
      _id, title, slug, date, time, location, category, description
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
}

export async function getFeaturedEvents(limit = 4) {
  return sanityClient.fetch<Event[]>(
    `*[_type == "event" && featured == true] | order(date asc) [0...$limit] {
      _id, title, slug, date, time, location, category, description
    }`,
    { limit },
    { next: { revalidate: 60 } }
  );
}

export async function getAllEvents() {
  return sanityClient.fetch<Event[]>(
    `*[_type == "event"] | order(date desc) {
      _id, title, slug, date, time, location, category, description, featured
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

// ---------- Prédications ----------
export async function getSermons(limit = 12) {
  return sanityClient.fetch<Sermon[]>(
    `*[_type == "sermon"] | order(date desc) [0...$limit] {
      _id, title, slug, date, preacher, type, duration, theme, "youtubeId": youtubeId,
      excerpt, featured
    }`,
    { limit },
    { next: { revalidate: 300 } }
  );
}

export async function getSermonBySlug(slug: string) {
  return sanityClient.fetch<Sermon | null>(
    `*[_type == "sermon" && slug.current == $slug][0] {
      _id, title, slug, date, preacher, type, duration, theme, youtubeId, audioFile, body, excerpt
    }`,
    { slug },
    { next: { revalidate: 300 } }
  );
}

export async function getFeaturedSermons(limit = 4) {
  return sanityClient.fetch<Sermon[]>(
    `*[_type == "sermon" && featured == true] | order(date desc) [0...$limit] {
      _id, title, slug, date, preacher, type, duration, theme, youtubeId, excerpt
    }`,
    { limit },
    { next: { revalidate: 300 } }
  );
}

// ---------- Albums ----------
export async function getAlbums() {
  return sanityClient.fetch<Album[]>(
    `*[_type == "album"] | order(date desc) {
      _id, title, slug, date, "cover": cover.asset->url, description, featured,
      "count": count(photos)
    }`,
    {},
    { next: { revalidate: 600 } }
  );
}

export async function getAlbumBySlug(slug: string) {
  return sanityClient.fetch<Album | null>(
    `*[_type == "album" && slug.current == $slug][0] {
      _id, title, slug, date,
      "cover": cover.asset->url,
      "photos": photos[]{ "url": asset->url, "caption": caption },
      videos, description
    }`,
    { slug },
    { next: { revalidate: 600 } }
  );
}

// ---------- Équipe pastorale ----------
export async function getTeam() {
  return sanityClient.fetch<TeamMember[]>(
    `*[_type == "teamMember"] | order(order asc) {
      _id, name, role, bio, "photo": photo.asset->url
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
}

// ---------- FAQ ----------
export async function getFaqs() {
  return sanityClient.fetch<FaqItem[]>(
    `*[_type == "faq"] | order(order asc) { _id, "q": question, "a": answer }`,
    {},
    { next: { revalidate: 3600 } }
  );
}

// ---------- Contenus de pages ----------
export async function getPageContent(page: string) {
  return sanityClient.fetch<PageContent | null>(
    `*[_type == "pageContent" && page == $page][0] {
      _id, page, heroTitle, heroDescription, values, quote, body, seo
    }`,
    { page },
    { next: { revalidate: 3600 } }
  );
}

// ---------- Réglages du site (singleton) ----------
export async function getSiteSettings() {
  return sanityClient.fetch<SiteSettings | null>(
    `*[_type == "siteSettings"][0] {
      _id, name, fullName, denomination, quartier, commune, city, country,
      address, phone, whatsapp, email, social, donations, serviceHours
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
}

// ---------- Programme hebdomadaire ----------
export async function getWeeklyProgram() {
  return sanityClient.fetch<WeeklyProgramItem[]>(
    `*[_type == "weeklyProgram"] | order(order asc) {
      _id, day, time, title, description
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
}

// ---------- Statistiques (accueil) ----------
export async function getStats() {
  return sanityClient.fetch<StatItem[]>(
    `*[_type == "stat"] | order(order asc) {
      _id, icon, value, label
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
}

// ---------- Départements ----------
export async function getDepartments() {
  return sanityClient.fetch<Department[]>(
    `*[_type == "department"] | order(order asc) {
      _id, name, "logo": logo.asset->url, description
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
}

// ---------- Témoignages ----------
export async function getTestimonials() {
  return sanityClient.fetch<Testimonial[]>(
    `*[_type == "testimonial"] | order(order asc) {
      _id, text, author, role, "photo": photo.asset->url
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
}

// ---------- Types ----------
export type Event = {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  time: string;
  location: string;
  category: "culte" | "conference" | "jeunesse" | "femmes" | "hommes" | "special";
  description: string;
  featured?: boolean;
};

export type Sermon = {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  preacher: string;
  type: "audio" | "video" | "texte";
  duration: string;
  theme: string;
  youtubeId?: string;
  audioFile?: { asset: { url: string } };
  body?: any[];
  excerpt?: string;
  featured?: boolean;
};

export type Album = {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  cover?: string;
  photos?: { url: string; caption?: string }[];
  videos?: string[];
  description?: string;
  count?: number;
};

export type TeamMember = {
  _id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
};

export type FaqItem = { _id: string; q: string; a: string };

export type PageContent = {
  _id: string;
  page: string;
  heroTitle?: string;
  heroDescription?: string;
  values?: { icon: string; title: string; text: string }[];
  quote?: { text: string; reference: string };
  body?: any[];
  seo?: { title?: string; description?: string };
};

export type SiteSettings = {
  _id: string;
  name: string;
  fullName?: string;
  denomination?: string;
  quartier?: string;
  commune?: string;
  city?: string;
  country?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  social?: { youtube?: string; facebook?: string };
  donations?: { wave?: string; orangeMoney?: string };
  serviceHours?: string;
};

export type WeeklyProgramItem = {
  _id: string;
  day: string;
  time: string;
  title: string;
  description?: string;
};

export type StatItem = {
  _id: string;
  icon: string;
  value: string;
  label: string;
};

export type Department = {
  _id: string;
  name: string;
  logo?: string;
  description?: string;
};

export type Testimonial = {
  _id: string;
  text: string;
  author: string;
  role?: string;
  photo?: string;
};