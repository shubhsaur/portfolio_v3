import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getArticles } from "@/lib/api/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes = [
    "/",
    "/about",
    "/projects",
    "/experience",
    "/blog",
    "/contact",
  ] as const;

  const caseStudies = [
    "/projects/uno-booking",
    "/projects/guest-experience-platform",
    "/projects/content-ai",
    "/projects/cryptopedia",
    "/projects/codelens",
    "/projects/portfolio-v3",
    "/projects/dealopoly",
  ] as const;

  const staticEntries: MetadataRoute.Sitemap = [
    ...staticRoutes,
    ...caseStudies,
  ].map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified,
  }));

  const articles = await getArticles();
  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: article.updatedAt
      ? new Date(article.updatedAt)
      : article.createdAt
      ? new Date(article.createdAt)
      : lastModified,
  }));

  return [...staticEntries, ...articleEntries];
}
