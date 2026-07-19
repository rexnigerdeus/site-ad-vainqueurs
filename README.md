# Temple des Vainqueurs — Site Web

Site institutionnel du Temple des Assemblées de Dieu — Temple des Vainqueurs, Abidjan Port-Bouët (Vridi).

## Stack

- **Next.js 15** (App Router, React 19)
- **TypeScript**
- **Tailwind CSS v3** + design tokens (couleurs `gold`/`night`/`ivory`/`bordeaux`)
- **Radix UI** + composants shadcn-style (Button, Card, Accordion, Tabs, Input)
- **Framer Motion** (animations au scroll — Reveal, Stagger, Parallax)
- **lucide-react** (icônes)
- **next/font** (Inter + Cormorant Garamond)
- **zod** (validation formulaire)

## Structure

```
app/
  (pages marketing — route implicite)
  layout.tsx               # layout racine : header, footer, WhatsApp FAB, fonts, SEO
  page.tsx                 # Accueil (8 sections animées)
  a-propos/page.tsx        # Histoire, vision, mission, équipe pastorale
  activites/page.tsx       # Programme hebdo + événements
  messages/page.tsx        # Bibliothèque de prédications (filtres par thème)
  messages/[slug]/page.tsx # Détail prédication (player YouTube/audio/texte)
  galerie/page.tsx         # Albums photos/vidéos
  galerie/[album]/page.tsx # Détail album (masonry)
  contact/page.tsx         # Coordonnées + carte + formulaire (Server Action)
  dons/page.tsx            # Dons Wave / Orange Money
  actions.ts               # Server Action contact (zod + honeypot)
  sitemap.ts               # Sitemap auto
  robots.ts                # Robots.txt auto
components/
  layout/                  # Header, Footer, WhatsAppFab
  sections/                # Hero, UpcomingEvents, AboutTeaser, Stats, SermonsTeaser, GalleryTeaser, Testimonials, CtaVisit, Faq, PageHeader, ContactForm
  motion/                  # Reveal, StaggerGroup, StaggerItem, Parallax
  ui/                      # Button, Card, Accordion, Tabs, Input, Textarea, Label
lib/
  church.ts                # Coordonnées église, navigation, réseaux sociaux
  site.ts                  # Métadonnées SEO + JSON-LD
  data.ts                  # Données mock (events, sermons, albums, team, faqs)
  utils.ts                 # cn(), formatDateFr(), slugify()
```

## Design system

| Token | Valeur | Usage |
|---|---|---|
| `gold` | `#C9A227` | Accent principal, CTA, highlights |
| `night` | `#0B1E3F` | Fond sombre, texte sur fond clair |
| `ivory` | `#F8F4EC` | Fond clair, texte sur fond sombre |
| `bordeaux` | `#7A1F2B` | Accent secondaire (passion/Christ) |
| `font-display` | Cormorant Garamond | Titres (H1-H4) |
| `font-sans` | Inter | Corps de texte |

Breakpoints étendus : `2.5xl` (1440px), `3xl` (1600px), `4xl` (1920px).
Container fluide : `.container-section` (max-w-10/12, px responsive).

## Patterns ergonomiques (inspirés d'artlist.io/ai)

- **Carrousels scroll-snap natifs** (zéro JS) — `.snap-carousel`
- **Glassmorphism** — `.glass-card` (backdrop-blur + bg semi-transparent)
- **Animations au scroll** — composants `Reveal` / `StaggerGroup` / `Parallax`
- **FAQ accordéon accessible** — Radix Accordion
- **Bouton WhatsApp flottant** — apparaît après 600px de scroll

## Installation

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build production
npm run start    # serveur prod
```

## À configurer plus tard

- **Email** : Resend pour transmettre le formulaire contact
- **Dons** : CinetPay ou FedaPay (Mobile Money CI + carte)
- **Analytics** : Plausible ou Umami (gratuit, RGPD-friendly)
- **Logo** : à déposer dans `/public/logo.png` (en attente de livraison)

## CMS Sanity

Le back-office est propulsé par **Sanity Studio** (CMS headless gratuit).

### Commandes

```bash
npm run sanity:dev    # Studio sur http://localhost:3333
npm run sanity:build  # build production du Studio
npm run sanity:start  # servir le Studio buildé
```

### Configuration (première fois)

1. Créer un projet sur https://www.sanity.io/manage → noter le **Project ID**.
2. Créer un token read-only (Manage → Settings → API → Tokens).
3. Remplir `.env.local` avec `NEXT_PUBLIC_SANITY_PROJECT_ID` et `SANITY_API_READ_TOKEN`.
4. Lancer `npm run sanity:dev` et saisir le contenu dans le Studio.
5. Le site Next.js récupère automatiquement le contenu via `lib/sanity/queries.ts`.

Voir `sanity/README.md` pour le guide détaillé.

## Coordonnées (à compléter dans `lib/church.ts`)

- Téléphone : `+225 00 00 00 00`
- WhatsApp : `22500000000`
- Email : `contact@templedesvainqueurs.com`
- Wave : `01 00 00 00 00`
- Orange Money : `07 00 00 00 00`
- YouTube : https://www.youtube.com/@advainqueurs
- Facebook : https://www.facebook.com/Templevainqueurs7