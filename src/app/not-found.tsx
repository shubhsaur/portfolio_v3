import Link from "next/link";
import type { Metadata } from "next";
import { PageGrid } from "@/components/layout/PageGrid";
import { buildPageMetadata, routeMeta } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  ...routeMeta.notFound,
  absoluteTitle: true,
});

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <PageGrid>
        <div className="col-span-4 flex flex-col items-center text-center sm:col-span-8 lg:col-span-12">
          <span className="ln-mono text-[10rem] font-bold leading-none tracking-tighter text-border sm:text-[14rem] lg:text-[18rem]">
            404
          </span>
          <h1 className="mt-4 text-2xl font-semibold text-foreground sm:text-3xl">
            Page not found
          </h1>
          <p className="mt-3 max-w-md text-muted-foreground">
            This page isn&apos;t in the portfolio.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[var(--ln-accent)] px-5 py-2.5 text-sm font-medium text-background transition hover:bg-[var(--ln-accent)]/90"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              Projects
            </Link>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Press{" "}
            <kbd className="ln-mono rounded border border-border bg-muted px-1.5 py-0.5 text-[10px]">
              ⌘K
            </kbd>{" "}
            to jump.
          </p>
        </div>
      </PageGrid>
    </div>
  );
}
