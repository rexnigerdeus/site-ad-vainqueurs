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