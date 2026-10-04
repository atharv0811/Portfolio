export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";
const listeners = new Set<() => void>();

function readStoredTheme(): Theme {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : "system";
  } catch {
    return "system";
  }
}

function applyTheme(theme: Theme) {
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia(DARK_QUERY).matches);
  const root = document.documentElement;
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
}

let current: Theme | null = null;

export function getTheme(): Theme {
  current ??= readStoredTheme();
  return current;
}

export function setTheme(theme: Theme) {
  current = theme;
  try {
    if (theme === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }

  const update = () => applyTheme(theme);
  const canTransition =
    "startViewTransition" in document && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (canTransition) document.startViewTransition(update);
  else update();

  listeners.forEach((listener) => listener());
}

export function subscribeToTheme(listener: () => void) {
  listeners.add(listener);
  const media = window.matchMedia(DARK_QUERY);
  const onSystemChange = () => {
    if (getTheme() === "system") applyTheme("system");
  };
  media.addEventListener("change", onSystemChange);
  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", onSystemChange);
  };
}

/**
 * Runs in <head> before first paint so the stored theme applies without a flash.
 * It also adds a `js` class, which lets CSS pre-hide entrance-animated content until GSAP takes over.
 */
export const themeInitScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('${STORAGE_KEY}');var dark=t==='dark'||(t!=='light'&&window.matchMedia('${DARK_QUERY}').matches);d.classList.toggle('dark',dark);d.style.colorScheme=dark?'dark':'light';}catch(e){}})();`;
