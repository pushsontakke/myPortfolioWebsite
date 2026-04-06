"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();
    // TODO: fix this warning or error. check for suitable solution.
    useEffect(() => setMounted(true), []);

    if (!mounted) {
        // Render placeholder to avoid hydration mismatch
        return (
            <div className="w-8 h-8 rounded-lg bg-surface-elevated/50" />
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="p-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 border border-border-subtle"
            style={{
                background: isDark
                    ? "var(--color-surface-card)"
                    : "var(--color-surface-elevated)",
            }}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        >
            {isDark ? (
                <Sun size={16} strokeWidth={1.5} className="text-accent" />
            ) : (
                <Moon size={16} strokeWidth={1.5} className="text-accent" />
            )}
        </button>
    );
}