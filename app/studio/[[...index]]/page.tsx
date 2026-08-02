import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";
import StudioClient from "../StudioClient";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Studio — Temple des Vainqueurs",
};

export const viewport: Viewport = {
  ...studioViewport,
};

export default function StudioPage() {
  return <StudioClient />;
}