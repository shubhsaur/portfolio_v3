import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Article } from "@/lib/types/blog";

interface ArticleNavigationProps {
  previous: Article | null;
  next: Article | null;
}

export function ArticleNavigation({
  previous,
  next,
}: ArticleNavigationProps) {
  return (
    <section
      aria-label="Article navigation"
      className="border-t border-border/80 pt-10 sm:pt-14"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          More Articles
        </h3>
        <Link
          href="/blog"
          className="text-xs font-medium text-[var(--ln-accent)] hover:underline"
        >
          All Articles →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {previous && (
          <Link
            href={`/blog/${previous.slug}`}
            className="group flex flex-col gap-2 rounded-2xl border border-border bg-card/60 p-4 transition-all duration-300 hover:border-[var(--ln-accent)]/50 hover:bg-card/90"
          >
            <span className="ln-mono flex items-center gap-1 text-[0.625rem] uppercase tracking-wider text-muted-foreground">
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
              Previous Article
            </span>
            <h4 className="line-clamp-2 text-base font-semibold text-foreground group-hover:text-[var(--ln-accent)] transition-colors">
              {previous.title}
            </h4>
          </Link>
        )}

        {next && (
          <Link
            href={`/blog/${next.slug}`}
            className="group flex flex-col gap-2 rounded-2xl border border-border bg-card/60 p-4 text-right transition-all duration-300 hover:border-[var(--ln-accent)]/50 hover:bg-card/90 sm:items-end"
          >
            <span className="ln-mono flex items-center justify-end gap-1 text-[0.625rem] uppercase tracking-wider text-muted-foreground">
              Next Article
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </span>
            <h4 className="line-clamp-2 text-base font-semibold text-foreground group-hover:text-[var(--ln-accent)] transition-colors sm:text-right">
              {next.title}
            </h4>
          </Link>
        )}
      </div>
    </section>
  );
}
