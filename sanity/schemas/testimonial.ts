import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Témoignage",
  type: "document",
  description: "Témoignages des fidèles affichés sur la page d'accueil.",
  fields: [
    defineField({
      name: "text",
      title: "Texte du témoignage",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(10).max(400),
    }),
    defineField({
      name: "author",
      title: "Auteur",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rôle / Fonction",
      type: "string",
      description: "Ex : Membre depuis 2018, Jeune vainqueur, Diaspora — France",
    }),
    defineField({
      name: "photo",
      title: "Photo (optionnel)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      initialValue: 10,
    }),
  ],
  preview: {
    select: { title: "author", subtitle: "role", media: "photo" },
  },
});