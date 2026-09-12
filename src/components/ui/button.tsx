"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  asChild?: boolean;
  href?: string;
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "pill";
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-4 py-2",
  lg: "text-base px-6 py-3",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", asChild, href, size = "md", ...props }, ref) => {
    const Comp = asChild ? "span" : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          "ln-btn-base inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--ln-accent)_35%,transparent)] focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variant === "default" && "ln-btn-default",
          variant === "secondary" && "ln-btn-secondary",
          variant === "outline" && "ln-btn-outline",
          variant === "ghost" && "ln-btn-ghost",
          variant === "destructive" && "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg hover:shadow-red-500/20",
          variant === "pill" && "ln-btn-outline text-xs px-3 py-1",
          sizeClasses[size],
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