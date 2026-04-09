"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import {
  DEFAULT_THEME,
  applyTheme,
  getActiveTheme,
  notifyThemeChange,
  persistTheme,
  subscribeToThemeChange,
  type Theme,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  compact?: boolean;
  className?: string;
}

export function ThemeToggle({
  compact = false,
  className,
}: ThemeToggleProps) {
  const theme = useSyncExternalStore<Theme>(
    subscribeToThemeChange,
    getActiveTheme,
    () => DEFAULT_THEME
  );

  const nextTheme = theme === "light" ? "dark" : "light";
  const themeLabel = theme === "light" ? "Light mode" : "Dark mode";
  const ActionIcon = theme === "light" ? Moon : Sun;

  const handleToggle = () => {
    applyTheme(nextTheme);
    persistTheme(nextTheme);
    notifyThemeChange();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={`Switch to ${nextTheme} theme`}
      aria-pressed={theme === "dark"}
      title={`Switch to ${nextTheme} theme`}
      className={cn(
        "group inline-flex items-center border border-border-subtle bg-surface-card/80 text-content shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-border hover:text-accent",
        compact
          ? "h-10 w-10 justify-center rounded-full"
          : "gap-3 rounded-2xl px-3 py-2.5",
        className
      )}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-dim text-accent transition-transform duration-300 group-hover:scale-105">
        <ActionIcon size={16} strokeWidth={1.8} />
      </span>

      {!compact && (
        <span className="flex flex-col text-left leading-none">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-content-faint">
            Theme
          </span>
          <span className="mt-1 text-[0.78rem] font-semibold text-content">
            {themeLabel}
          </span>
        </span>
      )}
    </button>
  );
}
