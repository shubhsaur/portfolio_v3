import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Tag({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-zinc-900/60 px-3 py-1 text-[11px] font-medium text-zinc-400 ring-1 ring-zinc-700/60",
        className,
      )}
      {...props}
    />
  );
}

