import { defineField, defineType } from "sanity";

export default defineType({
  name: "album",
  title: "Album galerie",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Image de couverture",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              title: "Légende (optionnel)",
              type: "string",
            },
          ],
        },
      ],
      options: { layout: "grid" },
    }),
    defineField({
      name: "videos",
      title: "Vidéos YouTube (IDs)",
      type: "array",
      of: [{ type: "string" }],
      description: "Liste d'IDs vidéo YouTube (ex : dQw4w9WgXcQ).",
    }),
    defineField({
      name: "description",
      title: "Description (optionnel)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "featured",
      title: "Mettre en avant (page d'accueil)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "date", media: "cover" },
  },
});