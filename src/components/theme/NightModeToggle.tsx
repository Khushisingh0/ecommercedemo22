"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";

export function NightModeToggle() {
  const { theme, toggleTheme } = useTheme();
  // When current theme is dark, button should switch to day.
  const label = theme === "dark" ? "Day" : "Night";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-2 text-sm font-medium text-[color:var(--foreground)] shadow-sm transition hover:bg-[color:var(--surface)]"
      aria-label="Toggle night mode"
    >
      <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--primary)]" aria-hidden="true" />
      {label}
    </button>
  );
}

