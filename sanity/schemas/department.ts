import { defineField, defineType } from "sanity";

export default defineType({
  name: "department",
  title: "Département",
  type: "document",
  description:
    "Départements et ministères de l'église affichés dans le carrousel de la page d'accueil.",
  fields: [
    defineField({
      name: "name",
      title: "Nom du département",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: "logo",
      title: "Logo / Image",
      type: "image",
      options: { hotspot: true },
      description: "Image carrée affichée dans le carrousel circulaire.",
    }),
    defineField({
      name: "description",
      title: "Description (optionnel)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      initialValue: 10,
    }),
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});