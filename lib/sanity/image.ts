import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";

/** Champ image Sanity tel que renvoyé par `photo{asset, hotspot, crop}`. */
export type SanityPhoto = {
  asset: { _ref: string };
  hotspot?: { x: number; y: number; width: number; height: number } | null;
  crop?: { top: number; bottom: number; left: number; right: number } | null;
};

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * URL d'un portrait carré (avatar rond) de `size` pixels de côté.
 * Le hotspot / recadrage choisi dans le Studio est respecté.
 * Sans hotspot, une photo en hauteur est cadrée sur sa partie haute
 * (là où se trouve le visage) au lieu du centre (buste).
 */
export function portraitUrl(photo: SanityPhoto, size: number) {
  const image = builder
    .image({
      asset: photo.asset,
      ...(photo.hotspot && { hotspot: photo.hotspot }),
      ...(photo.crop && { crop: photo.crop }),
    })
    .width(size)
    .height(size)
    .fit("crop")
    .auto("format");
  if (photo.hotspot || photo.crop) return image.url();

  // Réf. d'asset : image-<hash>-<largeur>x<hauteur>-<format>
  const [width, height] = (photo.asset._ref.split("-")[2] ?? "").split("x").map(Number);
  if (!width || !height || height <= width) return image.url();
  const side = Math.round(width * 0.7);
  return image.rect(Math.round((width - side) / 2), 0, side, side).url();
}
