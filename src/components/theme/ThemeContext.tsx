"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type AccentTheme = "gold" | "emerald" | "violet" | "cyan";

interface ThemeConfig {
  id: AccentTheme;
  name: string;
  dotColor: string;
  accent: string;
  gradient: string;
  ring: string;
}

export const themes: Record<AccentTheme, ThemeConfig> = {
  gold: {
    id: "gold",
    name: "Liquid Gold",
    dotColor: "#e8c547",
    accent: "#e8c547",
    gradient: "linear-gradient(135deg, #e8c547 0%, #f87171 40%, #5de4c7 100%)",
    ring: "rgba(232, 197, 71, 0.7)",
  },
  emerald: {
    id: "emerald",
    name: "Neon Emerald",
    dotColor: "#10b981",
    accent: "#10b981",
    gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)",
    ring: "rgba(16, 185, 129, 0.7)",
  },
  violet: {
    id: "violet",
    name: "Electric Violet",
    dotColor: "#a855f7",
    accent: "#a855f7",
    gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #6366f1 100%)",
    ring: "rgba(168, 85, 247, 0.7)",
  },
  cyan: {
    id: "cyan",
    name: "Cyber Cyan",
    dotColor: "#06b6d4",
    accent: "#06b6d4",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)",
    ring: "rgba(6, 182, 212, 0.7)",
  },
};

interface ThemeContextType {
  activeTheme: AccentTheme;
  setTheme: (theme: AccentTheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  activeTheme: "gold",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [activeTheme, setActiveTheme] = useState<AccentTheme>("gold");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ln_accent_theme") as AccentTheme | null;
      if (saved && themes[saved]) {
        setActiveTheme(saved);
      }
    } catch {}
  }, []);

  const setTheme = (theme: AccentTheme) => {
    setActiveTheme(theme);
    try {
      localStorage.setItem("ln_accent_theme", theme);
    } catch {}

    const cfg = themes[theme];
    if (cfg) {
      document.documentElement.style.setProperty("--ln-accent-gold", cfg.accent);
      document.documentElement.style.setProperty("--ln-gradient-primary", cfg.gradient);
      document.documentElement.style.setProperty("--ln-ring", cfg.ring);
    }
  };

  useEffect(() => {
    const cfg = themes[activeTheme];
    if (cfg) {
      document.documentElement.style.setProperty("--ln-accent-gold", cfg.accent);
      document.documentElement.style.setProperty("--ln-gradient-primary", cfg.gradient);
      document.documentElement.style.setProperty("--ln-ring", cfg.ring);
    }
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
