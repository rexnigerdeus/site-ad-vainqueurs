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
      _id, page, heroTitle, heroDescription, body, seo
    }`,
    { page },
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
  body?: any[];
  seo?: { title?: string; description?: string };
};