"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type ProjectImageProps = Omit<ImageProps, "onLoad"> & {
  /** Extra class on the outer wrapper div */
  wrapperClassName?: string;
  /** Show shimmer skeleton while loading (default true) */
  shimmer?: boolean;
};

/**
 * Drop-in Next.js Image wrapper that shows an animated shimmer
 * skeleton while the image is fetching / decoding, then fades in
 * the image once ready.
 */
export function ProjectImage({
  wrapperClassName,
  shimmer = true,
  className,
  ...props
}: ProjectImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      {/* Shimmer skeleton — sits beneath the image while loading */}
      {shimmer && (
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 z-10 transition-opacity duration-500",
            loaded ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          {/* Base layer */}
          <div className="absolute inset-0 bg-muted/30" />
          {/* Animated sweep */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        </div>
      )}

      <Image
        {...props}
        onLoad={() => setLoaded(true)}
        className={cn(
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
      />
    </div>
  );
}
