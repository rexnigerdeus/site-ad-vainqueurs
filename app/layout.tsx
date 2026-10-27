import type { Metadata, Viewport } from "next";
import { Anton, Bebas_Neue, Great_Vibes, Poppins } from "next/font/google";
import "./globals.css";
import { siteConfig, buildMetadata, jsonLdOrganization, jsonLdWebsite } from "@/lib/site";
import { ScrollProgress } from "@/components/motion/ScrollProgress";

/**
 * Police corps : Poppins.
 * Police titres : Anton — même allure qu'Impact, mais chargée partout
 * (Impact n'existe ni sur Android ni sur iOS, où les titres retombaient en police générique).
 * Charte PENIEL : Bebas Neue (titres condensés) et Great Vibes (manuscrite).
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-condensed",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const KEYWORDS = [
  "église",
  "Assemblées de Dieu",
  "Abidjan",
  "Port-Bouët",
  "Vridi",
  "Temple des Vainqueurs",
  "prédications",
  "culte",
  "évangélique",
  "Côte d'Ivoire",
  "AD Vainqueurs",
  "PENIEL",
  "jeûne et prière",
];
// Calculé à chaque rendu : l'aperçu de partage par défaut suit la période PENIEL.
export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    ...buildMetadata({ description: siteConfig.description }),
    title: {
      default: `${siteConfig.name} — Assemblées de Dieu, Abidjan Port-Bouët`,
      template: `%s — ${siteConfig.name}`,
    },
    keywords: KEYWORDS,
    authors: [{ name: siteConfig.name }],
    robots: { index: true, follow: true },
    icons: {
      icon: [{ url: "/logo.png", type: "image/png" }],
      apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
    },
  };
}


export const viewport: Viewport = {
  themeColor: "#0B1E3F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${poppins.variable} ${anton.variable} ${bebas.variable} ${greatVibes.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen overflow-x-clip bg-night text-ivory">
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLdOrganization, jsonLdWebsite]) }}
        />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}