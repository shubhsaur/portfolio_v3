import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Article } from "@/lib/types/blog";

interface BlogCardProps {
  article: Article;
}

export function BlogCard({ article }: BlogCardProps) {
  return (
    <article className="group relative flex h-[22rem] overflow-hidden rounded-[var(--ln-radius-card)] border border-border bg-card transition-all duration-300 hover:border-[var(--ln-accent)]/50 hover:shadow-[var(--ln-card-shadow-hover)]">
      <Link
        href={`/blog/${article.slug}`}
        className="absolute inset-0 z-10"
        aria-label={article.title}
      />

      {article.coverImageUrl ? (
        <Image
          src={article.coverImageUrl}
          alt={article.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-muted/40 to-muted/20" />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(6,6,10,0.95)] via-[rgba(6,6,10,0.5)] to-transparent" />

      <div className="relative mt-auto flex w-full flex-col justify-end p-5">
        {article.category && (
          <span className="ln-mono w-fit rounded-full border border-border/60 bg-black/30 px-2.5 py-0.5 text-[0.65rem] uppercase tracking-wider text-[var(--ln-accent)] backdrop-blur-sm">
            {article.category}
          </span>
        )}

        <h3 className="mt-2 text-xl font-semibold text-foreground line-clamp-2">
          {article.title}
        </h3>

        <p className="mt-1 text-sm text-[var(--ln-text-secondary)] line-clamp-2">
          {article.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
          <time
            dateTime={article.createdAt}
            className="text-xs text-muted-foreground"
          >
            {new Date(article.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>

          <Button
            asChild
            size="sm"
            className="pointer-events-auto relative z-20"
          >
            <Link href={`/blog/${article.slug}`}>
              <span>Read More</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
