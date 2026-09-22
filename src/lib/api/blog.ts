import type {
  Article,
  ArticleDetail,
  ArticlePublications,
  AuthorProfile,
} from "@/lib/types/blog";

const API_BASE = process.env.ARTXFLOW_BASE_URL;
const API_KEY = process.env.ARTXFLOW_API_KEY;

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers);
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");

  if (API_KEY) {
    headers.set("Authorization", `Bearer ${API_KEY}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.data as T;
}

export async function getArticles(): Promise<Article[]> {
  if (!API_BASE) {
    console.warn("ARTXFLOW_BASE_URL is not defined");
    return [];
  }
  try {
    return await fetchJson<Article[]>(
      `${API_BASE}/api/v1/articles?status=published`,
      {
        next: { revalidate: 60 },
      }
    );
  } catch (error) {
    console.error("[getArticles] Failed to fetch articles:", error);
    return [];
  }
}

export async function getArticle(slug: string): Promise<ArticleDetail | null> {
  if (!API_BASE) return null;
  try {
    return await fetchJson<ArticleDetail>(
      `${API_BASE}/api/v1/articles/${encodeURIComponent(slug)}`,
      {
        next: { revalidate: 60 },
      }
    );
  } catch (error) {
    console.error(`[getArticle] Failed to fetch article "${slug}":`, error);
    return null;
  }
}

export async function getArticlePublications(
  articleId: string
): Promise<ArticlePublications | null> {
  if (!API_BASE) return null;
  try {
    return await fetchJson<ArticlePublications>(
      `${API_BASE}/api/v1/articles/${encodeURIComponent(articleId)}/publications`,
      {
        next: { revalidate: 300 },
      }
    );
  } catch {
    return null;
  }
}

export async function getAuthorProfile(): Promise<AuthorProfile | null> {
  if (!API_BASE) return null;
  try {
    return await fetchJson<AuthorProfile>(`${API_BASE}/api/v1/profile`, {
      next: { revalidate: 3600 },
    });
  } catch {
    return null;
  }
}
