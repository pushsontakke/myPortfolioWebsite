export const THEME_STORAGE_KEY = "portfolio-theme";
export const DEFAULT_THEME = "light";
export const THEMES = ["light", "dark"] as const;
export const THEME_CHANGE_EVENT = "portfolio-theme-change";

export type Theme = (typeof THEMES)[number];

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

export function resolveTheme(value: unknown): Theme {
  return isTheme(value) ? value : DEFAULT_THEME;
}

export function getActiveTheme(): Theme {
  if (typeof document === "undefined") {
    return DEFAULT_THEME;
  }

  return resolveTheme(document.documentElement.dataset.theme);
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

export function persistTheme(theme: Theme) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {}
}

export function notifyThemeChange() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT));
}

export function subscribeToThemeChange(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key && event.key !== THEME_STORAGE_KEY) {
      return;
    }

    callback();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(THEME_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

export const themeInitializationScript = `
(() => {
  const storageKey = "${THEME_STORAGE_KEY}";
  const defaultTheme = "${DEFAULT_THEME}";
  const root = document.documentElement;

  try {
    const storedTheme = window.localStorage.getItem(storageKey);
    const theme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : defaultTheme;

    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  } catch {
    root.dataset.theme = defaultTheme;
    root.style.colorScheme = defaultTheme;
  }
})();
`.trim();
