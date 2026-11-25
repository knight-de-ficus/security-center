"use client";
import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import PresetLogo from "./preset-logo";
import {
  customPresetValues,
  readThemePreset,
  serverThemePreset,
  subscribeThemePreset,
} from "@/utils/editorial-theme";
import {
  defaultPresetSwatches,
  websiteThemePresets,
  type ThemeMode,
  type ThemePresetId,
} from "@/utils/theme-presets";
interface PresetPickerProps {
  mode: ThemeMode;
  ready: boolean;
  onChange: (preset: ThemePresetId) => void;
}
const presets: ThemePresetId[] = ["default", "tenable", "rapid7", "custom"];
export default function PresetPicker({
  mode,
  ready,
  onChange,
}: PresetPickerProps) {
  const t = useTranslations("security.palettePresets");
  const active = useSyncExternalStore(
    subscribeThemePreset,
    readThemePreset,
    serverThemePreset,
  );
  function swatches(preset: ThemePresetId) {
    if (preset === "default") return defaultPresetSwatches;
    const palette =
      preset === "custom"
        ? ready
          ? customPresetValues(mode)
          : {}
        : websiteThemePresets[preset][mode];
    return ["brand-surface", "accent", "surface"].map(
      (name, i) => palette[`--color-sec-${name}`] || defaultPresetSwatches[i],
    );
  }
  return (
    <section
      className="em-preset-section"
      aria-labelledby="palette-presets-title"
      data-columns={12}
    >
      <h2 id="palette-presets-title" className="em-section-title">
        {t("title")}
      </h2>
      <div className="em-preset-grid" role="group" aria-label={t("title")}>
        {presets.map((preset) => (
          <Button
            key={preset}
            variant="palette"
            size="palette"
            data-columns={3}
            aria-pressed={active === preset}
            aria-label={t(preset)}
            disabled={!ready}
            onClick={() => onChange(preset)}
          >
            <span className="em-preset-heading">
              <PresetLogo preset={preset} label={t(preset)} />
              <span>{active === preset ? t("selected") : t("apply")}</span>
            </span>
            <span className="em-preset-swatches" aria-hidden="true">
              {swatches(preset).map((color, i) => (
                <span key={i} style={{ backgroundColor: color }} />
              ))}
            </span>
          </Button>
        ))}
      </div>
    </section>
  );
}
