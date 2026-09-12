export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GithubContributionsResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export async function fetchGithubContributions(
  username: string
): Promise<{ weeks: ContributionWeek[]; totalLastYear: number }> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
    {
      next: { revalidate: 21600 }, // 6 hours
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch GitHub contributions: ${res.status}`);
  }

  const data: GithubContributionsResponse = await res.json();

  // Group flat contribution days into weeks (Sun → Sat columns)
  const contributions = data.contributions;
  const weeks: ContributionWeek[] = [];
  let currentWeek: ContributionDay[] = [];

  // Pad the first week so it starts on Sunday (weekday 0)
  if (contributions.length > 0) {
    const firstDay = new Date(contributions[0].date + "T00:00:00Z");
    const firstDayOfWeek = firstDay.getUTCDay(); // 0=Sun
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push({ date: "", count: -1, level: 0 });
    }
  }

  for (const day of contributions) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push({ days: currentWeek });
      currentWeek = [];
    }
  }

  // Push the last partial week
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ date: "", count: -1, level: 0 });
    }
    weeks.push({ days: currentWeek });
  }

  return {
    weeks,
    totalLastYear: data.total?.lastYear ?? 0,
  };
}
