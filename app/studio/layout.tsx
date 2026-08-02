import { NextStudioLayout } from "next-sanity/studio";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio — Temple des Vainqueurs",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <NextStudioLayout>{children}</NextStudioLayout>;
}