import { NextStudio } from "next-sanity/studio";
import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";
import config from "../../../sanity.config";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Studio — Temple des Vainqueurs",
};

export const viewport: Viewport = {
  ...studioViewport,
};

export default function StudioPage() {
  return <NextStudio config={config} />;
}