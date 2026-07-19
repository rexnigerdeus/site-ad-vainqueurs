# Sanity Studio — Guide d'installation

## 1. Créer le projet Sanity (dans le navigateur)

1. Aller sur https://www.sanity.io/manage et se connecter (Google ou GitHub).
2. Cliquer **Create new project** → nommer `temple-vainqueurs`.
3. Garder le dataset par défaut `production`.
4. Noter :
   - **Project ID** (format `a1b2c3d4…`)
   - **Dataset** : `production`

## 2. Créer un token read-only

Dans **Settings → API → Tokens** :
- Créer un token nommé `next-readonly`
- Droits : **Read**
- Copier la valeur (commence par `sk…`)

## 3. Remplir le fichier `.env.local`

À la racine du projet :

```
NEXT_PUBLIC_SANITY_PROJECT_ID=votre_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=sk_votre_token_readonly
```

## 4. Lancer le Studio

```bash
npm run sanity:dev
```

Le Studio est accessible sur **http://localhost:3333**.

À la première ouverture, Sanity demande de se connecter avec le compte
utilisé pour créer le projet. Ensuite, tous les schémas (Événements,
Prédications, Albums, Équipe, FAQ, Contenus de pages) sont disponibles
dans le panneau latéral.

## 5. Ajouter des utilisateurs admin

Dans **Manage → Projet → Team** :
- Inviter par email des administrateurs (rôle **Editor** pour modifier,
  ou **Admin** pour tout gérer).
- Chaque invité se connecte au Studio via `npm run sanity:dev` (en local)
  ou via une URL Sanity Cloud si le Studio est déployé.

## 6. Brancher le site Next.js sur Sanity

Une fois le contenu saisi dans le Studio, le site Next.js le récupère
automatiquement via les requêtes GROQ dans `lib/sanity/queries.ts`.
Aucune modification de code nécessaire — seulement les variables d'env.

## Schémas disponibles

| Document | Champs principaux |
|---|---|
| `event` | titre, date, heure, lieu, catégorie, description, featured |
| `sermon` | titre, slug, date, prédicateur, type, durée, thème, youtubeId, audioFile, body, excerpt |
| `album` | titre, slug, date, cover, photos[], videos[], description |
| `teamMember` | nom, rôle, photo, bio, order |
| `faq` | question, réponse, order |
| `pageContent` | page, heroTitle, heroDescription, body[], seo |

## Déployer le Studio en ligne (optionnel)

Pour que les admins accèdent au Studio sans installer le projet :

```bash
npm run sanity:build
npx sanity deploy
```

Sanity héberge le Studio sur `temple-vainqueurs.sanity.studio` (gratuit).