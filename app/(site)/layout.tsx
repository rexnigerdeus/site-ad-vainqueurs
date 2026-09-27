import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { getSettings } from "@/lib/sanity/settings";
import { NAV_LINKS } from "@/lib/church";

/**
 * Layout des pages publiques du site.
 * Le root layout (app/layout.tsx) gère <html>, <body>, les fonts et les metadata.
 * Ce layout ajoute le Header, le Footer et le WhatsApp FAB autour du contenu.
 * La route /studio est hors de ce groupe et n'hérite donc pas de Header/Footer.
 * Les coordonnées de l'église sont récupérées depuis Sanity (siteSettings) avec
 * fallback sur les constantes codées en dur de lib/church.ts.
 */
export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();
  const navLinks = NAV_LINKS;

  return (
    <>
      <Header settings={settings} navLinks={navLinks} />
      <main className="pt-16 md:pt-20">{children}</main>
      <Footer settings={settings} navLinks={navLinks} />
      <WhatsAppFab whatsapp={settings.whatsapp} />
    </>
  );
}