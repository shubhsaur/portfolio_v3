"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { ContributionWeek } from "@/lib/content/github";

// ─── Colour palette ───────────────────────────────────────────────────────────
// Level 0 → transparent  Level 1-4 → graduated amber-to-gold using portfolio accent
const LEVEL_COLOURS = [
  "transparent",                   // 0 — no contribution
  "rgba(185,130,74,0.20)",         // 1 — faint amber
  "rgba(185,130,74,0.45)",         // 2 — mid amber
  "rgba(232,197,71,0.72)",         // 3 — gold
  "rgba(232,197,71,1.00)",         // 4 — full accent gold
] as const;

const LEVEL_LABELS = ["No contributions", "1-4", "5-9", "10-19", "20+"] as const;

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_LABEL_SHOW = [false, true, false, true, false, true, false]; // only Mon, Wed, Fri

// ─── Tooltip ─────────────────────────────────────────────────────────────────

interface TooltipData {
  date: string;
  count: number;
  level: number;
  x: number;
  y: number;
}

function Tooltip({ data }: { data: TooltipData }) {
  const d = new Date(data.date + "T00:00:00Z");
  const label = d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.15 }}
      className="pointer-events-none fixed z-50 rounded-xl border border-white/10 bg-[#0D0F15]/90 px-3 py-2 text-xs shadow-xl backdrop-blur-xl"
      style={{ left: data.x, top: data.y - 54, transform: "translateX(-50%)" }}
    >
      <p className="font-semibold text-zinc-100">
        {data.count > 0 ? `${data.count} contribution${data.count !== 1 ? "s" : ""}` : "No contributions"}
      </p>
      <p className="text-zinc-400">{label}</p>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface GithubCalendarProps {
  weeks: ContributionWeek[];
  totalLastYear: number;
  username: string;
}

export function GithubCalendar({ weeks, totalLastYear, username }: GithubCalendarProps) {
  const prefersReducedMotion = useReducedMotion();
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  // Derive month label positions from the first day of each month
  const monthHeaders: { label: string; col: number }[] = [];
  weeks.forEach((week, col) => {
    const firstReal = week.days.find((d) => d.date !== "");
    if (!firstReal) return;
    const d = new Date(firstReal.date + "T00:00:00Z");
    if (d.getUTCDate() <= 7) {
      const existing = monthHeaders[monthHeaders.length - 1];
      const label = MONTH_LABELS[d.getUTCMonth()];
      if (!existing || existing.label !== label) {
        monthHeaders.push({ label, col });
      }
    }
  });

  return (
    <div className="gc-root space-y-4 w-full">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            {/* Github icon inline svg */}
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-zinc-400" aria-hidden>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58l-.02-2.24c-3.34.72-4.04-1.42-4.04-1.42-.55-1.38-1.34-1.75-1.34-1.75-1.09-.74.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.3 3.49 1 .1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.3.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22l-.02 3.29c0 .32.22.69.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Contribution Activity
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            <span className="font-semibold text-[var(--ln-accent)]">{totalLastYear.toLocaleString()}</span>{" "}
            contributions in the last year ·{" "}
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ln-accent)] hover:underline underline-offset-2"
            >
              @{username}
            </a>
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-muted-foreground mr-0.5">Less</span>
          {LEVEL_COLOURS.map((colour, i) => (
            <span
              key={i}
              className="h-3 w-3 rounded-sm border border-white/8 shrink-0"
              style={{ background: colour === "transparent" ? "rgba(255,255,255,0.06)" : colour }}
              title={LEVEL_LABELS[i]}
            />
          ))}
          <span className="text-[11px] text-muted-foreground ml-0.5">More</span>
        </div>
      </div>

      {/* ── Calendar Grid ── */}
      <div className="gc-scroll-wrapper overflow-x-auto pb-2 -mx-1 px-1">
        <div className="gc-grid-wrap inline-flex gap-0 min-w-max">
          {/* Day-of-week labels column */}
          <div className="gc-day-labels flex flex-col mr-1.5 mt-[22px] gap-[3px]">
            {DAY_LABELS.map((day, i) => (
              <div
                key={day}
                className="h-[10px] text-[9px] leading-[10px] text-muted-foreground/60"
                style={{ visibility: DAY_LABEL_SHOW[i] ? "visible" : "hidden" }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Weeks + month headers */}
          <div className="gc-weeks-wrap">
            {/* Month labels row */}
            <div className="gc-month-row relative h-[18px] mb-1">
              {monthHeaders.map(({ label, col }) => (
                <span
                  key={`${label}-${col}`}
                  className="absolute text-[10px] text-muted-foreground/70 leading-none"
                  style={{ left: col * 13 }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Week columns */}
            <div className="gc-weeks flex gap-[3px]">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="gc-week flex flex-col gap-[3px]">
                  {week.days.map((day, dayIdx) => {
                    const isEmpty = day.count === -1 || day.date === "";
                    if (isEmpty) {
                      return <div key={dayIdx} className="h-[10px] w-[10px] rounded-sm opacity-0" />;
                    }

                    return (
                      <motion.div
                        key={dayIdx}
                        className="gc-cell h-[10px] w-[10px] rounded-sm cursor-default border border-white/[0.06]"
                        style={{
                          background:
                            day.level === 0
                              ? "rgba(255,255,255,0.05)"
                              : LEVEL_COLOURS[day.level],
                        }}
                        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.4 }}
                        whileInView={
                          prefersReducedMotion
                            ? undefined
                            : { opacity: 1, scale: 1 }
                        }
                        viewport={{ once: true, amount: "some" }}
                        transition={{
                          duration: 0.25,
                          ease: "easeOut",
                          delay: prefersReducedMotion ? 0 : Math.min(weekIdx * 0.004 + dayIdx * 0.003, 0.6),
                        }}
                        whileHover={
                          prefersReducedMotion
                            ? undefined
                            : { scale: 1.6, zIndex: 10 }
                        }
                        onPointerEnter={(e) => {
                          const rect = (e.target as HTMLElement).getBoundingClientRect();
                          setTooltip({
                            date: day.date,
                            count: day.count,
                            level: day.level,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }}
                        onPointerLeave={() => setTooltip(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip — rendered in normal flow so it avoids overflow clipping */}
      {tooltip && <Tooltip data={tooltip} />}
    </div>
  );
}
