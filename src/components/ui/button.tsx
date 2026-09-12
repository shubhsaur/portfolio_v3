"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  asChild?: boolean;
  href?: string;
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "pill";
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 px-3 text-xs gap-1.5 sm:h-9 sm:px-3.5 sm:text-xs",
  md: "h-10 px-4 text-xs gap-2 sm:h-11 sm:px-5 sm:text-sm",
  lg: "h-11 px-5 text-sm gap-2.5 sm:h-12 sm:px-6 sm:text-base",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", asChild, href, size = "md", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          "ln-btn-base inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium cursor-pointer select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--ln-accent)_35%,transparent)] focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variant === "default" && "ln-btn-default",
          variant === "secondary" && "ln-btn-secondary",
          variant === "outline" && "ln-btn-outline",
          variant === "ghost" && "ln-btn-ghost",
          variant === "destructive" && "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg hover:shadow-red-500/20",
          variant === "pill" && "ln-btn-outline h-7 px-3 text-xs",
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