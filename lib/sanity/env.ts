/**
 * Configuration Sanity lue depuis les variables d'environnement.
 * Voir .env.example pour le mode d'emploi.
 */
export const apiVersion = "2024-10-01"; // version API Sanity (YYYY-MM-DD)

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your_project_id";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const token = process.env.SANITY_API_READ_TOKEN; // read-only (optionnel si dataset public)