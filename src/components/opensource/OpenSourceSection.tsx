"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  GitPullRequest,
  GitMerge,
  Bug,
  ExternalLink,
  Star,
  Layers,
  Calendar,
  CheckCircle2,
  Github,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ContributionItem {
  id: string;
  issueNumber: number;
  prNumber: number;
  issueUrl: string;
  prUrl: string;
  title: string;
  component: string;
  componentIcon: React.ComponentType<{ className?: string }>;
  milestone: string;
  status: "Merged";
  description: string;
  impact: string[];
  tags: string[];
}

const contributions: ContributionItem[] = [
  {
    id: "primereact-5998",
    issueNumber: 5998,
    prNumber: 6217,
    issueUrl: "https://github.com/primefaces/primereact/issues/5998",
    prUrl: "https://github.com/primefaces/primereact/pull/6217",
    title: "Calendar: TimeOnly & StepMinute Desynchronization",
    component: "Calendar / TimePicker Overlay",
    componentIcon: Calendar,
    milestone: "v10.6.0",
    status: "Merged",
    description:
      "Identified and resolved a state desynchronization defect in PrimeReact Calendar where changing the hour via increment/decrement arrows in the overlay caused the minute input to desync from the configured step interval and fallback to local machine time.",
    impact: [
      "Fixed minute step alignment ensuring hours and minutes strictly adhere to stepMinute props.",
      "Provided an isolated StackBlitz reproducer fork to expedite maintainer review and triage.",
      "Merged cleanly into PrimeReact core milestone release v10.6.0.",
    ],
    tags: ["PrimeReact", "React", "State Synchronization", "Calendar", "TimePicker"],
  },
  {
    id: "primereact-6151",
    issueNumber: 6151,
    prNumber: 6214,
    issueUrl: "https://github.com/primefaces/primereact/issues/6151",
    prUrl: "https://github.com/primefaces/primereact/pull/6214",
    title: "Calendar: AM/PM Range Validation Deadlock",
    component: "Calendar / Boundary Validation Engine",
    componentIcon: Layers,
    milestone: "v10.6.0",
    status: "Merged",
    description:
      "Discovered and debugged a critical edge-case validation lock in PrimeReact Calendar when configuring date/time boundaries with minDate and maxDate in dual 'From-To' time inputs. Toggling between AM and PM in the 'From' field triggered a false-positive validation block preventing users from switching back to PM even when valid.",
    impact: [
      "Eliminated validation false-positives across time boundary checks (FROM < TO).",
      "Ensured smooth AM/PM toggling in dual-input datepicker ranges without form submission lockouts.",
      "Merged and shipped in PrimeReact milestone v10.6.0.",
    ],
    tags: ["PrimeReact", "React", "Validation Engine", "minDate / maxDate", "Edge Case"],
  },
];

export function OpenSourceSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-5 text-left md:items-center md:text-center">
        <span className="ln-mono inline-flex rounded-full border border-[rgba(93,228,199,0.25)] bg-[rgba(93,228,199,0.08)] px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-[var(--ln-accent-cyan)]">
          Open Source Impact
        </span>
        <div className="space-y-4">
          <h2
            id="opensource-heading"
            className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-50 sm:text-5xl"
          >
            Core UI Contributions
          </h2>
          <p className="max-w-2xl text-base leading-8 text-zinc-400">
            Contributing bug discoveries, isolations, and merged pull requests to
            premier open-source React component ecosystems.
          </p>
        </div>
      </div>

      {/* PrimeReact Repo Context Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-6 sm:p-7 shadow-[0_16px_45px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(93,228,199,0.12)] text-[var(--ln-accent-cyan)] shadow-sm">
              <Github className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-zinc-50">
                  primefaces / primereact
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-xs text-amber-300">
                  <Star className="h-3 w-3 fill-current text-amber-400" />
                  8.3k+
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                The leading open-source UI suite for React used by thousands of companies globally.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
            <span className="ln-mono inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
              <GitMerge className="h-3.5 w-3.5" />
              2 Merged PRs
            </span>
            <span className="ln-mono inline-flex items-center gap-1.5 rounded-full border border-[rgba(232,197,71,0.2)] bg-[rgba(232,197,71,0.08)] px-3 py-1 text-xs text-[var(--ln-accent-gold)]">
              <Sparkles className="h-3.5 w-3.5" />
              v10.6.0 Shipped
            </span>
          </div>
        </div>
      </div>

      {/* Contribution Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {contributions.map((contrib, index) => {
          const CompIcon = contrib.componentIcon;

          return (
            <motion.div
              key={contrib.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <Card
                spotlightColor="rgba(93, 228, 199, 0.45)"
                surfaceGlowColor="rgba(93, 228, 199, 0.06)"
                className="h-full flex flex-col justify-between rounded-[1.75rem] sm:rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-4 sm:p-6 md:p-7 shadow-[0_16px_45px_rgba(0,0,0,0.4)]"
              >
                <div className="space-y-5">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="ln-mono inline-flex items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-medium text-purple-300">
                        <GitPullRequest className="h-3 w-3" />
                        PR #{contrib.prNumber}
                      </span>
                      <span className="ln-mono inline-flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-800/80 px-2.5 py-1 text-[11px] text-zinc-400">
                        <Bug className="h-3 w-3 text-rose-400" />
                        Issue #{contrib.issueNumber}
                      </span>
                    </div>

                    <span className="ln-mono inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] text-emerald-300">
                      <CheckCircle2 className="h-3 w-3" />
                      Merged into {contrib.milestone}
                    </span>
                  </div>

                  {/* Title & Component */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--ln-accent-cyan)]">
                      <CompIcon className="h-3.5 w-3.5" />
                      <span>{contrib.component}</span>
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-zinc-50">
                      {contrib.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-zinc-300">
                    {contrib.description}
                  </p>

                  {/* Impact Highlights */}
                  <div className="rounded-2xl border border-white/6 bg-black/30 p-4 space-y-2">
                    <p className="ln-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                      Resolution & Impact
                    </p>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {contrib.impact.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--ln-accent-cyan)]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {contrib.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/6 bg-white/[0.02] px-2.5 py-0.5 text-[11px] text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="mt-6 flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 pt-4 border-t border-white/6">
                  <Button
                    href={contrib.prUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs justify-center"
                  >
                    View Merged PR
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>

                  <Button
                    href={contrib.issueUrl}
                    target="_blank"
                    rel="noreferrer"
                    variant="outline"
                    className="text-xs justify-center"
                  >
                    View Issue #{contrib.issueNumber}
                    <Github className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
