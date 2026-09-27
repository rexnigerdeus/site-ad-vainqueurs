import { defineField, defineType } from "sanity";

/**
 * Réglages globaux du site (singleton).
 * Coordonnées, réseaux sociaux, numéros de dons, horaires de culte.
 * Un seul document — éditer les valeurs directement dans le Studio.
 */
export default defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  description:
    "Coordonnées de l'église, réseaux sociaux et numéros de dons. " +
    "Un seul document — modifiez les valeurs ci-dessous.",
  fields: [
    defineField({
      name: "name",
      title: "Nom de l'église",
      type: "string",
      initialValue: "Temple des Vainqueurs",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fullName",
      title: "Nom complet (officiel)",
      type: "string",
      initialValue: "Temple des Assemblées de Dieu — Temple des Vainqueurs",
    }),
    defineField({
      name: "denomination",
      title: "Dénomination",
      type: "string",
      initialValue: "Assemblées de Dieu",
    }),
    defineField({
      name: "quartier",
      title: "Quartier",
      type: "string",
      initialValue: "Vridi",
    }),
    defineField({
      name: "commune",
      title: "Commune",
      type: "string",
      initialValue: "Port-Bouët",
    }),
    defineField({
      name: "city",
      title: "Ville",
      type: "string",
      initialValue: "Abidjan",
    }),
    defineField({
      name: "country",
      title: "Pays",
      type: "string",
      initialValue: "Côte d'Ivoire",
    }),
    defineField({
      name: "address",
      title: "Adresse complète",
      type: "string",
      initialValue: "Vridi, Port-Bouët, Abidjan, Côte d'Ivoire",
    }),
    defineField({
      name: "phone",
      title: "Téléphone",
      type: "string",
      description: "Format affiché, ex : +225 00 00 00 00",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp (numéro sans + ni espaces)",
      type: "string",
      description: "Ex : 22500000000",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "social",
      title: "Réseaux sociaux",
      type: "object",
      fields: [
        { name: "youtube", title: "YouTube (URL)", type: "string" },
        { name: "facebook", title: "Facebook (URL)", type: "string" },
      ],
    }),
    defineField({
      name: "donations",
      title: "Numéros de dons (Mobile Money)",
      type: "object",
      fields: [
        { name: "wave", title: "Wave", type: "string" },
        { name: "orangeMoney", title: "Orange Money", type: "string" },
      ],
    }),
    defineField({
      name: "serviceHours",
      title: "Horaires des cultes (texte libre)",
      type: "string",
      description: "Ex : Dimanche 9h00 · Mercredi 18h00 · Vendredi 18h00",
      initialValue: "Dimanche 9h00 · Mercredi 18h00 · Vendredi 18h00",
    }),
  ],
  preview: {
    select: { title: "name" },
  },
});