"use client";

import { motion } from "framer-motion";
import { themes, useTheme, type AccentTheme } from "@/components/theme/ThemeContext";

export function ThemeSwitcher() {
  const { activeTheme, setTheme } = useTheme();

  return (
    <div
      className="flex items-center gap-1.5 rounded-full border border-white/8 bg-zinc-900/50 p-1 backdrop-blur-md"
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
                className="absolute -inset-0.5 rounded-full border border-white/40 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
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
  );
}
