import { defineField, defineType } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Membre de l'équipe pastorale",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom complet",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(80),
    }),
    defineField({
      name: "role",
      title: "Rôle (ex : Pasteur principal, Diacre...)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Biographie",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(20).max(600),
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      description: "0 = premier affiché. Utilisé pour trier la page À propos.",
      initialValue: 10,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});