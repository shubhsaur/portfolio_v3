import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import {
  getArticle,
  getArticles,
  getArticlePublications,
  getAuthorProfile,
} from "@/lib/api/blog";
import { Button } from "@/components/ui/button";
import { ArticleContent } from "@/components/blog/ArticleContent";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { PublicationLinks } from "@/components/blog/PublicationLinks";
import { AuthorBio } from "@/components/blog/AuthorBio";
import { buildPageMetadata } from "@/lib/seo";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return buildPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const [articles, publications, author] = await Promise.all([
    getArticles(),
    getArticlePublications(article.id),
    getAuthorProfile(),
  ]);

  const sortedArticles = [...articles].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const currentIndex = sortedArticles.findIndex((a) => a.slug === article.slug);
  const previous = sortedArticles[currentIndex - 1] ?? null;
  const next = sortedArticles[currentIndex + 1] ?? null;

  return (
    <div className="relative min-h-screen pt-28 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <article className="space-y-10 sm:space-y-14">
          <Button asChild variant="ghost" size="sm">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4" />
              <span>All Articles</span>
            </Link>
          </Button>

          <header className="space-y-6">
            {article.category && (
              <span className="ln-mono w-fit rounded-full border border-border/60 bg-[var(--ln-accent)]/10 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-[var(--ln-accent)]">
                {article.category}
              </span>
            )}

            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            <p className="text-lg text-[var(--ln-text-body)]">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <time dateTime={article.createdAt}>
                  {new Date(article.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </span>
              {article.readTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </span>
              )}
            </div>
          </header>

          {article.coverImage && (
            <div className="relative aspect-[21/9] overflow-hidden rounded-[var(--ln-radius-hero)] border border-border">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                priority
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          <ArticleContent content={article.content} />

          <div className="space-y-10">
            {author && <AuthorBio author={author} />}

            {publications && Object.keys(publications).length > 0 && (
              <PublicationLinks publications={publications} />
            )}

            <ArticleNavigation previous={previous} next={next} />
          </div>
        </article>
      </div>
    </div>
  );
}
