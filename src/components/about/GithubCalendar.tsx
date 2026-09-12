"use client";

import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import type { ContributionWeek } from "@/lib/content/github";

// ─── Colour palette — driven by CSS vars so they react to theme switches ──────
// Defined in globals.css under :root (dark) and html[data-color-mode="light"]
const LEVEL_COLOURS = [
  "var(--gc-empty)",
  "var(--gc-l1)",
  "var(--gc-l2)",
  "var(--gc-l3)",
  "var(--gc-l4)",
] as const;

const LEVEL_BORDER = [
  "var(--gc-empty-border)",
  "var(--gc-l1-border)",
  "var(--gc-l2-border)",
  "var(--gc-l3-border)",
  "var(--gc-l4-border)",
] as const;

const LEVEL_LABELS = ["No contributions", "1–4", "5–9", "10–19", "20+"] as const;
const MONTH_LABELS  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS    = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const DAY_SHOW      = [false, true, false, true, false, true, false];

const NUM_WEEKS    = 53;
const MIN_CELL     = 9;
const MAX_CELL     = 18;
const DAY_LABEL_W  = 28;
const MONTH_LABEL_H = 20;

// ─── Tooltip (renders into document.body to avoid triggering ResizeObserver) ───
interface TooltipState { date: string; count: number; x: number; y: number }

function Tooltip({ data }: { data: TooltipState }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const d = new Date(data.date + "T00:00:00Z");
  const label = d.toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  });

  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: 4, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
      className="pointer-events-none fixed z-[9999] rounded-xl border border-white/10 bg-[#0D0F15]/92 px-3 py-2 text-xs shadow-2xl backdrop-blur-xl"
      style={{ left: data.x, top: data.y - 58, transform: "translateX(-50%)" }}
    >
      <p className="font-semibold text-zinc-100">
        {data.count > 0
          ? `${data.count} contribution${data.count !== 1 ? "s" : ""}`
          : "No contributions"}
      </p>
      <p className="text-zinc-400 mt-0.5">{label}</p>
    </motion.div>,
    document.body
  );
}

// ─── Individual cell — memoised so tooltip state changes don't re-render it ───
interface CellProps {
  date: string;
  count: number;
  level: number;
  size: number;
  radius: number;
  weekIdx: number;
  dayIdx: number;
  onEnter: (d: { date: string; count: number; x: number; y: number }) => void;
  onLeave: () => void;
  prefersReducedMotion: boolean | null;
}

const Cell = memo(function Cell({
  date, count, level, size, radius, weekIdx, dayIdx,
  onEnter, onLeave, prefersReducedMotion,
}: CellProps) {
  return (
    <motion.div
      className="gc-cell cursor-default"
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: LEVEL_COLOURS[level as 0|1|2|3|4],
        border: `1px solid ${LEVEL_BORDER[level as 0|1|2|3|4]}`,
        // CSS-only hover — no React state, no re-render
        transition: "filter 0.15s ease",
        willChange: "filter",
      }}
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.5 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: "some" }}
      transition={{
        duration: 0.18,
        ease: "easeOut",
        delay: prefersReducedMotion
          ? 0
          : Math.min(weekIdx * 0.003 + dayIdx * 0.002, 0.45),
      }}
      onPointerEnter={(e) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        onEnter({ date, count, x: rect.left + rect.width / 2, y: rect.top });
      }}
      onPointerLeave={onLeave}
      // Hover highlight via CSS filter — no layout shift, no re-render cascade
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.filter = "brightness(1.6) saturate(1.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.filter = "";
      }}
    />
  );
});

// ─── Grid (memoised separately from tooltip state) ────────────────────────────
interface GridProps {
  weeks: ContributionWeek[];
  cellSize: number;
  onEnter: (d: TooltipState) => void;
  onLeave: () => void;
  prefersReducedMotion: boolean | null;
}

const CalendarGrid = memo(function CalendarGrid({
  weeks, cellSize, onEnter, onLeave, prefersReducedMotion,
}: GridProps) {
  const gap    = cellSize <= 10 ? 2 : 3;
  const radius = Math.max(2, Math.round(cellSize * 0.25));

  // Month header positions
  const monthHeaders = useMemo<{ label: string; col: number }[]>(() => {
    const headers: { label: string; col: number }[] = [];
    weeks.forEach((week, col) => {
      const firstReal = week.days.find((d) => d.date !== "");
      if (!firstReal) return;
      const d = new Date(firstReal.date + "T00:00:00Z");
      if (d.getUTCDate() <= 7) {
        const label = MONTH_LABELS[d.getUTCMonth()];
        const last = headers[headers.length - 1];
        if (!last || last.label !== label) headers.push({ label, col });
      }
    });
    return headers;
  }, [weeks]);

  return (
    <div className="flex w-full overflow-hidden" style={{ gap }}>
      {/* Day-of-week labels column */}
      <div
        className="flex flex-col shrink-0 select-none"
        style={{ width: DAY_LABEL_W, marginTop: MONTH_LABEL_H, gap }}
      >
        {DAY_LABELS.map((day, i) => (
          <div
            key={day}
            className="flex items-center text-muted-foreground/50"
            style={{
              height: cellSize,
              fontSize: Math.max(8, Math.floor(cellSize * 0.65)),
              lineHeight: 1,
              visibility: DAY_SHOW[i] ? "visible" : "hidden",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Weeks + month headers */}
      <div className="flex-1 min-w-0 overflow-hidden">
        {/* Month label row */}
        <div className="relative w-full select-none" style={{ height: MONTH_LABEL_H }}>
          {monthHeaders.map(({ label, col }) => (
            <span
              key={`${label}-${col}`}
              className="absolute text-muted-foreground/60 leading-none"
              style={{
                left: col * (cellSize + gap),
                fontSize: Math.max(9, Math.floor(cellSize * 0.72)),
                bottom: 4,
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Week columns */}
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
                      style={{ width: cellSize, height: cellSize, opacity: 0, flexShrink: 0 }}
                    />
                  );
                }
                return (
                  <Cell
                    key={dayIdx}
                    date={day.date}
                    count={day.count}
                    level={day.level}
                    size={cellSize}
                    radius={radius}
                    weekIdx={weekIdx}
                    dayIdx={dayIdx}
                    onEnter={onEnter}
                    onLeave={onLeave}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// ─── Main component ────────────────────────────────────────────────────────────
interface GithubCalendarProps {
  weeks: ContributionWeek[];
  totalLastYear: number;
  username: string;
}

export function GithubCalendar({ weeks, totalLastYear, username }: GithubCalendarProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize,    setCellSize]    = useState(12);
  const [numVisible,  setNumVisible]  = useState(NUM_WEEKS);
  const [tooltip,     setTooltip]     = useState<TooltipState | null>(null);

  // ── Responsive: compute cell size + how many weeks are visible ──────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const compute = () => {
      const w       = el.clientWidth;
      const gap     = 3;
      const available = w - DAY_LABEL_W - gap * (NUM_WEEKS - 1);
      const raw     = available / NUM_WEEKS;

      if (raw >= MIN_CELL) {
        // All 53 weeks fit — scale cells up (capped at MAX_CELL)
        setCellSize(Math.min(MAX_CELL, Math.floor(raw)));
        setNumVisible(NUM_WEEKS);
      } else {
        // Doesn't fit all — fix at MIN_CELL and show last N weeks that do fit
        setCellSize(MIN_CELL);
        const gap2   = 2; // gap used at min cell
        const numFit = Math.floor((w - DAY_LABEL_W) / (MIN_CELL + gap2));
        setNumVisible(Math.max(4, Math.min(NUM_WEEKS, numFit)));
      }
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── Slice weeks: always show the LAST numVisible weeks ─────────────────────
  const visibleWeeks = useMemo(
    () => numVisible < NUM_WEEKS ? weeks.slice(-numVisible) : weeks,
    [weeks, numVisible]
  );

  return (
    <div ref={containerRef} className="gc-root w-full space-y-4 min-w-0">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
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
        <div className="flex items-center gap-1.5 shrink-0 select-none">
          <span className="text-[11px] text-muted-foreground/70">Less</span>
          {LEVEL_COLOURS.map((colour, i) => (
            <span
              key={i}
              className="shrink-0 rounded-sm border"
              style={{ width: 12, height: 12, background: colour, borderColor: LEVEL_BORDER[i] }}
              title={LEVEL_LABELS[i]}
            />
          ))}
          <span className="text-[11px] text-muted-foreground/70">More</span>
        </div>
      </div>

      {/* ── Grid ───────────────────────────────────────────────────────────── */}
      <CalendarGrid
        weeks={visibleWeeks}
        cellSize={cellSize}
        onEnter={setTooltip}
        onLeave={() => setTooltip(null)}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* Tooltip rendered into document.body — won't affect container layout */}
      {tooltip && <Tooltip data={tooltip} />}
    </div>
  );
}
