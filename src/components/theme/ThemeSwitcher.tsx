"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeContext";

export function ThemeSwitcher() {
  const { colorMode, toggleColorMode } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleColorMode}
      aria-label={colorMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-[2.25rem] w-[2.25rem] md:h-[1.75rem] md:w-[1.75rem] items-center justify-center rounded-full border border-border bg-muted/70 text-muted-foreground transition-all duration-200 hover:text-foreground hover:border-[var(--ln-accent)]/40 active:scale-90 focus-visible:ln-ring-focus overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {colorMode === "dark" ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <Sun className="h-[1rem] w-[1rem] md:h-[0.875rem] md:w-[0.875rem]" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <Moon className="h-[1rem] w-[1rem] md:h-[0.875rem] md:w-[0.875rem]" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
