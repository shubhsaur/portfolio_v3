"use client";

import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex w-full items-center py-1">
      <div className="flex w-full gap-2 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
        {categories.map((category) => {
          const isActive = active === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onChange(category)}
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[var(--ln-accent)] text-[var(--ln-accent-foreground)]"
                  : "border border-border bg-card/60 text-muted-foreground hover:border-[var(--ln-accent)]/50 hover:text-foreground"
              )}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
