/**
 * Dernières vidéos de la chaîne YouTube officielle, via le flux RSS public
 * (pas de clé API). Mis en cache 1h (ISR).
 *
 * Une prédication Sanity avec le même youtubeId enrichit la vidéo
 * (titre, prédicateur, thème, texte).
 */
import { CHURCH } from "@/lib/church";
import { getSermons, type Sermon } from "@/lib/sanity/queries";

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHURCH.youtubeChannelId}`;
export const YT_SLUG_PREFIX = "yt-";

function decode(s: string) {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function tag(xml: string, name: string) {
  const m = xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1].trim()) : "";
}

function toSermon(videoId: string, title: string, date: string, description = ""): Sermon {
  return {
    _id: `${YT_SLUG_PREFIX}${videoId}`,
    slug: { current: `${YT_SLUG_PREFIX}${videoId}` },
    title,
    date,
    preacher: "",
    type: "video",
    duration: "",
    theme: "",
    youtubeId: videoId,
    excerpt: description,
  };
}

/** Vidéos du flux (15 max, plus récentes d'abord). */
export async function getYoutubeVideos(): Promise<Sermon[]> {
  const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`YouTube feed ${res.status}`);
  const xml = await res.text();
  return xml
    .split("<entry>")
    .slice(1)
    .map((entry) =>
      toSermon(
        tag(entry, "yt:videoId"),
        tag(entry, "title"),
        tag(entry, "published"),
        tag(entry, "media:description")
      )
    )
    .filter((s) => s.youtubeId);
}

/** Fusionne une vidéo avec la prédication Sanity correspondante, si elle existe. */
function enrich(video: Sermon, sanity: Sermon[]): Sermon {
  const doc = sanity.find((s) => s.youtubeId === video.youtubeId);
  return doc ? { ...video, ...doc, excerpt: doc.excerpt || video.excerpt } : video;
}

/**
 * Les `limit` dernières vidéos YouTube, enrichies par Sanity.
 * Si le flux est indisponible, retombe sur les prédications Sanity.
 */
export async function getLatestSermons(limit = 6): Promise<Sermon[]> {
  const [videos, sanity] = await Promise.all([
    getYoutubeVideos().catch((e) => {
      console.error("[youtube] feed fetch failed:", e);
      return null;
    }),
    getSermons(100).catch(() => [] as Sermon[]),
  ]);
  if (!videos) return sanity.slice(0, limit);
  return videos.slice(0, limit).map((v) => enrich(v, sanity));
}

/** Une vidéo par ID : depuis le flux, sinon via oEmbed (vidéos plus anciennes). */
export async function getYoutubeSermon(videoId: string): Promise<Sermon | null> {
  const videos = await getYoutubeVideos().catch(() => [] as Sermon[]);
  const fromFeed = videos.find((v) => v.youtubeId === videoId);
  if (fromFeed) return fromFeed;
  const res = await fetch(
    `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}`,
    { next: { revalidate: 86400 } }
  ).catch(() => null);
  if (!res?.ok) return null;
  const data = (await res.json()) as { title?: string };
  return data.title ? toSermon(videoId, data.title, "") : null;
}
