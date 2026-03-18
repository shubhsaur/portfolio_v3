const GITHUB_USER = "shubhsaur";

export interface GithubMeta {
  publicRepos: number | null;
}

export async function getGithubMeta(): Promise<GithubMeta> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!res.ok) {
      return { publicRepos: null };
    }

    const json = (await res.json()) as { public_repos?: number };
    return { publicRepos: typeof json.public_repos === "number" ? json.public_repos : null };
  } catch {
    return { publicRepos: null };
  }
}

