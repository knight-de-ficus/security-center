"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import TrendChart from "./trend-chart";
import PageHeader from "../shared/page-header";
import PeriodControl from "../shared/period-control";
import MetricStyleSelector from "../shared/metric-style-selector";
import MetricSummary from "../shared/metric-summary";

import ActivityHeatmap from "../shared/activity-heatmap";
import { newFindings, remediated } from "../data";
import RemediationSpeed from "./remediation-speed";
import FindingTypes from "./finding-types";
export default function SecurityTrends() {
  const t = useTranslations("security");
  const [days, setDays] = useState(30);
  const [view, setView] = useState<"volume" | "balance">("volume");
  const incoming = newFindings.slice(-days),
    outgoing = remediated.slice(-days);
  const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);
  const net = sum(outgoing) - sum(incoming);
  // Small supporting metrics only; redundant ratios stay out (v1.1 §29.4).
  const stats = [
    { key: "newFindings", value: String(sum(incoming)), unit: "findings" },
    { key: "remediated", value: String(sum(outgoing)), unit: "findings" },
    {
      key: "netChangeLabel",
      value: net < 0 ? String(net) : `+${net}`,
      unit: "findings",
    },
    { key: "mttr", value: "3.6", unit: "days" },
  ];
  return (
    <>
      <PageHeader
        page="trends"
        action={
          <>
            <MetricStyleSelector />
            <PeriodControl days={days} onChange={setDays} />
          </>
        }
      />
      <div
        className="sec-analysis-tabs"
        role="group"
        aria-label={t("chartView")}
      >
        <button
          aria-pressed={view === "volume"}
          onClick={() => setView("volume")}
        >
          {t("volumeView")}
        </button>
        <button
          aria-pressed={view === "balance"}
          onClick={() => setView("balance")}
        >
          {t("balanceView")}
        </button>
        <span>{t("historyDataset")}</span>
      </div>
      <MetricSummary
        compact
        label={t("analysisMetrics")}
        items={stats.map((s) => ({
          label: t(s.key),
          value: s.value,
          unit: t(`units.${s.unit}`),
        }))}
      />
      <TrendChart days={days} view={view} />
      <div className="sec-grid sec-equal-grid sec-analysis-pair">
        <RemediationSpeed />
        <FindingTypes />
      </div>
      <ActivityHeatmap />
    </>
  );
}
