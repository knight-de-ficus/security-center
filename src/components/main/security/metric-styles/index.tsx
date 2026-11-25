"use client";
import { saveEditorialTheme } from "@/utils/editorial-theme";
import SnapshotExample from "./snapshot-example";
import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { getMetrics, initialVulnerabilities, isActive } from "../data";
import MetricSummary from "../shared/metric-summary";
import {
  metricAppearances,
  readMetricAppearance,
  setMetricAppearance,
  subscribeMetricAppearance,
  serverMetricAppearance,
} from "@/utils/metric-appearance";
export default function MetricStyles() {
  const t = useTranslations("security");
  const appearance = useSyncExternalStore(
    subscribeMetricAppearance,
    readMetricAppearance,
    serverMetricAppearance,
  );
  const metrics = getMetrics(initialVulnerabilities);
  const items = [
    {
      label: t("metrics.active"),
      value: String(metrics.active),
      unit: t("units.findings"),
      lead: true,
    },
    {
      label: t("severity.critical"),
      value: String(metrics.critical),
      unit: t("units.findings"),
    },
    {
      label: t("severity.high"),
      value: String(
        initialVulnerabilities.filter(
          (v) => isActive(v) && v.severity === "high",
        ).length,
      ),
      unit: t("units.findings"),
    },
    {
      label: t("metrics.overdue"),
      value: String(metrics.overdue),
      unit: t("units.findings"),
    },
  ];
  return (
    <>
      <header className="sec-page-header">
        <h1>{t("metricStyles.title")}</h1>
      </header>
      <p className="sec-register-caption">{t("metricStyles.description")}</p>
      <div className="sec-metric-comparisons">
        {metricAppearances.map((mode) => (
          <section key={mode} data-columns={12} className="sec-metric-example">
            <header className="sec-metric-example-header">
              <div>
                <h2>{t(`metricStyles.${mode}`)}</h2>
                <p>{t(`metricStyles.${mode}Note`)}</p>
              </div>
              <Button
                variant={appearance === mode ? "security" : "security-outline"}
                aria-pressed={appearance === mode}
                onClick={() => {
                  setMetricAppearance(mode);
                  saveEditorialTheme();
                }}
              >
                {t(
                  appearance === mode
                    ? "metricStyles.selected"
                    : "metricStyles.apply",
                )}
              </Button>
            </header>
            <MetricSummary
              label={t(`metricStyles.${mode}`)}
              items={items}
              appearance={mode}
            />
          </section>
        ))}
      </div>
      <SnapshotExample />
    </>
  );
}
