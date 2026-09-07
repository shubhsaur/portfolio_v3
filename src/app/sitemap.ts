import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    "/",
    "/about",
    "/projects",
    "/experience",
    "/contact",
  ] as const;

  const caseStudies = [
    "/projects/uno-booking",
    "/projects/content-ai",
    "/projects/cryptopedia",
    "/projects/codelens",
  ] as const;

  return [...staticRoutes, ...caseStudies].map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified,
  }));
}
