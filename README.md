# Temple des Vainqueurs — Site Web

Site institutionnel du Temple des Assemblées de Dieu — Temple des Vainqueurs, Abidjan Port-Bouët (Vridi).

## Stack

- **Next.js 15** (App Router, React 19)
- **TypeScript**
- **Tailwind CSS v3** + design tokens (couleurs `gold`/`night`/`ivory`/`bordeaux`)
- **Radix UI** + composants shadcn-style (Button, Card, Accordion, Tabs, Input)
- **Framer Motion** (animations au scroll — Reveal, Stagger, Parallax)
- **GSAP** + ScrollTrigger + SplitText (titres révélés mot à mot, bandeaux défilants, compteurs, parallaxe) — toujours importer depuis `components/motion/gsap.ts`, et ne jamais mettre de `transition-transform` CSS sur un élément animé par GSAP
- **lucide-react** (icônes)
- **next/font** (Poppins, Anton, Bebas Neue, Great Vibes)
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

## PENIEL 2026 : bascule automatique

Tout part de `lib/peniel.ts` (thème, sous-thèmes, programme, dates en heure d'Abidjan) :

- **avant le samedi 31 octobre** : couverture PENIEL en tête de l'accueil + compte à rebours (accueil) et « coming soon » réduit (page PENIEL) ;
- **à partir du 31 octobre** : les comptes à rebours disparaissent d'eux-mêmes ;
- **jusqu'à la fin du 29 novembre** : le programme PENIEL remplace le programme habituel partout (Activités, Contact, pied de page, « Venez nous visiter », chatbot `api/_chatbot_data.py`) ;
- **ensuite** : retour automatique à l'en-tête et au programme habituels (`REGULAR_PROGRAM` dans `lib/church.ts`).

## SEO et aperçu de partage

- Domaine officiel : **https://www.advainqueurs.org** (`CHURCH.domain` dans `lib/church.ts`). `advainqueurs.org` et `site-ad-vainqueurs.vercel.app` y redirigent.
- Chaque page passe par `buildMetadata()` (`lib/site.ts`) : lien canonique propre à la page + aperçu de partage complet (Next remplace l'objet `openGraph` du layout au lieu de le fusionner).
- Aperçu de partage selon la date : image « lancement » jusqu'au 31 octobre, image PENIEL jusqu'au 29 novembre, puis image de l'église. Les images (1200 x 630) sont dans `public/og/`, leur source dans `scripts/og/og.html`.
- Données structurées : église + site sur toutes les pages, événement PENIEL sur `/peniel`.

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