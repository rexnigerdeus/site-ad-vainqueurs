"use client";

import * as React from "react";
import { Check, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Partage natif sur téléphone (WhatsApp, Facebook…), copie du lien ailleurs. */
export function ShareButton({
  title,
  text,
  path,
  className,
}: {
  title: string;
  text: string;
  path: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  async function share() {
    const url = new URL(path, window.location.origin).toString();
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // partage annulé par l'utilisateur
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copiez le lien :", url);
    }
  }

  return (
    <button type="button" onClick={share} className={cn("inline-flex items-center justify-center gap-2", className)}>
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      {copied ? "Lien copié" : "Partager"}
    </button>
  );
}
