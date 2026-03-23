"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getPreferredTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Start with a deterministic value for SSR + first client render.
  const [theme, setThemeState] = useState<ThemeMode>("light");

  useEffect(() => {
    const preferred = getPreferredTheme();
    document.documentElement.dataset.theme = preferred;
    try {
      window.localStorage.setItem("theme", preferred);
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(preferred);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const setTheme = (next: ThemeMode) => setThemeState(next);
  const toggleTheme = () =>
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

