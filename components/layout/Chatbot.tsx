"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, RotateCcw } from "lucide-react";

type Question = { id: string; question: string };
type ChatLink = { label: string; href: string };
type Message = { from: "bot" | "user"; text: string; links?: ChatLink[] };

/**
 * Chatbot à boutons, pensé mobile d'abord :
 *  - un petit bouton rond avec le logo de l'église, en bas à gauche ;
 *  - sur téléphone, le chat s'ouvre en « tiroir » depuis le bas de l'écran ;
 *  - les questions sont de grands boutons faciles à toucher.
 * Les données viennent de l'API Python /api/chatbot (voir api/_chatbot_data.py).
 */
export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [welcome, setWelcome] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || questions.length > 0) return;
    fetch("/api/chatbot")
      .then((r) => r.json())
      .then((d) => {
        setQuestions(d.questions);
        setWelcome(d.welcome);
        setMessages([{ from: "bot", text: d.welcome }]);
      })
      .catch(() => setError(true));
  }, [open, questions.length]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  // Ferme avec la touche Echap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function ask(q: Question) {
    setMessages((m) => [...m, { from: "user", text: q.question }]);
    setLoading(true);
    try {
      const r = await fetch(`/api/chatbot?id=${encodeURIComponent(q.id)}`);
      const d = await r.json();
      setMessages((m) => [...m, { from: "bot", text: d.answer ?? d.error, links: d.links }]);
    } catch {
      setMessages((m) => [
        ...m,
        { from: "bot", text: "Désolé, une erreur est survenue. Réessayez ou écrivez-nous sur WhatsApp." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <>
          {/* Fond sombre sur mobile : toucher pour fermer */}
          <div
            className="fixed inset-0 z-40 bg-black/40 sm:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-label="Assistant du Temple des Vainqueurs"
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col overflow-hidden rounded-t-3xl border border-gold/30 bg-night text-ivory shadow-2xl sm:inset-x-auto sm:bottom-24 sm:left-6 sm:w-96 sm:rounded-2xl"
          >
            {/* En-tête */}
            <div className="flex items-center gap-3 border-b border-gold/20 px-4 py-3">
              <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" />
              <div className="flex-1 leading-tight">
                <p className="font-display text-lg text-gold">Temple des Vainqueurs</p>
                <p className="text-xs text-ivory/60">Posez-nous une question</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="grid h-10 w-10 place-items-center rounded-full text-ivory/80 hover:bg-ivory/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Conversation */}
            <div className="min-h-[9rem] flex-1 space-y-3 overflow-y-auto px-4 py-3 text-[15px] leading-relaxed">
              {error && <p>Le chatbot est momentanément indisponible. Écrivez-nous via la page Contact.</p>}
              {messages.map((m, i) => (
                <div key={i} className={m.from === "user" ? "text-right" : ""}>
                  <p
                    className={
                      "inline-block max-w-[92%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-left " +
                      (m.from === "user" ? "bg-gold text-night" : "bg-ivory/10")
                    }
                  >
                    {m.text}
                  </p>
                  {m.links && m.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.links.map((l) => {
                        const cls =
                          "rounded-full border border-gold px-3.5 py-2 text-sm text-gold active:bg-gold active:text-night";
                        return l.href.startsWith("http") ? (
                          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>
                            {l.label} ↗
                          </a>
                        ) : (
                          <Link key={l.href} href={l.href} className={cls}>
                            {l.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
              {loading && <p className="text-ivory/60">…</p>}
              <div ref={endRef} />
            </div>

            {/* Questions : grands boutons faciles à toucher */}
            <div className="max-h-[38dvh] space-y-2 overflow-y-auto border-t border-gold/20 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
              {messages.length > 1 && (
                <button
                  onClick={() => setMessages([{ from: "bot", text: welcome }])}
                  className="flex items-center gap-1.5 py-1 text-xs text-ivory/60 active:text-ivory"
                >
                  <RotateCcw className="h-3 w-3" /> Recommencer
                </button>
              )}
              {questions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => ask(q)}
                  disabled={loading}
                  className="block min-h-11 w-full rounded-xl border border-gold/40 px-3.5 py-2.5 text-left text-sm active:bg-gold active:text-night disabled:opacity-50"
                >
                  {q.question}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Petit bouton rond : logo de l'église (masqué quand le chat est ouvert sur mobile) */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fermer l'assistant" : "Poser une question"}
        className={
          "fixed bottom-4 left-4 z-50 h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-night p-1 shadow-lg shadow-black/40 transition active:scale-95 sm:bottom-6 sm:left-6 " +
          (open ? "hidden sm:flex" : "flex")
        }
      >
        <Image src="/logo.png" alt="Temple des Vainqueurs" width={48} height={48} className="h-full w-full object-contain" />
        {!open && <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-night bg-[#25D366]" />}
      </button>
    </>
  );
}
