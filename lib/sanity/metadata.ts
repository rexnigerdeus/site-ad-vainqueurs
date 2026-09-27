import type { Metadata } from "next";
import { getPageContent } from "@/lib/sanity/queries";

/**
 * Helper : metadata d'une page depuis le champ SEO de son document
 * pageContent, avec fallback sur les valeurs codées en dur.
 */
export async function pageMetadata(
  page: string,
  fallback: { title: string; description: string }
): Promise<Metadata> {
  const content = await getPageContent(page).catch(() => null);
  const title = content?.seo?.title || fallback.title;
  const description = content?.seo?.description || fallback.description;
  const ogImage = content?.seo?.ogImage;
  return {
    title,
    description,
    ...(ogImage && { openGraph: { images: [{ url: ogImage }] } }),
  };
}
