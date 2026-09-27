import { defineField, defineType } from "sanity";

export default defineType({
  name: "stat",
  title: "Statistique (accueil)",
  type: "document",
  description: "Chiffres clés affichés dans la section « Une communauté vivante » de la page d'accueil.",
  fields: [
    defineField({
      name: "icon",
      title: "Icône",
      type: "string",
      options: {
        list: [
          { title: "👥 Fidèles", value: "Users" },
          { title: "📅 Calendrier", value: "Calendar" },
          { title: "🌍 Globe", value: "Globe" },
          { title: "❤️ Cœur", value: "Heart" },
        ],
      },
      initialValue: "Users",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "value",
      title: "Valeur (ex : 500+, 10 ans)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Libellé (ex : Fidèles, de ministère)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      initialValue: 10,
    }),
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
});