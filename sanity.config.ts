import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./sanity/schemas";

/**
 * Configuration Sanity Studio.
 *
 * projectId est PUBLIC (pas un secret) — on le code en dur pour éviter
 * les soucis de chargement d'env côté Vite (Studio).
 * Le token read-only reste dans .env.local, utilisé uniquement par Next.js.
 *
 * Pour changer de dataset, éditez la constante ci-dessous ou définissez
 * SANITY_STUDIO_DATASET dans votre shell.
 */
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "w3xhihed";
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "temple-vainqueurs",
  title: "Temple des Vainqueurs — CMS",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenu")
          .items([
            S.listItem()
              .title("Réglages du site")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            S.listItem().title("Programme hebdomadaire").child(S.documentTypeList("weeklyProgram").title("Programme hebdomadaire")),
            S.listItem().title("Événements").child(S.documentTypeList("event").title("Événements")),
            S.listItem().title("Prédications").child(S.documentTypeList("sermon").title("Prédications")),
            S.listItem().title("Albums").child(S.documentTypeList("album").title("Albums galerie")),
            S.listItem().title("Équipe pastorale").child(S.documentTypeList("teamMember").title("Équipe pastorale")),
            S.listItem().title("FAQ").child(S.documentTypeList("faq").title("Questions fréquentes")),
            S.divider(),
            S.listItem().title("Statistiques (accueil)").child(S.documentTypeList("stat").title("Statistiques")),
            S.listItem().title("Départements").child(S.documentTypeList("department").title("Départements")),
            S.listItem().title("Témoignages").child(S.documentTypeList("testimonial").title("Témoignages")),
            S.listItem().title("Contenus de pages").child(S.documentTypeList("pageContent").title("Contenus de pages")),
          ]),
    }),
    visionTool(),
  ],
  schema,
});