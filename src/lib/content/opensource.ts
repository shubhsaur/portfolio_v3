export interface ContributionItem {
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

export const contributions: ContributionItem[] = [
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
] as const;