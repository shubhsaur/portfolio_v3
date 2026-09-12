"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ContributionWeek } from "@/lib/content/github";

// ─── Colour palette ────────────────────────────────────────────────────────────
const LEVEL_COLOURS = [
  "rgba(255,255,255,0.05)",   // 0 — empty
  "rgba(185,130,74,0.28)",    // 1 — faint amber
  "rgba(185,130,74,0.55)",    // 2 — mid amber
  "rgba(232,197,71,0.78)",    // 3 — gold
  "rgba(232,197,71,1.00)",    // 4 — full accent gold
] as const;

const LEVEL_BORDER = [
  "rgba(255,255,255,0.07)",
  "rgba(185,130,74,0.18)",
  "rgba(185,130,74,0.35)",
  "rgba(232,197,71,0.50)",
  "rgba(232,197,71,0.70)",
] as const;

const LEVEL_LABELS = ["No contributions", "1–4", "5–9", "10–19", "20+"] as const;
const MONTH_LABELS  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS    = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const DAY_SHOW      = [false, true, false, true, false, true, false];

// ─── Geometry constants ────────────────────────────────────────────────────────
const NUM_WEEKS      = 53;
const MIN_CELL       = 9;
const MAX_CELL       = 18;
const DAY_LABEL_W    = 28; // px reserved for Mon/Wed/Fri labels
const MONTH_LABEL_H  = 20; // px for month header row

// ─── Tooltip ──────────────────────────────────────────────────────────────────
interface TooltipState { date: string; count: number; x: number; y: number }

function Tooltip({ data }: { data: TooltipState }) {
  const d = new Date(data.date + "T00:00:00Z");
  const label = d.toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: 4, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
      className="pointer-events-none fixed z-50 rounded-xl border border-white/10 bg-[#0D0F15]/92 px-3 py-2 text-xs shadow-2xl backdrop-blur-xl"
      style={{ left: data.x, top: data.y - 58, transform: "translateX(-50%)" }}
    >
      <p className="font-semibold text-zinc-100">
        {data.count > 0 ? `${data.count} contribution${data.count !== 1 ? "s" : ""}` : "No contributions"}
      </p>
      <p className="text-zinc-400 mt-0.5">{label}</p>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
interface GithubCalendarProps {
  weeks: ContributionWeek[];
  totalLastYear: number;
  username: string;
}

export function GithubCalendar({ weeks, totalLastYear, username }: GithubCalendarProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(12);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  // ── Responsive cell sizing ──────────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const compute = () => {
      const w = el.clientWidth;
      // available = total - day label col - gaps between cells
      const gap = 3;
      const available = w - DAY_LABEL_W - gap * (NUM_WEEKS - 1);
      const raw = available / NUM_WEEKS;
      setCellSize(Math.min(MAX_CELL, Math.max(MIN_CELL, Math.floor(raw))));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const gap = cellSize <= 10 ? 2 : 3;
  const radius = Math.max(2, Math.round(cellSize * 0.25));

  // ── Month header positions ──────────────────────────────────────────────────
  const monthHeaders: { label: string; col: number }[] = [];
  weeks.forEach((week, col) => {
    const firstReal = week.days.find((d) => d.date !== "");
    if (!firstReal) return;
    const d = new Date(firstReal.date + "T00:00:00Z");
    if (d.getUTCDate() <= 7) {
      const label = MONTH_LABELS[d.getUTCMonth()];
      const last = monthHeaders[monthHeaders.length - 1];
      if (!last || last.label !== label) monthHeaders.push({ label, col });
    }
  });

  return (
    <div ref={containerRef} className="gc-root w-full space-y-4 min-w-0">
      {/* ── Header row ────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-current text-zinc-400" aria-hidden>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58l-.02-2.24c-3.34.72-4.04-1.42-4.04-1.42-.55-1.38-1.34-1.75-1.34-1.75-1.09-.74.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.3 3.49 1 .1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.3.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22l-.02 3.29c0 .32.22.69.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Contribution Activity
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            <span className="font-semibold text-[var(--ln-accent)]">
              {totalLastYear.toLocaleString()}
            </span>{" "}
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
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] text-muted-foreground/70">Less</span>
          {LEVEL_COLOURS.map((colour, i) => (
            <span
              key={i}
              className="shrink-0 rounded-sm border"
              style={{
                width: 12,
                height: 12,
                background: colour,
                borderColor: LEVEL_BORDER[i],
              }}
              title={LEVEL_LABELS[i]}
            />
          ))}
          <span className="text-[11px] text-muted-foreground/70">More</span>
        </div>
      </div>

      {/* ── Calendar ──────────────────────────────────────────────────────── */}
      {cellSize > 0 && (
        <div className="w-full overflow-hidden">
          <div
            className="flex"
            style={{ gap }}
          >
            {/* Day-of-week label column */}
            <div
              className="flex flex-col shrink-0"
              style={{
                width: DAY_LABEL_W,
                marginTop: MONTH_LABEL_H,
                gap,
              }}
            >
              {DAY_LABELS.map((day, i) => (
                <div
                  key={day}
                  className="flex items-center text-muted-foreground/50"
                  style={{
                    height: cellSize,
                    fontSize: Math.max(8, cellSize * 0.65),
                    lineHeight: 1,
                    visibility: DAY_SHOW[i] ? "visible" : "hidden",
                  }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Weeks + month labels */}
            <div className="flex-1 min-w-0 overflow-hidden">
              {/* Month header */}
              <div
                className="relative w-full"
                style={{ height: MONTH_LABEL_H }}
              >
                {monthHeaders.map(({ label, col }) => (
                  <span
                    key={`${label}-${col}`}
                    className="absolute text-muted-foreground/60 leading-none"
                    style={{
                      left: col * (cellSize + gap),
                      fontSize: Math.max(9, cellSize * 0.72),
                      bottom: 4,
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>

              {/* Weeks grid */}
              <div className="flex" style={{ gap }}>
                {weeks.map((week, weekIdx) => (
                  <div
                    key={weekIdx}
                    className="flex flex-col"
                    style={{ gap, width: cellSize, flexShrink: 0 }}
                  >
                    {week.days.map((day, dayIdx) => {
                      const isEmpty = day.count === -1 || day.date === "";
                      if (isEmpty) {
                        return (
                          <div
                            key={dayIdx}
                            style={{ width: cellSize, height: cellSize, opacity: 0 }}
                          />
                        );
                      }

                      return (
                        <motion.div
                          key={dayIdx}
                          className="cursor-default"
                          style={{
                            width: cellSize,
                            height: cellSize,
                            borderRadius: radius,
                            background: LEVEL_COLOURS[day.level],
                            border: `1px solid ${LEVEL_BORDER[day.level]}`,
                          }}
                          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.5 }}
                          whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
                          viewport={{ once: true, amount: "some" }}
                          transition={{
                            duration: 0.2,
                            ease: "easeOut",
                            delay: prefersReducedMotion ? 0 : Math.min(weekIdx * 0.004 + dayIdx * 0.002, 0.5),
                          }}
                          whileHover={prefersReducedMotion ? undefined : { scale: 1.5, zIndex: 10 }}
                          onPointerEnter={(e) => {
                            const rect = (e.target as HTMLElement).getBoundingClientRect();
                            setTooltip({
                              date: day.date,
                              count: day.count,
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
      )}

      {tooltip && <Tooltip data={tooltip} />}
    </div>
  );
}
