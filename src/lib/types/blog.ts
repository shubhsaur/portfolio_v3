export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: "PUBLISHED" | "DRAFT" | string;
  createdAt: string;
  updatedAt: string;
  category?: string;
  coverImageUrl?: string;
  readTime?: string;
}

export interface ArticleDetail extends Article {
  content: string;
  contentFormat: string;
}

export interface ArticlePublication {
  url: string;
  status: string;
  publishedAt: string;
  name: string;
}

export type ArticlePublications = Record<string, ArticlePublication>;

export interface AuthorProfile {
  userId: string;
  organizationId: string;
  name: string;
  email: string;
  image: string;
  bio: string;
  canonicalUrl: string;
  publicEmail: string;
  githubHandle: string;
  devtoHandle: string;
  hashnodeHandle: string;
  twitterHandle: string;
}
