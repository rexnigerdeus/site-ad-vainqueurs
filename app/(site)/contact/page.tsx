import { MapPin, Phone, Mail, Clock, Youtube, Facebook } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { Button } from "@/components/ui/button";
import { getSettings } from "@/lib/sanity/settings";
import { getPageContent } from "@/lib/sanity/queries";
import { pageMetadata } from "@/lib/sanity/metadata";

export function generateMetadata() {
  return pageMetadata("contact", {
    title: "Contact",
    description:
      "Contactez le Temple des Vainqueurs — formulaire, téléphone, WhatsApp, adresse à Vridi, Port-Bouët, Abidjan.",
  });
}

export default async function ContactPage() {
  const [s, content] = await Promise.all([
    getSettings(),
    getPageContent("contact").catch(() => null),
  ]);
  const header = content?.header;
  return (
    <>
      <PageHeader
        eyebrow={header?.eyebrow || "Contact"}
        title={header?.title || "Prenons contact"}
        description={header?.description || "Une question, une demande de prière, ou envie de nous visiter ? Écrivez-nous ou passez nous voir au temple."}
      />

      <section className="bg-night py-20 lg:py-28">
        <div className="container-section grid gap-12 lg:grid-cols-2">
          {/* Coordonnées */}
          <Reveal>
            <h2 className="font-display text-2xl tracking-tight-48 md:text-3xl">
              Nos coordonnées
            </h2>
            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium">Adresse</p>
                  <p className="text-ivory/70">{s.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium">Téléphone</p>
                  <a href={`tel:${s.phone}`} className="text-ivory/70 hover:text-gold">
                    {s.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium">Email</p>
                  <a href={`mailto:${s.email}`} className="text-ivory/70 hover:text-gold">
                    {s.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium">Horaires des cultes</p>
                  <p className="text-ivory/70">{s.serviceHours}</p>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="whatsapp">
                <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </Button>
              <a
                href={s.social.youtube}
                target="_blank"
                rel="noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full bg-white/5 text-ivory hover:bg-gold hover:text-night"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href={s.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full bg-white/5 text-ivory hover:bg-gold hover:text-night"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>

            {/* Carte */}
            <div className="mt-8 overflow-hidden rounded-6 border border-white/10">
              <iframe
                title="Localisation du temple"
                src={`https://www.google.com/maps?q=${encodeURIComponent(s.mapQuery)}&output=embed`}
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          {/* Formulaire */}
          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl tracking-tight-48 md:text-3xl">
              Envoyez-nous un message
            </h2>
            <p className="mt-3 text-ivory/70">
              Nous vous répondrons dans les plus brefs délais.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}