import { defineField, defineType } from "sanity";

export default defineType({
  name: "weeklyProgram",
  title: "Programme hebdomadaire",
  type: "document",
  description:
    "Rendez-vous réguliers de l'église (culte dominical, étude biblique, veillée, jeunesse). " +
    "Affichés sur la page Activités.",
  fields: [
    defineField({
      name: "day",
      title: "Jour",
      type: "string",
      options: {
        list: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "time",
      title: "Heure (ex : 09h00)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Titre (ex : Culte dominical)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description courte",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      initialValue: 10,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "day" },
  },
});