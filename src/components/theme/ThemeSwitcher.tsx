"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { themes, useTheme, type AccentTheme } from "@/components/theme/ThemeContext";

export function ThemeSwitcher() {
  const { activeTheme, setTheme, colorMode, toggleColorMode } = useTheme();

  return (
    <div className="flex items-center gap-1.5">
      <div
        className="flex items-center gap-1.5 rounded-full border border-border bg-muted/70 p-1 backdrop-blur-md"
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
              className="group relative flex h-5 w-5 items-center justify-center rounded-full transition-transform hover:scale-110 focus-visible:ln-ring-focus"
            >
              {isActive && (
                <motion.span
                  layoutId="active-theme-ring"
                  className="absolute -inset-0.5 rounded-full border border-foreground/40"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span
                className="h-3 w-3 rounded-full transition-transform group-hover:scale-105"
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
        className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-muted/70 text-muted-foreground transition hover:text-foreground focus-visible:ln-ring-focus"
      >
        {colorMode === "dark" ? (
          <Sun className="h-3.5 w-3.5" />
        ) : (
          <Moon className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}
