import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "ln-surface relative overflow-hidden border border-white/5 p-5 sm:p-6",
        className,
      )}
      {...props}
    />
  );
}

