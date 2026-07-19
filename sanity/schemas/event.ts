import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Événement",
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
      name: "time",
      title: "Heure (ex : 09h00)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Lieu",
      type: "string",
      initialValue: "Temple — Vridi",
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Culte", value: "culte" },
          { title: "Conférence", value: "conference" },
          { title: "Jeunesse", value: "jeunesse" },
          { title: "Femmes", value: "femmes" },
          { title: "Hommes", value: "hommes" },
          { title: "Événement spécial", value: "special" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(10).max(400),
    }),
    defineField({
      name: "featured",
      title: "Mettre en avant (page d'accueil)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "date", media: "category" },
  },
});