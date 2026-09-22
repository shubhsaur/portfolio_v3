"use client";

import { useState, useMemo } from "react";
import type { Article } from "@/lib/types/blog";
import { FeaturedPost } from "./FeaturedPost";
import { BlogCard } from "./BlogCard";
import { CategoryFilter } from "./CategoryFilter";
import { SearchBar } from "./SearchBar";
import { PageHero } from "@/components/motion/PageHero";

interface BlogPageClientProps {
  articles: Article[];
}

export function BlogPageClient({ articles }: BlogPageClientProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const sortedArticles = useMemo(() => {
    return [...articles].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [articles]);

  const featuredArticle = sortedArticles[0];
  const remainingArticles = sortedArticles.slice(1);

  const categories = useMemo(() => {
    const set = new Set<string>();
    sortedArticles.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return ["All", ...Array.from(set)];
  }, [sortedArticles]);

  const filteredArticles = useMemo(() => {
    const term = search.trim().toLowerCase();
    return remainingArticles.filter((article) => {
      const matchesCategory =
        activeCategory === "All" || article.category === activeCategory;
      const matchesSearch =
        !term ||
        article.title.toLowerCase().includes(term) ||
        article.excerpt.toLowerCase().includes(term) ||
        (article.category?.toLowerCase().includes(term) ?? false);
      return matchesCategory && matchesSearch;
    });
  }, [remainingArticles, activeCategory, search]);

  return (
    <div className="space-y-12 sm:space-y-16">
      <PageHero
        title={
          <>
            Thoughts on{" "}
            <span className="font-[family-name:var(--font-pacifico)] text-[var(--ln-accent)] font-normal">
              code
            </span>{" "}
            & craft.
          </>
        }
        description="Long-form notes on frontend engineering, design systems, and building products at scale."
      />

      {featuredArticle && <FeaturedPost article={featuredArticle} />}

      <section aria-label="Articles">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 lg:flex-row lg:items-center lg:justify-between">
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
          <div className="w-full lg:w-72">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <BlogCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="rounded-[var(--ln-radius-card)] border border-border bg-card/60 py-16 text-center">
            <p className="text-lg font-medium text-foreground">
              No articles found
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different search or category.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
