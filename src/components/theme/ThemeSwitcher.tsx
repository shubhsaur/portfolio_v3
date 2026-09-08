"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { themes, useTheme, type AccentTheme } from "@/components/theme/ThemeContext";

export function ThemeSwitcher() {
  const { activeTheme, setTheme, colorMode, toggleColorMode } = useTheme();

  return (
    <div className="flex items-center gap-[0.25rem] md:gap-[0.375rem]">
      <div
        className="hidden sm:flex items-center gap-[0.25rem] md:gap-[0.375rem] rounded-full border border-border bg-muted/70 p-[0.125rem] md:p-[0.25rem] backdrop-blur-md"
        title="Customize Accent Palette"
      >
        {(Object.keys(themes) as AccentTheme[]).map((themeKey) => {
          const theme = themes[themeKey];
          const isActive = activeTheme === themeKey;

          return (
            <button
              key={themeKey}
              type="button"
              onClick={() => setTheme(themeKey)}
              aria-label={`Switch theme to ${theme.name}`}
              className="group relative flex h-[1rem] w-[1rem] md:h-[1.25rem] md:w-[1.25rem] items-center justify-center rounded-full transition-transform hover:scale-110 focus-visible:ln-ring-focus"
            >
              {isActive && (
                <motion.span
                  layoutId="active-theme-ring"
                  className="absolute -inset-[0.125rem] rounded-full border border-foreground/40"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span
                className="h-[0.5rem] w-[0.5rem] md:h-[0.75rem] md:w-[0.75rem] rounded-full transition-transform group-hover:scale-105"
                style={{ backgroundColor: theme.dotColor }}
              />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={toggleColorMode}
        aria-label={colorMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className="flex h-[1.5rem] w-[1.5rem] md:h-[1.75rem] md:w-[1.75rem] items-center justify-center rounded-full border border-border bg-muted/70 text-muted-foreground transition hover:text-foreground focus-visible:ln-ring-focus"
      >
        {colorMode === "dark" ? (
          <Sun className="h-[0.75rem] w-[0.75rem] md:h-[0.875rem] md:w-[0.875rem]" />
        ) : (
          <Moon className="h-[0.75rem] w-[0.75rem] md:h-[0.875rem] md:w-[0.875rem]" />
        )}
      </button>
    </div>
  );
}
