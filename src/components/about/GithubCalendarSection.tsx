import { Suspense } from "react";
import { fetchGithubContributions } from "@/lib/content/github";
import { GithubCalendar } from "./GithubCalendar";

const GITHUB_USERNAME = "shubhsaur";

async function CalendarLoader() {
  const { weeks, totalLastYear } = await fetchGithubContributions(GITHUB_USERNAME);

  return (
    <GithubCalendar
      weeks={weeks}
      totalLastYear={totalLastYear}
      username={GITHUB_USERNAME}
    />
  );
}

function CalendarSkeleton() {
  return (
    <div className="space-y-4 w-full animate-pulse">
      <div className="h-5 w-48 rounded-lg bg-white/5" />
      <div className="flex gap-[3px]">
        {Array.from({ length: 53 }).map((_, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }).map((_, d) => (
              <div key={d} className="h-[10px] w-[10px] rounded-sm bg-white/[0.05]" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function GithubCalendarSection() {
  return (
    <div className="rounded-[var(--ln-radius-card)] border border-border bg-card/40 p-5 sm:p-6 backdrop-blur-sm">
      <Suspense fallback={<CalendarSkeleton />}>
        <CalendarLoader />
      </Suspense>
    </div>
  );
}
