"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Youtube, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ResolvedSettings } from "@/lib/sanity/settings";

type NavLink = { href: string; label: string };

export function Header({
  settings,
  navLinks,
}: {
  settings: ResolvedSettings;
  navLinks: readonly NavLink[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-night/70 backdrop-blur-xl">
      <div className="container-section flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label={settings.name}>
          <Image
            src="/logo.png"
            alt={`${settings.name} — logo`}
            width={40}
            height={40}
            priority
            className="h-10 w-10 rounded-full object-cover ring-1 ring-gold/30"
          />
          <span className="hidden font-display text-lg tracking-tight-48 text-ivory sm:block">
            {settings.name}
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                pathname === l.href
                  ? "bg-white/10 text-gold"
                  : "text-ivory/80 hover:text-ivory"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA + réseaux */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={settings.social.youtube}
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
            className="text-ivory/70 hover:text-gold"
          >
            <Youtube className="h-5 w-5" />
          </a>
          <a
            href={settings.social.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="text-ivory/70 hover:text-gold"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <Button asChild size="sm" variant="whatsapp">
            <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </Button>
        </div>

        {/* Burger mobile */}
        <button
          className="grid h-10 w-10 place-items-center rounded-full text-ivory lg:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Nav mobile drawer */}
      {open && (
        <div className="border-t border-white/5 bg-night/95 backdrop-blur-xl lg:hidden">
          <nav
            className="container-section flex flex-col gap-1 py-4"
            aria-label="Navigation mobile"
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-base font-medium",
                  pathname === l.href
                    ? "bg-white/10 text-gold"
                    : "text-ivory/80 hover:bg-white/5"
                )}
              >
                {l.label}
              </Link>
            ))}
            <Button asChild variant="whatsapp" className="mt-3 w-full">
              <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer">
                Nous écrire sur WhatsApp
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}