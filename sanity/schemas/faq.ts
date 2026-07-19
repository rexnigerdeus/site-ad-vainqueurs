import { defineField, defineType } from "sanity";

export default defineType({
  name: "faq",
  title: "Question fréquente",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required().min(10).max(200),
    }),
    defineField({
      name: "answer",
      title: "Réponse",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required().min(20).max(800),
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      initialValue: 10,
    }),
  ],
  preview: {
    select: { title: "question", subtitle: "answer" },
  },
});