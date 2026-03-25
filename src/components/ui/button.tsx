import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-xs font-medium transition focus-visible:ln-ring-focus disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-zinc-50 text-zinc-950 shadow-[0_10px_35px_rgba(0,0,0,0.8)] hover:bg-zinc-200",
        outline:
          "border border-zinc-600/70 bg-zinc-900/40 text-zinc-200 hover:border-zinc-300 hover:text-zinc-50",
        ghost:
          "bg-transparent text-zinc-300 hover:bg-zinc-900/60 hover:text-zinc-50",
      },
      size: {
        sm: "px-3 py-1.5",
        md: "px-4 py-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonAsButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    href?: undefined;
    asChild?: boolean;
  };

type ButtonAsAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants> & {
    href: string;
    asChild?: boolean;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

function isAnchorProps(props: ButtonProps): props is ButtonAsAnchorProps {
  return "href" in props && typeof props.href === "string";
}

export function Button(props: ButtonProps) {
  if (isAnchorProps(props)) {
    const {
      href,
      className,
      variant,
      size,
      asChild,
      children,
      ...anchorProps
    } = props;
    const classes = cn(buttonVariants({ variant, size }), className);
    void asChild;

    return (
      <a className={classes} href={href} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { className, variant, size, asChild, ...buttonProps } = props;
  const classes = cn(buttonVariants({ variant, size }), className);
  void asChild;

  return (
    <button
      className={classes}
      {...buttonProps}
    />
  );
}
