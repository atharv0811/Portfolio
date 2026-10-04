import { existsSync } from "node:fs";
import path from "node:path";

const cache = new Map<string, boolean>();

/**
 * Checks whether a local /public asset exists at render time, so a missing
 * placeholder image renders a designed fallback instead of a broken image.
 * Remote URLs are assumed to exist.
 */
export function publicAssetExists(src: string) {
  if (!src.startsWith("/")) return true;
  const cached = cache.get(src);
  if (cached !== undefined) return cached;
  const exists = existsSync(path.join(/* turbopackIgnore: true */ process.cwd(), "public", src));
  cache.set(src, exists);
  return exists;
}
