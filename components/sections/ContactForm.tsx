"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Send, CheckCircle2 } from "lucide-react";
import { submitContact, type ContactState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";

const initialState: ContactState = { success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Envoi en cours…" : (<><Send className="h-4 w-4" /> Envoyer le message</>)}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);

  if (state.success) {
    return (
      <div className="rounded-6 border border-gold/30 bg-gold/10 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
        <p className="mt-4 font-display text-xl text-ivory">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* Honeypot anti-spam — champ caché */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Ne pas remplir</label>
        <Input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Nom complet *</Label>
          <Input id="name" name="name" placeholder="Votre nom" required />
          {state.errors?.name && (
            <p className="mt-1 text-sm text-red-400">{state.errors.name}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" placeholder="vous@exemple.com" required />
          {state.errors?.email && (
            <p className="mt-1 text-sm text-red-400">{state.errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="phone">Téléphone (optionnel)</Label>
        <Input id="phone" name="phone" type="tel" placeholder="+225 00 00 00 00" />
      </div>

      <div>
        <Label htmlFor="message">Votre message *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Comment pouvons-nous vous aider ?"
          required
        />
        {state.errors?.message && (
          <p className="mt-1 text-sm text-red-400">{state.errors.message}</p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}