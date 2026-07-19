"use server";

import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Le nom doit faire au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  message: z.string().min(10, "Le message doit faire au moins 10 caractères"),
  // honeypot anti-spam — doit rester vide
  website: z.string().max(0, "Bot détecté").optional(),
});

export type ContactState = {
  success: boolean;
  errors?: Record<string, string>;
  message?: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    message: formData.get("message") as string,
    website: formData.get("website") as string,
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[issue.path[0] as string] = issue.message;
    }
    return { success: false, errors };
  }

  // TODO: intégrer Resend pour envoyer l'email à la secrétaire
  // Pour l'instant on log côté serveur
  console.log("[contact] Nouveau message:", parsed.data);

  return {
    success: true,
    message: "Merci ! Votre message a bien été envoyé. Nous vous répondrons rapidement.",
  };
}