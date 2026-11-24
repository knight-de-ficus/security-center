"use client";

import { useEffect, useState } from "react";
import MetricStyleSelector from "../shared/metric-style-selector";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-context";
import ThemeTokenField from "../theme-workbench/theme-token-field";
import type { ThemeToken } from "../theme-workbench/types";
import { saveEditorialTheme, selectThemePreset } from "@/utils/editorial-theme";
import type { ThemePresetId } from "@/utils/theme-presets";
import PresetPicker from "./preset-picker";
import FontPicker from "./font-picker";

// Read the actual theme declarations rather than maintaining a second palette.
function declaredTokens() {
  const names = new Set<string>();
  const visit = (rules: CSSRuleList) => {
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSStyleRule) {
        for (const name of Array.from(rule.style)) {
          if (
            name.startsWith("--color-sec-") ||
            name.startsWith("--shadow-sec-")
          )
            names.add(name);
        }
      } else if ("cssRules" in rule) visit((rule as CSSGroupingRule).cssRules);
    }
  };
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      visit(sheet.cssRules);
    } catch {
      /* Cross-origin font sheets have no project tokens. */
    }
  }
  return [...names].sort();
}

export default function ThemeSettings() {
  const t = useTranslations("security.workbench");
  const metricT = useTranslations("security.metricStyles");
  const [tokens, setTokens] = useState<ThemeToken[]>([]);
  const [notice, setNotice] = useState("");
  const [resetRevision, setResetRevision] = useState(0);
  const [invalidToken, setInvalidToken] = useState<string | null>(null);
  const { theme } = useTheme();
  useEffect(() => {
    const read = () => {
      const style = getComputedStyle(document.documentElement);
      setTokens(
        declaredTokens().map((name) => ({
          name,
          value: style.getPropertyValue(name).trim(),
        })),
      );
    };
    read();
    const observer = new MutationObserver((records) => {
      read();
      if (records.some((r) => r.attributeName === "class")) {
        setInvalidToken(null);
        setNotice("");
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    return () => observer.disconnect();
  }, []);
  function update(name: string, value: string) {
    const property = name.startsWith("--shadow") ? "box-shadow" : "color";
    if (!CSS.supports(property, value)) {
      setInvalidToken(name);
      return;
    }
    if (invalidToken === name) setInvalidToken(null);
    setNotice("");
    document.documentElement.style.setProperty(name, value);
    const saved = saveEditorialTheme();
    setNotice(t(saved ? "autoSaved" : "saveFailed"));
    window.dispatchEvent(new Event("security-theme-change"));
  }
  function reset() {
    choosePreset("default");
  }
  function choosePreset(preset: ThemePresetId) {
    setResetRevision((revision) => revision + 1);
    setInvalidToken(null);
    const saved = selectThemePreset(preset);
    setNotice(t(saved ? "autoSaved" : "saveFailed"));
  }
  function exportTheme() {
    const style = getComputedStyle(document.documentElement);
    const css = `${theme === "dark" ? ".dark" : ":root:not(.dark)"} {\n${tokens.map(({ name }) => `  ${name}: ${style.getPropertyValue(name).trim()};`).join("\n")}\n}\n`;
    const url = URL.createObjectURL(new Blob([css], { type: "text/css" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `workspace-theme-${theme}.css`;
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <>
      <header className="sec-page-header">
        <h1>{t("settingsTitle")}</h1>
        <div className="em-control-row">
          <Button variant="security-outline" onClick={reset}>
            {t("reset")}
          </Button>
          <Button variant="security" onClick={exportTheme}>
            {t("export")}
          </Button>
        </div>
      </header>
      <p className="sec-register-caption">{t("notice")}</p>
      <p className="em-save-status" role="status">
        {notice}
      </p>
      <FontPicker />
      <PresetPicker
        mode={theme}
        ready={tokens.length > 0}
        onChange={choosePreset}
      />
      <div className="em-control-row sec-metric-settings">
        <MetricStyleSelector />
        <Link href="/metric-styles">{metricT("title")}</Link>
      </div>
      <section className="em-grid">
        <div
          id="theme-tokens"
          data-columns={12}
          className="em-module em-span-12"
        >
          <h2>{t("tokens")}</h2>
          <div className="em-token-grid">
            {tokens.map((token) => (
              <ThemeTokenField
                key={`${theme}:${resetRevision}:${token.name}`}
                token={token}
                invalid={invalidToken === token.name}
                onChange={update}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
