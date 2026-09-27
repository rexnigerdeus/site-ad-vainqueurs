import { defineField, defineType } from "sanity";

export default defineType({
  name: "sermon",
  title: "Prédication",
  type: "document",
  description:
    "Les 6 dernières vidéos de la chaîne YouTube s'affichent automatiquement sur le site. " +
    "Créez une prédication ici seulement pour l'audio / le texte, ou pour enrichir une vidéo " +
    "(prédicateur, thème, texte) en renseignant son ID YouTube.",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(160),
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
      name: "preacher",
      title: "Prédicateur",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type de contenu",
      type: "string",
      options: {
        list: [
          { title: "Vidéo", value: "video" },
          { title: "Audio", value: "audio" },
          { title: "Texte", value: "texte" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Durée (ex : 42 min)",
      type: "string",
    }),
    defineField({
      name: "theme",
      title: "Thème",
      type: "string",
      options: {
        list: ["Foi", "Prière", "Amour", "Promesses", "Salut", "Combat", "Espérance", "Santé", "Famille", "Finances"],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "youtubeId",
      title: "ID vidéo YouTube (ex : dQw4w9WgXcQ)",
      type: "string",
      description:
        "Pour les prédications vidéo : la partie après « v= » dans le lien YouTube. Laisser vide pour l'audio/texte.",
    }),
    defineField({
      name: "audioFile",
      title: "Fichier audio MP3",
      type: "file",
      options: { accept: "audio/mpeg,audio/mp3" },
      description: "À utiliser pour les prédications audio (si pas de YouTube).",
    }),
    defineField({
      name: "thumbnail",
      title: "Miniature personnalisée (optionnel)",
      type: "image",
      options: { hotspot: true },
      description: "Si non renseigné, la miniature YouTube sera utilisée automatiquement.",
    }),
    defineField({
      name: "body",
      title: "Texte complet (pour le type 'texte')",
      type: "array",
      of: [{ type: "block" }],
      description: "Transcription ou texte de la prédication.",
    }),
    defineField({
      name: "excerpt",
      title: "Extrait court",
      type: "text",
      rows: 3,
      description: "Résumé affiché dans la bibliothèque de prédications.",
    }),
    defineField({
      name: "featured",
      title: "Mettre en avant (page d'accueil)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "preacher", media: "thumbnail" },
  },
});