"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { saveEditorialTheme } from "@/utils/editorial-theme";
import {
  defaultRadii,
  radiusGroups,
  type RadiusGroup,
} from "@/utils/theme-appearance";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["style"],
  });
  return () => observer.disconnect();
}
function snapshot() {
  const style = getComputedStyle(document.documentElement);
  return JSON.stringify(
    Object.fromEntries(
      radiusGroups.map((group) => [
        group,
        style.getPropertyValue(`--radius-sec-${group}`).trim(),
      ]),
    ),
  );
}
const serverSnapshot = () => JSON.stringify(defaultRadii);

interface RadiusSettingsProps {
  onSave: (saved: boolean) => void;
}
export default function RadiusSettings({ onSave }: RadiusSettingsProps) {
  const t = useTranslations("security.styleSettings");
  const radii = JSON.parse(
    useSyncExternalStore(subscribe, snapshot, serverSnapshot),
  ) as Record<RadiusGroup, string>;
  function update(group: RadiusGroup, value: string) {
    if (!value.trim()) return;
    const number = Number(value);
    if (
      !Number.isFinite(number) ||
      number < 0 ||
      number > (group === "full" ? 50 : 64)
    )
      return;
    document.documentElement.style.setProperty(
      `--radius-sec-${group}`,
      `${number}${group === "full" ? "%" : "px"}`,
    );
    onSave(saveEditorialTheme());
  }
  return (
    <section aria-labelledby="radius-settings-title">
      <h3 id="radius-settings-title" className="em-section-title">
        {t("radiusTitle")}
      </h3>
      <p className="em-preset-note">{t("radiusHint")}</p>
      <div className="em-radius-grid">
        {radiusGroups.map((group) => (
          <label key={group} className="em-radius-field">
            <span>
              {t(group)} ({group === "full" ? "%" : "px"})
            </span>
            <Input
              type="number"
              min={0}
              max={group === "full" ? 50 : 64}
              step={1}
              value={Number.parseFloat(radii[group]) || 0}
              onChange={(event) => update(group, event.target.value)}
            />
          </label>
        ))}
      </div>
    </section>
  );
}
