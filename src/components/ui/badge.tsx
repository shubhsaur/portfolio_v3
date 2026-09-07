import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-muted text-muted-foreground",
        outline: "border-border text-muted-foreground",
        accent:
          "border-[color-mix(in_srgb,var(--ln-accent)_25%,transparent)] bg-[color-mix(in_srgb,var(--ln-accent)_10%,transparent)] text-[var(--ln-accent)]",
        success:
          "border-[color-mix(in_srgb,var(--ln-success)_25%,transparent)] bg-[color-mix(in_srgb,var(--ln-success)_10%,transparent)] text-[var(--ln-success)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
