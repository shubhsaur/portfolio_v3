"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  asChild?: boolean;
  href?: string;
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "pill";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", asChild, href, ...props }, ref) => {
    const Comp = asChild ? "span" : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--ln-accent)_25%,transparent)] focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variant === "default" && "bg-[var(--ln-accent)] text-background hover:bg-[var(--ln-accent)]/90",
          variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          variant === "outline" && "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
          variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
          variant === "destructive" && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          className
        )}
        {...(href && { href })}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };