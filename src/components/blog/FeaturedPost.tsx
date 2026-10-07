import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Article } from "@/lib/types/blog";

interface FeaturedPostProps {
  article: Article;
}

export function FeaturedPost({ article }: FeaturedPostProps) {
  return (
    <article className="group relative overflow-hidden rounded-[var(--ln-radius-hero)] border border-border bg-card transition-all duration-300 hover:border-[var(--ln-accent)]/50">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-full min-h-[18rem]">
          {article.coverImageUrl ? (
            <Image
              src={article.coverImageUrl}
              alt={article.title}
              fill
              priority
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-muted/40 to-muted/20" />
          )}
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <span className="ln-mono w-fit rounded-full border border-border/60 bg-[var(--ln-accent)]/10 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-[var(--ln-accent)]">
            Featured
          </span>

          {article.category && (
            <span className="mt-3 text-sm text-muted-foreground">
              {article.category}
            </span>
          )}

          <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            {article.title}
          </h2>

          <p className="mt-3 line-clamp-3 text-base text-[var(--ln-text-body)]">
            {article.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button asChild>
              <Link href={`/blog/${article.slug}`}>
                <span>Read More</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <time
              dateTime={article.createdAt}
              className="text-sm text-muted-foreground"
            >
              {new Date(article.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>
      </div>
    </article>
  );
}
