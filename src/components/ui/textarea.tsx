import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-2xl border border-input bg-background/40 px-4 py-3 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:border-[var(--ln-accent)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--ln-accent)_25%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
