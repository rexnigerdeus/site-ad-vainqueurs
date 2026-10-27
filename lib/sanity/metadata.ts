import type { Metadata } from "next";
import { getPageContent } from "@/lib/sanity/queries";
import { buildMetadata } from "@/lib/site";

/**
 * Helper : metadata d'une page depuis le champ SEO de son document
 * pageContent, avec fallback sur les valeurs codées en dur.
 * `path` donne le lien canonique de la page.
 */
export async function pageMetadata(
  page: string,
  path: string,
  fallback: { title: string; description: string }
): Promise<Metadata> {
  const content = await getPageContent(page).catch(() => null);
  const title = content?.seo?.title || fallback.title;
  const description = content?.seo?.description || fallback.description;
  const ogImage = content?.seo?.ogImage;
  return buildMetadata({ title, description, path, ...(ogImage && { image: { url: ogImage } }) });
}
