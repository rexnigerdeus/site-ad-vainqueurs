"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "./gsap";

/**
 * Recalcule les positions des déclencheurs GSAP quand la hauteur de la page change
 * (images chargées après coup, navigation entre pages, polices…).
 */
export function MotionRuntime() {
  const pathname = usePathname();

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    const observer = new ResizeObserver(refresh);
    observer.observe(document.body);
    refresh();
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
