import Link from "next/link";
import Image from "next/image";
import { Youtube, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react";
import type { ResolvedSettings } from "@/lib/sanity/settings";
import { Marquee } from "@/components/motion/Marquee";

type NavLink = { href: string; label: string };

export function Footer({
  settings,
  navLinks,
}: {
  settings: ResolvedSettings;
  navLinks: readonly NavLink[];
}) {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-night text-ivory">
      <div className="orb -right-32 top-0 h-80 w-80 bg-gold/10" />
      <div className="container-section relative grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
        {/* Identité */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt={`${settings.name} — logo`}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover ring-1 ring-gold/30"
            />
            <span className="font-display text-lg">
              {settings.name}
            </span>
          </div>
          <p className="mt-4 text-sm text-ivory/70">
            {settings.denomination} — {settings.city}, {settings.commune} ({settings.quartier}).
            Une communauté chrétienne évangélique engagée.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={settings.social.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/5 hover:bg-gold hover:text-night"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href={settings.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/5 hover:bg-gold hover:text-night"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <nav aria-label="Plan du site">
          <h2 className="font-display text-base text-gold">Navigation</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-ivory/70 hover:text-ivory transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="font-display text-base text-gold">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-ivory/70">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{settings.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:${settings.phone}`} className="hover:text-ivory">
                {settings.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${settings.email}`} className="break-all hover:text-ivory">
                {settings.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{settings.serviceHours}</span>
            </li>
          </ul>
        </div>

        {/* Dons */}
        <div>
          <h2 className="font-display text-base text-gold">Dons</h2>
          <p className="mt-4 text-sm text-ivory/70">
            Soutenez le ministère par Mobile Money :
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="rounded-lg bg-white/5 px-3 py-2">
              <span className="text-gold">Wave :</span> {settings.donations.wave}
            </li>
            <li className="rounded-lg bg-white/5 px-3 py-2">
              <span className="text-gold">Orange Money :</span> {settings.donations.orangeMoney}
            </li>
          </ul>
        </div>
      </div>

      {/* Grand nom de l'église qui défile */}
      <Marquee
        items={[settings.name, "Vridi · Port-Bouët · Abidjan"]}
        duration={45}
        className="relative border-t border-white/5 py-6"
        itemClassName="font-display text-6xl uppercase leading-none text-ivory/[0.08] sm:text-8xl lg:text-9xl"
        separator={<span aria-hidden="true" className="font-display text-5xl text-gold/30 sm:text-7xl">✦</span>}
      />

      <div className="relative border-t border-white/5">
        <div className="container-section flex flex-col items-center justify-between gap-2 py-5 pb-24 text-center text-xs text-ivory/50 sm:flex-row sm:pb-5 sm:text-left">
          <p>
            © {new Date().getFullYear()} {settings.fullName}. Tous droits réservés.
          </p>
          <p>« Je puis tout par Christ qui me fortifie. » — Philippiens 4:13</p>
        </div>
      </div>
    </footer>
  );
}