/**
 * Configuration CORS pour autoriser le site Next.js à appeler l'API Sanity.
 *
 * Cette configuration se règle dans le dashboard Sanity (Manage → Projet → API → CORS Origins),
 * PAS dans ce fichier — celui-ci sert uniquement de documentation.
 *
 * Ajoutez ces origines dans le dashboard Sanity :
 *   - http://localhost:3000      (dev local)
 *   - https://templedesvainqueurs.com  (prod, à ajouter après achat du domaine)
 *
 * Cochez "Allow credentials" uniquement si vous utilisez un token privé.
 *
 * Alternative : utiliser un token read-only et laisser CORS ouvert (recommandé pour
 * un site public — le token ne peut qu'effectuer des lectures, jamais d'écritures).
 */