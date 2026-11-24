"use client";
import type React from "react";
import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import {
  restoreEditorialTheme,
  subscribeThemePreset,
} from "@/utils/editorial-theme";
import {
  restoreWorkspaceFont,
  subscribeWorkspaceFont,
} from "@/utils/workspace-font";
type ThemeMode = "light" | "dark" | "auto";
type ResolvedTheme = "light" | "dark";
interface ThemeContextType {
  theme: ResolvedTheme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
let memoryMode: ThemeMode = "light";
function readMode(): ThemeMode {
  try {
    const value =
      localStorage.getItem("theme-mode") || localStorage.getItem("theme");
    return value === "dark" || value === "auto" || value === "light"
      ? value
      : memoryMode;
  } catch {
    return memoryMode;
  }
}
function subscribe(listener: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  window.addEventListener("storage", listener);
  window.addEventListener("editorial-mode-change", listener);
  media.addEventListener("change", listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener("editorial-mode-change", listener);
    media.removeEventListener("change", listener);
  };
}
function resolveTheme(): ResolvedTheme {
  const mode = readMode();
  return mode === "auto"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
    : mode;
}
const serverMode = (): ThemeMode => "light";
const serverTheme = (): ResolvedTheme => "light";
function setThemeMode(mode: ThemeMode) {
  memoryMode = mode;
  try {
    localStorage.setItem("theme-mode", mode);
  } catch {}
  window.dispatchEvent(new Event("editorial-mode-change"));
}
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const themeMode = useSyncExternalStore(subscribe, readMode, serverMode);
  const theme = useSyncExternalStore(subscribe, resolveTheme, serverTheme);
  useEffect(() => {
    restoreWorkspaceFont();
    return subscribeWorkspaceFont(restoreWorkspaceFont);
  }, []);
  useEffect(
    () => subscribeThemePreset(() => restoreEditorialTheme(resolveTheme())),
    [],
  );
  useEffect(() => {
    if (theme !== resolveTheme()) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-color-scheme", theme);
    restoreEditorialTheme(theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        setThemeMode,
        toggleTheme: () => setThemeMode(theme === "light" ? "dark" : "light"),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
