"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Youtube, Facebook, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ResolvedSettings } from "@/lib/sanity/settings";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";

type NavLink = { href: string; label: string };

/**
 * En-tête fixe : se fait discret en descendant, revient dès qu'on remonte.
 * Sur téléphone, le menu s'ouvre en plein écran avec de grands liens faciles à toucher.
 * Pendant PENIEL, le lien « Peniel » est mis en avant aux couleurs de l'événement.
 */
export function Header({
  settings,
  navLinks,
  penielSeason = false,
}: {
  settings: ResolvedSettings;
  navLinks: readonly NavLink[];
  penielSeason?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Masque en descendant, réaffiche en remontant
  React.useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 160);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu à chaque changement de page
  React.useEffect(() => setOpen(false), [pathname]);

  // Bloque le défilement de la page et ferme avec Échap quand le menu est ouvert
  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useGSAP(
    () => {
      if (!open) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-menu-link]", { yPercent: 110, duration: 0.7, ease: "expo.out", stagger: 0.06, delay: 0.1 });
        gsap.from("[data-menu-foot]", { opacity: 0, y: 20, duration: 0.6, delay: 0.45 });
      });
      return () => mm.revert();
    },
    { scope: menuRef, dependencies: [open] }
  );

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[56] transition-[transform,background-color,border-color] duration-500",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          scrolled || open ? "border-b border-white/10 bg-night/80 backdrop-blur-xl" : "border-b border-transparent bg-night/40 backdrop-blur-md"
        )}
      >
        <div className="container-section flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5" aria-label={settings.name}>
            <Image
              src="/logo.png"
              alt={`${settings.name} — logo`}
              width={40}
              height={40}
              priority
              className="h-10 w-10 rounded-full object-cover ring-1 ring-gold/30 transition-transform duration-500 group-hover:rotate-[360deg]"
            />
            <span className="hidden font-display text-lg uppercase tracking-wide text-ivory sm:block">
              {settings.name}
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
            {navLinks.map((l) => {
              const peniel = penielSeason && l.href === "/peniel";
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    peniel
                      ? "bg-peniel-fire font-bold text-white shadow-lg shadow-peniel-orange/30 hover:brightness-110"
                      : isActive(l.href)
                        ? "bg-white/10 text-gold"
                        : "text-ivory/80 hover:bg-white/5 hover:text-ivory"
                  )}
                >
                  {peniel && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-peniel-amber opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-peniel-amber" />
                    </span>
                  )}
                  {peniel ? "PENIEL 2026" : l.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + réseaux */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={settings.social.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="text-ivory/70 transition-colors hover:text-gold"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href={settings.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="text-ivory/70 transition-colors hover:text-gold"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <Button asChild size="sm" variant="whatsapp">
              <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile : raccourci PENIEL + burger */}
          <div className="flex items-center gap-2 lg:hidden">
            {penielSeason && pathname !== "/peniel" && (
              <Link
                href="/peniel"
                className="rounded-full bg-peniel-fire px-3.5 py-1.5 text-xs font-bold text-white shadow-lg shadow-peniel-orange/30"
              >
                PENIEL
              </Link>
            )}
            <button
              className="grid h-11 w-11 place-items-center rounded-full bg-white/5 text-ivory ring-1 ring-white/10"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      {open && (
        <div
          ref={menuRef}
          id="menu-mobile"
          className="fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-night pt-16 md:pt-20 lg:hidden"
        >
          <div className="orb -right-20 top-20 h-72 w-72 bg-gold/20" />
          <div className="orb -left-20 bottom-20 h-72 w-72 bg-peniel-indigo/40 [animation-delay:-5s]" />
          <nav className="container-section relative flex flex-1 flex-col justify-center gap-1 py-8" aria-label="Navigation mobile">
            {navLinks.map((l, i) => {
              const peniel = penielSeason && l.href === "/peniel";
              return (
                <div key={l.href} className="overflow-hidden">
                  <Link
                    data-menu-link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-baseline gap-4 py-1.5 font-display text-[2.6rem] uppercase leading-none sm:text-6xl",
                      peniel ? "text-fire" : isActive(l.href) ? "text-gold" : "text-ivory"
                    )}
                  >
                    <span className="font-sans text-xs font-semibold text-ivory/40">0{i + 1}</span>
                    {peniel ? "PENIEL 2026" : l.label}
                  </Link>
                </div>
              );
            })}
          </nav>
          <div data-menu-foot className="container-section relative space-y-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
            <Button asChild variant="whatsapp" size="lg" className="w-full">
              <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer">
                Nous écrire sur WhatsApp
              </a>
            </Button>
            <div className="flex justify-center gap-6 text-sm text-ivory/70">
              <a href={settings.social.youtube} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-gold">
                YouTube <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href={settings.social.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-gold">
                Facebook <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
