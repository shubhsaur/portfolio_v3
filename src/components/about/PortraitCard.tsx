import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

const PORTRAIT_PUBLIC_PATH = "/about/portrait.jpg";
const PORTRAIT_FS_PATH = path.join(process.cwd(), "public/about/portrait.jpg");

export function PortraitCard() {
  const hasPortrait = existsSync(PORTRAIT_FS_PATH);

  return (
    <div className="w-full">
      <div className="relative aspect-[4/5] min-h-[280px] w-full overflow-hidden rounded-[var(--ln-radius-card)] border border-border bg-card">
        {hasPortrait ? (
          <Image
            src={PORTRAIT_PUBLIC_PATH}
            alt="Shubham Saurabh"
            fill
            className="object-cover object-[center_20%]"
            sizes="(max-width: 1024px) 100vw, 33vw"
            priority
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex flex-col items-center justify-center bg-muted/40"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,var(--ln-accent),transparent_55%)] opacity-20" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,var(--ln-success),transparent_50%)] opacity-15" />
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[var(--ln-accent)]/25 bg-background/50">
              <span className="ln-mono text-3xl font-semibold tracking-[0.08em] text-[var(--ln-accent)]">
                SS
              </span>
            </div>
            <p className="ln-mono relative mt-6 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              Portrait placeholder
            </p>
          </div>
        )}
      </div>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        Shubham Saurabh · Frontend Engineer
      </p>
    </div>
  );
}
