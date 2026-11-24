import { metricAppearanceBootstrap } from "./metric-appearance";
import { workspaceFontBootstrap } from "./workspace-font";
import {
  websiteThemePresets,
  type ThemePresetId,
  type ThemeMode,
  type ThemePalette,
  type ThemeValues,
} from "./theme-presets";

export const themePresetStorageKey = "editorial-theme-presets-v1";
const legacyKeys = [
  "editorial-theme-overrides-v4",
  "editorial-theme-overrides-v3",
  "editorial-theme-overrides-v2",
  "editorial-theme-overrides-v1",
];
const presetIds: ThemePresetId[] = ["default", "tenable", "rapid7", "custom"];
interface PresetState {
  active: ThemePresetId;
  custom: ThemePalette;
  customReady: boolean;
}
let memoryState: PresetState | undefined;
const previousDefaults = {
  light: {
    "brand-surface": "#222a2d",
    accent: "#e7ff00",
    "accent-hover": "#d3e800",
    "accent-border": "#1e2426",
    "on-accent": "#1e2426",
    "accent-soft": "#f5f9d8",
    link: "#4d5600",
    focus: "#5a6500",
  },
  dark: {
    "brand-surface": "#243035",
    accent: "#e7ff00",
    "accent-hover": "#d3e800",
    "accent-border": "#1e2426",
    "on-accent": "#1e2426",
    "accent-soft": "#30351c",
    link: "#e7ff00",
    focus: "#e7ff00",
  },
};
const emptyState = (): PresetState => ({
  active: "default",
  custom: { light: {}, dark: {} },
  customReady: false,
});
function isThemeName(name: string) {
  return /^--(?:color|shadow)-sec-[a-z0-9-]+$/.test(name);
}
function validatedOverrides(value: unknown): ThemeValues {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value).filter(
      ([name, color]) =>
        isThemeName(name) &&
        typeof color === "string" &&
        CSS.supports(
          name.startsWith("--shadow") ? "box-shadow" : "color",
          color,
        ),
    ),
  ) as ThemeValues;
}
function readState(): PresetState {
  if (memoryState) return memoryState;
  try {
    const raw = localStorage.getItem(themePresetStorageKey);
    if (raw) {
      const data = JSON.parse(raw);
      return {
        active: presetIds.includes(data?.active) ? data.active : "default",
        custom: {
          light: validatedOverrides(data?.custom?.light),
          dark: validatedOverrides(data?.custom?.dark),
        },
        customReady: !!data?.customReady,
      };
    }
    // Migrate previous saved custom palettes without deleting their old storage.
    const key = legacyKeys.find((key) => localStorage.getItem(key));
    if (!key) return emptyState();
    const saved = JSON.parse(localStorage.getItem(key) || "{}");
    const migrate = (mode: ThemeMode) => {
      const values = validatedOverrides(
        key === legacyKeys[3] ? (mode === "light" ? saved : {}) : saved?.[mode],
      );
      if (key === legacyKeys[0]) return values;
      return Object.fromEntries(
        Object.entries(values).filter(
          ([name, value]) =>
            (previousDefaults[mode] as Record<string, string>)[
              name.replace("--color-sec-", "")
            ] !== value.trim().toLowerCase(),
        ),
      );
    };
    const custom = { light: migrate("light"), dark: migrate("dark") };
    const customReady =
      Object.keys(custom.light).length + Object.keys(custom.dark).length > 0;
    return { active: customReady ? "custom" : "default", custom, customReady };
  } catch {
    return emptyState();
  }
}
function persistState(state: PresetState) {
  try {
    localStorage.setItem(themePresetStorageKey, JSON.stringify(state));
    memoryState = undefined;
    return true;
  } catch {
    memoryState = state;
    return false;
  }
}
function modeNow(): ThemeMode {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}
function valuesFor(
  preset: ThemePresetId,
  mode: ThemeMode,
  state: PresetState,
): ThemeValues {
  if (preset === "custom") return state.custom[mode];
  return preset === "default" ? {} : websiteThemePresets[preset][mode];
}
function notifyPresetChange() {
  window.dispatchEvent(new Event("editorial-preset-change"));
  window.dispatchEvent(new Event("security-theme-change"));
}
export function readThemePreset(): ThemePresetId {
  return readState().active;
}
export const serverThemePreset = (): ThemePresetId => "default";
export function subscribeThemePreset(listener: () => void) {
  const storage = (event: StorageEvent) => {
    if (event.key === themePresetStorageKey || event.key === null) listener();
  };
  window.addEventListener("editorial-preset-change", listener);
  window.addEventListener("storage", storage);
  return () => {
    window.removeEventListener("editorial-preset-change", listener);
    window.removeEventListener("storage", storage);
  };
}
export function restoreEditorialTheme(mode: ThemeMode) {
  const state = readState(),
    root = document.documentElement;
  Array.from(root.style)
    .filter(isThemeName)
    .forEach((name) => root.style.removeProperty(name));
  for (const [name, value] of Object.entries(
    valuesFor(state.active, mode, state),
  ))
    root.style.setProperty(name, value);
  root.dataset.themePreset = state.active;
}
export function selectThemePreset(preset: ThemePresetId) {
  if (!presetIds.includes(preset)) return false;
  const state = readState();
  if (preset === "custom" && !state.customReady) {
    state.custom = {
      light: { ...valuesFor(state.active, "light", state) },
      dark: { ...valuesFor(state.active, "dark", state) },
    };
    state.customReady = true;
  }
  state.active = preset;
  const saved = persistState(state);
  restoreEditorialTheme(modeNow());
  notifyPresetChange();
  return saved;
}
export function saveEditorialTheme() {
  const state = readState(),
    style = document.documentElement.style;
  if (state.active !== "custom")
    state.custom = {
      light: { ...valuesFor(state.active, "light", state) },
      dark: { ...valuesFor(state.active, "dark", state) },
    };
  state.custom[modeNow()] = Object.fromEntries(
    Array.from(style)
      .filter(isThemeName)
      .map((name) => [name, style.getPropertyValue(name)]),
  );
  state.customReady = true;
  state.active = "custom";
  const saved = persistState(state);
  document.documentElement.dataset.themePreset = "custom";
  notifyPresetChange();
  return saved;
}
export function customPresetValues(mode: ThemeMode): ThemeValues {
  return readState().custom[mode];
}

// Self-contained before-paint bootstrap: no browser-only module side effects.
function bootstrapTheme(config: {
  key: string;
  legacy: string[];
  ids: ThemePresetId[];
  presets: typeof websiteThemePresets;
  oldDefaults: typeof previousDefaults;
}) {
  try {
    const root = document.documentElement,
      preference =
        localStorage.getItem("theme-mode") ||
        localStorage.getItem("theme") ||
        "light";
    const mode: ThemeMode =
      preference === "dark" ||
      (preference === "auto" &&
        matchMedia("(prefers-color-scheme: dark)").matches)
        ? "dark"
        : "light";
    root.classList.toggle("dark", mode === "dark");
    root.setAttribute("data-color-scheme", mode);
    const raw = localStorage.getItem(config.key);
    let state: PresetState;
    const validate = (value: unknown): ThemeValues =>
      value && typeof value === "object" && !Array.isArray(value)
        ? (Object.fromEntries(
            Object.entries(value).filter(
              ([name, color]) =>
                /^--(?:color|shadow)-sec-[a-z0-9-]+$/.test(name) &&
                typeof color === "string" &&
                CSS.supports(
                  name.startsWith("--shadow") ? "box-shadow" : "color",
                  color,
                ),
            ),
          ) as ThemeValues)
        : {};
    if (raw) {
      const data = JSON.parse(raw);
      state = {
        active: config.ids.includes(data?.active) ? data.active : "default",
        custom: {
          light: validate(data?.custom?.light),
          dark: validate(data?.custom?.dark),
        },
        customReady: !!data?.customReady,
      };
    } else {
      const key = config.legacy.find((key) => localStorage.getItem(key)),
        saved = key ? JSON.parse(localStorage.getItem(key) || "{}") : {};
      const migrate = (theme: ThemeMode) => {
        const values = validate(
          key === config.legacy[3]
            ? theme === "light"
              ? saved
              : {}
            : saved?.[theme],
        );
        return key === config.legacy[0]
          ? values
          : Object.fromEntries(
              Object.entries(values).filter(
                ([name, value]) =>
                  (config.oldDefaults[theme] as Record<string, string>)[
                    name.replace("--color-sec-", "")
                  ] !== value.trim().toLowerCase(),
              ),
            );
      };
      const custom = { light: migrate("light"), dark: migrate("dark") },
        customReady =
          Object.keys(custom.light).length + Object.keys(custom.dark).length >
          0;
      state = {
        active: customReady ? "custom" : "default",
        custom,
        customReady,
      };
    }
    const values =
      state.active === "custom"
        ? state.custom[mode]
        : state.active === "default"
          ? {}
          : config.presets[state.active][mode];
    root.dataset.themePreset = state.active;
    for (const [name, value] of Object.entries(values))
      root.style.setProperty(name, value);
  } catch {}
}
export const editorialThemeBootstrap =
  `(${bootstrapTheme.toString()})(${JSON.stringify({ key: themePresetStorageKey, legacy: legacyKeys, ids: presetIds, presets: websiteThemePresets, oldDefaults: previousDefaults })});` +
  metricAppearanceBootstrap +
  workspaceFontBootstrap;
