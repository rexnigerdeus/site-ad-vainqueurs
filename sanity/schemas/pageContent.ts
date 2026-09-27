import { defineField, defineType } from "sanity";

export const PAGES = [
  { title: "Accueil", value: "home" },
  { title: "À propos", value: "about" },
  { title: "Activités", value: "activities" },
  { title: "Messages", value: "messages" },
  { title: "Galerie", value: "gallery" },
  { title: "Contact", value: "contact" },
  { title: "Dons", value: "donations" },
  { title: "Peniel", value: "peniel" },
];

export default defineType({
  name: "pageContent",
  title: "Contenu de page",
  type: "document",
  description:
    "Contenu éditorial des pages (hero, description, paragraphes personnalisés). " +
    "Créez un document par page du site.",
  fields: [
    defineField({
      name: "page",
      title: "Page concernée",
      type: "string",
      readOnly: ({ document }) => Boolean(document?.page),
      options: {
        list: PAGES,
      },
      validation: (Rule) =>
        Rule.required().custom(async (page, context) => {
          if (!page) return true;
          const id = (context.document?._id || "").replace(/^drafts\./, "");
          const client = context.getClient({ apiVersion: "2024-10-01" });
          const count = await client.fetch(
            `count(*[_type == "pageContent" && page == $page && !(_id in [$id, "drafts." + $id])])`,
            { page, id }
          );
          return count === 0 || "Un document existe déjà pour cette page.";
        }),
    }),
    defineField({
      name: "header",
      title: "Bandeau de page",
      type: "object",
      description:
        "Grand bandeau en haut de la page. Sur l'accueil : badge, titre et texte du hero.",
      fields: [
        { name: "eyebrow", title: "Surtitre (petit texte doré)", type: "string" },
        { name: "title", title: "Titre (H1)", type: "string" },
        { name: "description", title: "Description", type: "text", rows: 3 },
      ],
    }),
    defineField({
      name: "heroTitle",
      title: "Titre de section",
      type: "string",
      description:
        "Accueil : section « À propos de nous ». À propos : « Notre histoire ». Peniel : section « Vision ».",
      hidden: ({ document }) => !["home", "about", "peniel"].includes(document?.page as string),
    }),
    defineField({
      name: "heroDescription",
      title: "Texte de section",
      type: "text",
      rows: 3,
      description: "Accueil : paragraphe de la section « À propos de nous ».",
      hidden: ({ document }) => document?.page !== "home",
    }),
    defineField({
      name: "values",
      title: "Valeurs / Piliers (cartes)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Icône", type: "string", options: { list: [
              { title: "❤️ Amour", value: "Heart" },
              { title: "🤲 Prière", value: "HandHeart" },
              { title: "📖 Parole", value: "BookOpen" },
              { title: "👥 Communion", value: "Users" },
              { title: "✝️ Foi", value: "Cross" },
              { title: "👁️ Vision", value: "Eye" },
            ] } },
            { name: "title", title: "Titre", type: "string" },
            { name: "text", title: "Texte", type: "string" },
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        },
      ],
      description: "Cartes affichées dans les sections « valeurs » (accueil, à propos).",
      hidden: ({ document }) => !["home", "about"].includes(document?.page as string),
    }),
    defineField({
      name: "quote",
      title: "Citation biblique",
      type: "object",
      fields: [
        { name: "text", title: "Texte de la citation", type: "string" },
        { name: "reference", title: "Référence (ex : Philippiens 4:13)", type: "string" },
      ],
      description: "Citation mise en avant sur la page (accueil, à propos, dons, peniel « Préparez votre cœur »).",
      hidden: ({ document }) => !["home", "about", "donations", "peniel"].includes(document?.page as string),
    }),
    defineField({
      name: "body",
      title: "Corps de page (blocs)",
      type: "array",
      of: [{ type: "block" }],
      description: "À propos : texte « Notre histoire ». Peniel : texte de la section « Vision ».",
      hidden: ({ document }) => !["about", "peniel"].includes(document?.page as string),
    }),
    defineField({
      name: "programme",
      title: "Programme",
      type: "array",
      description: "Peniel : programme du mois.",
      hidden: ({ document }) => document?.page !== "peniel",
      of: [
        {
          type: "object",
          fields: [
            { name: "day", title: "Jour (ex : 1er Nov., Chaque jour)", type: "string" },
            { name: "time", title: "Heure (ex : 18h00)", type: "string" },
            { name: "title", title: "Titre", type: "string" },
            { name: "description", title: "Description", type: "string" },
          ],
          preview: { select: { title: "title", subtitle: "day" } },
        },
      ],
    }),
    defineField({
      name: "verses",
      title: "Versets",
      type: "array",
      description: "Peniel : versets affichés à côté de la section « Vision ».",
      hidden: ({ document }) => document?.page !== "peniel",
      of: [
        {
          type: "object",
          fields: [
            { name: "text", title: "Texte", type: "text", rows: 2 },
            { name: "reference", title: "Référence", type: "string" },
          ],
          preview: { select: { title: "reference", subtitle: "text" } },
        },
      ],
    }),
    defineField({
      name: "eventInfo",
      title: "Infos pratiques",
      type: "object",
      description: "Peniel : bandeau doré (le lieu vient des réglages du site).",
      hidden: ({ document }) => document?.page !== "peniel",
      fields: [
        { name: "dates", title: "Dates (ex : 1er — 30 Novembre 2026)", type: "string" },
        { name: "audience", title: "Pour qui ?", type: "string" },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "title", title: "Meta title", type: "string" },
        { name: "description", title: "Meta description", type: "text", rows: 2 },
        { name: "ogImage", title: "Image Open Graph", type: "image", options: { hotspot: true } },
      ],
    }),
  ],
  preview: {
    select: { page: "page", subtitle: "header.title" },
    prepare: ({ page, subtitle }) => ({
      title: PAGES.find((p) => p.value === page)?.title || page,
      subtitle,
    }),
  },
});