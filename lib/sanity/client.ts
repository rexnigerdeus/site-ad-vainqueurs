import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, token } from "./env";

/**
 * Client Sanity read-only côté serveur (Server Components, Server Actions).
 * Token requis pour bypass CORS en lecture privée ; optionnel en lecture publique.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: true, // CDN edge — perf optimale faible débit
  perspective: "published",
});

/**
 * Client read-only sans token (lecture publique si dataset public).
 * À utiliser dans les Client Components (jamais de token côté client).
 */
export const sanityClientPublic = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});