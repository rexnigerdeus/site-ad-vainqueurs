"use client";

/**
 * Point d'entrée unique de GSAP : les plugins sont enregistrés une seule fois.
 * Toujours importer gsap depuis ce fichier dans les composants.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Les animations ne tournent que si l'utilisateur n'a pas demandé moins de mouvement. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
