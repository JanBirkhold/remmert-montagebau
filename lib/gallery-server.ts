import { readdirSync } from "node:fs";
import path from "node:path";
import {
  GALLERY_EXCLUDED_FILES,
  GALLERY_IMAGE_ALT,
  type GalleryImage,
  resolveGalleryImageMeta,
} from "./gallery";

const IMAGE_EXTENSIONS = new Set([".webp", ".jpg", ".jpeg", ".png"]);
const GALLERY_PATH = path.join(
  process.cwd(),
  "public",
  "images",
  "gallery",
);

function isGalleryImageFile(filename: string) {
  if (GALLERY_EXCLUDED_FILES.has(filename)) return false;
  if (/\(\d+\)\./.test(filename)) return false;

  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.has(ext);
}

export function getGalleryImages(): GalleryImage[] {
  const filenames = readdirSync(GALLERY_PATH)
    .filter(isGalleryImageFile)
    .sort((a, b) => {
      const orderA = Object.keys(GALLERY_IMAGE_ALT).indexOf(a);
      const orderB = Object.keys(GALLERY_IMAGE_ALT).indexOf(b);

      if (orderA === -1 && orderB === -1) return a.localeCompare(b);
      if (orderA === -1) return 1;
      if (orderB === -1) return -1;
      return orderA - orderB;
    });

  return filenames.map((filename) => resolveGalleryImageMeta(filename));
}
