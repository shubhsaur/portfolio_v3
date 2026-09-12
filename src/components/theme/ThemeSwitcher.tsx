"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { themes, useTheme, type AccentTheme } from "@/components/theme/ThemeContext";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const { activeTheme, setTheme, colorMode, toggleColorMode } = useTheme();
  const instanceId = useId();

  return (
    <div className="flex items-center gap-[0.375rem] md:gap-[0.375rem]">
      <div
        className="flex items-center gap-[0.375rem] md:gap-[0.375rem] rounded-full border border-border bg-muted/70 p-[0.25rem] md:p-[0.25rem] backdrop-blur-md"
        title="Customize Accent Palette"
      >
        {(Object.keys(themes) as AccentTheme[]).map((themeKey) => {
          const theme = themes[themeKey];
          const isActive = activeTheme === themeKey;
          const currentVariant = theme[colorMode];

          return (
            <button
              key={themeKey}
              type="button"
              onClick={() => setTheme(themeKey)}
              aria-label={`Switch theme to ${theme.name}`}
              aria-pressed={isActive}
              className="group relative flex h-[1.625rem] w-[1.625rem] md:h-[1.375rem] md:w-[1.375rem] items-center justify-center rounded-full transition-transform hover:scale-110 focus-visible:ln-ring-focus"
            >
              {isActive && (
                <motion.span
                  layoutId={`active-theme-ring-${instanceId}`}
                  className="absolute -inset-[0.125rem] rounded-full border-2"
                  style={{
                    borderColor: currentVariant.dotColor,
                    boxShadow: `0 0 8px ${currentVariant.ring}`,
                  }}
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span
                className={cn(
                  "rounded-full transition-all duration-200",
                  isActive
                    ? "h-[0.875rem] w-[0.875rem] md:h-[0.8125rem] md:w-[0.8125rem] shadow-sm"
                    : "h-[0.75rem] w-[0.75rem] md:h-[0.6875rem] md:w-[0.6875rem] opacity-60 group-hover:opacity-100 group-hover:scale-105"
                )}
                style={{ backgroundColor: currentVariant.dotColor }}
              />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={toggleColorMode}
        aria-label={colorMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className="flex h-[2.25rem] w-[2.25rem] md:h-[1.75rem] md:w-[1.75rem] items-center justify-center rounded-full border border-border bg-muted/70 text-muted-foreground transition hover:text-foreground focus-visible:ln-ring-focus"
      >
        {colorMode === "dark" ? (
          <Sun className="h-[1rem] w-[1rem] md:h-[0.875rem] md:w-[0.875rem]" />
        ) : (
          <Moon className="h-[1rem] w-[1rem] md:h-[0.875rem] md:w-[0.875rem]" />
        )}
      </button>
    </div>
  );
}
