import { defineField, defineType } from "sanity";

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
      options: {
        list: [
          { title: "Accueil", value: "home" },
          { title: "À propos", value: "about" },
          { title: "Activités", value: "activities" },
          { title: "Messages", value: "messages" },
          { title: "Galerie", value: "gallery" },
          { title: "Contact", value: "contact" },
          { title: "Dons", value: "donations" },
          { title: "Peniel", value: "peniel" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroTitle",
      title: "Titre principal (H1)",
      type: "string",
    }),
    defineField({
      name: "heroDescription",
      title: "Sous-titre / description du hero",
      type: "text",
      rows: 3,
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
    }),
    defineField({
      name: "quote",
      title: "Citation biblique",
      type: "object",
      fields: [
        { name: "text", title: "Texte de la citation", type: "string" },
        { name: "reference", title: "Référence (ex : Philippiens 4:13)", type: "string" },
      ],
      description: "Citation mise en avant sur la page (accueil, à propos, dons, peniel).",
    }),
    defineField({
      name: "body",
      title: "Corps de page (blocs)",
      type: "array",
      of: [{ type: "block" }],
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
    select: { title: "page", subtitle: "heroTitle" },
  },
});