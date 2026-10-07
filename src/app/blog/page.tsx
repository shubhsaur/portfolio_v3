import { Metadata } from "next";
import { getArticles } from "@/lib/api/blog";
import { BlogPageClient } from "@/components/blog/BlogPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description:
    "Articles on frontend engineering, design systems, and building products at scale.",
  path: "/blog",
});

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <div className="relative min-h-screen pt-28 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8">
        <BlogPageClient articles={articles} />
      </div>
    </div>
  );
}
