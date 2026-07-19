#!/usr/bin/env node
/**
 * Entry point du Studio Sanity (mode standalone).
 * Permet `npm run sanity:dev` / `npm run sanity:build` / `npm run sanity:start`.
 */
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your_project_id",
    dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});