"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AccentTheme = "gold" | "emerald" | "violet" | "cyan";
export type ColorMode = "light" | "dark";

interface ThemeVariant {
  dotColor: string;
  accent: string;
  accentForeground: string;
  gradient: string;
  ring: string;
}

interface ThemeConfig {
  id: AccentTheme;
  name: string;
  /** Bright neon palette — shown in the picker and applied in dark mode. */
  dark: ThemeVariant;
  /** Muted, ivory-compatible palette — shown in the picker and applied in light mode. */
  light: ThemeVariant;
}

export const themes: Record<AccentTheme, ThemeConfig> = {
  gold: {
    id: "gold",
    name: "Liquid Gold",
    dark: {
      dotColor: "#e8c547",
      accent: "#e8c547",
      accentForeground: "#1c1917",
      gradient: "linear-gradient(135deg, #e8c547 0%, #f87171 40%, #5de4c7 100%)",
      ring: "rgba(232, 197, 71, 0.7)",
    },
    light: {
      dotColor: "#8E5513",
      accent: "#8E5513",
      accentForeground: "#FFFFFF",
      gradient: "linear-gradient(135deg, #8E5513 0%, #A83E28 50%, #8C2F5E 100%)",
      ring: "rgba(142, 85, 19, 0.45)",
    },
  },
  emerald: {
    id: "emerald",
    name: "Neon Emerald",
    dark: {
      dotColor: "#10b981",
      accent: "#10b981",
      accentForeground: "#04110c",
      gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)",
      ring: "rgba(16, 185, 129, 0.7)",
    },
    light: {
      dotColor: "#0E7656",
      accent: "#0E7656",
      accentForeground: "#FFFFFF",
      gradient: "linear-gradient(135deg, #0E7656 0%, #0D6E7A 50%, #6E38A8 100%)",
      ring: "rgba(14, 118, 86, 0.45)",
    },
  },
  violet: {
    id: "violet",
    name: "Electric Violet",
    dark: {
      dotColor: "#a855f7",
      accent: "#a855f7",
      accentForeground: "#fafafa",
      gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #6366f1 100%)",
      ring: "rgba(168, 85, 247, 0.7)",
    },
    light: {
      dotColor: "#6E38A8",
      accent: "#6E38A8",
      accentForeground: "#FFFFFF",
      gradient: "linear-gradient(135deg, #6E38A8 0%, #9B2C78 50%, #B84332 100%)",
      ring: "rgba(110, 56, 168, 0.45)",
    },
  },
  cyan: {
    id: "cyan",
    name: "Cyber Cyan",
    dark: {
      dotColor: "#06b6d4",
      accent: "#06b6d4",
      accentForeground: "#041014",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)",
      ring: "rgba(6, 182, 212, 0.7)",
    },
    light: {
      dotColor: "#09738A",
      accent: "#09738A",
      accentForeground: "#FFFFFF",
      gradient: "linear-gradient(135deg, #09738A 0%, #0E7656 50%, #6E38A8 100%)",
      ring: "rgba(9, 115, 138, 0.45)",
    },
  },
};

function isAccent(value: string | undefined): value is AccentTheme {
  return value === "gold" || value === "emerald" || value === "violet" || value === "cyan";
}

function isColorMode(value: string | undefined): value is ColorMode {
  return value === "light" || value === "dark";
}

function readBoot(): { accent: AccentTheme; colorMode: ColorMode } {
  if (typeof document === "undefined") {
    return { accent: "gold", colorMode: "dark" };
  }
  const root = document.documentElement;
  return {
    accent: isAccent(root.dataset.accent) ? root.dataset.accent : "gold",
    colorMode: isColorMode(root.dataset.colorMode) ? root.dataset.colorMode : "dark",
  };
}

function applyAccentVars(accent: AccentTheme, mode: ColorMode) {
  const cfg = themes[accent][mode];
  const root = document.documentElement;
  root.style.setProperty("--ln-accent", cfg.accent);
  root.style.setProperty("--ln-accent-gold", cfg.accent);
  root.style.setProperty("--ln-accent-foreground", cfg.accentForeground);
  root.style.setProperty("--ln-gradient-primary", cfg.gradient);
  root.style.setProperty("--ln-ring", cfg.ring);
}

function applyColorModeClass(mode: ColorMode) {
  const root = document.documentElement;
  root.classList.toggle("dark", mode === "dark");
  root.style.colorScheme = mode;
}

interface ThemeContextType {
  accent: AccentTheme;
  colorMode: ColorMode;
  setAccent: (accent: AccentTheme) => void;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
  /** @deprecated alias of setAccent */
  setTheme: (theme: AccentTheme) => void;
  /** @deprecated alias of accent */
  activeTheme: AccentTheme;
}

const ThemeContext = createContext<ThemeContextType>({
  accent: "gold",
  colorMode: "dark",
  setAccent: () => {},
  setColorMode: () => {},
  toggleColorMode: () => {},
  setTheme: () => {},
  activeTheme: "gold",
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<AccentTheme>("gold");
  const [colorMode, setColorModeState] = useState<ColorMode>("dark");

  useLayoutEffect(() => {
    const boot = readBoot();
    setAccentState(boot.accent);
    setColorModeState(boot.colorMode);
    applyAccentVars(boot.accent, boot.colorMode);
    applyColorModeClass(boot.colorMode);
  }, []);

  const setAccent = useCallback((next: AccentTheme) => {
    setAccentState(next);
    const root = document.documentElement;
    root.dataset.accent = next;
    applyAccentVars(next, colorMode);
    try {
      localStorage.setItem("ln_accent_theme", next);
    } catch {
      /* ignore */
    }
  }, [colorMode]);

  const setColorMode = useCallback((mode: ColorMode) => {
    setColorModeState(mode);
    const root = document.documentElement;
    root.dataset.colorMode = mode;
    applyColorModeClass(mode);
    // Re-apply the accent so the palette swaps to the mode-specific variant
    // (neon for dark, muted ivory-compatible tones for light).
    applyAccentVars(accent, mode);
    try {
      localStorage.setItem("ln_color_mode", mode);
    } catch {
      /* ignore */
    }
  }, [accent]);

  const toggleColorMode = useCallback(() => {
    setColorMode(colorMode === "dark" ? "light" : "dark");
  }, [colorMode, setColorMode]);

  const value = useMemo(
    () => ({
      accent,
      colorMode,
      setAccent,
      setColorMode,
      toggleColorMode,
      setTheme: setAccent,
      activeTheme: accent,
    }),
    [accent, colorMode, setAccent, setColorMode, toggleColorMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
