import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";

/**
 * Layout des pages publiques du site.
 * Le root layout (app/layout.tsx) gère <html>, <body>, les fonts et les metadata.
 * Ce layout ajoute le Header, le Footer et le WhatsApp FAB autour du contenu.
 * La route /studio est hors de ce groupe et n'hérite donc pas de Header/Footer.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20">{children}</main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}