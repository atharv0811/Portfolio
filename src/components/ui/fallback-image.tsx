"use client";

import Image, { type ImageProps } from "next/image";
import { useState, type ReactNode } from "react";

/** next/image that swaps to a provided fallback if the file fails to load at runtime. */
export function FallbackImage({ fallback, ...props }: ImageProps & { fallback: ReactNode }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return <Image {...props} alt={props.alt} onError={() => setFailed(true)} />;
}
